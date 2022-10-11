import { tsgen,download, moduleRoot, tsgenLog } from "../src/entry-tsgen";
import path from "path";



async function start(){

    tsgenLog('项目根路径：',moduleRoot());

    // 基于远端http链接
    // tsgen({
    //     remoteUrl:'http://ws.api.test.sxw.cn/bigdata-base/v2/api-docs',
    //     output:'test-tsgen-remote-interface.ts',
    //     serviceName: 'remoteApi'
    // });

    // 基于本地json文件
    tsgen({
        localPath: moduleRoot()+'/test/doc.json',
        output:'test-tsgen-local-interface.ts',
        serviceName: 'localApi'
    })

}


start()