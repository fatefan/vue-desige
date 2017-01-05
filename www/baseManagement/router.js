import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import PersonCenter from './components/PersonCenter.vue'
import Authority from './components/Authority.vue'
import {route} from './config.js'
Vue.use(VueRouter)


const routes = [
    {
        path: '/',
        component: App,
        children:[
            {path:'person_center',name:'个人中心',component:PersonCenter},
            {path:'authority',name:'职能权限',component:Authority}
        ]
    }
]

const router = new VueRouter({
    routes,
    linkActiveClass:'active',
    history: true
})

export default router