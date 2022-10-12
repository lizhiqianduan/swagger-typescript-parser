# swagger-typescript-parser

## 介绍
只需要一个命令，自动将swagger文档转换为typescript的interface、api。支持参数的代码提示，支持自定义http库

## 安装教程

```
npm i swagger-typescript-parser -D
```
## 一、使用CLI命令进行转换

- 自动生成api、interface

```shell
npx tsgen parse -f http://domain.com/api-docs.json -s service
```

- 仅生成interface

```shell
# 本地文件
npx tsgen interface -f http://domain.com/api-docs.json  -s service
```

## 二、api文件的使用
#### 举例：与axios配合使用
```Javascript
// 引入axios
import axios, { Method } from "axios";

// 引入api，此处`service.ts`为生成的文件路径
import { service } from "./service.ts";

// 装载axios库
service.install(function(req){
  // 此处的返回值，将返回给接口调用
  return axios({
    url:req.url,
    data:req.params,
    method:req.method as Method
  })
});

// 调用接口，接口的路径将作为apis调用时的key
service['/xx/xx/xx'].get({...somdata}).then(res=>{
    console.log(res);
});
```
也可以与其他http库配合使用，只需要在`install`中进行绑定即可


## 附：命令行参数说明
- parse命令
```
Usage: tsgen parse [options]

将swagger接口转换为ts的interface和API

Options:
  -f,--filepath <filepath>        swagger的JSON文档路径
  -s,--serviceName <serviceName>  service名、文件名
  -o,--output <output>            输出的文件目录，默认为当前目录 (default: ".")
  -i,--splitInterface             是否单独输出interface文件
  -h, --help                      display help for command
```

- interface命令
```
Usage: tsgen interface [options]

自动获取swagger文档中的model，生成interface保存到d.ts文件

Options:
  -f,--filepath <filepath>        swagger的JSON文档路径
  -s,--serviceName <serviceName>  service名、文件名
  -o,--output <output>            输出的文件目录，默认为当前目录 (default: ".")
  -h, --help                      display help for command
```

最终得到的的效果如下：
![接口调用示例](http://www.datagetter.cn:9000/datagetter.cn/public/common/%E6%8E%A5%E5%8F%A3%E8%B0%83%E7%94%A8%E7%A4%BA%E4%BE%8B.gif)