import { ReferenceObject, SchemaObject } from 'openapi-typescript';
import { propType2tsType } from "./helper";

export const BaseTemplate = `
/**
 * 接口附加参数
 */
export interface ApiExtraConfig{originUrl:string,paramLen:number,paramNamesInPath:string[],paramNamesInQuery:string[]}
/**
 * url path参数拼接
 * @param params 请求的所有参数
 * @param extraConfig 附加信息
 * @returns
 */
function pathReplace(params:any,extraConfig:ApiExtraConfig):string{
  // 校验一下接口
  if(extraConfig.paramLen<extraConfig.paramNamesInPath.length+extraConfig.paramNamesInQuery.length){
    console.log(extraConfig.originUrl+'参数解析出错！')
    return '';
  }

  let url = extraConfig.originUrl;
  // 参数为空时 不拼接
  if(extraConfig.paramNamesInPath.length===0 || extraConfig.paramLen===0) return url;

  // 有一个path参数时
  if(extraConfig.paramNamesInPath.length===1) {
    const name = extraConfig.paramNamesInPath[0];
    if(extraConfig.paramLen===1) return url.replace('{'+name+'}',params);
    if(extraConfig.paramLen>1) return url.replace('{'+name+'}',params[name]);
  }
  // 有多个path参数时
  if(extraConfig.paramNamesInPath.length>1) {
    for (let index = 0; index < extraConfig.paramNamesInPath.length; index++) {
      const name = extraConfig.paramNamesInPath[index];
      url = url.replace('{'+name+'}',paramArrDeal(params[name]));
    }
    return url;
  }
  return '';
}

/**
 * url query参数拼接
 * @param params 请求的所有参数
 * @param extraConfig 附加信息
 * @returns
 */
function queryReplace(params:any,extraConfig:ApiExtraConfig){
  let url = '?';
  let querys:string[] = [];
  // 参数为空时 不拼接
  if(extraConfig.paramNamesInQuery.length===0 || extraConfig.paramLen===0) return url;

  // 一个参数时
  if (extraConfig.paramNamesInQuery.length === 1){
    const key = Object.keys(params)[0]
    querys.push(key+'='+params[key])
  }

  // 有多个query参数时
  if(extraConfig.paramNamesInQuery.length>1) {
    for (let index = 0; index < extraConfig.paramNamesInQuery.length; index++) {
      const name = extraConfig.paramNamesInQuery[index];
      querys.push(name+'='+params[name])
    }
  }
  return url+querys.join('&');
}

function paramArrDeal(params:any){
  if(Object.prototype.toString.call(params).toLowerCase()==='[object array]'){
    return params.join(',');
  }else{
    return params;
  }
}
let _httpcustomlib:typeof _httplib = (...args:Parameters<typeof _httplib>)=>{};
function _httplib<ResultType>(reqConfig:{url:string,method:string,params?:any,data?:any},extraConfig?:ApiExtraConfig):any{
  console.log('自动生成ts库 =>',reqConfig)
  const _reqConfig = {...reqConfig};
  let url:string = pathReplace(_reqConfig.params,extraConfig!);
  // path参数替换
  url+=queryReplace(_reqConfig.params,extraConfig!);
  // queryReplace(_reqConfig.params,extraConfig!);

  return _httpcustomlib({..._reqConfig,url:url}) as ResultType;
};
`;


export function propLine(propKey:string,prop: SchemaObject){
  let propTypeString = 'any';

  if(prop.type) 
    propTypeString = propType2tsType(prop.type,prop as ReferenceObject)
  else{
      propTypeString=(prop as {originalRef:string}).originalRef!.replace(/«|,|»/g,'_');
  }

  return `
    /**
     * ${prop.description}
     */
    ${propKey}${prop.required?'':'?'}: ${propTypeString}
  `
}

export function interfaceTpl(title:string,name:string,propStr:string,splitInterface?:boolean){
  if(!splitInterface)
  return `
  /**
   * @desc
   * ${title}
   */
  export interface ${name}{
    ${propStr}
  }`

  return `
  /**
   * @desc
   * ${title}
   */
  declare interface ${name}{
    ${propStr}
  }`
}


export function exportTpl(serviceName:string,apiList:string[]){
  return `export const ${serviceName||'apis'} = {
${apiList.join(',\r\n')}
  }`
}