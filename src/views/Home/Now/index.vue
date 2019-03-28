<template>
  <!-- 正在热映页 -->
  <div class="now">
    <ul
      v-infinite-scroll="loadMore"
      :infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      class="clearfix video-box sc-h"
    >
      <li v-for="item in movieData" class="" :key="item.id" @click="$router.push({name: 'movie', params: {id: item.id}})">
        <div class="left">
          <img v-lazy="item.img" alt="">
        </div>
        <div class="right">
          <div class="content">
            <h2 class="title ellipsis">{{ item.nm }}</h2>
            <div class="ellipsis" v-if="item.sc !== 0">
              <span>观众评</span>
              <strong>{{ item.sc.toFixed(1) }}</strong>
            </div>
            <div class="ellipsis" v-else>
              <strong>{{ item.wish }}</strong>
              <span>想看</span>
            </div>
            <div class="ellipsis">主演: {{ item.star }}</div>
            <div class="ellipsis">{{ item.showInfo }}</div>
          </div>
          <mt-button type='danger' v-if="item.showst === 3" size='small'>购票</mt-button>
          <mt-button type='primary' v-if="item.showst === 4" size='small'>预售</mt-button>
        </div>
      </li>
      <li>
        <div v-show="hasMore" class="load">正在加载中...</div>
        <div v-show="!hasMore" class="load">没有更多数据</div>
      </li>
    </ul>
  </div>
</template>
<script>
import { getVideos, getNewVideos } from '@/api/getData'
export default {
  name: 'now',
  data () {
    return {
      movieData: [], // 电影数据
      movieIds: [], // 电影id
      total: 0, // 所有的电影数
      loading: false,
      hasMore: true
    }
  },
  created () {
    this.getVideoList()
  },
  methods: {
    /**
     * @Desc 获取电影列表
     */
    async getVideoList () {
      const { data: {movieIds, movieList, total} } = await getVideos()
      movieList.map(item => {
        const one = item.img.split('/w.h')
        const newOne = one.join('')
        item.img = newOne
        return item
      })
      this.movieData = [...this.movieData, ...movieList]
      this.movieData = movieList
      this.movieIds = movieIds
      this.total = total
      console.log(this.total)
    },
    go () {
      console.log('go')
    },
    /**
     * Desc 加载更多
     */
    async loadMore () {
      if (!this.hasMore) return
      if (this.movieData.length === 0) {
        return
      }
      this.loading = true
      const lastId = this.movieData[this.movieData.length - 1].id
      const index = this.movieIds.findIndex(val => val === lastId)
      if (index < 0) {
        this.hasMore = false
        this.loading = true
        return
      }
      const ids = this.movieIds.slice(index + 1, index + 11).join(',')
      console.log(ids)
      console.log(index)
      const {data: {coming}} = await getNewVideos(ids)
      coming.map(item => {
        const one = item.img.split('/w.h')
        const newOne = one.join('')
        item.img = newOne
        return item
      })
      this.movieData = [...this.movieData, ...coming]
      if (this.movieData.length === this.total) {
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
.now {
  width: 100%;
  height: calc(100% - .5rem);
}
.video-box {
  width: 100%;
  height: 100%;
  overflow: auto
}
li {
  border-bottom: 1px solid #f2f2f2;
  padding: .1rem 0 .1rem .15rem;
  display: flex;
  width: 100%;
  font-size: .14rem;
  .load {
    width: 100%;
    line-height: .3rem;
    text-align: center;
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
  strong {
    font-weight: bold;
    color: @theme-bold-color;
  }
}
</style>
