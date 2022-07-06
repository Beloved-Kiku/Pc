//商品详情数据模块
//按需引入UUID生成函数
import { getUUid } from '@/utils/uuid_user'
import Vue from "vue"
const state = {
    DetailList: {},
    ShopCarList: {},
    //在购物车提交数据给服务器时候应该带上每一个顾客的唯一id
    //用户的token通常我们都是在请求拦截器中进行请求头的配置并且将数据传给服务器
    uuid_token: getUUid()
}
const actions = {
    async GetDetailMsg({ commit }, skuId) {
        let DetailValue = await Vue.prototype.$axios({
            url: `http://gmall-h5-api.atguigu.cn/api/item/${skuId}`,
            method: 'get',
        })
        if (DetailValue.code == 200)
            commit('DetailList', DetailValue.data)
    },
}

const mutations = {
        DetailList(state, value) {
            state.DetailList = value
        }
    }
    //简化数据
const getters = {
    NavName(state) {
        //可能请求未发出 是空对象 然后 对空对象进行赋值 导致undefind  所以这里设置一下返回数据 或者一个对象
        return state.DetailList.categoryView || {}
    },
    skuInfo(state) {
        return state.DetailList.skuInfo || {}
    },
    //简化商品属性数据
    skuSaleAttrValue(state) {
        return state.DetailList.skuInfo.skuSaleAttrValueList || []
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}