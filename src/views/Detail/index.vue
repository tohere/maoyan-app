<template>
  <!-- 电影详情页 -->
  <div class="detail">
    <mt-header :title="detailMovie.nm">
      <mt-button icon="back" @click="$router.back()" slot="left"></mt-button>
    </mt-header>
    <Detail :detailMovie='detailMovie' />
    <div class="content" :class='{ active: isFixed }'>
      <div class="inner sc-h">
        <TimeTab :showDays='showDays' @hideMask='goHide' @clickTab='clickTab'/>
        <FilmTab ref='filmTab'/>
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
import TimeTab from './TimeTab'
import FilmContent from '../Film/FilmContent'
import FilmTab from '../Film/FilmTab'
import { setTime } from '../../utils/util'
import { mapGetters } from 'vuex'
export default {
  components: {
    Detail,
    FilmTab,
    FilmContent,
    TimeTab
  },
  data () {
    return {
      detailMovie: {}, // 电影详情数据
      showDays: {} // 日期集合
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
    goHide () {
      this.$refs.filmTab.hideMask()
    },
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
      const {data: {cinemas, showDays}} = await getFilmsCon(this.$route.params.id, JSON.stringify(day), now, true)
      this.$store.dispatch('setCinemas', cinemas)
      this.$emit('hideMask')
      showDays.dates.map(time => {
        time.newDate = this.formatDate(time.date)
        return time
      })
      this.showDays = showDays
    },
    /**
     * 切换日期获取数据
     */
    async clickTab (date) {
      const now = Date.now()
      const {data: {cinemas}} = await getFilmsCon(this.$route.params.id, date.date, now, true)
      await this.$store.dispatch('setFixed', false)
      this.$store.dispatch('setCinemas', cinemas)
    },
    /**
     * 对2019-02-01这样的时间格式化
     */
    formatDate (time) {
      const day = setTime()
      const date = new Date(time)
      const week = this.returnCN(date.getDay())
      time = time.split('-')
      const newTime = week + time[1] + '月' + time[2] + '日'
      return newTime
    },
    /**
     * 通过阿拉伯数字返回星期
     */
    returnCN (num) {
      let cNum
      switch (num) {
        case 0:
          cNum = '周日'
          break
        case 1:
          cNum = '周一'
          break
        case 2:
          cNum = '周二'
          break
        case 3:
          cNum = '周三'
          break
        case 4:
          cNum = '周四'
          break
        case 5:
          cNum = '周五'
          break
        case 6:
          cNum = '周六'
          break
      }
      return cNum
    },
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
