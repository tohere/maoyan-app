<template>
  <!-- 电影详情页 -->
  <div class="detail">
    <mt-header :title="detailMovie.nm">
      <mt-button icon="back" @click="$router.back()" slot="left"></mt-button>
    </mt-header>
    <Detail :detailMovie='detailMovie' />
  </div>
</template>
<script>
import { getMovieDetail } from '@/api/getData'
import Detail from './Detail'
export default {
  components: {
    Detail
  },
  data () {
    return {
      detailMovie: {} // 电影详情数据
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    async getDetail () {
      const {data: {detailMovie}} = await getMovieDetail(this.$route.params.id)
      detailMovie.img = detailMovie.img.split('/w.h').join('')
      detailMovie.sc = detailMovie.sc.toFixed(1)
      this.detailMovie = detailMovie
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
</style>
