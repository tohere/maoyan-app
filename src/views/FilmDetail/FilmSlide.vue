<template>
  <!-- 影院详情滑动部分 -->
  <div class="slide-outer" v-if="newData.movies">
    <div class="slide" @touchstart='start' @touchmove.prevent.stop='move' @touchend='end'>
    <!-- <div class="slide"> -->
      <div class="bg" :style="{'background':'url('+ newData.movies[tabIndex].img +') repeat-x'}"></div>
      <div class="slide-box" ref='slideBox'>
        <div class="slide-item" :class="{ active: tabIndex === index }" v-for="(movie, index) in newData.movies" @click="choosed(index, movie)" :key="movie.id">
          <img :src="movie.img" alt="">
        </div>
      </div>
    </div>
    <!-- 滑动下方影片信息 -->
    <div class="movie-info">
      <div class="title df-c ellipsis">
        <h2 class="ellipsis">{{ newData.movies[tabIndex].nm }}</h2>
        <span v-if="newData.movies[tabIndex].sc !== '0.0'">{{ newData.movies[tabIndex].sc }}<i>分</i></span>
        <span v-else>{{ newData.movies[tabIndex].wish }}<i>想看</i></span>
      </div>
      <p class="df-c ellipsis">{{ newData.movies[tabIndex].desc }}</p>
    </div>
    <swiper class="times" :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(item, index) in newData.movies[tabIndex].shows" :key="item.id">
        <div class="tab-item ellipsis" ref='tabItem' @click='timeIndex = index' :class='{ active: index === timeIndex }'>{{ item.dateShow }}</div>
      </swiper-slide>
    </swiper>
    <!-- 活动部分 -->
    <div class="activity ellipsis" v-if="newData.vipInfo">
      <span class="left">{{ newData.vipInfo[0].tag }}</span>
      <span class="center ellipsis">{{ newData.vipInfo[0].title }}</span>
      <span class="right">{{ newData.vipInfo[0].process }}</span>
    </div>
    <div class="con-box">
      <time-list style="margin-bottom: 10px" v-if="newData.movies[tabIndex].shows[timeIndex].plist && newData.movies[tabIndex].shows[timeIndex].plist.length !== 0" :plist='newData.movies[tabIndex].shows[timeIndex].plist' :dur='newData.movies[tabIndex].dur'></time-list>
      <div v-else-if="!newData.movies[tabIndex].shows[timeIndex].plist || newData.movies[tabIndex].shows[timeIndex].plist.length === 0" class="seat-inner-wrap">
        <div class="no-seat df-c">
          <div class="icon">
            <img src="data:image/png;base64,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">
          </div>
          <div class="text" v-if="newData.movies[tabIndex].shows[timeIndex].hasShow && newData.movies[tabIndex].shows[timeIndex].plist.length === 0">今日场次已映完</div>
          <div class="text" v-if="!newData.movies[tabIndex].shows[timeIndex].hasShow">影片未上映</div>
        </div>
      </div>
      <film-meal :dealList='dealList'></film-meal>
    </div>
  </div>
