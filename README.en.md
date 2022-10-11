# swagger-typescript-parser

## 介绍
只需要一个命令，自动将swagger文档转换为typescript的interface、api。支持参数的代码提示，支持自定义http库

## 安装教程

```
npm i swagger-typescript-parser -D
```
## 一、SWAGGER转TS
### 1.1 使用CLI进行转换
```shell
# 远端链接
npx tsgen parse --remoteUrl http://domain.com/api-docs.json --output remoteApi.ts
```

```shell
# 本地文件
npx tsgen parse --localPath your/local/path/to/api-doc.json --output localApi.ts
```


### 1.2 使用API转换
```Javascript
    // step1. 引入库
    const {tsgen} = require('swagger-typescript-parser');
    
    // step2. 基于远端http链接
    tsgen({
        remoteUrl:'http://domain.com/api-docs.json',
        output:'test-tsgen-remote-interface.ts',
        serviceName: 'remoteApi'
    });

    // or 基于本地json文件
    tsgen({
        localPath: 'your/local/path/to/api-doc.json',
        output:'test-tsgen-local-interface.ts',
        serviceName: 'localApi'
    })

```


## 1.3 SWAGGER转TS参数说明
```typescript
interface TsgenOption{
    /**
     * swagger apidoc远端访问地址
     */
    remoteUrl?: string,

    /**
     * swagger apidoc本地的访问地址
     */
    localPath?: string,

    /**
     * 服务名，export导出的名称，默认service
     */
    serviceName?: string,

    /**
     * 生成的文件名
     */
    output: string
}
```

## 二、生成文件的使用
### 2.1 配置tsconfig
生成的文件是存放在模块dist目录的，所以需要在`tsconfig.json`的`include`字段加入模块的`dist`目录路径
```json
{
    "include":["./node_modules/swagger-typescript-parser/dist"]
}
```

### 2.2 配置任意一个你喜欢的http库
#### 与axios配合使用
```Javascript
// 引入axios
import axios, { Method } from "axios";

// 引入tsgen生成的接口文档
import { apis } from "@/apis/dist/interface";

// 装载axios库
apis.install(function(req:{url:string,method:string,params:any){
// 此处的返回值，将返回给接口调用
  return axios({
    url:req.url,
    data:req.params,
    method:req.method as Method
  })
});

// 调用接口，接口的路径将作为apis调用时的key，调用时配合ts自动推导
apis['/xx/xx/xx'].get({...somdata}).then(res=>{
    console.log(res);
});
```

