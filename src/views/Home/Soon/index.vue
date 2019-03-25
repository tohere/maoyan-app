<template>
  <!-- 即将上映页 -->
  <div class="soon">
    <div class="bot">
      <ul
        v-infinite-scroll="loadMore"
        :infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
        class="clearfix video-box sc-h"
      >
        <li>
          <div class="top">
            <div class="title">近期最受期待</div>
            <div class="banner">
              <swiper :options="swiperOption" ref="mySwiper">
                <!-- 这部分放你要渲染的那些内容 -->
                <swiper-slide v-for="item in banner" :key="item.id">
                  <div class="movie-item">
                    <img v-lazy="item.img" alt="">
                    <p class="name ellipsis">{{ item.nm }}</p>
                    <p class="time ellipsis">{{ item.comingTitle.split(' ')[0] }}</p>
                  </div>
                </swiper-slide>
                <!-- 这是轮播的小圆点 -->
                <div class="swiper-pagination" slot="pagination"></div>
              </swiper>
            </div>
          </div>
        </li>
        <li v-for="(come, index) in coming" :key="index">
          <p class="title">{{ come.title }}</p>
          <div class="con" v-for="item in come.theVideo" :key="item.id">
            <div class="left">
              <img v-lazy="item.img" alt="">
            </div>
            <div class="right">
              <div class="content">
                <h2 class="title ellipsis">{{ item.nm }}</h2>
                <div class="ellipsis">
                  <strong>{{ item.wish }}</strong>
                  <span>想看</span>
                </div>
                <div class="ellipsis">主演: {{ item.star }}</div>
                <div class="ellipsis">{{ item.rt }} 上映</div>
              </div>
              <mt-button class="yu" v-if="item.showst === 4" size='small'>想看</mt-button>
              <mt-button type='primary' v-if="item.showst === 1" size='small'>预售</mt-button>
            </div>
          </div>
        </li>
        <li>
          <div v-show="hasMore" class="load">正在加载中...</div>
          <div v-show="!hasMore" class="load">没有更多数据</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getSoonBanner, getComing, getMoreComing } from '@/api/getData'
export default {
  name: 'soon',
  data () {
    return {
      banner: [],
      loading: false,
      coming: [], // 处理过的即将上映的电影数据
      movieIds: [], // 即将上映的电影id
      movies: [], // 为处理的电影数据
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 30
      },
      hasMore: true,
      total: 0 // 总的电影数
    }
  },
  created () {
    this.getBanner()
    this.getComingVideos()
  },
  methods: {
    /**
     * 获取banner数据
     */
    async getBanner () {
      const {data: {coming}} = await getSoonBanner()
      coming.map(item => {
        const one = item.img.split('/w.h')
        const newOne = one.join('')
        item.img = newOne
        return item
      })
      this.banner = coming
    },
    /**
     * 获取即将上映电影数据
     */
    async getComingVideos () {
      const {data: { coming, movieIds }} = await getComing()
      this.movies = coming

      const arr = this.setMovies(coming)
      this.coming = arr
      this.movieIds = movieIds
      this.total = movieIds.length
    },
    /**
     * 对数据进行处理
     * @params {Array} coming 要处理的电影数据集合
     */
    setMovies (coming) {
      const comingTitles = Array.from(new Set(coming.map(item => item.comingTitle)))
      let arr = []
      coming.map(item => {
        const one = item.img.split('/w.h')
        const newOne = one.join('')
        item.img = newOne
        return item
      })
      comingTitles.forEach((title, index) => {
        let itemArr = []
        arr[index] = {
          title,
          theVideo: itemArr
        }
        coming.forEach(item => {
          if (title === item.comingTitle) {
            itemArr.push(item)
            arr[index] = {
              title,
              theVideo: itemArr
            }
          }
        })
      })
      return arr
    },
    /**
     * Desc 加载更多
     */
    async loadMore () {
      if (!this.hasMore) return
      if (this.coming.length === 0) {
        return
      }
      this.loading = true
      const lastId = this.movies[this.movies.length - 1].id
      const index = this.movieIds.findIndex(val => val === lastId)
      if (index < 0) {
        this.hasMore = false
        this.loading = true
        return
      }
      console.log('ok')
      const ids = this.movieIds.slice(index + 1, index + 11).join(',')
      const {data: {coming}} = await getMoreComing(ids)
      this.movies = [...this.movies, ...coming]
      let arr = this.setMovies(coming)
      console.log(arr)
      this.coming = [...this.coming, ...arr]
      if (this.coming.length === this.total) {
        this.hasMore = false
        this.loading = true
        return
      }
      setTimeout(() => {
        this.loading = false
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>
.soon {
  background: @theme-bg;
  .top {
    margin-bottom: .1rem;
  }
}
div.title {
  font-size: .15rem;
  line-height: .4rem;
  // padding-left: .15rem;
}
.movie-item {
  font-size: .14rem;
  img {
    width: .85rem;
    height: 1.15rem;
  }
  p {
    line-height: .2rem;
  }
  .name {
    font-weight: bold;
  }
}
.bot {
  background-color: #fff;
  position: relative;
  width: 100%;
  height: 100%;
}
.video-box {
  width: 100%;
  height: 100%;
  overflow-y: auto
}
li {
  border-bottom: 1px solid #f2f2f2;
  padding: 0 .15rem;
  width: 100%;
  font-size: .14rem;
  &:first-child {
    border-bottom-width: 5px;
  }
  .load {
    width: 100%;
    line-height: .3rem;
    text-align: center;
  }
  p.title {
    line-height: .3rem;
  }
  .con {
    display: flex;
    padding: .1rem 0;
    border-bottom: 1px solid @theme-bg;
    &:last-child {
      border-bottom-width: 0;
    }
  }
}
.left {
  width: .64rem;
  height: .9rem;
  flex-shrink: 0;
  margin-right: .1rem;
  img {
    width: 100%;
    height: 100%;
  }
}
.right {
  font-size: .14rem;
  line-height: .2rem;
  display: flex;
  justify-content: space-between;
  width: calc(100% - 1rem);
  .title {
    font-size: .18rem;
    font-weight: bold;
    line-height: .26rem;
  }
  .content {
    width: calc(100% - .52rem);
  }
  .mint-button--small {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  .mint-button--default.yu {
    background-color: @theme-bold-color;
    color: #fff;
  }
  strong {
    font-weight: bold;
    color: @theme-bold-color;
  }
}
</style>
