import 'babel-polyfill'
import * as types from "../nav-mutation-types.js"
const state = {
    list:[],
    router:{}
}

const getters = {
    getNavList:state=>state.list
}

const actions = {
    receiveItem ({commit},list) {
        commit(types.RECEIVE_ITEMS,{list:list})
    },
    switchItem ({commit},sort) {
        commit(types.SWITCH_ITEM,{sort:sort});
    },
    receiveRouter ({commit},obj) {
        commit(types.RECEIVE_ROUTER,{obj:obj});        
    }
}

const mutations = {
    [types.RECEIVE_ITEMS] (state,{list}) {
        state.list = list;
    },
    [types.SWITCH_ITEM] (state,{sort}) {
        state.list.forEach((v,i)=>{
            if(i != sort) {
                v.isActive = false;
            } else {
                v.isActive = true;                
            }
        });
        state.router.push(state.list[sort].path);
    },
    [types.RECEIVE_ROUTER] (state, {obj}) {
        state.router = obj;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}