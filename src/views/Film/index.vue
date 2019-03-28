<template>
  <!-- 影院页面 -->
  <div class="film">
    <div class="top">
      <mt-header title="影院"></mt-header>
      <div class="search df-sb">
        <div class="left">
          <span>{{ userAddress.city }}</span>
          <i class="iconfont icon-xia"></i>
        </div>
        <div class="right">
          <div class="df-c">
            <i class="iconfont icon-search-1-copy"></i>
            <span>搜影院</span>
          </div>
        </div>
      </div>
      <FilmTab />
    </div>
    <div class="bot sc-h">
      <FilmContent v-show='cinemas.length > 0' />
      <div class="no-film df-c" v-show='cinemas.length === 0'>暂无符合条件的影院</div>
    </div>
    <tab-bar></tab-bar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import FilmTab from './FilmTab'
import TabBar from '../../components/TabBar.vue'
import FilmContent from './FilmContent'
import { getFilms } from '@/api/getData'
import { setTime } from '../../utils/util'
export default {
  name: 'Film',
  components: {
    FilmTab,
    FilmContent,
    TabBar
  },
  computed: {
    ...mapGetters(['userAddress', 'cinemas'])
  },
  created () {
    this.getFilmsData()
  },
  methods: {
    /**
     * 获取影院数据
     */
    async getFilmsData () {
      const day = setTime()
      const {data: {cinemas}} = await getFilms(day)
      this.$store.dispatch('setCinemas', cinemas)
    }
  }
}
</script>

<style lang="less" scoped>
.film {
  font-size: .14rem;
  width: 100%;
  height: 100%;
  position: relative;
  .top {
    position: fixed;
    // height: calc(100% - .5rem);
    width: 100%;
    background-color: #fff;
    z-index: 100;
  }
  .bot {
    position: relative;
    width: 100%;
    height: calc(100% - 1.85rem);
    top: 1.35rem;
    overflow-y: auto;
  }
  .search {
    height: .44rem;
    line-height: .44rem;
    background-color: @theme-bg;
    .left {
      padding: 0 .15rem;
      float: left;
      i {
        font-size: .12rem;
        color: #aaa;
      }
    }
    .right {
      flex: 1;
      padding: 0rem .2rem;
      div {
        height: .3rem;
        background-color: #fff;
        border-radius: .04rem;
        border: 1px solid #dadada;
        color: #aaa;
      }
    }
  }
}
.no-film {
  width: 100%;
  height: 100%;
  font-size: .20rem;
  font-weight: bold;
  color: #888;
}
</style>
