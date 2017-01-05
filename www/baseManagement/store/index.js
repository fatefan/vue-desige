import Vue from 'vue'
import Vuex from 'vuex'
import nav from '../../common/modules/nav'
import groupManagement from './modules/GroupManagement.js'
import accountManagement from './modules/AccountManagement.js'
import AreaOfOperations from './modules/AreaOfOperations.js'
import PersonCenter from './modules/PersonCenter.js'
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        nav,
        groupManagement,
        accountManagement,
        AreaOfOperations,
        PersonCenter
    }
})