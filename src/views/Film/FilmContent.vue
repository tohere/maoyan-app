<template>
  <!-- film-content组件 -->
  <ul
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10"
    class="film-content"
  >
    <li v-for="item in cinemas" :key="item.id">
      <div class="top ellipsis">
        <h3 class="ellipsis">{{ item.nm }}</h3>
        <span>{{ item.sellPrice }}元起</span>
      </div>
      <p class="addr df-sb ellipsis">
        <span class="ellipsis">{{ item.addr }}</span>
        <span>{{ item.distance }}</span>
      </p>
      <div class="label-block">
        <div class="allowRefund" v-if="!!item.tag.allowRefund">退</div>
        <div class="endorse" v-if="!!item.tag.endorse">改签</div>
        <div class="snack" v-if="!!item.tag.snack">小吃</div>
        <div class="vipTag" v-if="!!item.tag.vipTag">折扣卡</div>
        <div class="hallType" v-for="(item2, index2) in item.tag.hallType" :key="index2">
          {{ item2 }}
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'FilmContent',
  methods: {
    loadMore () {}
  },
  computed: {
    ...mapGetters(['cinemas'])
  }
}
</script>
<style lang="less" scoped>
li {
  padding: 0.15rem;
  border-bottom: 1px solid #eee;
  font-size: .14rem;
}
.top {
  display: flex;
  font-size: 0.16rem;
  line-height: 0.34rem;
  span {
    margin-left: 0.04rem;
    color: @theme-red;
    font-size: 0.18rem;
  }
}
.addr {
  line-height: 0.24rem;
  span:nth-child(2) {
    padding: 0 0.1rem;
  }
}
.label-block {
  display: flex;
  flex-wrap: wrap;
  div {
    padding: .02rem .04rem;
    border: 1px solid #589daf;
    color: #589daf;
    flex-shrink: 0;
    margin-right: .04rem;
    margin-bottom: .04rem;
    border-radius: .02rem;
    font-size: .12rem;
    &.snack, &.vipTag {
      color: #f90;
      border-color: #f90;
    }
  }
}
</style>
