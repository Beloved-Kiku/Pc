<template>
  <div>
    <Type_Nav></Type_Nav>
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Brand />
    <Logistics />
    <Floor v-for="F in FloorArray" :key="F.id" :list="F" />
  </div>
</template>

<script>
import ListContainer from "./list-container/index.vue";
import Recommend from "./Recommend/index.vue";
import Rank from "./Rank/index.vue";
import Like from "./Like/index.vue";
import Brand from "./Brand/index.vue";
import Logistics from "./Logistics/index.vue";
import { mapState } from "vuex";
import Floor from './Floor/index.vue';
export default {
    name: "Home",
    data() {
        return {};
    },
    components: { ListContainer, Recommend, Rank, Like, Brand, Logistics, Floor },
    computed:{
      ...mapState({
        FloorArray:(state) =>state.home.FloorList,
      },), 
    }, 
    mounted(){
      this.$store.dispatch('getFloor');
      //发起用户token校验 获取数据
      this.$store.dispatch('getToken',localStorage.getItem('UserToken'));
    }
}
</script>

<style>
</style>