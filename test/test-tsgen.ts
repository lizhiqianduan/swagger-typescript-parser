import { tsgen,download, moduleRoot, tsgenLog, tsgenInterface } from "../src/entry-tsgen";
import path from "path";



async function start(){

    tsgenLog('项目根路径：',moduleRoot());

    // 基于远端http链接
    // tsgen({
    //     filepath:'http://ws.api.test.sxw.cn/bigdata-base/v2/api-docs',
    //     output:'test-tsgen-remote-interface.ts',
    //     serviceName: 'remoteService'
    // });

    // 基于本地json文件
    tsgen({
        filepath: moduleRoot()+'/test/doc.json',
        serviceName: 'split',
        output:moduleRoot()+'/dist',
        splitInterface:true
    })

}


start()