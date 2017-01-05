import Vue from 'vue'
import VueResource from 'vue-resource'
import {ApiUrl} from "../../../common/config.js"
Vue.use(VueResource);

Vue.http.options.emulateJSON = true;
export default {
    //查询 小组管理
    queryTeamManagement (params,cb,errCb) {
        Vue.http.post(ApiUrl+"teammanagement/query",params,{
            credentials:false
        }).then(cb,errCb)
    },
    //保存 小组管理
    saveTeamManagement (params,cb,errCb) {
        Vue.http.post(ApiUrl+"teammanagement/save",params,{
            credentials:false
        }).then(cb,errCb)        
    },
    //更新 小组管理
    updateTeamManagement (params,cb,errCb) {
        Vue.http.post(ApiUrl+"teammanagement/update",params,{
            credentials:false
        }).then(cb,errCb)                
    },
    //组长下拉框 小组管理
    getLeadSelect (params,cb,errCb) {
        Vue.http.post(ApiUrl+"teammanagement/getleadselect",params,{
            credentials:false
        }).then(cb,errCb)                        
    },
    //组员下拉框 小组管理
    getTeamMemberSelect (params,cb,errCb) {
        Vue.http.post(ApiUrl+"teammanagement/getteammemberselect",params,{
            credentials:false
        }).then(cb,errCb)                                
    },
    //商圈下拉框 小组管理
    getTradeCircleSelect (params,cb,errCb) {
        Vue.http.post(ApiUrl+"teammanagement/getcircle",params,{
            credentials:false
        }).then(cb,errCb)                                        
    },
    //查询 账户管理
    queryAccountManagement (params,cb,errCb) {
        Vue.http.post(ApiUrl+"user/query",params,{
            credentials:false            
        }).then(cb,errCb)
    },
    //账户管理 人员下拉框
    useSelect (params,cb,errCb) {
        Vue.http.post(ApiUrl+"user/userSelect",params,{
            credentials:false            
        }).then(cb,errCb)
    },
    //创建账户
    createAccount (params,cb,errCb) {
        Vue.http.post(ApiUrl+"user/save",params,{
            credentials:false            
        }).then(cb,errCb)
    },
    //更新 账户
    upadteAccount (params,cb,errCb) {
        Vue.http.post(ApiUrl+"user/update",params,{
            credentials:false            
        }).then(cb,errCb)
    },
    //删除账号
    deleteAccount (params,cb,errCb) {
        Vue.http.post(ApiUrl+"user/delete",params,{
            credentials:false            
        }).then(cb,errCb)
    },
    //经营区域 接受数据
    getAreaOfOperationsData (params,cb,errCb) {
        Vue.http.post(ApiUrl+"area/query",params,{
            credentials:false
        }).then(cb,errCb)
    },
    //经营区域 负责人下来
    getAreaOfOperationsUseSelect (params,cb,errCb) {
        Vue.http.post(ApiUrl+'area/principalSelect',params,{
            credentials:false
        }).then(cb,errCb)
    },
    //创建 经营区域节点
    createAreaOfOperationsNode (params,cb,errCb) {
        Vue.http.post(ApiUrl+'area/save',params,{
            credentials:false
        }).then(cb,errCb)
    },
    //更新 经营区域节点
    updateAreaOfOperationsNode (params,cb,errCb) {
        Vue.http.post(ApiUrl+'area/update',params,{
            credentials:false
        }).then(cb,errCb)
    },
    deleteAreaOfOperationsNode (params,cb,errCb) {
        Vue.http.post(ApiUrl+'area/delete',params,{
            credentials:false            
        }).then(cb,errCb)
    }
}