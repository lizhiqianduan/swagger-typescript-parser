
  /**
   * @desc
   * BatchBO
   */
  export interface BatchBO{
    
    /**
     * 批次管理id
     */
    batchMgntId?: number
  
    /**
     * 学段类型id
     */
    phaseId?: number
  
    /**
     * 学校管理id
     */
    schoolMgntId?: number
  
  }

  /**
   * @desc
   * BatchDetailBO
   */
  export interface BatchDetailBO{
    
    /**
     * 批次列表id
     */
    batchId?: number
  
    /**
     * 批次版本信息id
     */
    batchVersionInfoId?: string
  
  }

  /**
   * @desc
   * BatchDetailVO
   */
  export interface BatchDetailVO{
    
    /**
     * 批次列表id
     */
    batchId?: number
  
    /**
     * 批次管理名称id
     */
    batchNameMgntId?: number
  
    /**
     * 批次管理名称
     */
    batchNameMgntName?: string
  
    /**
     * 批次版本信息id
     */
    batchVersionInfoId?: string
  
    /**
     * 创建时间
     */
    createdAt?: string
  
    /**
     * 创建人
     */
    createdBy?: string
  
    /**
     * 导入名单的文件名
     */
    importFileName?: string
  
    /**
     * 导入名单 url
     */
    importUrl?: string
  
    /**
     * 已摇号次数
     */
    lotteryNum?: number
  
    /**
     * 学段类型id
     */
    phase?: number
  
    /**
     * 学段类型名称
     */
    phaseName?: string
  
    /**
     * 计划招生数
     */
    plannedEnrollmentNum?: number
  
    /**
     * 学校管理id
     */
    schoolNameMgntId?: number
  
    /**
     * 学校管理名称
     */
    schoolNameMgntName?: string
  
    /**
     * 单次摇中人数
     */
    singleWonNum?: number
  
    /**
     * 开启摇号时间
     */
    startLotteryTime?: string
  
    /**
     * 状态(1、导入状态 2、开启摇号状态 3、摇号完成状态)
     */
    status?: number
  
    /**
     * 摇号总人数
     */
    totalNum?: number
  
    /**
     * 摇中人数
     */
    wonNum?: number
  
  }

  /**
   * @desc
   * BatchKidMemberVO
   */
  export interface BatchKidMemberVO{
    
    /**
     * 性别
     */
    gender?: number
  
    /**
     * 性别名称
     */
    genderName?: string
  
    /**
     * 身份证号
     */
    idCardNumber?: string
  
    /**
     * 姓名
     */
    name?: string
  
    /**
     * 预报名号
     */
    preRegistrationNumber?: string
  
    /**
     * 报名学校
     */
    registeredSchool?: string
  
    /**
     * 报名时间
     */
    registrationTime?: string
  
    /**
     * 特殊类型
     */
    specialType?: string
  
  }

  /**
   * @desc
   * BatchMiddleMemberVO
   */
  export interface BatchMiddleMemberVO{
    
    /**
     * 性别
     */
    gender?: number
  
    /**
     * 性别名称
     */
    genderName?: string
  
    /**
     * 身份证
     */
    idCardNumber?: string
  
    /**
     * 姓名
     */
    name?: string
  
    /**
     * 户口所在地
     */
    registeredResidence?: string
  
    /**
     * 报名学校
     */
    registeredSchool?: string
  
  }

  /**
   * @desc
   * BatchNameVO
   */
  export interface BatchNameVO{
    
    /**
     * 批次管理id
     */
    batchMgntId?: number
  
    /**
     * 批次管理名称
     */
    batchMgntName?: string
  
  }

  /**
   * @desc
   * BatchPageVO
   */
  export interface BatchPageVO{
    
    /**
     * 批次列表id
     */
    batchId?: number
  
    /**
     * 批次版本信息id
     */
    batchVersionInfoId?: string
  
    /**
     * 幼儿名单
     */
    kidList?: PageableData_BatchKidMemberVO_
  
    /**
     * 初中名单
     */
    middleList?: PageableData_BatchMiddleMemberVO_
  
    /**
     * 学段类型
     */
    phaseId?: number
  
    /**
     * 小学名单
     */
    primaryList?: PageableData_BatchPrimaryMemberVO_
  
  }

  /**
   * @desc
   * BatchPrimaryMemberVO
   */
  export interface BatchPrimaryMemberVO{
    
    /**
     * 性别
     */
    gender?: number
  
    /**
     * 性别名称
     */
    genderName?: string
  
    /**
     * 身份证
     */
    idCardNumber?: string
  
    /**
     * 姓名
     */
    name?: string
  
    /**
     * 户口所在地
     */
    registeredResidence?: string
  
    /**
     * 报名学校
     */
    registeredSchool?: string
  
  }

  /**
   * @desc
   * BatchVO
   */
  export interface BatchVO{
    
    /**
     * 批次列表id
     */
    batchId?: number
  
    /**
     * 批次管理名称id
     */
    batchNameMgntId?: number
  
    /**
     * 批次管理名称
     */
    batchNameMgntName?: string
  
    /**
     * 批次版本信息id
     */
    batchVersionInfoId?: string
  
    /**
     * 创建时间
     */
    createdAt?: string
  
    /**
     * 创建人
     */
    createdBy?: string
  
    /**
     * 已摇号次数
     */
    lotteryNum?: number
  
    /**
     * 学段类型id
     */
    phase?: number
  
    /**
     * 学段类型名称
     */
    phaseName?: string
  
    /**
     * 计划招生数
     */
    plannedEnrollmentNum?: number
  
    /**
     * 学校管理id
     */
    schoolNameMgntId?: number
  
    /**
     * 学校管理名称
     */
    schoolNameMgntName?: string
  
    /**
     * 单次摇中人数
     */
    singleWonNum?: number
  
    /**
     * 开启摇号时间
     */
    startLotteryTime?: string
  
    /**
     * 状态(1、导入状态 2、开启摇号状态 3、摇号完成状态)
     */
    status?: number
  
    /**
     * 摇号总人数
     */
    totalNum?: number
  
    /**
     * 摇中人数
     */
    wonNum?: number
  
  }

  /**
   * @desc
   * DelBatchBO
   */
  export interface DelBatchBO{
    
    /**
     * undefined
     */
    id?: number
  
  }

  /**
   * @desc
   * DownTemplateBO
   */
  export interface DownTemplateBO{
    
    /**
     * 学段类型id
     */
    phaseId?: number
  
  }

  /**
   * @desc
   * ExportTaskBO
   */
  export interface ExportTaskBO{
    
  }

  /**
   * @desc
   * ExportVO
   */
  export interface ExportVO{
    
    /**
     * 异常提示信息
     */
    msg?: string
  
    /**
     * 导出操作状态：0=导出中、1=导出完成、2=导出失败
     */
    status?: number
  
    /**
     * 下载类操作的URL地址
     */
    url?: string
  
  }

  /**
   * @desc
   * LotteryMemberVO
   */
  export interface LotteryMemberVO{
    
    /**
     * 身份证号
     */
    idCardNumber?: string
  
    /**
     * 姓名
     */
    name?: string
  
  }

  /**
   * @desc
   * LotteryVO
   */
  export interface LotteryVO{
    
    /**
     * 已摇号次数
     */
    lotteryNum?: number
  
    /**
     * 计划招生数
     */
    plannedEnrollmentNum?: number
  
    /**
     * 单次摇中人数
     */
    singleWonNum?: number
  
    /**
     * 总摇号次数
     */
    totalLotteryNum?: number
  
    /**
     * 摇号总人数
     */
    totalNum?: number
  
    /**
     * 摇中人数
     */
    wonNum?: number
  
  }

  /**
   * @desc
   * PageableData«BatchKidMemberVO»
   */
  export interface PageableData_BatchKidMemberVO_{
    
    /**
     * 当前页数
     */
    currentPage?: number
  
    /**
     * 数据
     */
    dataList?: BatchKidMemberVO[]
  
    /**
     * 每页数量
     */
    pageSize?: number
  
    /**
     * 总数
     */
    totalCount?: number
  
    /**
     * 总页数
     */
    totalPage?: number
  
  }

  /**
   * @desc
   * PageableData«BatchMiddleMemberVO»
   */
  export interface PageableData_BatchMiddleMemberVO_{
    
    /**
     * 当前页数
     */
    currentPage?: number
  
    /**
     * 数据
     */
    dataList?: BatchMiddleMemberVO[]
  
    /**
     * 每页数量
     */
    pageSize?: number
  
    /**
     * 总数
     */
    totalCount?: number
  
    /**
     * 总页数
     */
    totalPage?: number
  
  }

  /**
   * @desc
   * PageableData«BatchPrimaryMemberVO»
   */
  export interface PageableData_BatchPrimaryMemberVO_{
    
    /**
     * 当前页数
     */
    currentPage?: number
  
    /**
     * 数据
     */
    dataList?: BatchPrimaryMemberVO[]
  
    /**
     * 每页数量
     */
    pageSize?: number
  
    /**
     * 总数
     */
    totalCount?: number
  
    /**
     * 总页数
     */
    totalPage?: number
  
  }

  /**
   * @desc
   * PageableData«BatchVO»
   */
  export interface PageableData_BatchVO_{
    
    /**
     * 当前页数
     */
    currentPage?: number
  
    /**
     * 数据
     */
    dataList?: BatchVO[]
  
    /**
     * 每页数量
     */
    pageSize?: number
  
    /**
     * 总数
     */
    totalCount?: number
  
    /**
     * 总页数
     */
    totalPage?: number
  
  }

  /**
   * @desc
   * PageableDto
   */
  export interface PageableDto{
    
    /**
     * 当前页码
     */
    page?: number
  
    /**
     * 每页记录数
     */
    size?: number
  
    /**
     * 排序：asc/desc, 默认排序为ORDER By UpdatedAt ASC
     */
    sort?: string
  
    /**
     * 排序字符串数组
     */
    sortProperties?: string
  
  }

  /**
   * @desc
   * PhaseVO
   */
  export interface PhaseVO{
    
    /**
     * 学段id
     */
    phaseId?: number
  
    /**
     * 学段名称
     */
    phaseName?: string
  
  }

  /**
   * @desc
   * PublishMemberBO
   */
  export interface PublishMemberBO{
    
    /**
     * 批次列表id
     */
    batchId?: number
  
  }

  /**
   * @desc
   * PublishMemberVO
   */
  export interface PublishMemberVO{
    
    /**
     * 摇号相关系统信息
     */
    lotteryVO?: LotteryVO
  
    /**
     * 摇中名单
     */
    members?: LotteryMemberVO[]
  
  }

  /**
   * @desc
   * QueryBatchBO
   */
  export interface QueryBatchBO{
    
    /**
     * 批次管理id
     */
    batchMgntId?: number
  
    /**
     * 分页参数
     */
    pageableDto?: PageableDto
  
    /**
     * 学段类型id
     */
    phaseId?: number
  
    /**
     * 学校管理id
     */
    schoolMgntId?: number
  
  }

  /**
   * @desc
   * QueryBatchMgntBO
   */
  export interface QueryBatchMgntBO{
    
  }

  /**
   * @desc
   * QueryMemberBO
   */
  export interface QueryMemberBO{
    
    /**
     * 批次列表id
     */
    batchId?: number
  
    /**
     * 是否查询抽中名单
     */
    isWon?: boolean
  
    /**
     * 分页参数
     */
    pageableDto?: PageableDto
  
  }

  /**
   * @desc
   * QuerySchoolMgntBO
   */
  export interface QuerySchoolMgntBO{
    
  }

  /**
   * @desc
   * SaveOrUpdateBatchBO
   */
  export interface SaveOrUpdateBatchBO{
    
    /**
     * 批次名称
     */
    batchMgntName?: string
  
    /**
     * 批次列表id(用于编辑)
     */
    id?: number
  
    /**
     * 导入名单的文件名
     */
    importFileName?: string
  
    /**
     * 导入名单 url
     */
    importUrl?: string
  
    /**
     * 学段类型id
     */
    phaseId?: number
  
    /**
     * 计划招生数
     */
    plannedEnrollmentNum?: number
  
    /**
     * 单次摇中人数
     */
    singleWonNum?: number
  
    /**
     * 摇中人数
     */
    wonNum?: number
  
  }

  /**
   * @desc
   * SchoolNameVO
   */
  export interface SchoolNameVO{
    
    /**
     * 学校管理id
     */
    schoolMgntId?: number
  
    /**
     * 学校管理名称
     */
    schoolMgntName?: string
  
  }

  /**
   * @desc
   * StartLotteryBO
   */
  export interface StartLotteryBO{
    
    /**
     * 批次列表id
     */
    batchId?: number
  
    /**
     * 批次版本信息id
     */
    batchVersionInfoId?: string
  
  }

  /**
   * @desc
   * ValidFileBO
   */
  export interface ValidFileBO{
    
    /**
     * 附件url
     */
    fileUrl?: string
  
    /**
     * 学段类型
     */
    phaseId?: number
  
  }

  /**
   * @desc
   * ValidInfoVO
   */
  export interface ValidInfoVO{
    
    /**
     * 学校管理名称
     */
    schoolNameMgntName?: string
  
    /**
     * 摇号总人数
     */
    totalNum?: number
  
  }
