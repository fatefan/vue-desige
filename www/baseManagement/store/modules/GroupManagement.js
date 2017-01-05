import 'babel-polyfill'
import * as types from "../Authority-mutation-types.js"
import Api from "../api/Authority.Api.js"
import * as libs from "../../../common/libs.js"
import { Message } from 'element-ui';
const state = {
        popupModal:false,
        popupModalTitle:'',
        showClose:false,
        tableData: [], //table 数组
        totalPage:'',
        form:{
            selectedLead:'',
            selectedTeamMemberArr: [],
            selectedCircle:'',
            leadArr:[],
            teamMemberArr:[],
            circleArr:[],
            groupName:'',
            groupId:''
        },
        formLabelWidth : '100px'
}

const getters = {
    getGroupTableData:state=>state.tableData,
    getGroupTotalPage:state=>Number(state.totalPage),
    groupPopupModalTitle:state=>state.popupModalTitle,
    groupShowClose:state=>state.showClose,
    groupFormObj:state=>state.form,
    groupFormLabelWidth:state=>state.formLabelWidth,
    groupPopupModal:state=>state.popupModal
}

const actions = {
    //获取 table数据
    receiveGroupTableData ({commit},data) {
        Api.queryTeamManagement(data,(response)=>{
            commit(types.RECEIVE_GROUP_LIST,{data:response.body.data})
        })
    },
    //获取 组长 下拉框
    receiveCaptainSelect ({commit}) {
        Api.getLeadSelect({},(response)=>{
            commit(types.RECEIVE_GROUP_CAPTAIN,{data:response.data.data})
        });
    },
    //获取 组员 下拉框
    receiveTeamMemberSelect ({commit}) {
        Api.getTeamMemberSelect({},(response)=>{
            commit(types.RECEIVE_GROUP_TEAM_MEMBER,{data:response.data.data});
        });
    },
    //获取 商圈 下拉框
    receiveTradeCircleSelect ({commit}) {
        Api.getTradeCircleSelect({},(response)=>{
            commit(types.RECEIVE_GROUP_TRADE_CIRCLE,{data:response.data.data});            
        });
    },
    //创建 小组
    createGroup ({commit,state,dispatch}) {
        if(state.form.groupName != '') {
            let nameStr = libs.arrStringify(state.form.selectedTeamMemberArr,'userid');
            
            if(state.popupModalTitle  == '创建小组') {
                    let p = {
                        groupname : state.form.groupName,
                        leaderid :  state.form.selectedLead,
                        teamMember : nameStr,
                        sysreg : state.form.selectedCircle
                    }
                    Api.saveTeamManagement(p,(response)=>{
                        if(response.data.code != 0) {
                            Message.error(response.data.message);
                        } else {
                            Message({
                                message: '小组创建成功!',
                                type: 'success'
                            });
                            dispatch('receiveGroupTableData');
                            commit(types.CLOSE_GROUP_POPUP);
                        }               
                    })
            } else if(state.popupModalTitle  == '编辑小组') {
                    let p = {
                        groupname : state.form.groupName,
                        groupid : state.form.groupId,
                        leaderid :  state.form.selectedLead,
                        teamMember : nameStr,
                        sysreg : state.form.selectedCircle
                    }
                    Api.updateTeamManagement(p,(response)=> {
                        if(response.data.code != 0) {
                            Message.error(response.data.message);
                        } else {
                            Message({
                                message: '小组修改成功!',
                                type: 'success'
                            });
                            dispatch('receiveGroupTableData');
                            commit(types.CLOSE_GROUP_POPUP);
                        }
                    })
            }
            
        } else {
            Message.error("请输入组名!");
        }

    },
    //更新 小组
    updateGroup ({commit,state}) {

    },
    //创建 小组 按钮
    createGroupBtn ({commit,state,dispatch}) {
        dispatch('receiveCaptainSelect');
        dispatch('receiveTeamMemberSelect');
        dispatch('receiveTradeCircleSelect');
        commit(types.RECEIVE_GROUP_POPUP_TITLE,{title:"创建小组"});
        commit(types.SHOW_GROUP_POPUP);
    },
    //编辑 小组 按钮
    modifyGroupBtn ({commit,state,dispatch},{item}) {
        dispatch('receiveCaptainSelect');
        dispatch('receiveTeamMemberSelect');
        dispatch('receiveTradeCircleSelect');
        commit(types.RECEIVE_GROUP_POPUP_TITLE,{title:"编辑小组"});        
        commit(types.SHOW_GROUP_POPUP);
        commit(types.ASSIGNED_FORM,{data:item});
    },
    //关闭 小组弹出框
    closeGroupPopup ({commit}) {
        commit(types.CLOSE_GROUP_POPUP);
    },
    //添加 组成员
    selectedTeamMember ({commit,state},{name}) {
        let index = -1;
        for(let i = 0, l = state.form.teamMemberArr.length; i < l; i++) {
            if(state.form.teamMemberArr[i].name == name) {
                index = i;
                break;
            } 
        };
        let a = state.form.teamMemberArr[index];
        commit(types.ADD_SELECTED_GROUP_MEMBER,{item:a});
        commit(types.DELETE_GROUP_MEMBER_ARR,{sort:index});
    },
    deleteSelectedMember ({commit,state},{item}) {
        commit(types.DELETE_GROUP_SELECTED_MEMBER,{item:item});
        commit(types.ADD_GROUP_MEMBER_ARR,{item,item});
    }
}

