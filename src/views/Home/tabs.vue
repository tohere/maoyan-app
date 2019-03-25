<template>
  <!-- 首页tabbar -->
  <div class="tab-bar">
    <div class="left df-c">
      {{ userAddress.city || '北京市' }}
      <i class="iconfont icon-xia"></i>
    </div>
    <div class="center">
      <div v-for="(item, index) in tabs" :key="index" :class="{active: index === tabIndex}" @click="changeTab(index)">{{ item }}</div>
    </div>
    <div class="right iconfont icon-search-1-copy"></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'tabs',
  data () {
    return {
      tabIndex: 0,
      tabs: ['正在热映', '即将上映']
    }
  },
  methods: {
    // 获取电影数据
    changeTab (index) {
      this.tabIndex = index
      this.$emit('changeTab', index)
    }
  },
  mounted () {
    console.log(this.userAddress)
  },
  computed: {
    ...mapGetters(['userAddress'])
  }
}
</script>

<style lang="less" scoped>
.tab-bar {
  display: flex;
  font-size: .16rem;
  justify-content: center;
  position: relative;
  height: .44rem;
  align-items: center;
  border-bottom: 1px solid #eaeaea;
  .left {
    padding: .1rem .15rem;
    font-size: .14rem;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    .iconfont {
      font-size: .12rem;
      color: #aaa;
      position: relative;
      left: .02rem;
    }
  }
  .center {
    display: flex;
    height: 100%;
    line-height: .4rem;
    div {
      margin: 0 .1rem;
      padding: 0 .1rem;
      border-bottom: 2px solid transparent;
      font-size: .15rem;
      font-weight: bold;
    }
    .active {
      border-bottom-color: @theme-red;
      color: @theme-red
    }
  }
  .right {
    position: absolute;
    width: .44rem;
    height: .44rem;
    right: 0;
    top: 0;
    line-height: .44rem;
    text-align: center;
    font-size: .20rem;
    font-weight: bold;
    color: @theme-red;
  }
}
</style>
