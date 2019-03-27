<template>
  <!-- 电影详情页 -->
  <div class="detail">
    <mt-header :title="detailMovie.nm">
      <mt-button icon="back" @click="$router.back()" slot="left"></mt-button>
    </mt-header>
    <Detail :detailMovie='detailMovie' />
    <div class="content" :class='{ active: isFixed }'>
      <div class="inner sc-h">
        <FilmTab />
      </div>
    </div>
    <div class="bot">
      <FilmContent v-show='cinemas.length > 0' />
      <div class="no-film df-c" v-show='cinemas.length === 0'>暂无符合条件的影院</div>
    </div>
  </div>
</template>
<script>
import { getMovieDetail, getFilmsCon, getInfos } from '@/api/getData'
import Detail from './Detail'
import FilmContent from '../Film/FilmContent'
import FilmTab from '../Film/FilmTab'
import { setTime } from '../../utils/util'
import { mapGetters } from 'vuex'
export default {
  components: {
    Detail,
    FilmTab,
    FilmContent
  },
  data () {
    return {
      detailMovie: {} // 电影详情数据
    }
  },
  created () {
    this.getDetail()
    this.getFilmsConData()
    this.getCPT()
  },
  computed: {
    ...mapGetters(['tabs', 'cinemas', 'hallType', 'service', 'hs', 'oneId', 'isFixed'])
  },
  methods: {
    /**
     * 获取城市、品牌、特色
     */
    async getCPT () {
      const {data: {brand, district, hallType, service, subway, timeRanges}} = await getInfos()
      this.$store.dispatch('setDistrict', district)
      this.$store.dispatch('setSubway', subway)
      this.$store.dispatch('setHallType', hallType)
      this.$store.dispatch('setService', service)
      this.$store.dispatch('setBrand', brand)
    },
    // 获取影片详细信息
    async getDetail () {
      const {data: {detailMovie}} = await getMovieDetail(this.$route.params.id)
      detailMovie.img = detailMovie.img.split('/w.h').join('')
      detailMovie.sc = detailMovie.sc.toFixed(1)
      this.detailMovie = detailMovie
    },
    // 获取影院信息
    async getFilmsConData () {
      const day = setTime()
      const now = Date.now()
      console.log(now)
      const {data: {cinemas}} = await getFilmsCon(this.$route.params.id, JSON.stringify(day), now, true)
      this.$store.dispatch('setCinemas', cinemas)
      this.$emit('hideMask')
    }
  }
}
</script>
<style lang="less" scoped>
.mint-header {
  height: .5rem;
  background-color: @theme-red;
  font-size: .18rem;
}
.content {
  width: 100%;
  height: 100%;
  &.active {
    background-color: rgba(0,0,0,.5);
    position: fixed;
    top: .5rem;
    left: 0;
    z-index: 200;
  }
  .inner {
    width: 100%;
    height: 60%;
    background-color: #fff;
  }
}
.no-film {
  width: 100%;
  min-height: 3.2rem;
  font-size: .20rem;
  font-weight: bold;
  color: #888;
}
</style>
