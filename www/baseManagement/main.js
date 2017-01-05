import 'babel-polyfill'
import Vue from 'vue'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '../common/css/common.css'
import store from './store'
import router from './router.js'
Vue.use(ElementUI);
new Vue({
    store,
    router
}).$mount('#app')