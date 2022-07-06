<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in EndMsg" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked === 1" @click="changeCheck(cart,$event.target.checked)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" alt="" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00 </span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="addSend('delete', -1, cart)">-</a>
            <input
              autocomplete="off"
              type="text"
              class="itxt"
              :value="cart.skuNum"
              @click="addSend('input', $event.target.value * 1, cart)"
            />
            <a class="plus" @click="addSend('add', 0, cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum" style="color: red">{{
              cart.skuNum * cart.skuPrice
            }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="Delete(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isChecked" />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="DeleteChecked(cart)">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span></span>件商品</div>
        <div class="sumprice">
          <em style="color: darkred">总价不含运费:￥{{ totalPrice }}</em>
          <i class="summoney"></i>
        </div>
        <div class="sumbtn">
          <!-- 路由跳转:没有任何业务逻辑,声明式、编程式导航都可以 -->
          <a @click="goTrade">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
//引入节流库
import { throttle } from "lodash";
export default {
  name: "ShopCart",
  data() {
    return {};
  },
  //组件挂载完毕,获取购物车的数据
  mounted() {
    this.$store.dispatch("getCarsMsg");
  },
  computed: {
    ...mapGetters(["CARSLISTMsg"]),
    //购物车最终数据
    EndMsg() {
      return this.CARSLISTMsg.cartInfoList || [];
    },
    totalPrice() {
      //计算购物车中所有价格总和
      let sum = 0;
      this.EndMsg.forEach((item) => {
        if(item.isChecked==1){
         sum += item.skuNum * item.skuPrice;
        } 
      });
      return sum;
    },
    CheckTotal(){
      return  
    },
    //判断底部复选框状态
    isChecked() {
      return this.EndMsg.every((item) => item.isChecked === 1);
    },
  },
  methods: {
    //接口数量的增删改查
    //此处添加修改都需要用到共同的请求   使用形参进行区分 将商品id返回给服务器
    addSend: throttle(async function (type, disNum, cart) {
      switch (type) {
        case "add":
          disNum = 1;
          console.log("删除被调用了");
          break;
        case "delete":
          console.log(11111);
          //  debugger;
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        case "input":
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            //每次输入完 服务器中的商品数量都会改变
            //我们则需要用用户输入的减去 当前服务器中的数量 得到一个新的值 再把这个值传给服务器  服务器最终的值由返回值+服务器中已经存储的上一次的商品数量
            disNum = parseInt(disNum) - parseInt(cart.skuNum);
          }
      }
      const Xiugai = await this.$axios({
        url: `http://gmall-h5-api.atguigu.cn/api/cart/addToCart/${cart.skuId}/${disNum}`,
        method: "POST",
      });
      if (Xiugai.code == 200) {
        this.$store.dispatch("getCarsMsg");
      }
    }, 1000),
    //购物车数据的删除 通过商品id 进行删除
    async Delete(cart) {
      let DeleteMsg = await this.$axios({
        url: `http://gmall-h5-api.atguigu.cn/api/cart/deleteCart/${cart.skuId}`,
        method: "DELETE",
      });
      if (DeleteMsg.code == 200) {
        this.$store.dispatch("getCarsMsg");
      } else {
        console.log(DeleteMsg.message);
      }
    },
    //修改商品状态check_list(
  async   changeCheck(cart,check){
      let num   =check ? "1":"0"
    //  console.log(check);
   let checkValue =   await  this.$axios({
        url:`http://gmall-h5-api.atguigu.cn/api/cart/checkCart/${cart.skuId}/${num}`
      })
      if(checkValue.code==200){
       this.$store.dispatch("getCarsMsg");
      }
      else{
        alert(checkValue.message)
      }
    },
      DeleteChecked(e){
    console.log(e.isChecked);
  },
    //去到结算页面
    goTrade(){
      this.$router.push({
        name:'Trade'
      })
  }
  },


};
</script>
<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>