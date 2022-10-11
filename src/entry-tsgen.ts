import { OpenAPI2, OperationObject, PathItemObject, SchemaObject } from 'openapi-typescript';
import { createApi, createInterface, getApidocJSON, moduleRoot, tsgenLog, writeFile } from './helper';
import { BaseTemplate, exportTpl } from './tpl';
export {download,moduleRoot,tsgenLog} from './helper';


/**
 * 生成代码的配置参数
 */
export interface TsgenOption{
  /**
   * swagger apidoc远端访问地址
   */
  remoteUrl?: string,

  /**
   * swagger apidoc本地的访问地址
   */
   localPath?: string,

  /**
   * 服务名，默认为service
   */
  serviceName?: string,

  /**
   * 生成的文件名，默认interface.ts
   */
  output: string

}

/**
 * 自动生成文档的入口函数
 * @param option 
 */
export async function tsgen(option:TsgenOption){
  tsgenLog('===========开始执行===========');
  tsgenLog('执行参数：',option);
  if(!option.localPath&&!option.remoteUrl) tsgenLog('文档地址不能为空！') 
  const {serviceName,output} = option;
  
  const json:OpenAPI2 = (await getApidocJSON(option)) as OpenAPI2;
  if(!json) return tsgenLog('自动生成接口失败！');

  // 循环创建interface
  const interfaceList = Object.keys(json.definitions!).map(key=>{
    return createInterface(key,json.definitions![key]);
  })
  
  // 循环创建api
  const apiList = Object.keys(json.paths!).map(key=>{
    return '  '+createApi(key,json.paths![key]);
  })
  tsgenLog('interface总数：'+interfaceList.length);
  tsgenLog('api总数：'+apiList.length);
  // install 函数
  apiList.push(`  install:function(httplib:typeof _httplib){ _httpcustomlib=httplib }`)
  
  const fileStr = BaseTemplate + exportTpl(serviceName||'service',apiList) + interfaceList.join('\r\n');
  
  const filepath = moduleRoot()+'/dist/'+output||'interface.ts';
  writeFile(filepath,fileStr);
  tsgenLog('写入文件',filepath)
  tsgenLog('===========执行结束===========')
}
