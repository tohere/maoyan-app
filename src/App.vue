<template>
  <div id="app">
    <main class="sc-h">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </main>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import TabBar from './components/TabBar'
export default {
  name: 'App',
  components: {
    TabBar
  },
  created () {
    this.initMap()
  },
  methods: {
    initMap () {
      // eslint-disable-next-line
      AMap.plugin('AMap.CitySearch', () => {
        // eslint-disable-next-line
        const citySearch = new AMap.CitySearch()
        citySearch.getLocalCity((status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            // 查询成功，result即为当前所在城市信息
            console.log(this.$store)
            this.$store.dispatch('setAddress', result)
          } else {
            this.$toast('定位失败!')
          }
        })
      })
    }
  }
}
</script>

<style>
@import url('./assets/css/reset');
@import url('./assets/css/common');
html {
  font-size: 100px;
}
html, body, #app {
  width: 100%;
  height: 100%;
  color: #333;
}
.mint-header.is-fixed, .mint-header {
  height: .5rem;
  font-size: .18rem;
  background-color: #f03d37;
}
main {
  height: calc(100% - .5rem);
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
}
.sc-h::-webkit-scrollbar {
  display: none;
}
</style>
