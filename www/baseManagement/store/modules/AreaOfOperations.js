import 'babel-polyfill'
import * as types from "../Authority-mutation-types.js"
import Api from "../api/Authority.Api.js"
import * as libs from "../../../common/libs.js"
import { nodeType, regionParentType } from "../../../common/config.js"
import { Message, MessageBox } from 'element-ui';

const state = {
    certainBtnStatus: false, //false/更新 true/创建
    certainBtnText: '更新',
    tree: [],
    props: {
        label: 'name',
        children: 'childs',
        key: 'code',
    },
    form: {
        name: '', //节点名字
        selectedMemberArr: [], //被选中负责人
        memberArr: [],//负责人 下拉
        totalSize: '',//总人数
        remark: '',//备注
        selectedNodeType: '',// 被选中 节点类型
        nodeTypeArr: nodeType, //节点类型
        selectedRegionParentType: '', // 被选中 商区类型
        regionParentTypeArr: regionParentType, //商区类型
        disableRegionParent: false,
        disableNodeType: false
    },
    formStatus: false,//form 状态
    selectedNode: {} //被选中节点
}

const getters = {
    areaOfOperationsCertainBtnStatus: state => state.certainBtnStatus,
    areaOfOperationsTree: state => state.tree,
    areaOfOperationsForm: state => state.form,
    areaOfOperationsProps: state => state.props,
    areaOfOperationsFormStatus: state => state.formStatus,
    areaOfOperationsCertainBtnText: state => state.certainBtnText
}

