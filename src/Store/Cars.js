import Vue from "vue"
const state = {
    CARSLIST: {

    }
}
const actions = {
    async getCarsMsg({ commit }) {
        let Cars = await Vue.prototype.$axios({
            url: 'http://gmall-h5-api.atguigu.cn/api/cart/cartList',
            method: 'GET'
        })
        if (Cars.code = 200) {
            commit('ShopCarMsg', Cars.data)
        }
    }
}
const mutations = {
    ShopCarMsg(state, value) {
        state.CARSLIST = value

    }
}
const getters = {
    CARSLISTMsg(state) {
        return state.CARSLIST[0] || {}
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}