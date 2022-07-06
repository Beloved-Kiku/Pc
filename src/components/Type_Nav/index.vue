<template>
  <div class="type-nav" >
    <div class="container" @mouseenter="list_show" @mouseleave="list_none">
      <h2 class="all" >全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <div class="sort" v-show="show">
        <div class="all-sort-list2">
          <div class="item" v-for="c1 in value" :key="c1.categoryId">
            <h3>
              <a :data-id="c1">{{ c1.categoryName }}</a>
            </h3>
            <div class="item-list clearfix">
              <div
                class="subitem"
                v-for="c2 in c1.categoryChild"
                :key="c2.categoryId"
              >
                <dl class="fore">
                  <dt>
                    <a :data-id="c1"> {{ c2.categoryName }}</a>
                  </dt>
                  <dd>
                    <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                      <a :data-id="c1">{{ c3.categoryName }}</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//引入map 简化
import { mapState } from "vuex";
export default {
  name: "Type_Nav",
  data() {
    return {
      current: -1,
      show:true,
    };
  },
  computed: {
    //MapState 搭配函数实现传递参数
    ...mapState({
      //函数式生成传入的state是所有vueX数据的集合
      value: (state) => {
        return state.home.LIST_VALUE;
      },
    }),
  },
  methods: {
    list_show(){
        this.show =true
    },
    list_none(){
      if(this.$route.name!="Home"){
        this.show = false
      }
    }
    //事件委派 实现 所有分类 跳转 实现SEO优化
  },
  mounted() {
    //通过判断路由路径 决定全局组件的显示与否
    if (this.$route.name != "Home") {
      this.show = false;
    }
  },
};
</script>

<style lang="less" scoped>
.item:hover {
  background-color: RED;
}
.background {
  background-color: skyblue;
}
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>