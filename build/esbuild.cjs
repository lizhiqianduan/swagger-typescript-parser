"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/entry-tsgen.ts
var entry_tsgen_exports = {};
__export(entry_tsgen_exports, {
  download: () => download,
  moduleRoot: () => moduleRoot,
  tsgen: () => tsgen,
  tsgenInterface: () => tsgenInterface,
  tsgenLog: () => tsgenLog
});
module.exports = __toCommonJS(entry_tsgen_exports);

// src/helper.ts
var fs = __toESM(require("fs"));
var import_http = require("http");
var import_path = __toESM(require("path"));

// src/tpl.ts
var BaseTemplate = `
/**
 * \u63A5\u53E3\u9644\u52A0\u53C2\u6570
 */
export interface ApiExtraConfig{originUrl:string,paramLen:number,paramNamesInPath:string[],paramNamesInQuery:string[]}
/**
 * url path\u53C2\u6570\u62FC\u63A5
 * @param params \u8BF7\u6C42\u7684\u6240\u6709\u53C2\u6570
 * @param extraConfig \u9644\u52A0\u4FE1\u606F
 * @returns
 */
function pathReplace(params:any,extraConfig:ApiExtraConfig):string{
  // \u6821\u9A8C\u4E00\u4E0B\u63A5\u53E3
  if(extraConfig.paramLen<extraConfig.paramNamesInPath.length+extraConfig.paramNamesInQuery.length){
    console.log(extraConfig.originUrl+'\u53C2\u6570\u89E3\u6790\u51FA\u9519\uFF01')
    return '';
  }

  let url = extraConfig.originUrl;
  // \u53C2\u6570\u4E3A\u7A7A\u65F6 \u4E0D\u62FC\u63A5
  if(extraConfig.paramNamesInPath.length===0 || extraConfig.paramLen===0) return url;

  // \u6709\u4E00\u4E2Apath\u53C2\u6570\u65F6
  if(extraConfig.paramNamesInPath.length===1) {
    const name = extraConfig.paramNamesInPath[0];
    if(extraConfig.paramLen===1) return url.replace('{'+name+'}',params);
    if(extraConfig.paramLen>1) return url.replace('{'+name+'}',params[name]);
  }
  // \u6709\u591A\u4E2Apath\u53C2\u6570\u65F6
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
 * url query\u53C2\u6570\u62FC\u63A5
 * @param params \u8BF7\u6C42\u7684\u6240\u6709\u53C2\u6570
 * @param extraConfig \u9644\u52A0\u4FE1\u606F
 * @returns
 */
function queryReplace(params:any,extraConfig:ApiExtraConfig){
  let url = '?';
  let querys:string[] = [];
  // \u53C2\u6570\u4E3A\u7A7A\u65F6 \u4E0D\u62FC\u63A5
  if(extraConfig.paramNamesInQuery.length===0 || extraConfig.paramLen===0) return url;

  // \u6709\u591A\u4E2Aquery\u53C2\u6570\u65F6
  if(extraConfig.paramNamesInQuery.length>=1) {
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
  console.log('\u81EA\u52A8\u751F\u6210ts\u5E93 =>',reqConfig)
  const _reqConfig = {...reqConfig};
  let url:string = pathReplace(_reqConfig.params,extraConfig!);
  // path\u53C2\u6570\u66FF\u6362
  url+=queryReplace(_reqConfig.params,extraConfig!);
  queryReplace(_reqConfig.params,extraConfig!);

  return _httpcustomlib({..._reqConfig,url:url}) as ResultType;
};
`;
function propLine(propKey, prop) {
  let propTypeString = "any";
  if (prop.type)
    propTypeString = propType2tsType(prop.type, prop);
  else {
    propTypeString = prop.originalRef.replace(/«|,|»/g, "_");
  }
  return `
    /**
     * ${prop.description}
     */
    ${propKey}${prop.required ? "" : "?"}: ${propTypeString}
  `;
}
function interfaceTpl(title, name, propStr, splitInterface) {
  if (!splitInterface)
    return `
  /**
   * @desc
   * ${title}
   */
  export interface ${name}{
    ${propStr}
  }`;
  return `
  /**
   * @desc
   * ${title}
   */
  declare interface ${name}{
    ${propStr}
  }`;
}
function exportTpl(serviceName, apiList) {
  return `export const ${serviceName || "apis"} = {
${apiList.join(",\r\n")}
  }`;
}

