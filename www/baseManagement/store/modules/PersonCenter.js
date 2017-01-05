import 'babel-polyfill'
import * as types from "../Authority-mutation-types.js"
import Api from "../api/Authority.Api.js"
import * as libs from "../../../common/libs.js"
import { Message } from 'element-ui';
var personData = JSON.parse(localStorage.userInfo);
if(personData.isallocation == '1') {
    personData.isallocationname = "是"
}else{
    personData.isallocationname = "否"
}
if(personData.roletype == '1') {
    personData.roletypename = "组长"
}else{
    personData.roletypename = "组员"
}
if(personData.dept == '1') {
    personData.deptname = "运维部"
}else{
    personData.deptname = "市场部"
}
const state = {
       personInfo : {     //个人信息 
           '姓名':personData.name,
           '手机号':personData.mobile,
           '邮箱':personData.email,
           '行政区':personData.xzqname,
           '省份':personData.sfname,
           '城市':personData.sxqname,
           '市辖区':personData.sxqname,
           '商圈':personData.scname,
           '商区':personData.sqname,
           '小组':personData.leadname,
           '角色':personData.roletypename,
           '部门':personData.deptname,
           '是否分配':personData.isallocationname
       }
}

const getters = {
    getPersonInfo:state => state.personInfo
}

const actions = {
    
}

const mutations = {
    
}
export default {
    state,
    getters,
    actions,
    mutations
}