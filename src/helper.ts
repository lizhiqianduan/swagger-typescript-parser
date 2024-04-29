import * as fs from 'fs';
import { get, IncomingMessage } from 'http';
import { OpenAPI2, OperationObject, ParameterObject, PathItemObject, ReferenceObject, ResponseObject, SchemaObject } from 'openapi-typescript';
import path from 'path';
import { TsgenOption } from './entry-tsgen';
import { interfaceTpl, propLine } from './tpl';

/**
 * 将属性的类型 转换为类型字符串
 * @param propType
 */
export function propType2tsType(propType?:string,prop?:ReferenceObject){
  const map={
    'integer':'number',
    'array':'any[]'
  }
  if(propType==='array') {
    const subType = (prop as unknown as {items:{originalRef:string,type:string}}).items.type
    if(subType){
      return propType2tsType(subType)
    }
    return (prop as unknown as {items:{originalRef:string}}).items.originalRef.replace(/«|,|»/g,'_')+'[]';
  }
  if(!propType) {
    return (prop as unknown as {originalRef:string}).originalRef.replace(/«|,|»/g,'_');
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
 * 参数格式转换
 * @param param 一个参数，可以是入参，也可以是出参
 * @returns 返回此参数的类型名，字符串
 */
function paramParser(param : ReferenceObject | ParameterObject){
  let paramType = '';
  param = param as ParameterObject;
  if(!param.schema){
    paramType = propType2tsType(param.type!,param as ReferenceObject);
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
      paramType=propType2tsType(param.schema.type!,param as ReferenceObject);
    }
  }

  return {param,paramTypeString:paramType.replace(/«|,|»/g,'_')}
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
      param = param as ParameterObject;
      if(param.in==='path' && param.name) paramNamesInPath.push(param.name);
      if(param.in==='query' && param.name) paramNamesInQuery.push(param.name);
      // 参数类型检测
      const {paramTypeString} = paramParser(param)
      return `${param.name}: ${paramTypeString}`
    });
  }     

  // todo 返回值类型检测，取返回值为200时的对象进行解析
  const resultSchema = pathItem[action as 'get'|'post'|'delete'|'put'|'options']!.responses!['200'] as ResponseObject;
  const resultTypeString = paramParser(resultSchema).paramTypeString;



  if(paramNamesInPath.length>0)tsgenLog('path参数=>',paramNamesInPath);
  if(paramNamesInQuery.length>0)tsgenLog('query参数=>',paramNamesInQuery);

  tsgenLog('创建api =>',url)
  tsgenLog('所有参数=>',paramStr)
  tsgenLog('path参数=>',paramNamesInPath)
  tsgenLog('query参数=>',paramNamesInQuery);

  // 接口没有参数时的模板
  if(paramStr.length===0) return `'${url}': { ${action}: ():Promise<${resultTypeString}> => ${_httpLibTemplate(url,action,'undefined',paramNamesInPath,paramNamesInQuery,paramStr.length,resultTypeString)} }`

  // 只有一个参数时的模板
  if(paramStr.length===1)
    // return `'${url}':{${action}: (reqData: {${paramStr.join(',')}}):${resultTypeString} => ${_httpLibTemplate(url,action,'reqData',paramNamesInPath,paramNamesInQuery,paramStr.length,resultTypeString)} }`;
  return `'${url}':{${action}: (reqData: ${paramStr[0].slice(paramStr[0].indexOf(':')+1).replace(/«|,|»/g,'_')}):Promise<${resultTypeString}> => ${_httpLibTemplate(url,action,'reqData',paramNamesInPath,paramNamesInQuery,paramStr.length,resultTypeString)} }`;

  // 多个参数时的模板，此类情况多为query参数、path参数，需要兼容 @todo
  const str = `'${url}':{${action}: (reqData: {${paramStr.join(',')}}):Promise<${resultTypeString}> => ${_httpLibTemplate(url,action,'reqData',paramNamesInPath,paramNamesInQuery,paramStr.length,resultTypeString)} }`;
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
function _httpLibTemplate(url:string,method:string,data:string='reqData',paramNamesInPath:string[],paramNamesInQuery:string[],paramLen:number,resultTypeString:string='any'){
  if(method.toLowerCase()==='post')
    return `_httplib<${resultTypeString}>( {url:'${url}',method:'${method}','data':${data}}, {originUrl:'${url}',paramNamesInPath:${JSON.stringify(paramNamesInPath)},paramNamesInQuery:${JSON.stringify(paramNamesInQuery)},paramLen:${paramLen}})`;
  if(method.toLowerCase()==='get' && paramNamesInQuery.length===1){
      return `_httplib<${resultTypeString}>( {url:'${url}',method:'${method}','params':{${paramNamesInQuery[0]}:${data}}}, {originUrl:'${url}',paramNamesInPath:${JSON.stringify(paramNamesInPath)},paramNamesInQuery:${JSON.stringify(paramNamesInQuery)},paramLen:${paramLen}})`;
  }
  
  return `_httplib<${resultTypeString}>( {url:'${url}',method:'${method}','params':${data}}, {originUrl:'${url}',paramNamesInPath:${JSON.stringify(paramNamesInPath)},paramNamesInQuery:${JSON.stringify(paramNamesInQuery)},paramLen:${paramLen}})`;
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
  let _args = [`[TSGEN LOG]`,...args]
  console.log.apply(global,_args);
}