<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList" v-show="!UserInfo.name">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <router-link to="/Login" class="login">登录</router-link>
            <router-link to="/Register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="loginList" v-show="UserInfo.name">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>{{ UserInfo.name }}</span>&nbsp;&nbsp;
         <a @click="gotoCart">去我的购物车</a> &nbsp;&nbsp;
         <a @click="loginOut">退出登录</a>
          </p>
        </div>
        <div class="typeList">
        <router-link to="/center/MyOrder"><a>我的订单</a></router-link>
        <router-link to="/shopCart"><a>我的购物车</a></router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/Home" class="logo" title="Beloved">
          <img src="@/assets/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="Search_val"
            @keyup.enter="goto_Search"
            ref="Search_input"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            @click="go_Search"
            type="button"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      Search_val: "",
    };
  },
  methods: {
    //编程式路由导航 实现搜索传参
    go_Search() {
      if (this.Search_val.length === 0) {
        alert("请输入您想搜索的");
      } else {
        //利用正则 加trim()实现 输入空格清除
        const value = this.Search_val.replace(/\s*/g, "").trim();
        this.$router.push({
          path: "/Search",
          //跳转 路由传参
          query: {
            Search_key: value,
          },
        });
      }
    },
    //键盘搜索事件
    goto_Search() {
      if (this.Search_val.length === 0) {
        alert("请输入您想搜索的");
      }
      this.$router.push({
        path: "/Search",
        query: {
          Search_key: this.Search_val,
        },
      });
    },
    //编程式路由跳转
    gotoCart(){
      this.$router.push({
        name:'shopCart'
      })
    },
    //退出
    loginOut(){
      this.$store.dispatch('loginOut')
    }
  },
  mounted() {
    //页面挂载 焦点事件触发
    this.$refs.Search_input.focus();
    //页面挂载触发全局事件总线
    this.$bus.$on("clearInput", () => {
      this.Search_val = "";
    });
  },
  computed: {
    ...mapState({
      UserInfo: (state) => state.home.UserTokenMsg,
    }),
  },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>