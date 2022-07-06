import Vue from "vue";
//配置数据 并且抛出
const state = {
    SearchList: {}
}
const actions = {
    //搜索模块 分为两种情况 
    //1.用户传参 2用户未传 单纯点击进入  此时我们应该向服务器传一个空的数据  所以我们通过POST请求获取到初始化的数据 
    async GetSearch({ commit }, value = {}) {
        console.log(1);
        let Post_Search = await Vue.prototype.$axios({
            url: 'http://gmall-h5-api.atguigu.cn/api/list',
            method: 'post',
            data: value
        })
        if (Post_Search.code == 200) {
            commit('SEARCHVALUE', Post_Search.data)
        }
    }
}
const mutations = {
        SEARCHVALUE(state, data) {
            state.SearchList = data
            console.log(state.SearchList);
        }
    }
    //getters  用于简化接口返回的数据
const getters = {
    mobileList(state) {
        return state.SearchList.goodsList
    },
    PageList(state) {
        return state.SearchList.pageSize
    },
    attrsList(state) {
        return state.SearchList.attrsList
    },
    trademarkList(state) {
        return state.SearchList.trademarkList
    }

}
export default {
    state,
    actions,
    mutations,
    getters
}