import Vue from 'vue'
import App from './App.vue'
//注册三级联动组件为全局组件 提高复用性
import Type_Nav from '@/components/Type_Nav'
//注册格式 全局组件的名字 哪一个组件 
//经过注册的全局组件不需要再引入使用
Vue.component(Type_Nav.name, Type_Nav)
    //引入经过封装的Axios
import '@/api/request'
//引入Mock模拟后台接口虚拟数据
//mock 专用请求
import '@/api/mockAjax'
//引入Swiper样式
import 'swiper/css/swiper.css'
Vue.config.productionTip = false
    //引入并使用Vue路由插件
    //引入路由配置项
import router from '@/views/route'
//引入VueX并使用
import store from '@/Store/vuex'
//Element-ui 引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入懒加载
import VueLazyload from 'vue-lazyload'
//Vue.use(VueLazyload, {
//懒加载默认图片配置 
//      loading: ''
Vue.use(ElementUI)
new Vue({
    el: '#app',
    render: h => h(App),
    //注册路由
    router,
    store,
    beforeCreate() {
        //挂载全局事件总线
        Vue.prototype.$bus = this
    },
})