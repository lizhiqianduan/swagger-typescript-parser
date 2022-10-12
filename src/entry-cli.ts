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
  .requiredOption('-f,--filepath <filepath>','swagger的JSON文档路径')
  .requiredOption('-s,--serviceName <serviceName>','service名、文件名')
  .option('-o,--output <output>', '输出的文件目录，默认为当前目录','.')
  .option('-i,--splitInterface', '是否单独输出interface文件')
  .action((option:TsgenOption)=>{
    tsgen(option);
  })

program
  .command('interface')
  .description('自动获取swagger文档中的model，生成interface保存到d.ts文件')
  .requiredOption('-f,--filepath <filepath>','swagger的JSON文档路径')
  .requiredOption('-s,--serviceName <serviceName>','service名、文件名')
  .option('-o,--output <output>', '输出的文件目录，默认为当前目录','.')
  .action((option:TsgentInterfaceOption)=>{
    tsgenInterface(option);
  });

program.parse()

