<template>
  <div>
    <div class="ALL">
      <div class="logistics">
        <ul class="logistics_list">
          <li>
            <h4 class="list_icon_duo">
            </h4>
            <p class="list_text">品类齐全,轻松购物</p>
          </li>
          <li>
            <h4 class="list_icon_kuai"></h4>    
              <p class="list_text">多仓直发,急速配达</p>
          </li>
          <li>
            <h4 class="list_icon_hao"></h4>
            <p class="list_text">正品行货,精致服务</p>
          </li>
          <li>
            <h4 class="list_icon_sheng"></h4>
            <p class="list_text">天天低价,随心选购</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="css" scoped>
.ALL {
  width: 100%;
  margin: 0 auto;
}
.ALL .logistics {
  width: 1200px;
  height: 80px;
  margin: auto;
}
.ALL .logistics_list {
  display: flex;
  height: 80px;
  justify-content: center;
  align-items: center;
}
.ALL .logistics_list li {
  display: flex;
  flex: 1;
  background: -webkit-linear-gradient(
    left,
    #147b96,
    #e6d205 25%,
    #147b96 50%,
    #e6d205 75%,
    #147b96
  );
  color: transparent;
  -webkit-background-clip: text;
  background-size: 200% 100%;
  animation: text 800ms infinite linear;
}
.logistics_list .list_icon_duo {
  width: 42px;
  height: 50px;
  background: url(@/assets/Logistics/duo.png);
  margin-right: 15px;
}
.logistics_list .list_icon_kuai {
  width: 50px;
  height:50px;
  background: url(@/assets/Logistics/kuai.png);
  margin-right: 15px;
}
.logistics_list .list_icon_hao {
  width: 50px;
  height: 48px;
  background: url(@/assets/Logistics/hao.png);
  margin-right: 15px;
}
.logistics_list .list_icon_sheng {
  width: 50px;
  height: 50px;
  background: url(@/assets/Logistics/sheng.png);
  margin-right: 15px;
}
.logistics_list .list_text {
  font-size: 18px;
  height: 42px;
  line-height: 42px;
  font-weight: 700;
  white-space: nowrap;
  text-overflow: ellipsis;
}
@keyframes text {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}
.text {
  position: relative;
  width: 57%;
  max-width: 531px;
}
.text .mask {
  position: absolute;
  width: 100%;
  height: 95%;
  top: 0;
  left: 0;
}

.text .mask i {
  position: absolute;
  height: 100%;
  width: 20%;
  left: 0;
  top: 0;
  background: -webkit-linear-gradient(
      left,
      #561214,
      #febaf7 50%,
      #ff0 90%,
      #561214
    )
    no-repeat 0 0;
  animation: lightLine1 4s linear infinite;
  -webkit-animation: lightLine1 4s linear infinite;
  background-size: 100% 100%;
}
@keyframes lightLine1 {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(500%);
  }
}
</style>