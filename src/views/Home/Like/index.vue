<template>
  <!-- 猜你喜欢 -->
  <div class="ALL">
  <div class="like">
    <div class="py-container">
      <div class="title">
        <h3 class="fl">猜你喜欢</h3>
        <a href="javascript:;" class="fr tip changeBnt" @click="change">换一换</a>
      </div>
      <div class="bd">
        <ul class="favourate">
          <li v-for="(like) in like_list" :key="like.id">
            <img :src="like.imageUrl" alt="" />
            <div class="like-text">
              <p>{{like.value}}</p>
              <h3>{{like.price}}</h3>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      LikeArr :[],
      pageNum :0,
      pageSize :5,
      newArr:[]
    }
  },
  mounted(){
    this.$store.dispatch("getLike")
    
  },
  computed:{
  ...mapState({
    like_list:(state) =>  state.home.LIKE_LIST
    
  })
  },
  methods:{
    change(){
          this.$mock('/like.json').then(res=>{
            this.LikeArr =res
            if(this.pageNum==4){
              this.pageNum = 0
            }
              this.newList = this.LikeArr.slice((this.pageNum+1) *this.pageSize,this.pageNum*(this.pageSize+1))
              this.pageNum++
          })
    }
  }
};
</script>

<style lang="less" scoped>
.ALL{
    width:1400px;
       margin: 0 auto;
    background-color: #ffffff;
}
.like {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      overflow: hidden;

      .fl {
        float: left;
        font-size: 20px;
        line-height: 30px;
      }

      .fr {
        float: right;
        background-image: url(@/assets/icons.png);
        width: 66px;
        height: 25px;
        background-position: 182px -104px;
        line-height: 30px;
        font-size: 12px;
        font-weight: 400;
        color: #666;
        text-decoration: none;
      }
    }

    .bd {
      .favourate {
        border: 1px solid #e4e4e4;
        overflow: hidden;
        padding: 0 10px;
        box-sizing: border-box;
        display: flex;

        li {
          height: 250px;
          margin: 0 -1px;
          overflow: hidden;
          background: #fff;
          position: relative;
          width: 16.667%;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;

          img {
            width: 142px;
            height: 142px;
            transition: all 400ms;

            &:hover {
              opacity: 0.8;
              transform: scale(1.1);
            }
          }

          .like-text {
            padding: 0;
            width: 142px;
            border-right: 1px solid #e4e4e4;

            p {
              margin: 5px 0;
            }

            h3 {
              color: #df3033;
              font-size: 20px;
              line-height: 30px;
              margin: 9px 0;
              font-weight: 700;
            }
          }
        }
      }
    }
  }
}
</style>