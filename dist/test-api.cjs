"use strict";

// dist/testTsgen.ts
function pathReplace(params, extraConfig) {
  if (extraConfig.paramLen < extraConfig.paramNamesInPath.length + extraConfig.paramNamesInQuery.length) {
    console.log(extraConfig.originUrl + "\u53C2\u6570\u89E3\u6790\u51FA\u9519\uFF01");
    return "";
  }
  let url = extraConfig.originUrl;
  if (extraConfig.paramNamesInPath.length === 0 || extraConfig.paramLen === 0)
    return url;
  if (extraConfig.paramNamesInPath.length === 1) {
    const name = extraConfig.paramNamesInPath[0];
    if (extraConfig.paramLen === 1)
      return url.replace("{" + name + "}", params);
    if (extraConfig.paramLen > 1)
      return url.replace("{" + name + "}", params[name]);
  }
  if (extraConfig.paramNamesInPath.length > 1) {
    for (let index = 0; index < extraConfig.paramNamesInPath.length; index++) {
      const name = extraConfig.paramNamesInPath[index];
      url = url.replace("{" + name + "}", paramArrDeal(params[name]));
    }
    return url;
  }
  return "";
}
function queryReplace(params, extraConfig) {
  let url = "?";
  let querys = [];
  if (extraConfig.paramNamesInQuery.length === 0 || extraConfig.paramLen === 0)
    return url;
  if (extraConfig.paramNamesInQuery.length >= 1) {
    for (let index = 0; index < extraConfig.paramNamesInQuery.length; index++) {
      const name = extraConfig.paramNamesInQuery[index];
      querys.push(name + "=" + params[name]);
    }
  }
  return url + querys.join("&");
}
function paramArrDeal(params) {
  if (Object.prototype.toString.call(params).toLowerCase() === "[object array]") {
    return params.join(",");
  } else {
    return params;
  }
}
function _httplib(reqConfig, extraConfig) {
  console.log("\u81EA\u52A8\u751F\u6210ts\u5E93 =>", reqConfig);
  const _reqConfig = { ...reqConfig };
  let url = pathReplace(_reqConfig.params, extraConfig);
  url += queryReplace(_reqConfig.params, extraConfig);
  queryReplace(_reqConfig.params, extraConfig);
  _httpcustomlib({ ..._reqConfig, url }, extraConfig);
}
var _httpcustomlib = (...args) => {
};
var testTsgen = {
  "/api/app_manage/add_app": { post: (reqData) => _httplib({ url: "/api/app_manage/add_app", method: "post", "params": reqData }, { originUrl: "/api/app_manage/add_app", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/app_manage/add_app_group": { post: (reqData) => _httplib({ url: "/api/app_manage/add_app_group", method: "post", "params": reqData }, { originUrl: "/api/app_manage/add_app_group", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/app_manage/del_app": { post: (reqData) => _httplib({ url: "/api/app_manage/del_app", method: "post", "params": reqData }, { originUrl: "/api/app_manage/del_app", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/app_manage/del_app_group/{appGroupId}": { post: (reqData) => _httplib({ url: "/api/app_manage/del_app_group/{appGroupId}", method: "post", "params": reqData }, { originUrl: "/api/app_manage/del_app_group/{appGroupId}", paramNamesInPath: ["appGroupId"], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/app_manage/query_app": { post: (reqData) => _httplib({ url: "/api/app_manage/query_app", method: "post", "params": reqData }, { originUrl: "/api/app_manage/query_app", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/app_manage/query_app_detail/{openAppId}": { get: (reqData) => _httplib({ url: "/api/app_manage/query_app_detail/{openAppId}", method: "get", "params": reqData }, { originUrl: "/api/app_manage/query_app_detail/{openAppId}", paramNamesInPath: ["openAppId"], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/app_manage/query_app_group_box": { get: () => _httplib({ url: "/api/app_manage/query_app_group_box", method: "get", "params": void 0 }, { originUrl: "/api/app_manage/query_app_group_box", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 0 }) },
  "/api/app_manage/query_app_org_relation": { post: (reqData) => _httplib({ url: "/api/app_manage/query_app_org_relation", method: "post", "params": reqData }, { originUrl: "/api/app_manage/query_app_org_relation", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/app_manage/query_app_range_detail_box/{currentUserOrgId}": { get: (reqData) => _httplib({ url: "/api/app_manage/query_app_range_detail_box/{currentUserOrgId}", method: "get", "params": reqData }, { originUrl: "/api/app_manage/query_app_range_detail_box/{currentUserOrgId}", paramNamesInPath: ["currentUserOrgId"], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/app_manage/query_app_type_box": { get: () => _httplib({ url: "/api/app_manage/query_app_type_box", method: "get", "params": void 0 }, { originUrl: "/api/app_manage/query_app_type_box", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 0 }) },
  "/api/app_manage/query_home_user_app/{currentUserOrgId}": { get: (reqData) => _httplib({ url: "/api/app_manage/query_home_user_app/{currentUserOrgId}", method: "get", "params": reqData }, { originUrl: "/api/app_manage/query_home_user_app/{currentUserOrgId}", paramNamesInPath: ["currentUserOrgId"], paramNamesInQuery: ["appTypes", "userType"], paramLen: 3 }) },
  "/api/app_manage/query_user_app/{currentUserOrgId}/{appRangeType}": { get: (reqData) => _httplib({ url: "/api/app_manage/query_user_app/{currentUserOrgId}/{appRangeType}", method: "get", "params": reqData }, { originUrl: "/api/app_manage/query_user_app/{currentUserOrgId}/{appRangeType}", paramNamesInPath: ["appRangeType", "currentUserOrgId"], paramNamesInQuery: [], paramLen: 2 }) },
  "/api/app_manage/query_user_app_org_info": { post: (reqData) => _httplib({ url: "/api/app_manage/query_user_app_org_info", method: "post", "params": reqData }, { originUrl: "/api/app_manage/query_user_app_org_info", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/app_manage/save_app_org_relation": { post: (reqData) => _httplib({ url: "/api/app_manage/save_app_org_relation", method: "post", "params": reqData }, { originUrl: "/api/app_manage/save_app_org_relation", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/app_manage/set_up_app_group_seq": { post: (reqData) => _httplib({ url: "/api/app_manage/set_up_app_group_seq", method: "post", "params": reqData }, { originUrl: "/api/app_manage/set_up_app_group_seq", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/app_manage/set_up_app_seq": { post: (reqData) => _httplib({ url: "/api/app_manage/set_up_app_seq", method: "post", "params": reqData }, { originUrl: "/api/app_manage/set_up_app_seq", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/app_manage/update_app": { post: (reqData) => _httplib({ url: "/api/app_manage/update_app", method: "post", "params": reqData }, { originUrl: "/api/app_manage/update_app", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/app_manage/update_app_status": { post: (reqData) => _httplib({ url: "/api/app_manage/update_app_status", method: "post", "params": reqData }, { originUrl: "/api/app_manage/update_app_status", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/auth_manager/add_app": { post: (reqData) => _httplib({ url: "/api/auth_manager/add_app", method: "post", "params": reqData }, { originUrl: "/api/auth_manager/add_app", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/auth_manager/add_role": { post: (reqData) => _httplib({ url: "/api/auth_manager/add_role", method: "post", "params": reqData }, { originUrl: "/api/auth_manager/add_role", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/auth_manager/add_user": { post: (reqData) => _httplib({ url: "/api/auth_manager/add_user", method: "post", "params": reqData }, { originUrl: "/api/auth_manager/add_user", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/auth_manager/delete_role": { post: (reqData) => _httplib({ url: "/api/auth_manager/delete_role", method: "post", "params": reqData }, { originUrl: "/api/auth_manager/delete_role", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/auth_manager/delete_user": { post: (reqData) => _httplib({ url: "/api/auth_manager/delete_user", method: "post", "params": reqData }, { originUrl: "/api/auth_manager/delete_user", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/auth_manager/get_app": { get: (reqData) => _httplib({ url: "/api/auth_manager/get_app", method: "get", "params": reqData }, { originUrl: "/api/auth_manager/get_app", paramNamesInPath: [], paramNamesInQuery: ["roleId"], paramLen: 1 }) },
  "/api/auth_manager/get_role": { get: (reqData) => _httplib({ url: "/api/auth_manager/get_role", method: "get", "params": reqData }, { originUrl: "/api/auth_manager/get_role", paramNamesInPath: [], paramNamesInQuery: ["id"], paramLen: 1 }) },
  "/api/auth_manager/get_role_list": { get: (reqData) => _httplib({ url: "/api/auth_manager/get_role_list", method: "get", "params": reqData }, { originUrl: "/api/auth_manager/get_role_list", paramNamesInPath: [], paramNamesInQuery: ["appRangeType", "orgId"], paramLen: 2 }) },
  "/api/auth_manager/get_role_org_tree/{currentUserOrgId}": { get: (reqData) => _httplib({ url: "/api/auth_manager/get_role_org_tree/{currentUserOrgId}", method: "get", "params": reqData }, { originUrl: "/api/auth_manager/get_role_org_tree/{currentUserOrgId}", paramNamesInPath: ["currentUserOrgId"], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/auth_manager/get_role_org_user": { post: (reqData) => _httplib({ url: "/api/auth_manager/get_role_org_user", method: "post", "params": reqData }, { originUrl: "/api/auth_manager/get_role_org_user", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/auth_manager/get_user": { post: (reqData) => _httplib({ url: "/api/auth_manager/get_user", method: "post", "params": reqData }, { originUrl: "/api/auth_manager/get_user", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/auth_manager/seq_role": { post: (reqData) => _httplib({ url: "/api/auth_manager/seq_role", method: "post", "params": reqData }, { originUrl: "/api/auth_manager/seq_role", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/auth_manager/update_role": { post: (reqData) => _httplib({ url: "/api/auth_manager/update_role", method: "post", "params": reqData }, { originUrl: "/api/auth_manager/update_role", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/class/list_grade_class": { post: (reqData) => _httplib({ url: "/api/class/list_grade_class", method: "post", "params": reqData }, { originUrl: "/api/class/list_grade_class", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/dictionary/list_dict": { get: (reqData) => _httplib({ url: "/api/dictionary/list_dict", method: "get", "params": reqData }, { originUrl: "/api/dictionary/list_dict", paramNamesInPath: [], paramNamesInQuery: ["type"], paramLen: 1 }) },
  "/api/dictionary/list_office_holding_dict/{orgId}": { get: (reqData) => _httplib({ url: "/api/dictionary/list_office_holding_dict/{orgId}", method: "get", "params": reqData }, { originUrl: "/api/dictionary/list_office_holding_dict/{orgId}", paramNamesInPath: ["orgId"], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/export_excel/export_base_data": { post: (reqData) => _httplib({ url: "/api/export_excel/export_base_data", method: "post", "params": reqData }, { originUrl: "/api/export_excel/export_base_data", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/export_excel/export_class_list": { post: (reqData) => _httplib({ url: "/api/export_excel/export_class_list", method: "post", "params": reqData }, { originUrl: "/api/export_excel/export_class_list", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/export_excel/export_graduate_student": { post: (reqData) => _httplib({ url: "/api/export_excel/export_graduate_student", method: "post", "params": reqData }, { originUrl: "/api/export_excel/export_graduate_student", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/export_excel/export_school_list": { post: (reqData) => _httplib({ url: "/api/export_excel/export_school_list", method: "post", "params": reqData }, { originUrl: "/api/export_excel/export_school_list", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/export_excel/export_student_trace": { post: (reqData) => _httplib({ url: "/api/export_excel/export_student_trace", method: "post", "params": reqData }, { originUrl: "/api/export_excel/export_student_trace", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/export_excel/export_wx_statistics": { post: (reqData) => _httplib({ url: "/api/export_excel/export_wx_statistics", method: "post", "params": reqData }, { originUrl: "/api/export_excel/export_wx_statistics", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/export_excel/export_wx_template": { post: (reqData) => _httplib({ url: "/api/export_excel/export_wx_template", method: "post", "params": reqData }, { originUrl: "/api/export_excel/export_wx_template", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/export_excel/get_sign": { post: (reqData) => _httplib({ url: "/api/export_excel/get_sign", method: "post", "params": reqData }, { originUrl: "/api/export_excel/get_sign", paramNamesInPath: [], paramNamesInQuery: ["name"], paramLen: 1 }) },
  "/api/export_excel/task_result": { get: (reqData) => _httplib({ url: "/api/export_excel/task_result", method: "get", "params": reqData }, { originUrl: "/api/export_excel/task_result", paramNamesInPath: [], paramNamesInQuery: ["taskId"], paramLen: 1 }) },
  "/api/grade/list_school_grade": { post: (reqData) => _httplib({ url: "/api/grade/list_school_grade", method: "post", "params": reqData }, { originUrl: "/api/grade/list_school_grade", paramNamesInPath: [], paramNamesInQuery: ["schoolId"], paramLen: 1 }) },
  "/api/graduate_config/edit_graduate": { post: (reqData) => _httplib({ url: "/api/graduate_config/edit_graduate", method: "post", "params": reqData }, { originUrl: "/api/graduate_config/edit_graduate", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/graduate_config/graduate_detail": { post: (reqData) => _httplib({ url: "/api/graduate_config/graduate_detail", method: "post", "params": reqData }, { originUrl: "/api/graduate_config/graduate_detail", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/message/select_user_message": { post: (reqData) => _httplib({ url: "/api/message/select_user_message", method: "post", "params": reqData }, { originUrl: "/api/message/select_user_message", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/oa_message/query/official_message_push": { post: (reqData) => _httplib({ url: "/api/oa_message/query/official_message_push", method: "post", "params": reqData }, { originUrl: "/api/oa_message/query/official_message_push", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/open_app_info/authorize": { get: (reqData) => _httplib({ url: "/api/open_app_info/authorize", method: "get", "params": reqData }, { originUrl: "/api/open_app_info/authorize", paramNamesInPath: [], paramNamesInQuery: ["appId"], paramLen: 1 }) },
  "/api/org/add_org": { post: (reqData) => _httplib({ url: "/api/org/add_org", method: "post", "params": reqData }, { originUrl: "/api/org/add_org", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/org/address_book": { post: () => _httplib({ url: "/api/org/address_book", method: "post", "params": void 0 }, { originUrl: "/api/org/address_book", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 0 }) },
  "/api/org/address_book_list": { post: (reqData) => _httplib({ url: "/api/org/address_book_list", method: "post", "params": reqData }, { originUrl: "/api/org/address_book_list", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/org/address_book_search": { post: (reqData) => _httplib({ url: "/api/org/address_book_search", method: "post", "params": reqData }, { originUrl: "/api/org/address_book_search", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/org/admin_list": { post: (reqData) => _httplib({ url: "/api/org/admin_list", method: "post", "params": reqData }, { originUrl: "/api/org/admin_list", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/org/batch_remove": { post: (reqData) => _httplib({ url: "/api/org/batch_remove", method: "post", "params": reqData }, { originUrl: "/api/org/batch_remove", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/org/bind_user": { post: (reqData) => _httplib({ url: "/api/org/bind_user", method: "post", "params": reqData }, { originUrl: "/api/org/bind_user", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/org/delete_org": { post: (reqData) => _httplib({ url: "/api/org/delete_org", method: "post", "params": reqData }, { originUrl: "/api/org/delete_org", paramNamesInPath: [], paramNamesInQuery: ["id"], paramLen: 1 }) },
  "/api/org/get_org_tree/{currentUserOrgId}": { get: (reqData) => _httplib({ url: "/api/org/get_org_tree/{currentUserOrgId}", method: "get", "params": reqData }, { originUrl: "/api/org/get_org_tree/{currentUserOrgId}", paramNamesInPath: ["currentUserOrgId"], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/org/get_org_user_holding/{org_user_id}": { post: (reqData) => _httplib({ url: "/api/org/get_org_user_holding/{org_user_id}", method: "post", "params": reqData }, { originUrl: "/api/org/get_org_user_holding/{org_user_id}", paramNamesInPath: ["org_user_id"], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/org/get_tree": { post: (reqData) => _httplib({ url: "/api/org/get_tree", method: "post", "params": reqData }, { originUrl: "/api/org/get_tree", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/org/import_org_user": { post: (reqData) => _httplib({ url: "/api/org/import_org_user", method: "post", "params": reqData }, { originUrl: "/api/org/import_org_user", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/org/import_school": { post: (reqData) => _httplib({ url: "/api/org/import_school", method: "post", "params": reqData }, { originUrl: "/api/org/import_school", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/org/org_info": { post: (reqData) => _httplib({ url: "/api/org/org_info", method: "post", "params": reqData }, { originUrl: "/api/org/org_info", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/org/org_tree_all_school": { post: (reqData) => _httplib({ url: "/api/org/org_tree_all_school", method: "post", "params": reqData }, { originUrl: "/api/org/org_tree_all_school", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/org/org_user_change": { post: (reqData) => _httplib({ url: "/api/org/org_user_change", method: "post", "params": reqData }, { originUrl: "/api/org/org_user_change", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/org/org_user_change_tree": { post: (reqData) => _httplib({ url: "/api/org/org_user_change_tree", method: "post", "params": reqData }, { originUrl: "/api/org/org_user_change_tree", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/org/org_user_list": { post: (reqData) => _httplib({ url: "/api/org/org_user_list", method: "post", "params": reqData }, { originUrl: "/api/org/org_user_list", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/org/save_org_user_holding": { post: (reqData) => _httplib({ url: "/api/org/save_org_user_holding", method: "post", "params": reqData }, { originUrl: "/api/org/save_org_user_holding", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/org/sort": { post: (reqData) => _httplib({ url: "/api/org/sort", method: "post", "params": reqData }, { originUrl: "/api/org/sort", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/org_graduate/get_tree": { post: (reqData) => _httplib({ url: "/api/org_graduate/get_tree", method: "post", "params": reqData }, { originUrl: "/api/org_graduate/get_tree", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/org_graduate/graduate_org_user_change": { post: (reqData) => _httplib({ url: "/api/org_graduate/graduate_org_user_change", method: "post", "params": reqData }, { originUrl: "/api/org_graduate/graduate_org_user_change", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/org_graduate/org_user_list": { post: (reqData) => _httplib({ url: "/api/org_graduate/org_user_list", method: "post", "params": reqData }, { originUrl: "/api/org_graduate/org_user_list", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/org_graduate/set_county_graduate": { post: (reqData) => _httplib({ url: "/api/org_graduate/set_county_graduate", method: "post", "params": reqData }, { originUrl: "/api/org_graduate/set_county_graduate", paramNamesInPath: [], paramNamesInQuery: ["graduate_date"], paramLen: 1 }) },
  "/api/org_graduate/user_graduate_trace": { post: (reqData) => _httplib({ url: "/api/org_graduate/user_graduate_trace", method: "post", "params": reqData }, { originUrl: "/api/org_graduate/user_graduate_trace", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/platform_config/edit_platform": { post: (reqData) => _httplib({ url: "/api/platform_config/edit_platform", method: "post", "params": reqData }, { originUrl: "/api/platform_config/edit_platform", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/platform_config/platform_detail": { post: (reqData) => _httplib({ url: "/api/platform_config/platform_detail", method: "post", "params": reqData }, { originUrl: "/api/platform_config/platform_detail", paramNamesInPath: [], paramNamesInQuery: ["tenantId"], paramLen: 1 }) },
  "/api/region/list_region": { post: (reqData) => _httplib({ url: "/api/region/list_region", method: "post", "params": reqData }, { originUrl: "/api/region/list_region", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/school/get_school": { post: (reqData) => _httplib({ url: "/api/school/get_school", method: "post", "params": reqData }, { originUrl: "/api/school/get_school", paramNamesInPath: [], paramNamesInQuery: ["schoolId"], paramLen: 1 }) },
  "/api/school/get_school_org": { post: (reqData) => _httplib({ url: "/api/school/get_school_org", method: "post", "params": reqData }, { originUrl: "/api/school/get_school_org", paramNamesInPath: [], paramNamesInQuery: ["schoolId"], paramLen: 1 }) },
  "/api/school/get_school_outreach_info": { get: (reqData) => _httplib({ url: "/api/school/get_school_outreach_info", method: "get", "params": reqData }, { originUrl: "/api/school/get_school_outreach_info", paramNamesInPath: [], paramNamesInQuery: ["schoolId"], paramLen: 1 }) },
  "/api/school/list_school": { post: (reqData) => _httplib({ url: "/api/school/list_school", method: "post", "params": reqData }, { originUrl: "/api/school/list_school", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/school/update_school": { post: (reqData) => _httplib({ url: "/api/school/update_school", method: "post", "params": reqData }, { originUrl: "/api/school/update_school", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/school/update_school_outreach_info": { post: (reqData) => _httplib({ url: "/api/school/update_school_outreach_info", method: "post", "params": reqData }, { originUrl: "/api/school/update_school_outreach_info", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/student/edit_student": { post: (reqData) => _httplib({ url: "/api/student/edit_student", method: "post", "params": reqData }, { originUrl: "/api/student/edit_student", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/student/student_detail": { get: (reqData) => _httplib({ url: "/api/student/student_detail", method: "get", "params": reqData }, { originUrl: "/api/student/student_detail", paramNamesInPath: [], paramNamesInQuery: ["userId"], paramLen: 1 }) },
  "/api/teacher/edit_teacher": { post: (reqData) => _httplib({ url: "/api/teacher/edit_teacher", method: "post", "params": reqData }, { originUrl: "/api/teacher/edit_teacher", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/teacher/teacher_detail": { get: (reqData) => _httplib({ url: "/api/teacher/teacher_detail", method: "get", "params": reqData }, { originUrl: "/api/teacher/teacher_detail", paramNamesInPath: [], paramNamesInQuery: ["userId"], paramLen: 1 }) },
  "/api/user/accountInfo": { get: (reqData) => _httplib({ url: "/api/user/accountInfo", method: "get", "params": reqData }, { originUrl: "/api/user/accountInfo", paramNamesInPath: [], paramNamesInQuery: ["userId", "userType"], paramLen: 2 }) },
  "/api/user/basic_info_list": { post: (reqData) => _httplib({ url: "/api/user/basic_info_list", method: "post", "params": reqData }, { originUrl: "/api/user/basic_info_list", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/user/batch_disable": { post: (reqData) => _httplib({ url: "/api/user/batch_disable", method: "post", "params": reqData }, { originUrl: "/api/user/batch_disable", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/user/batch_enable": { post: (reqData) => _httplib({ url: "/api/user/batch_enable", method: "post", "params": reqData }, { originUrl: "/api/user/batch_enable", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/user/change_state": { get: (reqData) => _httplib({ url: "/api/user/change_state", method: "get", "params": reqData }, { originUrl: "/api/user/change_state", paramNamesInPath: [], paramNamesInQuery: ["opType", "userId"], paramLen: 2 }) },
  "/api/user/delete_basic_info": { post: (reqData) => _httplib({ url: "/api/user/delete_basic_info", method: "post", "params": reqData }, { originUrl: "/api/user/delete_basic_info", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/user/export_basic_info": { post: (reqData) => _httplib({ url: "/api/user/export_basic_info", method: "post", "params": reqData }, { originUrl: "/api/user/export_basic_info", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/user/get_template": { get: (reqData) => _httplib({ url: "/api/user/get_template", method: "get", "params": reqData }, { originUrl: "/api/user/get_template", paramNamesInPath: [], paramNamesInQuery: ["userType"], paramLen: 1 }) },
  "/api/user/get_user_info": { get: () => _httplib({ url: "/api/user/get_user_info", method: "get", "params": void 0 }, { originUrl: "/api/user/get_user_info", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 0 }) },
  "/api/user/import_basic_info": { post: (reqData) => _httplib({ url: "/api/user/import_basic_info", method: "post", "params": reqData }, { originUrl: "/api/user/import_basic_info", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/user/import_school_student": { post: (reqData) => _httplib({ url: "/api/user/import_school_student", method: "post", "params": reqData }, { originUrl: "/api/user/import_school_student", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/user/login": { post: (reqData) => _httplib({ url: "/api/user/login", method: "post", "params": reqData }, { originUrl: "/api/user/login", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/user/logout": { get: (reqData) => _httplib({ url: "/api/user/logout", method: "get", "params": reqData }, { originUrl: "/api/user/logout", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/user/reset_password": { get: (reqData) => _httplib({ url: "/api/user/reset_password", method: "get", "params": reqData }, { originUrl: "/api/user/reset_password", paramNamesInPath: [], paramNamesInQuery: ["accountId"], paramLen: 1 }) },
  "/api/user/save_school_student": { post: (reqData) => _httplib({ url: "/api/user/save_school_student", method: "post", "params": reqData }, { originUrl: "/api/user/save_school_student", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/user/v2/get_user_info": { get: () => _httplib({ url: "/api/user/v2/get_user_info", method: "get", "params": void 0 }, { originUrl: "/api/user/v2/get_user_info", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 0 }) },
  "/api/user/verify": { post: (reqData) => _httplib({ url: "/api/user/verify", method: "post", "params": reqData }, { originUrl: "/api/user/verify", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/user_current_org/save_user_org": { post: (reqData) => _httplib({ url: "/api/user_current_org/save_user_org", method: "post", "params": reqData }, { originUrl: "/api/user_current_org/save_user_org", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/user_relation/authorize": { post: (reqData) => _httplib({ url: "/api/user_relation/authorize", method: "post", "params": reqData }, { originUrl: "/api/user_relation/authorize", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/user_relation/authorize_yace": { post: (reqData) => _httplib({ url: "/api/user_relation/authorize_yace", method: "post", "params": reqData }, { originUrl: "/api/user_relation/authorize_yace", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/user_relation/bind": { post: (reqData) => _httplib({ url: "/api/user_relation/bind", method: "post", "params": reqData }, { originUrl: "/api/user_relation/bind", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/user_relation/change_student": { post: (reqData) => _httplib({ url: "/api/user_relation/change_student", method: "post", "params": reqData }, { originUrl: "/api/user_relation/change_student", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/user_relation/get_bind_student": { post: (reqData) => _httplib({ url: "/api/user_relation/get_bind_student", method: "post", "params": reqData }, { originUrl: "/api/user_relation/get_bind_student", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/user_relation/query_agreement": { post: (reqData) => _httplib({ url: "/api/user_relation/query_agreement", method: "post", "params": reqData }, { originUrl: "/api/user_relation/query_agreement", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/user_relation/send_auth_code": { post: (reqData) => _httplib({ url: "/api/user_relation/send_auth_code", method: "post", "params": reqData }, { originUrl: "/api/user_relation/send_auth_code", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/user_relation/set_agreement": { post: (reqData) => _httplib({ url: "/api/user_relation/set_agreement", method: "post", "params": reqData }, { originUrl: "/api/user_relation/set_agreement", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/user_relation/unbind": { post: (reqData) => _httplib({ url: "/api/user_relation/unbind", method: "post", "params": reqData }, { originUrl: "/api/user_relation/unbind", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/user_relation/v2/get_bind_student": { post: (reqData) => _httplib({ url: "/api/user_relation/v2/get_bind_student", method: "post", "params": reqData }, { originUrl: "/api/user_relation/v2/get_bind_student", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/user_relation/verify_student": { post: (reqData) => _httplib({ url: "/api/user_relation/verify_student", method: "post", "params": reqData }, { originUrl: "/api/user_relation/verify_student", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/user_relation/verify_teacher": { get: (reqData) => _httplib({ url: "/api/user_relation/verify_teacher", method: "get", "params": reqData }, { originUrl: "/api/user_relation/verify_teacher", paramNamesInPath: [], paramNamesInQuery: ["phoneNumber"], paramLen: 1 }) },
  "/api/wx_statistics/page_list": { post: (reqData) => _httplib({ url: "/api/wx_statistics/page_list", method: "post", "params": reqData }, { originUrl: "/api/wx_statistics/page_list", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/wx_statistics/query_bind_list/{userId}": { get: (reqData) => _httplib({ url: "/api/wx_statistics/query_bind_list/{userId}", method: "get", "params": reqData }, { originUrl: "/api/wx_statistics/query_bind_list/{userId}", paramNamesInPath: ["userId"], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/wx_statistics/query_station/{currentUserOrgId}": { get: (reqData) => _httplib({ url: "/api/wx_statistics/query_station/{currentUserOrgId}", method: "get", "params": reqData }, { originUrl: "/api/wx_statistics/query_station/{currentUserOrgId}", paramNamesInPath: ["currentUserOrgId"], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/wx_statistics/un_bind": { post: (reqData) => _httplib({ url: "/api/wx_statistics/un_bind", method: "post", "params": reqData }, { originUrl: "/api/wx_statistics/un_bind", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/wx_statistics/un_bind_wx_user_relation/{wxUserRelationId}": { post: (reqData) => _httplib({ url: "/api/wx_statistics/un_bind_wx_user_relation/{wxUserRelationId}", method: "post", "params": reqData }, { originUrl: "/api/wx_statistics/un_bind_wx_user_relation/{wxUserRelationId}", paramNamesInPath: ["wxUserRelationId"], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/wx_template/get_wx_template_info": { get: () => _httplib({ url: "/api/wx_template/get_wx_template_info", method: "get", "params": void 0 }, { originUrl: "/api/wx_template/get_wx_template_info", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 0 }) },
  "/api/wx_template/page_wx_template_message": { post: (reqData) => _httplib({ url: "/api/wx_template/page_wx_template_message", method: "post", "params": reqData }, { originUrl: "/api/wx_template/page_wx_template_message", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/wx_template/save_wx_template_info": { post: (reqData) => _httplib({ url: "/api/wx_template/save_wx_template_info", method: "post", "params": reqData }, { originUrl: "/api/wx_template/save_wx_template_info", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/api/wx_template/save_wx_template_message": { post: (reqData) => _httplib({ url: "/api/wx_template/save_wx_template_message", method: "post", "params": reqData }, { originUrl: "/api/wx_template/save_wx_template_message", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/feign/open_app/access_token": { post: (reqData) => _httplib({ url: "/feign/open_app/access_token", method: "post", "params": reqData }, { originUrl: "/feign/open_app/access_token", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/feign/open_app/authorize_message": { get: (reqData) => _httplib({ url: "/feign/open_app/authorize_message", method: "get", "params": reqData }, { originUrl: "/feign/open_app/authorize_message", paramNamesInPath: [], paramNamesInQuery: ["queryInfo"], paramLen: 1 }) },
  "/feign/open_app/get_inner_org_list": { get: (reqData) => _httplib({ url: "/feign/open_app/get_inner_org_list", method: "get", "params": reqData }, { originUrl: "/feign/open_app/get_inner_org_list", paramNamesInPath: [], paramNamesInQuery: ["access_token"], paramLen: 1 }) },
  "/feign/open_app/get_inner_org_user_list": { post: (reqData) => _httplib({ url: "/feign/open_app/get_inner_org_user_list", method: "post", "params": reqData }, { originUrl: "/feign/open_app/get_inner_org_user_list", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/feign/open_app/get_inner_org_user_list_no_path": { post: (reqData) => _httplib({ url: "/feign/open_app/get_inner_org_user_list_no_path", method: "post", "params": reqData }, { originUrl: "/feign/open_app/get_inner_org_user_list_no_path", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/feign/open_app/get_inner_user_info": { get: (reqData) => _httplib({ url: "/feign/open_app/get_inner_user_info", method: "get", "params": reqData }, { originUrl: "/feign/open_app/get_inner_user_info", paramNamesInPath: [], paramNamesInQuery: ["access_token"], paramLen: 1 }) },
  "/feign/open_app/get_jnoa_user_info": { post: () => _httplib({ url: "/feign/open_app/get_jnoa_user_info", method: "post", "params": void 0 }, { originUrl: "/feign/open_app/get_jnoa_user_info", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 0 }) },
  "/feign/open_app/get_user_info": { post: () => _httplib({ url: "/feign/open_app/get_user_info", method: "post", "params": void 0 }, { originUrl: "/feign/open_app/get_user_info", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 0 }) },
  "/feign/open_app/inner_callback": { post: (reqData) => _httplib({ url: "/feign/open_app/inner_callback", method: "post", "params": reqData }, { originUrl: "/feign/open_app/inner_callback", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/feign/open_app/inner_share": { post: (reqData) => _httplib({ url: "/feign/open_app/inner_share", method: "post", "params": reqData }, { originUrl: "/feign/open_app/inner_share", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/feign/open_app/logout": { post: () => _httplib({ url: "/feign/open_app/logout", method: "post", "params": void 0 }, { originUrl: "/feign/open_app/logout", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 0 }) },
  "/feign/open_app/org_tree": { post: (reqData) => _httplib({ url: "/feign/open_app/org_tree", method: "post", "params": reqData }, { originUrl: "/feign/open_app/org_tree", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/feign/open_app/org_tree_user": { post: (reqData) => _httplib({ url: "/feign/open_app/org_tree_user", method: "post", "params": reqData }, { originUrl: "/feign/open_app/org_tree_user", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/feign/open_app/school_info": { post: (reqData) => _httplib({ url: "/feign/open_app/school_info", method: "post", "params": reqData }, { originUrl: "/feign/open_app/school_info", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/feign/open_app/verification": { post: () => _httplib({ url: "/feign/open_app/verification", method: "post", "params": void 0 }, { originUrl: "/feign/open_app/verification", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 0 }) },
  "/feign/open_third_oa/message_push": { post: (reqData) => _httplib({ url: "/feign/open_third_oa/message_push", method: "post", "params": reqData }, { originUrl: "/feign/open_third_oa/message_push", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  "/feign/open_third_oa/official_message_push": { post: (reqData) => _httplib({ url: "/feign/open_third_oa/official_message_push", method: "post", "params": reqData }, { originUrl: "/feign/open_third_oa/official_message_push", paramNamesInPath: [], paramNamesInQuery: [], paramLen: 1 }) },
  install: function(httplib) {
    _httpcustomlib = httplib;
  }
};

// test/test-api.ts
testTsgen.install(async (reqConfig, extraConfig) => {
  console.log("xxxx", reqConfig, extraConfig);
});
testTsgen["/api/app_manage/query_app"].post({ "appName": "oa" });