const mutations = {
    //创建 小组
    [types.CREATE_GROUP_ITEM] (state) {

    },
    //接受 table 数据
    [types.RECEIVE_GROUP_LIST] (state,{data}) {
        state.tableData = data.list;
        state.totalPage = data.pages;
    },
    //更新数据
    [types.UPDATE_GROUP_ITEM] (state,{data}) {

    },
    //关闭 小组创建/编辑弹框出
    [types.CLOSE_GROUP_POPUP] (state) {
        state.popupModal = false;
        state.form = {
            selectedLead:'',
            groupName:'',
            groupId:'',
            selectedTeamMemberArr: [],
            selectedCircle:'',
            leadArr:[],
            teamMemberArr:[],
            circleArr:[]
        };
    },
    //显示 新建/编辑弹出框
    [types.SHOW_GROUP_POPUP] (state) {
        state.popupModal = true;
    },
    //给弹出框 form 赋值
    [types.ASSIGNED_FORM] (state,{data}) {
        console.info(data);
        state.form.selectedLead = data.leaderid;
        state.form.groupName = data.groupname;
        state.form.groupId = data.groupid;
        state.form.selectedCircle = data.sccode;
        let arr = data.teamMembers.split(',');
        let arrId = data.teamMembersid.split(',');
        for(let i = 0, l = arr.length; i < l;i++) {
            let obj = {
                name : arr[i],
                key: i,
                closeAble:false,
                userid : arrId[i]
            };
            state.form.selectedTeamMemberArr.push(obj);
        }
        console.info(state.form.selectedTeamMemberArr)
    },
    //组长 下拉赋值
    [types.RECEIVE_GROUP_CAPTAIN] (state,{data}) {
        state.form.leadArr = data;
    },
    //组员 下拉赋值
    [types.RECEIVE_GROUP_TEAM_MEMBER] (state,{data}) {
        state.form.teamMemberArr = data;
    },
    //商圈 下拉赋值
    [types.RECEIVE_GROUP_TRADE_CIRCLE] (state,{data}) {
        state.form.circleArr = data;
    },
    //接受 弹出框 title
    [types.RECEIVE_GROUP_POPUP_TITLE] (state,{title}) {
        state.popupModalTitle = title;
    },
    // 添加 选中 组员
    [types.ADD_SELECTED_GROUP_MEMBER] (state,{item}) {
        if(state.popupModalTitle == '创建小组') {
            item.closeAble = true;
        } else {
            item.closeAble = false;
        }
        state.form.selectedTeamMemberArr.push(item);
    },
    //删除 候选 组员
    [types.DELETE_GROUP_MEMBER_ARR] (state,{sort}) {
        state.form.teamMemberArr.splice(sort,1)
    },
    //删除 已选组员
    [types.DELETE_GROUP_SELECTED_MEMBER] (state,{item}) {
        state.form.selectedTeamMemberArr.splice(state.form.selectedTeamMemberArr.indexOf(item),1);
    },
    [types.ADD_GROUP_MEMBER_ARR] (state,{item}) {
        state.form.teamMemberArr.push(item);
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}