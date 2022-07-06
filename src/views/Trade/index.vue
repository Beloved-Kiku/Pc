<template>
  <div class="trade-container">
  <el-button type="" icon="el-icon-eleme">Cv工程师</el-button>
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <div
        class="address clearFix"
        v-for="address in Address"
        :key="address.id"
      >
        <span class="username" :class="{ selected: address.isDefault == 1 }">{{
          address.consignee
        }}</span>
        <p @click="changeID(Address, address)">
          <span class="s1">{{ address.fullAddress }}</span>
          <span class="s2">{{ address.phoneNum }}</span>
          <span class="s3">{{ address.userAddress }}</span>
        </p>
      </div>
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix" @click="payActions($event)">
        <span class="username">在线支付</span>
        <span class="username" style="margin-left: 5px">货到付款</span>
      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间:预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul
          class="list clearFix"
          v-for="(Commodity, index) in DetailArrayList"
          :key="index"
        >
          <li>
            <img
              :src="Commodity.imgUrl"
              alt=""
              style="width: 100px"
              height="100px"
            />
          </li>
          <li>
            <p>
              {{ Commodity.skuName }}
            </p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>{{ Commodity.orderPrice * Commodity.skuNum }}.00</h3>
          </li>
          <li>{{ Commodity.skuNum }}</li>
          <li>有货</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea
          placeholder="建议留言前先与商家沟通确认"
          class="remarks-cont"
          v-model="UserMsg"
        ></textarea>
      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b
            ><i>{{ totalNum }}</i
            >件商品，总商品金额</b
          >
          <span>¥{{ totalPrice }}</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">
        应付金额:　<span>{{ totalPrice }}.00</span>
      </div>
      <div class="receiveInfo">
        寄送至:
        <span>{{ UserInfo.fullAddress }}</span>
        收货人：<span>{{ UserInfo.consignee }}</span>
        <span>{{ UserInfo.phoneNum }}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <a class="subBtn" @click="SendOder">提交订单</a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Trade",
  data() {
    return {
      //收集用户留言表单
      UserMsg: "",
      OrderId:''
    };
  },
  mounted() {
    //获取用户地址
    this.$store.dispatch("GetAddress");
    //获取商品信息
    this.$store.dispatch("GetCommodity");
  },
  computed: {
    ...mapGetters([
      "Address",
      "DetailArrayList",
      "totalPrice",
      "totalNum",
      "tradeNo",
    ]),
    //计算收件人
    UserInfo() {
      return this.Address.find((item) => item.isDefault == 1) || {};
    },
    //总价格
  },
  methods: {
    changeID(a, b) {
      a.forEach((item) => {
        item.isDefault = 0;
      });
      b.isDefault = 1;
    },
    payActions(e) {
      console.log(e);
    },
    async SendOder() {
      //提交订单 向服务器发送请求 携带数据 返回订单结果 已经唯一订单号
      let AllMsg = {
        consignee: this.UserInfo.consignee,
        consigneeTel: this.UserInfo.phoneNum,
        deliveryAddress: this.UserInfo.fullAddress,
        paymentWay: "ONLINE",
        orderComment: this.UserMsg,
        orderDetailList: this.DetailArrayList,
      };
      let result = await this.$axios({
        url: `http://gmall-h5-api.atguigu.cn/api/order/auth/submitOrder?tradeNo=${this.tradeNo}`,
        data: AllMsg,
        method: "POST",
      });
      if(result.code===200){
        this.OrderId  = result.data
        this.$router.push({
          name:'Pay',
          query:{
            OrderId:this.OrderId
          }
        })
      }
    },
  },
};
</script>

<style lang="less" scoped>
.trade-container {
  .title {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 21px;
  }

  .content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid rgb(221, 221, 221);
    padding: 25px;
    box-sizing: border-box;

    .receive,
    .pay {
      line-height: 36px;
      margin: 18px 0;
    }

    .address {
      padding-left: 20px;
      margin-bottom: 15px;

      .username {
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ddd;
        position: relative;
      }

      .username::after {
        content: "";
        display: none;
        width: 13px;
        height: 13px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: url(./images/choosed.png) no-repeat;
      }

      .username.selected {
        border-color: #e1251b;
      }

      .username.selected::after {
        display: block;
      }

      p {
        width: 610px;
        float: left;
        line-height: 30px;
        margin-left: 10px;
        padding-left: 5px;
        cursor: pointer;

        .s1 {
          float: left;
        }

        .s2 {
          float: left;
          margin: 0 5px;
        }

        .s3 {
          float: left;
          width: 56px;
          height: 24px;
          line-height: 24px;
          margin-left: 10px;
          background-color: #878787;
          color: #fff;
          margin-top: 3px;
          text-align: center;
        }
      }

      p:hover {
        background-color: #ddd;
      }
    }

    .line {
      height: 1px;
      background-color: #ddd;
    }

    .way {
      width: 1080px;
      height: 110px;
      background: #f4f4f4;
      padding: 15px;
      margin: 0 auto;

      h5 {
        line-height: 50px;
      }

      .info {
        margin-top: 20px;

        .s1 {
          float: left;
          border: 1px solid #ddd;
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;
        }

        p {
          line-height: 30px;
        }
      }
    }

    .detail {
      width: 1080px;

      background: #feedef;
      padding: 15px;
      margin: 2px auto 0;

      h5 {
        line-height: 50px;
      }

      .list {
        display: flex;
        justify-content: space-between;

        li {
          line-height: 30px;

          p {
            margin-bottom: 20px;
          }

          h4 {
            color: #c81623;
            font-weight: 400;
          }

          h3 {
            color: #e12228;
          }
        }
      }
    }

    .bbs {
      margin-bottom: 15px;

      h5 {
        line-height: 50px;
      }

      textarea {
        width: 100%;
        border-color: #e4e2e2;
        line-height: 1.8;
        outline: none;
        resize: none;
      }
    }

    .bill {
      h5 {
        line-height: 50px;
      }

      div {
        padding-left: 15px;
      }
    }
  }

  .money {
    width: 1200px;
    margin: 20px auto;

    ul {
      width: 220px;
      float: right;

      li {
        line-height: 30px;
        display: flex;
        justify-content: space-between;
        width: 200px;
        height: 100px;

        i {
          color: red;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .trade {
    box-sizing: border-box;
    width: 1200px;
    padding: 10px;
    margin: 10px auto;
    text-align: right;
    background-color: #f4f4f4;
    border: 1px solid #ddd;

    div {
      line-height: 30px;
    }

    .price span {
      color: #e12228;
      font-weight: 700;
      font-size: 14px;
    }

    .receiveInfo {
      color: #999;
    }
  }

  .sub {
    width: 1200px;
    margin: 0 auto 10px;

    .subBtn {
      float: right;
      width: 164px;
      height: 56px;
      font: 700 18px "微软雅黑";
      line-height: 56px;
      text-align: center;
      color: #fff;
      background-color: #e1251b;
    }
  }
}
</style>