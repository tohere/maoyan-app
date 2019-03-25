<template>
  <!-- 电影详情顶部组件 -->
  <div class="detail">
    <div class="left">
      <img :src="detailMovie.img" alt="">
    </div>
    <div class="right">
      <h2 class="title ellipsis">{{ detailMovie.nm }} </h2>
      <p class="enm ellipsis">{{ detailMovie.enm }}</p>
      <p class="score ellipsis" v-if="detailMovie.sc !== '0.0'">{{ detailMovie.sc }} <span>({{ (detailMovie.snum / 10000).toFixed(1) }}万人评)</span></p>
      <p class="score ellipsis" v-else>{{ detailMovie.wish }} 想看</p>
      <p class="cat ellipsis">{{ detailMovie.cat }}</p>
      <p class="fra">{{ detailMovie.fra }}/{{ detailMovie.dur }}分钟</p>
      <p class="pubDesc">{{ detailMovie.pubDesc }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Detail',
  props: {
    detailMovie: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="less" scoped>
.detail {
  background-color: #2e2e31;
  padding: .15rem;
  display: flex;
  font-size: .14rem;
  color: #aaa;
  .left {
    width: 1.1rem;
    height: 1.5rem;
    flex-shrink: 0;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .right {
    margin-left: .1rem;
    width: calc(100% - 1.2rem);
    font-size: .12rem;
    color: #ccc;
    .title {
      font-size: .16rem;
      font-weight: bold;
      color: #fff;
      width: 100%;
    }
    .enm {
      font-size: .12rem;
      line-height: .3rem;
    }
    p {
      line-height: .24rem;
    }
    .score {
      color: @theme-bold-color;
      font-weight: bold;
      font-size: .16rem;
      span {
        color: #ccc;
        font-size: .12rem;
      }
    }
  }
}
</style>