const actions = {
    //接受 tree 数据
    receiveAreaOfOperationsTreeTable({commit}) {
        Api.getAreaOfOperationsData({}, (response) => {
            commit(types.RECEIVE_AREAOFOPERATIONS_TREE, { item: response.data.data });
        })
    },
    //获取 负责人数据
    receiveAreaOfOperationsUseSelect({commit}) {
        Api.getAreaOfOperationsUseSelect({}, (response) => {
            commit(types.RECEIVE_AREAOFOPERATIONS_USE_SELECT, { item: response.data.data });
        })
    },
    //给form card 赋值
    receiveAreaOfOperationsFormData({commit}, {item: item}) {
        item.disableRegionParent = true;
        item.disableNodeType = true;
        if(item.leadname.length != '0') {
            let arrName = item.leadname.split(',');
            let arrId = item.leadid.split(',');
            item.selectedMemberArr = arrName.map((v,i)=>{
                return {
                    name : v,
                    userid : arrId[i]
                }
            });
        } else {
            item.selectedMemberArr = [];
        }

        commit(types.RECEIVE_AREAOFOPERATIONS_FORM, { item: item, regionParentTypeData: regionParentType, nodeTypeData: nodeType });
    },
    //添加 节点按钮
    addAreaOfOperationsBtn({commit, state, dispatch}) {
        if (!state.selectedNode.code || state.selectedNode.nodetype == '6') return;
        dispatch('receiveAreaOfOperationsUseSelect');
        dispatch('areaOfOperationsFormCardStatus', { status: true });
        commit(types.RECEIVE_ARREAOFOPERATIONS_CERTAIN_BTN, { status: true });
        let currItem = state.selectedNode;
        let item = {
            name: '',
            memo: '',
            businessdistrict: '',
            totpeple: '',
            nodetype: '',
            disableRegionParent: true, //商圈 禁止操作
            disableNodeType: false, //节点类型 禁止操作
            selectedMemberArr : []
        };
        let nodeTypeArr = [];
        if (currItem.nodetype == '5') {
            item.disableRegionParent = false;
            item.nodetype = '6';
        };                                                                                    
        if (currItem.nodetype != 0) {
            let s = currItem.nodetype + 1;
            nodeTypeArr.push(nodeType[0]);
            nodeTypeArr.push(nodeType[s]);
            item.nodetype = String(s);
        } else if (currItem.nodetype == 0) {
            nodeTypeArr = nodeType;
            item.disableRegionParent = false;
        };
        commit(types.RECEIVE_AREAOFOPERATIONS_FORM, { item: item, regionParentTypeData: regionParentType, nodeTypeData: nodeTypeArr });
    },
    //删除 节点按钮
    deleteAreaOfOperationsBtn({commit,dispatch}) {
        if (!state.selectedNode.code) return;
        MessageBox.confirm('此操作会删除此节点和其子节点,确定删除？', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            let p = {
                code: state.selectedNode.code
            }
            Api.deleteAreaOfOperationsNode(p, (response) => {
                if (response.body.code == 0) {
                    Message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    dispatch('receiveAreaOfOperationsTreeTable');
                    dispatch('areaOfOperationsFormClear')
                    commit(types.AREAOFOPERATIONS_SELECTED_NODE, { item: {} });
                } else {
                    Message.error(response.body.message);
                }
            })
        }).catch(() => {
            Message({
                type: 'info',
                message: '已取消删除'
            });
        });
    },
    //添加 组员 （从候选组员 里面取出）
    areaOfOperationsSelectedTeamMember({commit}, {name}) {
        let index = -1;
        for (let i = 0, l = state.form.memberArr.length; i < l; i++) {
            if (state.form.memberArr[i].name == name) {
                index = i;
                break;
            }
        };
        let a = state.form.memberArr[index];
        commit(types.ADD_SELECTED_AREAOFOPERATION_MEMBER, { item: a });
        commit(types.DELETE_AREAOFOPERATION_MEMBER_ARR, { sort: index });
    },
    //确认添加 节点
    areaOfOperationsCertainBtn({commit, state, dispatch}) {
        console.info(state.form)
        if (state.form.name == '') {
            Message.error("请输入节点名称");
            return;
        } else if (state.form.selectedNodeType == '6' 
        && (state.form.selectedRegionParentType==undefined || state.form.selectedRegionParentType =='')) {
            Message.error("商区节点，请选择商区!");
            return;
        } else if (state.form.selectedNodeType != '6'
        &&(state.form.selectedRegionParentType!=undefined || state.form.selectedRegionParentType !='')) {
            Message.error("只能商区节点，才能选择商区!");
            return;
        }
        let nameStr = libs.arrStringify(state.form.selectedMemberArr, 'userid');
        let p = {
            name: state.form.name,
            userid: nameStr,
            parentcode: state.selectedNode.code,
            nodetype: state.form.selectedNodeType,
            businessdistrict: state.form.selectedRegionParentType!=undefined?state.form.selectedRegionParentType:'',
            memo: state.form.remark,
            totpeple: state.form.totalSize
        }
        Api.createAreaOfOperationsNode(p, (response) => {
            if (response.body.code == '0') {
                dispatch('receiveAreaOfOperationsTreeTable');
                dispatch('areaOfOperationsFormClear')
                commit(types.AREAOFOPERATIONS_SELECTED_NODE, { item: {} });
                Message({
                    message: "创建成功!",
                    type: "success"
                })
            } else {
                Message.error(response.body.message);
            }
        })
    },
    //更新 节点
    areaOfOperationsUpdateBtn({commit, state, dispatch}) {
        if (state.form.name == '') {
            Message.error("请输入节点名称");
            return;
        };
        let nameStr = libs.arrStringify(state.form.selectedMemberArr, 'userid');
        let p = {
            name: state.form.name,
            userid: nameStr,
            nodetype: state.form.selectedNodeType,
            businessdistrict: state.form.selectedRegionParentType!=undefined?state.form.selectedRegionParentType:'',
            memo: state.form.remark,
            totpeple: state.form.totalSize,
            code: state.selectedNode.code
        }
        Api.updateAreaOfOperationsNode(p, (response) => {
            if (response.body.code == '0') {
                dispatch('receiveAreaOfOperationsTreeTable');
                dispatch('areaOfOperationsFormClear')
                commit(types.AREAOFOPERATIONS_SELECTED_NODE, { item: {} });
                Message({
                    message: "更新成功!",
                    type: "success"
                })
            } else {
                Message.error(response.body.message);
            }
        })
    },
    //获取当前 节点数据
    areaOfOperationsCurrentNodeData({commit, state}, {item: item}) {        
        commit(types.RECEIVE_ARREAOFOPERATIONS_CERTAIN_BTN, { status: false });
        commit(types.AREAOFOPERATIONS_SELECTED_NODE, { item: item });
    },
    //删除选中的组员
    areaOfOperationsDeleteSelectedMember({commit}, {item}) {
        commit(types.DELETE_AREAOFOPERATION_SELECTED_MEMBER, { item: item });
        commit(types.ADD_AREAOFOPERATION_MEMBER_ARR, { item, item });
    },
    //清空 form card 数据
    areaOfOperationsFormClear({commit, state, dispatch}) {
        commit(types.AREAOFOPERATIONS_FORM_CLEAR);
        dispatch('areaOfOperationsFormCardStatus', { status: false });
    },
    //form card 状态
    areaOfOperationsFormCardStatus({commit, state}, {status}) {
        commit(types.AREAOFOPERATIONS_FORM_CARD_STATUS, { status: status });
    }
}

