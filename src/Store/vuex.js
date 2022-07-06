import Vue from "vue";
import Vuex from 'vuex'
import home from '@/Store/home'
import Detail from "@/Store/Detail";
import Cars from '@/Store/Cars'
import search from '@/Store/search'
import LoginAndReg from '@/Store/LoginAndReg'
import Trade from '@/Store/Trade'
Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        home,
        search,
        Detail,
        Cars,
        LoginAndReg,
        Trade
    },
})