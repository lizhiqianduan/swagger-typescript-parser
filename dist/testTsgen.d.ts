
  /**
   * @desc
   * undefined
   */
  declare interface api接口通用返回{
    
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
  declare interface api接口通用返回_List_子栏目vo__{
    
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
  declare interface api接口通用返回_List_导航栏目vo__{
    
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
  declare interface api接口通用返回_Map_string_object__{
    
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
  declare interface api接口通用返回_分页_文章列表vo__{
    
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
  declare interface api接口通用返回_文章详情vo_{
    
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
  declare interface 分页_文章列表vo_{
    
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
  declare interface 子栏目vo{
    
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
  declare interface 官网首页文章上一篇或下一篇表单{
    
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
  declare interface 导航栏目vo{
    
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
  declare interface 导航栏目文章上一篇或下一篇表单{
    
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
  declare interface 文章列表vo{
    
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
  declare interface 文章列表表单{
    
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
  declare interface 文章详情vo{
    
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
  declare interface 检索文章表单{
    
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