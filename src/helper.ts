import * as fs from 'fs';
import { get, IncomingMessage } from 'http';
import { OpenAPI2, OperationObject, ParameterObject, PathItemObject, ReferenceObject, SchemaObject } from 'openapi-typescript';
import path from 'path';
import { TsgenOption } from './entry-tsgen';
import { interfaceTpl, propLine } from './tpl';
/**
 * 将属性的类型 转换为
 * @param propType
 */
export function propType2tsType(propType:string){
  const map={
    'integer':'number',
    'array':'any[]'
  }
  return map[propType as keyof typeof map] || propType;
}


/**
 * 创建一个接口
 * @param name 接口名，Java存在泛型时，会进行替换。比如：`BoxVO«int,string»` 会替换为 `BoxVO_int_string`
 * @param definition 接口在swagger中的定义
 */
export function createInterface(name:string,definition: SchemaObject,splitInterface?:boolean){
  name = name.replace(/«|,|»/g,'_');

  let propStr = '';
  for (const propKey in definition.properties) {
    const prop = definition.properties![propKey] as SchemaObject;
    propStr+= propLine(propKey,prop);
  }
  return interfaceTpl(definition.title!,name,propStr,splitInterface);
}

/**
 * 写文件
 * @param path
 * @param str
 */
export function writeFile(path:string,str:string){
  const fd = fs.openSync(path as fs.PathLike,'w');
  fs.writeFileSync(fd,str);
  fs.closeSync(fd);
}


/**
 * 创建一个接口调用
 * @param url
 * @param pathItem
 */
export function createApi(url:string,pathItem:PathItemObject){
  // 调用方法
  const action = Object.keys(pathItem)[0];

  const operation:OperationObject|undefined = pathItem.get || pathItem.post || pathItem.delete || pathItem.put;

  // 参数列表
  let paramStr:string[] = [];
  // 需要转换的path参数名称
  let paramNamesInPath:string[] = [];
  // 需要转换的query参数名称
  let paramNamesInQuery:string[] = [];

  if(operation?.parameters){
    paramStr = operation?.parameters!.map((param)=>{
      let paramType = '';
      param = param as ParameterObject;
      if(param.in==='path' && param.name) paramNamesInPath.push(param.name);
      if(param.in==='query' && param.name) paramNamesInQuery.push(param.name);
      if(!param.schema){
        paramType = propType2tsType(param.type!);
      }else{
        param.schema = param.schema as SchemaObject;
        if(param.schema.type==='array'){
          paramType=(param.schema.items as SchemaObject&{originalRef:string}).originalRef+'[]'
        }else{
          // paramType=(param.schema as SchemaObject&{originalRef:string}).originalRef
          const $ref = (param.schema as SchemaObject&{$ref:string}).$ref;
          if($ref)
            paramType=(param.schema as SchemaObject&{$ref:string}).$ref.split('#/definitions/')[1];
          else
          paramType=propType2tsType(param.schema.type!);
        }
      }

      return `${param.name}: ${paramType}`
    });
  }


  if(paramNamesInPath.length>0)tsgenLog('path参数=>',paramNamesInPath);
  if(paramNamesInQuery.length>0)tsgenLog('query参数=>',paramNamesInQuery);

  tsgenLog('创建api =>',url)
  tsgenLog('所有参数=>',paramStr)
  tsgenLog('path参数=>',paramNamesInPath)
  tsgenLog('query参数=>',paramNamesInQuery);

  // 接口没有参数时的模板
  if(paramStr.length===0) return `'${url}': { ${action}: () => ${_httpLibTemplate(url,action,'undefined',paramNamesInPath,paramNamesInQuery,paramStr.length)} }`

  // 只有一个参数时的模板
  if(paramStr.length===1)
  return `'${url}':{${action}: (reqData: ${paramStr[0].slice(paramStr[0].indexOf(':')+1)}) => ${_httpLibTemplate(url,action,'reqData',paramNamesInPath,paramNamesInQuery,paramStr.length)} }`;

  // 多个参数时的模板，此类情况多为query参数、path参数，需要兼容 @todo
  const str = `'${url}':{${action}: (reqData: {${paramStr.join(',')}}) => ${_httpLibTemplate(url,action,'reqData',paramNamesInPath,paramNamesInQuery,paramStr.length)} }`;
  return str;
}

/**
 * 创建http回调的模板
 * @param url
 * @param parsedUrl
 * @param method
 * @param data
 * @returns
 */
function _httpLibTemplate(url:string,method:string,data:string='reqData',paramNamesInPath:string[],paramNamesInQuery:string[],paramLen:number){
  return `_httplib( {url:'${url}',method:'${method}','params':${data}}, {originUrl:'${url}',paramNamesInPath:${JSON.stringify(paramNamesInPath)},paramNamesInQuery:${JSON.stringify(paramNamesInQuery)},paramLen:${paramLen}})`;
}

/**
 * 下载远端文件 
 * @param url 远端链接
 * @param filename 存储的文件名，若不传递，则不会返回path
 * @returns {path:string,rawData:string}
 */
export function download(url:string,filename?:string):Promise<{path:string,rawData:string}>{
  return new Promise(function(resolve,reject){
    get(url,{},(res)=>{
      if(res.statusCode!==200){
        resolve({path:'',rawData:''});
        return tsgenLog('下载文件出错，错误码statusCode='+res.statusCode);
      }
      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        try {
          if(filename){
            writeFile(moduleRoot()+'/dist/'+filename,rawData);
            resolve({path:moduleRoot()+'/dist/'+filename,rawData});  
          }else{
            resolve({path:'',rawData})
          }
        } catch (e) {
          tsgenLog(e);
          resolve({path:'',rawData:''});
        }
      });
    }).on('error', (e) => {
      tsgenLog(e);
      resolve({path:'',rawData:''});
    });
  })
}

/**
 * 获取模块的根路径
 */
export function moduleRoot(){
  return path.resolve(path.resolve(__dirname)+'/../');
}

/**
 * 获取apidoc的json字符串
 */
export async function getApidocJSON(filepath:string):Promise<object|null>{
  let remoteUrl = '';
  let localPath = '';
  if(filepath.indexOf('http')!==-1){
    remoteUrl = filepath;
  }else{
    localPath = filepath;
  }
  try{
    if(remoteUrl){
      return JSON.parse((await download(remoteUrl)).rawData);
    }else if(localPath){
      return JSON.parse(fs.readFileSync(localPath,{encoding:'utf-8'}));
    }else{
      return null;
    }
  }catch(e){
    return null;
  }
}

/**
 * 打印日志
 * @param args 
 */
export function tsgenLog(...args:any[]){
  let _args = ['tsgen LOG =>',...args]
  console.log.apply(global,_args);
}