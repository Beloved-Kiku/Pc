<template>
  <!--今日推荐-->
  <div class="ALL">
    <div class="py-container">
      <div class="recommend">
        <div class="clock">
          <div class="time">
            <img src="@/assets/Recommend/clock.png" alt="" />
          </div>
          <h3>今日推荐</h3>
        </div>
        <ul class="pic_list">
          <div class="swiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <img src="@/assets/lunbotu/Kiku.jpg" alt="" />
                <img src="@/assets/lunbotu/Kiku5.jpg" alt="" />
                <img src="@/assets/lunbotu/Kiku1.jpg" alt="" />
              </div>
              <div class="swiper-slide">
                <img src="@/assets/lunbotu/Kiku.jpg" alt="" />
                <img src="@/assets/lunbotu/Kiku5.jpg" alt="" />
                <img src="@/assets/lunbotu/Kiku1.jpg" alt="" />
              </div>
              <div class="swiper-slide">
                <img src="@/assets/lunbotu/Kiku.jpg" alt="" />
                <img src="@/assets/lunbotu/Kiku5.jpg" alt="" />
                <img src="@/assets/lunbotu/Kiku1.jpg" alt="" />
              </div>
              <div class="swiper-slide">
                <img src="@/assets/lunbotu/Kiku.jpg" alt="" />
                <img src="@/assets/lunbotu/Kiku5.jpg" alt="" />
                <img src="@/assets/lunbotu/Kiku1.jpg" alt="" />
              </div>
              <div class="swiper-slide">
                <img src="@/assets/lunbotu/Kiku.jpg" alt="" />
                <img src="@/assets/lunbotu/Kiku5.jpg" alt="" />
                <img src="@/assets/lunbotu/Kiku1.jpg" alt="" />
              </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  data() {
    return {};
  },
  mounted() {
    setTimeout(() => {
      var mySwiper = new Swiper(".swiper", {
        loop: true, // 循环模式选项
        autoplay: true,
        speed: 2000,
        // 如果需要分页
        slidesPerView: "auto",
        // 如果需要前进后退按钮
        slidesPerView: 5,
        // 如果需要滚动条
        scrollbar: {
          el: ".swiper-scrollbar",
        },
      });
    }, 200);
  },
};
</script>

<style lang="css" scoped>
.ALL {
  width: 100%;
  background-color: #ffffff;
  margin-top: 15px;
}
.py-container {
  width: 1200px;
  margin: 0 auto;
  height: 200px;
}
.recommend {
  height: 165px;
  border-radius: 5px;
  background-color: #eaeaea;
  margin: 10px 0;
  display: flex;
}
.clock {
  width: 16.67%;
  background-color: #5c5251;
  color: #fff;
  font-size: 18px;
  text-align: center;
}
.time {
  padding: 30px;
}
h3 {
  margin: 9px 0;
  font-weight: 700;
  font-size: 18px;
  line-height: 30.06px;
}
.pic_list {
  width: 83.33%;
  background-color: pink;
}
.pic_list .swiper {
  overflow: hidden;
  display: flex;
  width: 83.33%;
  height: 165px;
}
.swiper-wrapper {
  width: 83.33%;
  background-color: #fff;
}
.swiper-slide {
  display: flex;
  margin-right: 10px;
}
.swiper-wrapper img {
  height: 165px;
}
</style>