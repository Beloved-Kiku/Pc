import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
    //引入路由组件
import Home from './Home/index.vue'
import Login from './Login/index.vue'
import Register from './Register/index.vue'
import Search from './Search/index.vue'
import Detail from './Detail/index.vue'
import AddCarSuccess from './AddCartSuccess/index.vue'
import shopCart from './shopCart/index.vue'
import Trade from './Trade/index.vue'
import Pay from './Pay/index.vue'
import PaySuccess from './PaySuccess/index.vue'
import Center from './Center/index.vue'
//引入二级路由  
import MyOrder from './Center/MyOrder/index.vue'
import GroupOrder from './Center/GroupOrder/index.vue'
//引入仓库数据
import store from '@/Store/vuex' //解决路由promise状态 多次点击报错问题
const Catch_push = VueRouter.prototype.push
const Catch_replace = VueRouter.prototype.replace
VueRouter.prototype.push = function push(location) {
    return Catch_push.call(this, location).catch(err => err)
}
VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        Catch_replace.call(this, location, resolve, reject)
    } else {
        Catch_replace.call(this, () => {}, () => {})
    }
}
const Route = new VueRouter({
    routes: [{
            name: 'Home',
            path: '/Home',
            component: Home,
            meta: {
                //路由在特定情况下 判断是否展示
                isShow: true
            }
        },
        {
            name: 'Login',
            path: '/Login',
            component: Login,
            meta: {
                isShow: false
            }
        },
        {
            name: 'Register',
            path: '/Register',
            component: Register,
            isShow: false
        },
        {
            name: 'Search',
            path: '/Search',
            component: Search,
            meta: {
                isShow: true
            }
        },
        { //配置默认显示页面
            path: "*",
            redirect: '/Home'
        },
        {
            name: 'Detail',
            //提前配置参数 因为接口要求 发送时必须携带
            //在路径中配置的参数可以通过route访问到 默认是params类型的数据
            path: '/detail/:skuId?',
            component: Detail,
            meta: {
                isShow: false
            }
        },
        {
            name: 'AddCartSuccess',
            path: '/AddCartSuccess',
            component: AddCarSuccess,
            meta: {
                isShow: true
            }
        },
        {
            name: 'shopCart',
            path: '/shopCart',
            component: shopCart,
            meta: {
                isShow: false
            }
        },
        {
            name: 'Trade',
            path: '/Trade',
            component: Trade,
            meta: {
                isShow: false
            },
            //路由独享守卫  用于某些页面只能在特定情况下进行跳转
            beforeEnter(to, from, next) {
                if (from.path === '/shopCart') {
                    next()
                } else {
                    //  禁止跳转 导航路径不会被修改
                    next(false)
                }
            }
        },
        {
            name: 'Pay',
            path: '/Pay',
            component: Pay,
            meta: {
                isShow: true
            },
            beforeEnter(to, from, next) {
                if (from.path === '/Trade') {
                    next()
                } else {
                    next(false)
                }
            }
        },
        {
            name: 'PaySuccess',
            path: '/PaySuccess',
            component: PaySuccess,
            meta: {
                isShow: true
            },
            beforeEnter(to, from, next) {
                if (from.path === '/Pay') {
                    next()
                } else {
                    next(false)
                }
            }
        },
        {
            name: 'Center',
            path: '/Center',
            component: Center,
            //路由重定向 默认显示
            redirect: '/Center/MyOrder',
            meta: {
                isShow: false
            },
            children: [{
                name: 'MyOrder',
                path: 'MyOrder',
                component: MyOrder
            }, {
                name: 'GroupOrder',
                path: 'GroupOrder',
                component: GroupOrder
            }]
        }
    ],
    //控制路由跳转后 显示的页面程度
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    },
});
//全局前置路由守卫
//to代表用户想去的路径 from代表用户从哪个路径跳转的  next 符合规则则放行到哪个路由
export default Route