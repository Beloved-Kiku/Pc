<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <!---利用路由meta元信息控制组件是否显示-->
    <Footer v-show="$route.meta.isShow" />
  </div>
</template>

<script>
import Header from "./components/Header/Header.vue";
import Footer from "./components/Footer/Footer.vue";
export default {
  data() {
    return {};
  },
  components: { Header, Footer, },
  mounted() {
    //APP加载 发送请求 解决页面切换来回发送请求
    this.$store.dispatch("list");
    //APP全局获取Token
    //采用路由守卫更好的实现该功能
    //  this.$store.dispatch('getToken',localStorage.getItem('UserToken'));
  },
  beforeDestroy(){
    localStorage.removeItem('UserToken')
  }
};
</script>

<style>
body {
  background-color: #f4f4f4;
}
</style>