<template>
  <!-- home页面 -->
  <div class="home">
    <mt-header fixed title="猫眼电影"></mt-header>
    <div class="tab-box">
      <Tabs @changeTab='changeTab'></Tabs>
    </div>
    <keep-alive>
      <component class="video-list sc-h" :is='nowCom'></component>
    </keep-alive>
    <tab-bar></tab-bar>
  </div>
</template>
<script>
import Tabs from './tabs'
import Now from './Now'
import Soon from './Soon'
import TabBar from '../../components/TabBar.vue'
export default {
  name: 'Home',
  components: {
    Tabs,
    Now,
    Soon,
    TabBar
  },
  data () {
    return {
      nowCom: 'Now' // 控制当前组件
    }
  },
  methods: {
    /**
     * @Desc tab栏切换事件
     */
    changeTab (index) {
      if (index === 0) {
        this.nowCom = 'Now'
      } else {
        this.nowCom = 'Soon'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.tab-box {
  position: fixed;
  top: .5rem;
  width: 100%;
  height: .44rem;
  background-color: #fff;
  z-index: 99;
}
.video-list {
  height: 100%;
  // height: calc(100% - 1.5rem);
  padding-top: .94rem;
  overflow: auto
}
</style>
