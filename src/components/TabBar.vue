<template>
  <!-- tabbar组件 -->
  <mt-tabbar v-model="selected" fixed>
    <mt-tab-item id="tab1" @click.native="$router.push('/home')">
      <i class="iconfont icon-dianying"></i>
      <p>电影</p>
    </mt-tab-item>
    <mt-tab-item id="tab2" @click.native="$router.push('/film')">
      <i class="iconfont icon-yingyuana"></i>
      <p>影院</p>
    </mt-tab-item>
    <mt-tab-item id="tab3">
      <i class="iconfont icon-wode1"></i>
      <p>我的</p>
    </mt-tab-item>
  </mt-tabbar>
</template>
<script>
export default {
  name: 'TabBar',
  computed: {
    selected: {
      get () {
        if (this.$route.path === '/home') {
          return 'tab1'
        } else if (this.$route.path === '/film') {
          return 'tab2'
        }
      },
      set (val) {
        return val
      }
    }
  }
}
</script>

<style lang="less" scoped>
.mint-tabbar {
  height: .5rem;
}
.mint-tabbar > .mint-tab-item.is-selected {
  background-color: transparent;
  color: @theme-red;
}
.iconfont {
  font-size: .24rem;
}
p {
  margin-top: .04rem;
}
</style>
