
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
function _httplib(reqConfig:{url:string,method:string,params:any},extraConfig?:ApiExtraConfig):any{
  console.log('自动生成ts库 =>',reqConfig)
  const _reqConfig = {...reqConfig};
  let url:string = pathReplace(_reqConfig.params,extraConfig!);
  // path参数替换
  url+=queryReplace(_reqConfig.params,extraConfig!);
  queryReplace(_reqConfig.params,extraConfig!);

  _httpcustomlib({..._reqConfig,url:url})
};
let _httpcustomlib:typeof _httplib = (...args:Parameters<typeof _httplib>)=>{};
export const service = {
  '/api/getArticleByCateCode':{post: (reqData:  文章列表表单) => _httplib( {url:'/api/getArticleByCateCode',method:'post','params':reqData}, {originUrl:'/api/getArticleByCateCode',paramNamesInPath:[],paramNamesInQuery:[],paramLen:1}) },
  '/api/getArticleById':{get: (reqData:  string) => _httplib( {url:'/api/getArticleById',method:'get','params':reqData}, {originUrl:'/api/getArticleById',paramNamesInPath:[],paramNamesInQuery:["articleId"],paramLen:1}) },
  '/api/getArticlePageByCateCode':{post: (reqData:  文章列表表单) => _httplib( {url:'/api/getArticlePageByCateCode',method:'post','params':reqData}, {originUrl:'/api/getArticlePageByCateCode',paramNamesInPath:[],paramNamesInQuery:[],paramLen:1}) },
  '/api/getCategoryList': { get: () => _httplib( {url:'/api/getCategoryList',method:'get','params':undefined}, {originUrl:'/api/getCategoryList',paramNamesInPath:[],paramNamesInQuery:[],paramLen:0}) },
  '/api/getCategoryNextArticle':{get: (reqData:  导航栏目文章上一篇或下一篇表单) => _httplib( {url:'/api/getCategoryNextArticle',method:'get','params':reqData}, {originUrl:'/api/getCategoryNextArticle',paramNamesInPath:[],paramNamesInQuery:[],paramLen:1}) },
  '/api/getCategoryPreviousArticle':{post: (reqData:  导航栏目文章上一篇或下一篇表单) => _httplib( {url:'/api/getCategoryPreviousArticle',method:'post','params':reqData}, {originUrl:'/api/getCategoryPreviousArticle',paramNamesInPath:[],paramNamesInQuery:[],paramLen:1}) },
  '/api/getChildCategory':{get: (reqData:  string) => _httplib( {url:'/api/getChildCategory',method:'get','params':reqData}, {originUrl:'/api/getChildCategory',paramNamesInPath:[],paramNamesInQuery:["cateCode"],paramLen:1}) },
  '/api/getHomeIndex': { get: () => _httplib( {url:'/api/getHomeIndex',method:'get','params':undefined}, {originUrl:'/api/getHomeIndex',paramNamesInPath:[],paramNamesInQuery:[],paramLen:0}) },
  '/api/getHomeNextArticle':{get: (reqData:  官网首页文章上一篇或下一篇表单) => _httplib( {url:'/api/getHomeNextArticle',method:'get','params':reqData}, {originUrl:'/api/getHomeNextArticle',paramNamesInPath:[],paramNamesInQuery:[],paramLen:1}) },
  '/api/getHomePreviousArticle':{post: (reqData:  官网首页文章上一篇或下一篇表单) => _httplib( {url:'/api/getHomePreviousArticle',method:'post','params':reqData}, {originUrl:'/api/getHomePreviousArticle',paramNamesInPath:[],paramNamesInQuery:[],paramLen:1}) },
  '/api/getSecondWebsiteByCateCode':{get: (reqData:  string) => _httplib( {url:'/api/getSecondWebsiteByCateCode',method:'get','params':reqData}, {originUrl:'/api/getSecondWebsiteByCateCode',paramNamesInPath:[],paramNamesInQuery:["cateCode"],paramLen:1}) },
  '/api/searchArticleByTitle':{post: (reqData: {form: 检索文章表单,title: string}) => _httplib( {url:'/api/searchArticleByTitle',method:'post','params':reqData}, {originUrl:'/api/searchArticleByTitle',paramNamesInPath:[],paramNamesInQuery:["title"],paramLen:2}) },
  install:function(httplib:typeof _httplib){ _httpcustomlib=httplib }
  }
  /**
   * @desc
   * undefined
   */
  export interface api接口通用返回{
    
    /**
     * 返回码
     */
    code?: number
  
    /**
     * 返回数据
     */
    data?: object
  
    /**
     * 返回内容
     */
    msg?: string
  
  }

  /**
   * @desc
   * undefined
   */
  export interface api接口通用返回_List_子栏目vo__{
    
    /**
     * 返回码
     */
    code?: number
  
    /**
     * 返回数据
     */
    data?: any[]
  
    /**
     * 返回内容
     */
    msg?: string
  
  }

  /**
   * @desc
   * undefined
   */
  export interface api接口通用返回_List_导航栏目vo__{
    
    /**
     * 返回码
     */
    code?: number
  
    /**
     * 返回数据
     */
    data?: any[]
  
    /**
     * 返回内容
     */
    msg?: string
  
  }

  /**
   * @desc
   * undefined
   */
  export interface api接口通用返回_Map_string_object__{
    
    /**
     * 返回码
     */
    code?: number
  
    /**
     * 返回数据
     */
    data?: object
  
    /**
     * 返回内容
     */
    msg?: string
  
  }

  /**
   * @desc
   * undefined
   */
  export interface api接口通用返回_分页_文章列表vo__{
    
    /**
     * 返回码
     */
    code?: number
  
    /**
     * 返回数据
     */
    data?: undefined
  
    /**
     * 返回内容
     */
    msg?: string
  
  }

  /**
   * @desc
   * undefined
   */
  export interface api接口通用返回_文章详情vo_{
    
    /**
     * 返回码
     */
    code?: number
  
    /**
     * 返回数据
     */
    data?: undefined
  
    /**
     * 返回内容
     */
    msg?: string
  
  }

  /**
   * @desc
   * undefined
   */
  export interface 分页_文章列表vo_{
    
    /**
     * 当前页数
     */
    currPage?: number
  
    /**
     * 列表数据
     */
    list?: any[]
  
    /**
     * 每页记录数
     */
    pageSize?: number
  
    /**
     * 总记录数
     */
    totalCount?: number
  
    /**
     * 总页数
     */
    totalPage?: number
  
  }

  /**
   * @desc
   * undefined
   */
  export interface 子栏目vo{
    
    /**
     * 栏目code
     */
    cateCode?: string
  
    /**
     * 栏目背景图
     */
    cateImg?: string
  
    /**
     * 栏目名称
     */
    cateName?: string
  
    /**
     * 栏目上级code
     */
    catePcode?: string
  
    /**
     * 内容类型：1新闻详情，2新闻列表，3图文列表，4子网站
     */
    contentType?: number
  
  }

  /**
   * @desc
   * undefined
   */
  export interface 官网首页文章上一篇或下一篇表单{
    
    /**
     * 文章类型：1新闻动态、2通知公告、3职教动态、4校务公开、5教育教学、6校园风景、7学生活动
     */
    artType?: number
  
    /**
     * 文章主键Id
     */
    articleId?: number
  
  }

  /**
   * @desc
   * undefined
   */
  export interface 导航栏目vo{
    
    /**
     * 栏目code
     */
    cateCode?: string
  
    /**
     * 栏目背景图
     */
    cateImg?: string
  
    /**
     * 栏目名称
     */
    cateName?: string
  
    /**
     * 栏目上级code
     */
    catePcode?: string
  
    /**
     * 子栏目集合
     */
    childs?: any[]
  
    /**
     * 内容类型：1新闻详情，2新闻列表，3图文列表，4子网站
     */
    contentType?: number
  
    /**
     * 栏目主键Id
     */
    id?: number
  
    /**
     * 是否存在子集：true存在，false不存在
     */
    ifChilds?: boolean
  
  }

  /**
   * @desc
   * undefined
   */
  export interface 导航栏目文章上一篇或下一篇表单{
    
    /**
     * 文章主键Id
     */
    articleId?: number
  
    /**
     * 栏目code
     */
    cateCode?: string
  
  }

  /**
   * @desc
   * undefined
   */
  export interface 文章列表vo{
    
    /**
     * 图片地址
     */
    artImg?: string
  
    /**
     * 文章标题
     */
    artTitle?: string
  
    /**
     * 栏目code
     */
    cateCode?: string
  
    /**
     * 栏目名称
     */
    cateName?: string
  
    /**
     * 主键Id
     */
    id?: number
  
    /**
     * 发布时间
     */
    pubTime?: string
  
  }

  /**
   * @desc
   * undefined
   */
  export interface 文章列表表单{
    
    /**
     * 栏目code
     */
    cateCode?: string
  
    /**
     * 每页大小
     */
    limit?: number
  
    /**
     * 页码
     */
    page?: number
  
  }

  /**
   * @desc
   * undefined
   */
  export interface 文章详情vo{
    
    /**
     * 文章内容
     */
    artContent?: string
  
    /**
     * 图片地址
     */
    artImg?: string
  
    /**
     * 文章标题
     */
    artTitle?: string
  
    /**
     * 文章作者
     */
    author?: string
  
    /**
     * 栏目code
     */
    cateCode?: string
  
    /**
     * 栏目名称
     */
    cateName?: string
  
    /**
     * 主键Id
     */
    id?: number
  
    /**
     * 发布时间
     */
    pubTime?: string
  
  }

  /**
   * @desc
   * undefined
   */
  export interface 检索文章表单{
    
    /**
     * 每页大小
     */
    limit?: number
  
    /**
     * 页码
     */
    page?: number
  
    /**
     * 搜索关键字
     */
    searchParam?: string
  
  }