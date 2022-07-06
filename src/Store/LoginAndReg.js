import Vue from 'vue'
import router from "@/views/route"
const state = {
    User_code: ''
}
const actions = {
    //获取验证码接口
    async Get({ commit }, phone) {
        let GetCode = await Vue.prototype.$axios({
            url: `http://gmall-h5-api.atguigu.cn/api/user/passport/sendCode/${phone}`,
            method: 'GET',
        });
        if (GetCode.code == 200) {
            commit('Code', GetCode.data)
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //注册接口
    async SuccessRegister({ commit }, userMsg) {
        let Register = await Vue.prototype.$axios({
            url: `http://gmall-h5-api.atguigu.cn/api/user/passport/register`,
            method: "POST",
            //配置data 若接口中没有允许携带参数 则从data中寻找
            data: userMsg
        });
        //判断是否有该用户 或者 是否注册 成功  成功跳转  失败 返回原因并且回到当前界面
        if (Register.code == 200) {
            router.push({
                name: 'Login'
            })
        } else if (Register.code === 223) {
            alert(Register.message);
            router.push({
                name: 'Register'
            })
        }
    },
    //用户登录验证接口
    async LoginTest({ commit }, data) {
        console.log(data);
        let LoginTestValue = await Vue.prototype.$axios({
            url: "http://gmall-h5-api.atguigu.cn/api/user/passport/login",
            method: 'POST',
            data
        });
        if (LoginTestValue.code === 200) {
            // 登录成功 存储用户唯一标识token
            localStorage.setItem('UserToken', LoginTestValue.data.token);
            router.push({
                name: 'Home'
            })
        }
    }
}
const mutations = {
    Code(state, value) {
        state.User_code = value
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