</template>
<script>
import TimeList from './TimeList'
import FilmMeal from './Meal'
export default {
  name: 'FilmSlide',
  props: ['showData', 'dealList'],
  components: {
    TimeList,
    FilmMeal
  },
  data () {
    return {
      tabIndex: 0,
      timeIndex: 0,
      startX: 0,
      moveX: 0,
      endX: 0,
      disX: 0,
      startTime: 0, // 开始点击的时间戳
      endTime: 0, // 结束点击的时间戳
      slideBoxL: -35, // slideBox的初始移动距离
      newData: {},
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    }
  },
  watch: {
    showData: {
      handler (newVal, oldVal) {
        this.newData = newVal
      },
      deep: true
    }
  },
  methods: {
    /**
     * 点击图片事件
     */
    choosed (index, movie) {
      this.$refs.slideBox.style.transitionDuration = '.2s'
      if (index === 0) {
        this.$refs.slideBox.style.transform = 'translateX(-35px)'
      } else {
        this.$refs.slideBox.style.transform = 'translateX(' + (-35 - index * 75) + 'px)'
      }
      this.tabIndex = index
      this.slideBoxL = -this.tabIndex * 71 - 35
    },
    /**
     * 手指触摸开始
     */
    start (e) {
      this.startTime = e.timeStamp
      this.$refs.slideBox.style.transitionDuration = '0s'
      this.startX = e.touches[0].clientX
    },
    /**
     * 手指移动
     */
    move (e) {
      // 防抖处理
      if (e.timeStamp - this.startTime < 16) {
        return
      }
      this.moveX = e.touches[0].clientX
      this.disX = this.moveX - this.startX
      let dis = this.slideBoxL + this.disX
      this.$refs.slideBox.style.transform = 'translateX(' + dis + 'px)'
    },
    /**
     * 手指触摸结束
     */
    end (e) {
      this.endTime = e.timeStamp
      this.$refs.slideBox.style.transitionDuration = '.2s'
      // 解决和点击事件的冲突问题
      if (this.endTime - this.startTime < 100) {
        return
      }
      this.endX = e.changedTouches[0].clientX
      this.disX = this.endX - this.startX
      console.log(this.disX)
      let disx = 0
      if (this.disX > 0) {
        disx = -this.tabIndex * 75 + 35 + this.disX
      } else {
        disx = -this.tabIndex * 75 - 35 + this.disX
      }
      this.tabIndex = Math.round(disx / 75)
      if (this.tabIndex >= 0) {
        this.tabIndex = 0
      } else {
        this.tabIndex = Math.abs(this.tabIndex)
      }
      if (this.tabIndex >= this.showData.movies.length - 1) {
        this.tabIndex = this.showData.movies.length - 1
      }
      this.slideBoxL = -this.tabIndex * 75 - 35
      this.$refs.slideBox.style.transform = 'translateX(' + this.slideBoxL + 'px)'
    }
  }
}
</script>

<style lang="less" scoped>
.slide-outer {
  width: 100%;
  height: 100%;
  background-color: @theme-bg;
}
.slide {
  width: 100%;
  height: 1.35rem;
  position: relative;
  overflow: hidden;
  .bg {
    position: absolute;
    // z-index: -1;
    width: 100%;
    height: 100%;
    background-size: cover;
    filter: blur(15px);
    opacity: .5;
  }
  .slide-box {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    position: relative;
    left: 50%;
    transform: translateX(-35px);
    z-index: 110;
  }
  .slide-item {
    flex-shrink: 0;
    width: .65rem;
    height: .95rem;
    border: 2px solid transparent;
    transition-duration: .3s;
    margin-right: .1rem;
    position: relative;
    &.active {
      border-color: #fff;
      transform: scale(1.2);
      &::after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border-width: 5px;
        border-color: transparent;
        border-top-color: #fff;
        border-style: solid;
        bottom: -11px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.movie-info {
  padding: .1rem;
  background-color: #fff;
  .title {
    height: .3rem;
    h2 {
      font-size: .16rem;
      font-weight: bold;
    }
    span {
      margin-left: .04rem;
      font-weight: bold;
      color: #ffb400;
      i {
        font-size: .12rem;
      }
    }
  }
  p {
    font-size: .12rem;
    color: #888;
  }
}
.tab-item {
  text-align: center;
  border-bottom: 2px solid transparent;
  line-height: .4rem;
  &.active{
    color: @theme-orange;
    border-bottom-color: @theme-orange;
  }
}
.activity {
  padding: .15rem .1rem;
  font-size: .12rem;
  background-color: #fff5ea;
  display: flex;
  align-items: center;
  span {
    flex-shrink: 0;
  }
  .left {
    padding: .02rem .04rem;
    background-color: #ff941a;
    color: #fff;
    border-radius: .02rem;
    margin-right: .06rem;
  }
  .center {
    color: #ff941a;
    flex: 1;
  }
  .right {
    position: relative;
    padding-right: .1rem;
    color: #aaa;
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      width: .05rem;
      height: .05rem;
      border-width: 1px;
      border-style: solid;
      border-color: transparent;
      border-right-color: #aaa;
      border-top-color: #aaa;
      transform: rotateZ(45deg) translateY(-50%);
    }
  }
}
.no-seat {
  width: 100%;
  height: 2.3rem;
  flex-direction: column;
  background-color: @theme-bg;
  img {
    width: .77rem;
    height: .71rem;
  }
  .text {
    margin-top: 12px;
    line-height: 1;
    font-size: 16px;
    color: #acacac;
  }
}
.times {
  background-color: #fff;
  border-bottom: 1px solid #eee;
}
</style>
