<template>
  <!-- 时间切换组件 -->
  <div class="time-tab-box sc-h">
    <ul class="time-tab" ref='timeTab'>
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(item, index) in showDays.dates" :key="item.id">
          <div class="tab-item" ref='tabItem' @click='clickTab(index, item)' :class='{ active: index === tabIndex }'>{{ item.newDate }}</div>
        </swiper-slide>
      </swiper>
      <!-- <li v-for='(item, index) in showDays.dates' :style="{  'width': liW + 'px' }" :key='item.id' @click='clickTab(index)' :class='{ active: index === tabIndex }'>{{ item.date }}</li> -->
    </ul>
  </div>
</template>
<script>
// import { setTime } from '@/utils/util'
import { mapGetters } from 'vuex'
// import { getFilmsCon } from '@/api/getData'
export default {
  name: 'TimeTab',
  props: ['showDays'],
  data () {
    return {
      tabIndex: 0,
      swiperOption: {
        slidesPerView: 3
      }
    }
  },
  created () {
  },
  computed: {
    ...mapGetters(['oneId', 'secId', 'tabs', 'hs'])
  },
  methods: {
    /**
     * 点击tab
     */
    clickTab (index, date) {
      this.tabIndex = index
      this.$emit('clickTab', date)
      this.$emit('hideMask')
      console.log('ok')
      // getFilmsByCon(JSON.stringify(date.date), this.oneId, this.secId, this.tabs[1].id, this.hs.hallType.id, this.hs.service.id, false).then(res => {
      //   this.$store.dispatch('setCinemas', res.data.cinemas)
      //   this.$store.dispatch('setFixed', false)
      //   this.$emit('hideMask')
      // })
    }
  }
}
</script>

<style scoped lang="less">
// .time-tab-box {
//   overflow-x: auto
// }
// .time-tab {
//   font-size: .14rem;
//   display: flex;
//   flex-wrap: nowrap;
//   line-height: .4rem;
//   padding: 0 .1rem;
//   transition-duration: .3s;
//   li {
//     flex-shrink: 0;
//     width: 33%;
//     text-align: center;
//     border-bottom: 2px solid transparent;
//     transition-duration: .3s;
//     &.active{
//       color: @theme-orange;
//       border-bottom-color: @theme-orange;
//     }
//   }
// }
.time-tab {
  font-size: .14rem;
  line-height: .4rem;
  padding-left: .1rem;
  .tab-item {
    text-align: center;
    border-bottom: 2px solid transparent;
    &.active{
      color: @theme-orange;
      border-bottom-color: @theme-orange;
    }
  }
}
</style>
