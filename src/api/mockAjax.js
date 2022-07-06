//引入axios//对于axios进行二次封装
import Vue from "vue";
import axios from "axios";
//引入进度条
import nprogress from 'nprogress';
//引入相关进度条的样式
import "nprogress/nprogress.css";

//axios.create方法执行,其实返回一个axios和request一样的
let requestsMock = axios.create({
    //基础路径,发请求URL携带api【发现:真实服务器接口都携带/api】
    baseURL: "http://localhost:8080/mock",
    //超时的设置
    timeout: 5000
});

//请求拦截器:将来项目中【N个请求】，只要发请求,会触发请求拦截器!!!
requestsMock.interceptors.request.use(config => {
    //请求拦截器:请求头【header】,请求头能否给服务器携带参数
    //请求拦截器：其实项目中还有一个重要的作用,给服务器携带请求们的公共的参数
    //进度条开始
    nprogress.start();
    //token[公共参数]
    // config.headers.userTempId = SET_USERID();
    //不管那个模块发请求,请求拦截器，都可以触发。请求拦截器可以通过请求头每一次协大公共参数给服务器【用户未登录的临时身份】
    return config;
});


//响应拦截器：请求数据返回会执行
requestsMock.interceptors.response.use((res) => {
    //res:实质就是项目中发请求、服务器返回的数据
    //进度条结束
    nprogress.done();
    return res.data;
}, (err) => {
    //温馨提示:某一天发请求,请求失败,请求失败的信息打印出来
    alert(err.message);
    //终止Promise链
    return err
});

//最后需要暴露:暴露的是添加新的功能的axios,即为requests
Vue.prototype.$mock = requestsMock
export default requestsMock;