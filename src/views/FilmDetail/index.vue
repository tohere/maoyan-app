<template>
  <!-- 影院详情页 -->
  <div class="film-detail sc-h">
    <mt-header :title="cinemaData.nm">
      <mt-button icon="back" @click="$router.back()" slot="left"></mt-button>
    </mt-header>
    <div class="addr df-sb">
      <div class="left ellipsis">
        <h3>{{ cinemaData.nm }}</h3>
        <span class="ellipsis">{{ cinemaData.addr }}</span>
      </div>
      <div class="right">
        <i class="iconfont icon-weizhi"></i>
      </div>
    </div>
    <div class="slide-container">
      <film-slide :showData='showData' :dealList='dealList'></film-slide>
    </div>
  </div>
</template>
<script>
import { getFilmDetail } from '@/api/getData'
import FilmSlide from './FilmSlide'
export default {
  name: 'FilmDetail',
  components: {
    FilmSlide
  },
  data () {
    return {
      cinemaData: {},
      dealList: {},
      showData: {},
      divideDealList: [] // 套餐
    }
  },
  async created () {
    await this.getFilmData()
  },
  methods: {
    getFilmData () {
      // const {data: {cinemaData, dealList, showData, divideDealList}} = await getFilmDetail(this.$route.query.cinemaId)
      getFilmDetail(this.$route.query.cinemaId).then(res => {
        this.cinemaData = res.data.cinemaData
        this.dealList = res.data.dealList
        res.data.showData.movies.map(item => {
          const one = item.img.split('/w.h')
          const newOne = one.join('')
          item.img = newOne
          return item
        })
        this.showData = res.data.showData
      })
      // this.cinemaData = cinemaData
      // this.dealList = dealList
      // showData.movies.map(item => {
      //   const one = item.img.split('/w.h')
      //   const newOne = one.join('')
      //   item.img = newOne
      //   return item
      // })
      // console.log(showData)
      // this.showData = showData
    }
  }
}
</script>
<style lang="less" scoped>
.mint-header {
  font-size: .16rem;
}
.slide-container {
  width: 100%;
  height: calc(100% - 1.14rem);
}
.film-detail {
  font-size: .14rem;
  overflow-y: auto;
  position: relative;
  width: 100%;
  height: 100%;
  .addr {
    padding:  .1rem;
    padding-right: 0;
    h3 {
      font-size: .16rem;
      font-weight: bold;
      line-height: .24rem;
    }
    span {
      color: #888;
      line-height: .2rem;
    }
    .right {
      width: .7rem;
      flex-shrink: 0;
      height: .3rem;
      border-left: 1px solid #ccc;
      text-align: center;
      line-height: .3rem;
      color:#3a8cdf;
      i {
        font-size: .24rem;
      }
    }
  }
}
</style>
