<template>
  <!-- filmtab -->
  <div class="box">
    <div class="film-tab df-sb">
      <div class="ellipsis" :class='{ active: index === tabIndex && show }' @click='changeTab(index)' v-for='(item, index) in tabs' :key='index'>
        <div class="inner"><span class="ellipsis">{{ item.name }}</span> <i class="iconfont icon-xia"></i></div>
      </div>
    </div>
    <div class="mask" v-show='show'>
      <All v-show='tabIndex === 0' @hideMask='hideMask'></All>
      <Brand v-show='tabIndex === 1' @hideMask='hideMask'></Brand>
      <Special v-show='tabIndex === 2' @hideMask='hideMask'></Special>
    </div>
  </div>
</template>
<script>
import All from './All.vue'
import Brand from './Brand.vue'
import Special from './Special.vue'
import { getInfos } from '@/api/getData'
import { mapGetters } from 'vuex'
export default {
  name: 'FilmTab',
  components: {
    All,
    Brand,
    Special
  },
  data () {
    return {
      tabIndex: 0,
      brand: {}, // 品牌
      district: {}, // 行政区
      hallType: {}, // 特殊厅
      service: {}, // 服务
      subway: {}, // 地铁
      timeRanges: {}, // 时段
      show: false // 控制遮罩显示隐藏
    }
  },
  created () {
    this.getCPT()
  },
  computed: {
    ...mapGetters(['tabs'])
  },
  methods: {
    /**
     * 获取城市、品牌、特色
     */
    async getCPT () {
      const {data: {brand, district, hallType, service, subway}} = await getInfos()
      this.$store.dispatch('setDistrict', district)
      this.$store.dispatch('setSubway', subway)
      this.$store.dispatch('setHallType', hallType)
      this.$store.dispatch('setService', service)
      this.$store.dispatch('setBrand', brand)
    },
    /**
     * 切换tab
     */
    changeTab (index) {
      if (index === this.tabIndex && this.show) {
        this.show = false
        this.$store.dispatch('setFixed', false)
      } else {
        this.tabIndex = index
        this.show = true
        this.$store.dispatch('setFixed', true)
      }
    },
    /**
     * 隐藏遮罩
     */
    async hideMask () {
      this.show = false
    }
  }
}
</script>
<style lang="less" scoped>
.film-tab {
  height: .4rem;
  color: #888;
  border-bottom: 1px solid #eee;
  font-size: .14rem;
  > div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #eee;
    height: .2rem;
    &.active {
      color: @theme-orange;
      i {
        transform: rotateZ(180deg);
        top: -.02rem;
      }
    }
    &:last-child {
      border-right-width: 0;
    }
    .inner {
      max-width: 80%;
      display: flex;
      span {
        flex: 1
      }
    }
    i {
      font-size: .12rem;
      display: inline-block;
      flex-shrink: 0;
      padding: 0 .02rem;
      position: relative;
      top: .02rem;
    }
  }
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.5);
  z-index: 90;
}
</style>