const mutations = {
    // 接受 tree 树数据
    [types.RECEIVE_AREAOFOPERATIONS_TREE](state, {item}) {
        state.tree = item;
    },
    //创建 按钮
    [types.ADD_AREAOFOPERATIONS_TREE_NODE_BTN](state) {

    },
    //删除 按钮
    [types.DELETE_AREAOFOPERATIONS_TREE_NODE_BTN](state) {

    },
    //负责人 下拉
    [types.RECEIVE_AREAOFOPERATIONS_USE_SELECT](state, {item}) {
        state.form.memberArr = item;
    },
    //设置 form 卡片状态
    [types.AREAOFOPERATIONS_FORM_CARD_STATUS](state, {status}) {
        state.formStatus = status;
    },
    //给选中节点 数据
    [types.AREAOFOPERATIONS_SELECTED_NODE](state, {item}) {
        state.selectedNode = item;
    },
    [types.AREAOFOPERATIONS_FORM_CLEAR](state) {
        state.form = {
            name: '', //节点名字
            selectedMemberArr: [], //被选中负责人
            memberArr: [],//负责人 下拉
            totalSize: '',//总人数
            remark: '',//备注
            selectedNodeType: '',// 被选中 节点类型
            nodeTypeArr: nodeType, //节点类型
            selectedRegionParentType: '', // 被选中 商区类型
            regionParentTypeArr: regionParentType, //商区类型
            disableRegionParent: false,
            disableNodeType: false
        }
    },
    [types.RECEIVE_AREAOFOPERATIONS_FORM](state, {item, nodeTypeData, regionParentTypeData}) {
        console.info(item.businessdistrict,item.nodetype,regionParentTypeData);
        state.form.name = item.name;
        state.form.remark = item.memo;
        state.form.selectedRegionParentType = String(item.businessdistrict);
        state.form.selectedNodeType = String(item.nodetype);
        state.form.disableRegionParent = item.disableRegionParent;
        state.form.disableNodeType = item.disableNodeType;
        state.form.totalSize = item.totpeple;
        state.form.selectedMemberArr = item.selectedMemberArr;
        state.form.nodeTypeArr = nodeTypeData;
        state.form.regionParentType = regionParentTypeData;
    },
    [types.RECEIVE_ARREAOFOPERATIONS_CERTAIN_BTN](state, {status}) {
        state.certainBtnStatus = status;
    },
    [types.ADD_SELECTED_AREAOFOPERATION_MEMBER](state, {item}) {
        state.form.selectedMemberArr.push(item);
    },
    [types.DELETE_AREAOFOPERATION_MEMBER_ARR](state, {sort}) {
        state.form.memberArr.splice(sort, 1)
    },
    //删除 已选组员
    [types.DELETE_AREAOFOPERATION_SELECTED_MEMBER](state, {item}) {
        state.form.selectedMemberArr.splice(state.form.selectedMemberArr.indexOf(item), 1);
    },
    [types.ADD_AREAOFOPERATION_MEMBER_ARR](state, {item}) {
        state.form.memberArr.push(item);
    }
}
export default {
    state,
    getters,
    actions,
    mutations,
}