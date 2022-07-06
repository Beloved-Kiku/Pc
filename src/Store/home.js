//模块化Vuex 仓库
import Vue from "vue";
import router from '@/views/route'
//home仓库
const state = {
    LIST_VALUE: [],
    BANNER_LIST: [],
    RIGHT_LIST: [],
    LIKE_LIST: [],
    FloorList: [],
    UserTokenMsg: {}

}
const actions = {
    //三级联动 接口
    async list({ commit }) {
        let list_value = await Vue.prototype.$axios('http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList')
            //发送请求 传递数据给mutation
        if (list_value.code === 200) {
            commit('LIST_DATA', list_value.data)
        }
    },
    //轮播图接口
    async getBannerList({ commit }) {
        let banner = await Vue.prototype.$mock('/banner.json');
        commit('bannerList', banner)
    },
    //右侧列表接口
    async getRight_list({ commit }) {
        let Right_list = await Vue.prototype.$mock('/list.json');
        commit('right_list', Right_list)
    },
    //  推荐喜欢接口
    async getLike({ commit }) {
        let Like_list = await Vue.prototype.$mock('/like.json')
        commit('like_list', Like_list)
    },
    //获取Floor数据
    async getFloor({ commit }) {
        let FloorList = await Vue.prototype.$mock('/floor.json')
        commit('setFloor', FloorList)
    },
    //校验token 获取用户数据信息
    async getToken({ commit }, token) {
        console.log('home请求中的Token', token);
        let TokenMsg = await Vue.prototype.$axios({
            url: 'http://gmall-h5-api.atguigu.cn/api/user/passport/auth/getUserInfo',
            method: 'GET',
            data: token
        });
        if (TokenMsg.code === 200) {
            commit('TokenMsg', TokenMsg.data)
        }
    },
    //退出
    async loginOut({ commit }) {
        let LoginOut = await Vue.prototype.$axios({
            url: 'http://gmall-h5-api.atguigu.cn/api/user/passport/logout',
            method: 'GET'
        });
        if (LoginOut.code === 200) {
            commit('ClearMsg');
            router.push({
                name: 'Login'
            })
        }
    }
}
const mutations = {
    LIST_DATA(state, List_Value) {
        state.LIST_VALUE = List_Value.slice(0, 16)
    },
    //轮播图数据处理
    bannerList(state, banner) {
        state.BANNER_LIST = banner
    },
    //主页右侧数据
    right_list(state, list_value) {
        state.RIGHT_LIST = list_value
    },
    //猜你喜欢 
    like_list(state, Like_list) {
        state.LIKE_LIST = Like_list
    },
    //Floor
    setFloor(state, FloorList) {
        state.FloorList = FloorList
    },
    //存储Token数据到Vuex中
    TokenMsg(state, value) {
        state.UserTokenMsg = value
    },
    //退出 清除一系列数据
    ClearMsg(state) {
        //清除Vuex 内的数据
        state.UserTokenMsg = {}
            //清除浏览器缓存
        localStorage.clear()
    }
}
const getters = {

}
export default {
    state,
    actions,
    mutations,
    getters
}