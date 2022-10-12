#!/usr/bin/env node
import { program } from "commander";
import { moduleRoot, tsgen, TsgenOption } from "./entry-tsgen";
program
  .name('tsgen')
  .description('CLI to swagger-typescript-parser')
  .version('1.0');

const commandParse = program
  .command('parse')
  .description('将swagger接口转换为ts的interface和API')
  .option('--filepath <filepath>','swagger json文档的路径')
  .option('--serviceName <serviceName>','生成文件export的名称以及文件名称')
  .option('--output <dirpath>', '输出的文件名，默认为当前目录','.')
  .parse();

const option = (commandParse.opts<TsgenOption>())

tsgen(option);