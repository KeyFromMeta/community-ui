import Vue from 'vue'
import App from './App.vue'
//引入VueRouter
import VueRouter from 'vue-router'
//引入路由器
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.config.productionTip = false

//应用插件
Vue.use(VueRouter)
Vue.use(ElementUI)

new Vue({
    el:'#app',
    render:h=>h(App),
    router:router,
    beforeCreate(){
        Vue.prototype.$bus = this //安装全局事件总线
    }
})
