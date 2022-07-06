import Vue from "vue"
const state = {
    USERADDRESS: [],
    COMMODITY: {

    }
}
const actions = {
    //获取用户地址
    async GetAddress({ commit }) {
        let result = await Vue.prototype.$axios({
            url: 'http://gmall-h5-api.atguigu.cn/api/user/userAddress/auth/findUserAddressList',
            method: 'GET'
        });
        if (result.code === 200) {
            commit('UserAddress', result.data)
        }
    },
    //获取用户购物商品列表
    async GetCommodity({ commit }) {
        let result = await Vue.prototype.$axios({
            url: 'http://gmall-h5-api.atguigu.cn/api/order/auth/trade',
            method: 'GET',
        });
        if (result.code === 200) {
            commit('CommodityList', result.data)
        }
    },
    //请求地址 路由跳转到提交订单页面 传递参数
}
const mutations = {
    UserAddress(state, Value) {
        state.USERADDRESS = Value
    },
    CommodityList(state, Value) {
        state.COMMODITY = Value
    }
}
const getters = {
    Address() {
        return state.USERADDRESS
    },
    DetailArrayList() {
        return state.COMMODITY.detailArrayList || []
    },
    totalPrice() {
        return state.COMMODITY.totalAmount
    },
    totalNum() {
        return state.COMMODITY.totalNum
    },
    tradeNo() {
        return state.COMMODITY.tradeNo
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}