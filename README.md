# swagger-typescript-parser

## 介绍
只需要一个命令，自动将`swagger`文档转换为`typescript`的`interface`和`api`。

**特点：**
- 一键自动定义参数的接口，包括入参和出参
- 一键自动定义API，能统一接口的调用、拦截，可自由封装
- 编辑器能自动推导入参和出参的类型
- 通过自动推导，编辑器能友好的进行代码提示
- 通过自动推导，编辑器能对参数进行静态检测，提示相应的错误
- 支持任意的`HTTP`库，可自由选择

本工具的目标是愉快的写`TS`业务代码，而不用去关心后端API如何去定义、如何去调用。

## 一、安装教程

```
npm i swagger-typescript-parser -D
```
## 二、使用

### STEP1、将`swagger`文档转换为本地`*.ts`文件

**若swagger文档在远端服务器：**

```shell
npx tsgen parse -f https://github.com/lizhiqianduan/swagger-typescript-parser/raw/main/docs/api-doc.json -s serviceName
```

*本示例使用的是`GitHub`地址（国内用户可能需要翻墙），你也可以使用本地路径进行测试*

此步骤成功后，会在当前目录生成一个`serviceName.ts`文件。

###  STEP2、`serviceName.ts`文件的初始化

```Javascript
// 引入一个你喜欢的HTTP库，本例是axios
import axios, { Method } from "axios";

// 引入STEP1生成的API文件
import { serviceName } from "./serviceName.ts";

// 初始化
serviceName.install(function(req){
  return axios({...req})
});
```

初始化，只需调用`service`的`install`接口即可。

本例是与`axios`库结合使用的，也可以与其他http库配合使用，只需要在`install`中进行初始化即可。

### STEP3、接口调用
```Javascript
// 引入STEP1生成的API文件
import { serviceName } from "./serviceName.ts";

const data = await serviceLotterySystem['/api/batch/save_or_update'].post({
  // ... 
  // 入参会自动推导为swagger中定义的类型：SaveOrUpdateBatchBO
})
// 出参也会自动推导为swagger中定义的类型
// typeof data == BatchVO
```

最终可以看到，所有的入参、出参都能进行自动推导，可以愉快的编写代码了




## 三、工具参数说明

### parse命令
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

示例1，将api和interface全部写入到`serviceName.ts`
```
npx tsgen parse -f https://github.com/lizhiqianduan/swagger-typescript-parser/raw/main/docs/api-doc.json -s serviceName
```

示例2，将api和interface分开，分别写入到`serviceName.ts`和`serviceName.d.ts`
```
npx tsgen parse  -i -f https://github.com/lizhiqianduan/swagger-typescript-parser/raw/main/docs/api-doc.json -s serviceName
```

### interface命令
```
Usage: tsgen interface [options]

自动获取swagger文档中的model，生成interface保存到d.ts文件

Options:
  -f,--filepath <filepath>        swagger的JSON文档路径
  -s,--serviceName <serviceName>  service名、文件名
  -o,--output <output>            输出的文件目录，默认为当前目录 (default: ".")
  -h, --help                      display help for command
```

下面是一个视频，演示编辑器自动推导的过程：
![接口调用示例](http://www.datagetter.cn:9000/datagetter.cn/public/common/%E6%8E%A5%E5%8F%A3%E8%B0%83%E7%94%A8%E7%A4%BA%E4%BE%8B.gif)