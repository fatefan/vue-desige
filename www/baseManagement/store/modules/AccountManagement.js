import 'babel-polyfill'
import * as types from "../Authority-mutation-types.js"
import Api from "../api/Authority.Api.js"
import { role, department } from "../../../common/config.js"
import { Message } from 'element-ui';
 
//账户管理 modules

const state = {
    popupModalTitle: '', //弹出框 标题
    popupModal: false, //弹出框 状态
    showClose: false,
    selectDisabled: false,
    delete_popupModal: false,//删除弹出框状态
    tableData: [], //table 数据
    totalPage:'',
    form: {
        useSelectArr: [], //组员 下拉框
        selectedUse: '',
        roleArr: role,
        departmentArr: department,
        selectedRole: '',
        selectedDepartment: ''
    },// 弹出框 form 对象
    deleteForm: {
        transferPeopleId: '',
        userId: '',
        transferPeopleArr: []
    }, // 删除弹出框 对象
    formLabelWidth: '100px'
}

const getters = {
    accountTableData: state => {
        state.tableData.forEach((v) => {
            switch (v.roletype) {
                case 0: v.roleName = '组员'; break;
                case 1: v.roleName = '组长'; break;
            };
            switch (v.dept) {
                case 0: v.deptName = '市场部门'; break;
                case 1: v.deptName = '运维部'; break;
            };
            switch (v.isallocation) {
                case 0: v.isAllocation = '否';break;
                case 1: v.isAllocation = '是';break;
            }
        });
        return state.tableData;
    },
    accountTotalPage:state=>Number(state.totalPage),
    accountPopupModalTitle: state => state.popupModalTitle,
    accountPopupModal: state => state.popupModal,
    accountDeletePopupModal: state => state.delete_popupModal,
    accountForm: state => state.form,
    accountDeleteForm: state => state.deleteForm,
    accountShowClose: state => state.showClose,
    accountFormLabelWidth: state => state.formLabelWidth,
    accountSelectDisabled: state => state.selectDisabled
}

const actions = {
    //接受 table 数据
    receiveAccountTableData({commit}, data) {
        Api.queryAccountManagement(data, (response) => {
            commit(types.RECEIVE_ACCOUNT_LIST, { data: response.body.data });
        })
    },
    //接收 组员下拉框
    receiveAccountSelect({commit}) {
        Api.useSelect({}, (response) => {
            commit(types.RECEIVE_USE_SELECT, { list: response.body.data });
        })
    },
    //创建 账户
    createAccount({commit, state, dispatch}) {
        if (state.form.selectedUse == '') {
            Message.error("请选择人员!");
        } else if (state.form.selectedRole == '') {
            Message.error("请选择角色!");
        } else if (state.form.selectedDepartment == '') {
            Message.error("请选择部门!");
        } else {
            if (state.popupModalTitle == '创建账户') {
                let p = {
                    dept: state.form.selectedDepartment,
                    sysuserid: state.form.selectedUse,
                    roletype: state.form.selectedRole
                };
                Api.createAccount(p, (response) => {
                    if (response.data.code != '0') {
                        Message.error(response.data.message);
                    } else {
                        Message({
                            message: '账户创建成功!',
                            type: 'success'
                        });
                        commit(types.CLOSE_ACCOUNT_POPUP);
                        dispatch('receiveAccountTableData');
                    }
                });
            } else if (state.popupModalTitle == '编辑账户') {
                let p = {
                    userid: state.form.selectedUse,
                    roletype: state.form.selectedRole
                };
                Api.upadteAccount(p, (response) => {
                    if (response.data.code != '0') {
                        Message.error(response.data.message);
                    } else {
                        Message({
                            message: '账户更新成功!',
                            type: 'success'
                        });
                        commit(types.CLOSE_ACCOUNT_POPUP);
                        dispatch('receiveAccountTableData');
                    }
                })
            }
        }
    },
    //更新 账户
    // updateAccount ({commit}) {

    // },
    //确认删除账户
    confirmDeleteAccount({commit, state, dispatch}) {
        if (state.deleteForm.transferPeopleId == '') {
            Message.error('请选择商家接受人!');
        } else {
            let p = {
                userid : state.deleteForm.userId,
                acceptuserid : state.deleteForm.transferPeopleId
            }
            Api.deleteAccount(p, (response) => {
                if (response.data.code != '0') {
                    Message.error(response.data.message);
                } else {
                    Message({
                        message: '账户删除成功!',
                        type: 'success'
                    });
                    commit(types.CLOSE_DELETE_ACCOUNT_POPUP);
                    dispatch('receiveAccountTableData');
                }
            })
        }
    },
    //创建 账户 按钮
    createAccountBtn({commit, dispatch}) {
        dispatch('receiveAccountSelect')
        commit(types.SHOW_ACCOUNT_POPUP);
        commit(types.RECEIVE_ACCOUNT_POPUP_TITLE, { title: '创建账户' });
    },
    //编辑 账户 按钮
    modifyAccountBtn({commit, dispatch}, {item}) {
        dispatch('receiveAccountSelect')
        commit(types.SHOW_ACCOUNT_POPUP);
        commit(types.ACCOUNT_FORM, { item: item });
        commit(types.RECEIVE_ACCOUNT_POPUP_TITLE, { title: '编辑账户' });
    },
    //关闭 账户弹出框
    closeAccountPopup({commit}) {
        commit(types.CLOSE_ACCOUNT_POPUP);
    },
    //关闭 删除账户弹出框
    closeDeleteAccountPopup({commit}) {
        commit(types.CLOSE_DELETE_ACCOUNT_POPUP);
    },
    //展示 删除账户弹出框
    showDeleteAccountPopup({commit,dispatch}, {item}) {
        dispatch('receiveAccountSelect')
        commit(types.ACCOUNT_DELETE_FORM, { item: item });
        commit(types.SHOW_DELETE_ACCOUNT_POPUP);
    }
}

