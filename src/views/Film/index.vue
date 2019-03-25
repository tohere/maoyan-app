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
    <div class="bot">
      <FilmContent :cinemas='cinemas' />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import FilmTab from './FilmTab'
import FilmContent from './FilmContent'
import { getFilms } from '@/api/getData'
export default {
  name: 'Film',
  components: {
    FilmTab,
    FilmContent
  },
  data () {
    return {
      cinemas: []
    }
  },
  computed: {
    ...mapGetters(['userAddress'])
  },
  created () {
    this.getFilmsData()
  },
  methods: {
    async getFilmsData () {
      const date = new Date()
      const y = date.getFullYear()
      let m = date.getMonth()
      let d = date.getDate()
      m = m < 10 ? '0' + m : m
      d = d < 10 ? '0' + d : d
      const day = `${y}-${m}-${d}`
      const {data: {cinemas}} = await getFilms(day)
      this.cinemas = cinemas
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
    width: 100%;
    background-color: #fff;
    z-index: 100;
  }
  .bot {
    position: relative;
    width: 100%;
    height: calc(100% - 1.35rem);
    top: 1.35rem;
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
</style>
