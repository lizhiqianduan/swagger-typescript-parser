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
  .option('--localPath <docpath>','文档的本地路径')
  .option('--remoteUrl <docpath>','文档的远端路径')
  .option('--remoteUrl <serviceName>','生成文件export的名称')
  .option('--output <filename>', '输出的文件名，默认为interface.ts','interface.ts')
  .parse();

const option = (commandParse.opts<TsgenOption>())

tsgen(option);