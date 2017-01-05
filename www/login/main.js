import 'babel-polyfill'
import Vue from 'vue'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '../common/css/common.css'
import Login from './components/Login.vue'
Vue.use(VueResource);
Vue.use(ElementUI);
var vm = new Vue({
    el:'#app',
    render: h=>h(Login)
});