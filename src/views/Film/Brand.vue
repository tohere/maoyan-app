<template>
  <!-- 品牌下拉菜单组件 -->
  <ul class="brand ellipsis sc-h">
    <li class="ellipsis df-sb" :class='{active: i === tabIndex}' v-for='(item, i) in brand.subItems' :key='item.id' @click='tapChange(i, item)'>
      <p class="ellipsis">
        <i class="iconfont icon-dui" :class='{active: i === tabIndex}'></i>
        <span>{{ item.name }}</span>
      </p>
      <span>{{ item.count }}</span>
    </li>
  </ul>
</template>
<script>
import { mapGetters } from 'vuex'
import { getFilmsByCon } from '@/api/getData'
import { setTime } from '@/utils/util'
export default {
  name: 'Brand',
  data () {
    return {
      tabIndex: 0
    }
  },
  computed: {
    ...mapGetters(['tabs', 'brand', 'hs', 'oneId', 'secId'])
  },
  methods: {
    /**
     * tab切换
     */
    tapChange (i, item) {
      if (i === 0) {
        this.$store.dispatch('setTwoTab', { name: '品牌', id: -1 })
      } else {
        this.$store.dispatch('setTwoTab', item)
      }
      const day = setTime()
      getFilmsByCon(JSON.stringify(day), this.oneId, this.secId, this.tabs[1].id, this.hs.hallType.id, this.hs.service.id, false).then(res => {
        this.$store.dispatch('setCinemas', res.data.cinemas)
        this.$store.dispatch('setFixed', false)
        this.$emit('hideMask')
      })
      this.tabIndex = i
    }
  }
}
</script>
<style lang="less" scoped>
.brand {
  background-color: #fff;
  width: 100%;
  height: 50%;
  padding: 0 .2rem;
  overflow-y: auto;
  overflow-x: hidden;
  font-size: .14rem;
  li {
    width: 100%;
    line-height: .4rem;
    &.active {
      color: @theme-orange;
    }
    .iconfont {
      font-size: .12rem;
      color: @theme-bg;
      &.active {
        color: @theme-orange;
      }
    }
  }
}
</style>
