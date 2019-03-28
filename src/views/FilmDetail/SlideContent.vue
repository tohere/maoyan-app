<template>
  <!-- slide滑动切换的内容组件 -->
  <div class="slide-content">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(item, index) in dates" :key="item.id">
        <div class="tab-item ellipsis" ref='tabItem' @click='clickTab(index, item)' :class='{ active: index === tabIndex }'>{{ item.dateShow }}</div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
export default {
  name: 'SlideContent',
  props: ['dates'],
  data () {
    return {
      tabIndex: 0,
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    }
  },
  methods: {
    clickTab (index) {
      this.tabIndex = index
    }
  }
}
</script>
<style lang="less" scoped>
.tab-item {
  text-align: center;
  border-bottom: 2px solid transparent;
  line-height: .4rem;
  &.active{
    color: @theme-orange;
    border-bottom-color: @theme-orange;
  }
}
</style>
