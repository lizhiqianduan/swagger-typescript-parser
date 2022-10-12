#!/usr/bin/env node
import { program } from "commander";
import { moduleRoot, tsgen, tsgenInterface, TsgenOption, TsgentInterfaceOption } from "./entry-tsgen";

program
  .name('tsgen')
  .description('CLI to swagger-typescript-parser')
  .version('1.0');

program
  .command('parse')
  .description('将swagger接口转换为ts的interface和API')
  .option('-f,--filepath <filepath>','swagger的JSON文档路径')
  .option('-s,--serviceName <serviceName>','生成文件export的名称以及文件名称')
  .option('-o,--output <output>', '输出的文件名，默认为当前目录','.')
  .action((option:TsgenOption)=>{
    tsgen(option);
  })

program
  .command('interface')
  .description('自动获取swagger文档中的model，生成d.ts文件')
  .option('-f,--filepath <filepath>','swagger的JSON文档路径')
  .option('-s,--serviceName <serviceName>','生成文件export的名称以及文件名称')
  .option('-o,--output <output>', '输出的文件名，默认为当前目录','.')
  .action((option:TsgentInterfaceOption)=>{
    tsgenInterface(option);
  });

program.parse()