// src/helper.ts
function propType2tsType(propType, prop) {
  const map = {
    "integer": "number",
    "array": "any[]"
  };
  if (propType === "array") {
    const subType = prop.items.type;
    if (subType) {
      return propType2tsType(subType);
    }
    return prop.items.originalRef.replace(/«|,|»/g, "_") + "[]";
  }
  if (!propType) {
    return prop.originalRef.replace(/«|,|»/g, "_");
  }
  return map[propType] || propType;
}
function createInterface(name, definition, splitInterface) {
  name = name.replace(/«|,|»/g, "_");
  let propStr = "";
  for (const propKey in definition.properties) {
    const prop = definition.properties[propKey];
    propStr += propLine(propKey, prop);
  }
  return interfaceTpl(definition.title, name, propStr, splitInterface);
}
function writeFile(path2, str) {
  const fd = fs.openSync(path2, "w");
  fs.writeFileSync(fd, str);
  fs.closeSync(fd);
}
function paramParser(param) {
  let paramType = "";
  param = param;
  if (!param.schema) {
    paramType = propType2tsType(param.type, param);
  } else {
    param.schema = param.schema;
    if (param.schema.type === "array") {
      paramType = param.schema.items.originalRef + "[]";
    } else {
      const $ref = param.schema.$ref;
      if ($ref)
        paramType = param.schema.$ref.split("#/definitions/")[1];
      else
        paramType = propType2tsType(param.schema.type, param);
    }
  }
  return { param, paramTypeString: paramType.replace(/«|,|»/g, "_") };
}
function createApi(url, pathItem) {
  const action = Object.keys(pathItem)[0];
  const operation = pathItem.get || pathItem.post || pathItem.delete || pathItem.put;
  let paramStr = [];
  let paramNamesInPath = [];
  let paramNamesInQuery = [];
  if (operation == null ? void 0 : operation.parameters) {
    paramStr = operation == null ? void 0 : operation.parameters.map((param) => {
      param = param;
      if (param.in === "path" && param.name)
        paramNamesInPath.push(param.name);
      if (param.in === "query" && param.name)
        paramNamesInQuery.push(param.name);
      const { paramTypeString } = paramParser(param);
      return `${param.name}: ${paramTypeString}`;
    });
  }
  const resultSchema = pathItem[action].responses["200"];
  const resultTypeString = paramParser(resultSchema).paramTypeString;
  if (paramNamesInPath.length > 0)
    tsgenLog("path\u53C2\u6570=>", paramNamesInPath);
  if (paramNamesInQuery.length > 0)
    tsgenLog("query\u53C2\u6570=>", paramNamesInQuery);
  tsgenLog("\u521B\u5EFAapi =>", url);
  tsgenLog("\u6240\u6709\u53C2\u6570=>", paramStr);
  tsgenLog("path\u53C2\u6570=>", paramNamesInPath);
  tsgenLog("query\u53C2\u6570=>", paramNamesInQuery);
  if (paramStr.length === 0)
    return `'${url}': { ${action}: ():${resultTypeString} => ${_httpLibTemplate(url, action, "undefined", paramNamesInPath, paramNamesInQuery, paramStr.length, resultTypeString)} }`;
  if (paramStr.length === 1)
    return `'${url}':{${action}: (reqData: ${paramStr[0].slice(paramStr[0].indexOf(":") + 1).replace(/«|,|»/g, "_")}):${resultTypeString} => ${_httpLibTemplate(url, action, "reqData", paramNamesInPath, paramNamesInQuery, paramStr.length, resultTypeString)} }`;
  const str = `'${url}':{${action}: (reqData: {${paramStr.join(",")}}):${resultTypeString} => ${_httpLibTemplate(url, action, "reqData", paramNamesInPath, paramNamesInQuery, paramStr.length, resultTypeString)} }`;
  return str;
}
function _httpLibTemplate(url, method, data = "reqData", paramNamesInPath, paramNamesInQuery, paramLen, resultTypeString = "any") {
  if (method.toLowerCase() === "post")
    return `_httplib<${resultTypeString}>( {url:'${url}',method:'${method}','data':${data}}, {originUrl:'${url}',paramNamesInPath:${JSON.stringify(paramNamesInPath)},paramNamesInQuery:${JSON.stringify(paramNamesInQuery)},paramLen:${paramLen}})`;
  return `_httplib<${resultTypeString}>( {url:'${url}',method:'${method}','params':${data}}, {originUrl:'${url}',paramNamesInPath:${JSON.stringify(paramNamesInPath)},paramNamesInQuery:${JSON.stringify(paramNamesInQuery)},paramLen:${paramLen}})`;
}
function download(url, filename) {
  return new Promise(function(resolve, reject) {
    (0, import_http.get)(url, {}, (res) => {
      if (res.statusCode !== 200) {
        resolve({ path: "", rawData: "" });
        return tsgenLog("\u4E0B\u8F7D\u6587\u4EF6\u51FA\u9519\uFF0C\u9519\u8BEF\u7801statusCode=" + res.statusCode);
      }
      res.setEncoding("utf8");
      let rawData = "";
      res.on("data", (chunk) => {
        rawData += chunk;
      });
      res.on("end", () => {
        try {
          if (filename) {
            writeFile(moduleRoot() + "/dist/" + filename, rawData);
            resolve({ path: moduleRoot() + "/dist/" + filename, rawData });
          } else {
            resolve({ path: "", rawData });
          }
        } catch (e) {
          tsgenLog(e);
          resolve({ path: "", rawData: "" });
        }
      });
    }).on("error", (e) => {
      tsgenLog(e);
      resolve({ path: "", rawData: "" });
    });
  });
}
function moduleRoot() {
  return import_path.default.resolve(import_path.default.resolve(__dirname) + "/../");
}
async function getApidocJSON(filepath) {
  let remoteUrl = "";
  let localPath = "";
  if (filepath.indexOf("http") !== -1) {
    remoteUrl = filepath;
  } else {
    localPath = filepath;
  }
  try {
    if (remoteUrl) {
      return JSON.parse((await download(remoteUrl)).rawData);
    } else if (localPath) {
      return JSON.parse(fs.readFileSync(localPath, { encoding: "utf-8" }));
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
}
function tsgenLog(...args) {
  let _args = [`[TSGEN LOG]`, ...args];
  console.log.apply(global, _args);
}

// src/entry-tsgen.ts
async function tsgen(option) {
  tsgenLog("===========\u81EA\u52A8\u751F\u6210API\u5F00\u59CB\u6267\u884C===========");
  tsgenLog("\u6267\u884C\u53C2\u6570\uFF1A", option);
  if (!option.filepath)
    tsgenLog("\u6587\u6863\u5730\u5740\u4E0D\u80FD\u4E3A\u7A7A\uFF01");
  const { serviceName, output } = option;
  const json = await getApidocJSON(option.filepath);
  if (!json)
    return tsgenLog("\u81EA\u52A8\u751F\u6210\u63A5\u53E3\u5931\u8D25\uFF01");
  let interfaceList = Object.keys(json.definitions).map((key) => {
    return createInterface(key, json.definitions[key]);
  });
  const apiList = Object.keys(json.paths).map((key) => {
    return "  " + createApi(key, json.paths[key]);
  });
  tsgenLog("interface\u603B\u6570\uFF1A" + interfaceList.length);
  tsgenLog("api\u603B\u6570\uFF1A" + apiList.length);
  apiList.push(`  install:function(httplib:typeof _httplib){ _httpcustomlib=httplib }`);
  if (option.splitInterface) {
    interfaceList = [];
    tsgenInterface(option);
  }
  const fileStr = interfaceList.join("\r\n") + BaseTemplate + exportTpl(serviceName, apiList);
  const filepath = (output || ".") + "/" + serviceName + ".ts";
  writeFile(filepath, fileStr);
  tsgenLog("\u5199\u5165\u6587\u4EF6", filepath);
  tsgenLog("===========\u6267\u884C\u7ED3\u675F===========");
}
async function tsgenInterface(option) {
  tsgenLog("===========\u81EA\u52A8\u751F\u6210interface\u5F00\u59CB\u6267\u884C===========");
  const json = await getApidocJSON(option.filepath);
  if (!json)
    return tsgenLog("\u81EA\u52A8\u751F\u6210\u63A5\u53E3\u5931\u8D25\uFF01");
  const interfaceList = Object.keys(json.definitions).map((key) => {
    return createInterface(key, json.definitions[key], true);
  });
  const filepath = (option.output || ".") + "/" + (option.serviceName || "autoTsgen") + ".d.ts";
  writeFile(filepath, interfaceList.join("\r\n"));
  tsgenLog("\u5199\u5165\u6587\u4EF6", filepath);
  tsgenLog("===========\u6267\u884C\u7ED3\u675F===========");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  download,
  moduleRoot,
  tsgen,
  tsgenInterface,
  tsgenLog
});
