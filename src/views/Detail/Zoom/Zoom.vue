<template>
  <div class="spec-preview" >
    <img :src="Pic_value.imgUrl"  />
    <div class="event"></div>
    <div class="big">
      <img :src="Pic_value.imgUrl" />
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    data() {
      return { 
        index:0
      }
    },
    mounted(){
      this.$bus.$on('sendIndex',(data)=>{
        console.log(data);
        this.index  =data
      })
    },
    //计算出的数据自动在Vue实例身上  
    //实现 点击轮播图 显示指定图片
    computed:{
      Pic_value(){
        return this.Pic[this.index]||{}
      }
    },
      props:['Pic'],
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>