/**
 * 接口附加参数
 */
export interface ApiExtraConfig{originUrl:string,paramLen:number,paramNamesInPath:string[],paramNamesInQuery:string[]}
/**
 * url path参数拼接
 * @param params 请求的所有参数
 * @param extraConfig 附加信息
 * @returns
 */
function pathReplace(params:any,extraConfig:ApiExtraConfig):string{
  // 校验一下接口
  if(extraConfig.paramLen<extraConfig.paramNamesInPath.length+extraConfig.paramNamesInQuery.length){
    console.log(extraConfig.originUrl+'参数解析出错！')
    return '';
  }

  let url = extraConfig.originUrl;
  // 参数为空时 不拼接
  if(extraConfig.paramNamesInPath.length===0 || extraConfig.paramLen===0) return url;

  // 有一个path参数时
  if(extraConfig.paramNamesInPath.length===1) {
    const name = extraConfig.paramNamesInPath[0];
    if(extraConfig.paramLen===1) return url.replace('{'+name+'}',params);
    if(extraConfig.paramLen>1) return url.replace('{'+name+'}',params[name]);
  }
  // 有多个path参数时
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
 * url query参数拼接
 * @param params 请求的所有参数
 * @param extraConfig 附加信息
 * @returns
 */
function queryReplace(params:any,extraConfig:ApiExtraConfig){
  let url = '?';
  let querys:string[] = [];
  // 参数为空时 不拼接
  if(extraConfig.paramNamesInQuery.length===0 || extraConfig.paramLen===0) return url;

  // 有多个query参数时
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
  console.log('自动生成ts库 =>',reqConfig)
  const _reqConfig = {...reqConfig};
  let url:string = pathReplace(_reqConfig.params,extraConfig!);
  // path参数替换
  url+=queryReplace(_reqConfig.params,extraConfig!);
  queryReplace(_reqConfig.params,extraConfig!);

  return _httpcustomlib({..._reqConfig,url:url}) as ResultType;
};
export const serviceLotterySystem = {
  '/api/batch/del_batch':{post: (reqData:  DelBatchBO):boolean => _httplib<boolean>( {url:'/api/batch/del_batch',method:'post','data':reqData}, {originUrl:'/api/batch/del_batch',paramNamesInPath:[],paramNamesInQuery:[],paramLen:1}) },
  '/api/batch/export_task':{post: (reqData:  ExportTaskBO):string => _httplib<string>( {url:'/api/batch/export_task',method:'post','data':reqData}, {originUrl:'/api/batch/export_task',paramNamesInPath:[],paramNamesInQuery:[],paramLen:1}) },
  '/api/batch/publish_member':{post: (reqData:  PublishMemberBO):PublishMemberVO => _httplib<PublishMemberVO>( {url:'/api/batch/publish_member',method:'post','data':reqData}, {originUrl:'/api/batch/publish_member',paramNamesInPath:[],paramNamesInQuery:[],paramLen:1}) },
  '/api/batch/query_batch':{post: (reqData:  BatchBO):BatchVO => _httplib<BatchVO>( {url:'/api/batch/query_batch',method:'post','data':reqData}, {originUrl:'/api/batch/query_batch',paramNamesInPath:[],paramNamesInQuery:[],paramLen:1}) },
  '/api/batch/query_batch_detail':{post: (reqData:  BatchDetailBO):BatchDetailVO => _httplib<BatchDetailVO>( {url:'/api/batch/query_batch_detail',method:'post','data':reqData}, {originUrl:'/api/batch/query_batch_detail',paramNamesInPath:[],paramNamesInQuery:[],paramLen:1}) },
  '/api/batch/query_batch_list':{post: (reqData:  QueryBatchBO):PageableData_BatchVO_ => _httplib<PageableData_BatchVO_>( {url:'/api/batch/query_batch_list',method:'post','data':reqData}, {originUrl:'/api/batch/query_batch_list',paramNamesInPath:[],paramNamesInQuery:[],paramLen:1}) },
  '/api/batch/query_batch_mgnt':{post: (reqData:  QueryBatchMgntBO):BatchNameVO[] => _httplib<BatchNameVO[]>( {url:'/api/batch/query_batch_mgnt',method:'post','data':reqData}, {originUrl:'/api/batch/query_batch_mgnt',paramNamesInPath:[],paramNamesInQuery:[],paramLen:1}) },
  '/api/batch/query_list':{post: (reqData:  QueryMemberBO):BatchPageVO => _httplib<BatchPageVO>( {url:'/api/batch/query_list',method:'post','data':reqData}, {originUrl:'/api/batch/query_list',paramNamesInPath:[],paramNamesInQuery:[],paramLen:1}) },
  '/api/batch/query_lottery':{post: (reqData:  number):LotteryVO => _httplib<LotteryVO>( {url:'/api/batch/query_lottery',method:'post','data':reqData}, {originUrl:'/api/batch/query_lottery',paramNamesInPath:[],paramNamesInQuery:["batchId"],paramLen:1}) },
  '/api/batch/query_phase': { get: ():PhaseVO[] => _httplib<PhaseVO[]>( {url:'/api/batch/query_phase',method:'get','params':undefined}, {originUrl:'/api/batch/query_phase',paramNamesInPath:[],paramNamesInQuery:[],paramLen:0}) },
  '/api/batch/query_school_mgnt':{post: (reqData:  QuerySchoolMgntBO):SchoolNameVO[] => _httplib<SchoolNameVO[]>( {url:'/api/batch/query_school_mgnt',method:'post','data':reqData}, {originUrl:'/api/batch/query_school_mgnt',paramNamesInPath:[],paramNamesInQuery:[],paramLen:1}) },
  '/api/batch/save_or_update':{post: (reqData:  SaveOrUpdateBatchBO):BatchVO => _httplib<BatchVO>( {url:'/api/batch/save_or_update',method:'post','data':reqData}, {originUrl:'/api/batch/save_or_update',paramNamesInPath:[],paramNamesInQuery:[],paramLen:1}) },
  '/api/batch/start_lottery':{post: (reqData:  StartLotteryBO):boolean => _httplib<boolean>( {url:'/api/batch/start_lottery',method:'post','data':reqData}, {originUrl:'/api/batch/start_lottery',paramNamesInPath:[],paramNamesInQuery:[],paramLen:1}) },
  '/api/batch/task_result':{get: (reqData:  string):ExportVO => _httplib<ExportVO>( {url:'/api/batch/task_result',method:'get','params':reqData}, {originUrl:'/api/batch/task_result',paramNamesInPath:[],paramNamesInQuery:["taskId"],paramLen:1}) },
  '/api/batch/valid_file':{post: (reqData:  ValidFileBO):ValidInfoVO => _httplib<ValidInfoVO>( {url:'/api/batch/valid_file',method:'post','data':reqData}, {originUrl:'/api/batch/valid_file',paramNamesInPath:[],paramNamesInQuery:[],paramLen:1}) },
  '/api/templete/down_template':{post: (reqData:  DownTemplateBO):string => _httplib<string>( {url:'/api/templete/down_template',method:'post','data':reqData}, {originUrl:'/api/templete/down_template',paramNamesInPath:[],paramNamesInQuery:[],paramLen:1}) },
  install:function(httplib:typeof _httplib){ _httpcustomlib=httplib }
  }