const mutations = {
    //table 数据
    [types.RECEIVE_ACCOUNT_LIST](state, {data}) {
        state.tableData = data.list;
        state.totalPage = data.pages;
    },
    // [types.CREATE_ACCOUNT_ITEM] (state) {

    // },
    // [types.UPDATE_ACCOUNT_ITEM] (state) {

    // },
    //显示 弹出框
    [types.SHOW_ACCOUNT_POPUP](state) {
        state.popupModal = true;
    },
    //关闭 删除 弹出框
    [types.CLOSE_DELETE_ACCOUNT_POPUP](state) {
        state.delete_popupModal = false;
        state.deleteForm.transferPeopleId = '';
        state.deleteForm.userId = '';
    },
    //设置 弹出框title
    [types.RECEIVE_ACCOUNT_POPUP_TITLE](state, {title}) {
        state.popupModalTitle = title;
    },
    //关闭弹出框
    [types.CLOSE_ACCOUNT_POPUP](state) {
        state.popupModal = false;
        state.selectDisabled = false;
        state.form = {
            useSelectArr: [], //组员 下拉框
            selectedUse: '',
            roleArr: role,
            departmentArr: department,
            selectedRole: '',
            selectedDepartment: ''
        }
    },
    //显示 删除弹出框
    [types.SHOW_DELETE_ACCOUNT_POPUP](state) {
        state.delete_popupModal = true;
    },
    //组员 下拉选择框
    [types.RECEIVE_USE_SELECT](state, {list}) {
        state.form.useSelectArr = list;
    },
    //给 弹出框 form赋值
    [types.ACCOUNT_FORM](state, {item}) {
        state.selectDisabled = true;
        state.form = {
            selectedUse: String(item.userid),
            selectedRole: String(item.roletype),
            selectedDepartment: String(item.dept),
            roleArr: role,
            departmentArr: department,
        }
    },
    //给 删除 弹出框赋值
    [types.ACCOUNT_DELETE_FORM](state, {item}) {
        state.deleteForm.userId = item.userid;
        console.info(state.deleteForm,item.id)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}