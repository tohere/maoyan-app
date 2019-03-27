<template>
  <!-- 特色下拉菜单组件 -->
  <div class="special">
    <div class="special-top sc-h">
      <div class="special-title">特色功能</div>
      <div class="special-list">
        <div class="ellipsis" :class='{ active: oneIndex === index }' v-for='(item, index) in service.subItems' @click='oneClick(index, item)' :key='item.id'>{{ item.name }}</div>
      </div>
      <div class="special-title">特殊厅</div>
      <div class="special-list">
        <div class="ellipsis" @click='secClick(index, item)' :class='{ active: secIndex === index }' v-for='(item, index) in hallType.subItems' :key='item.id'>{{ item.name }}</div>
      </div>
    </div>
    <div class="special-bot df-sb">
      <mt-button size='small' @click='reset'>重置</mt-button>
      <mt-button size='small' type='danger' @click='confirm'>确定</mt-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getFilmsByCon } from '@/api/getData'
import { setTime } from '@/utils/util'
export default {
  name: 'Special',
  data () {
    return {
      oneIndex: 0,
      secIndex: 0
    }
  },
  computed: {
    ...mapGetters(['tabs', 'hallType', 'service', 'hs', 'oneId'])
  },
  methods: {
    oneClick (index, item) {
      this.oneIndex = index
      this.hs.service = item
      this.$store.dispatch('setHS', this.hs)
    },
    secClick (index, item) {
      this.secIndex = index
      this.hs.hallType = item
      this.$store.dispatch('setHS', this.hs)
    },
    /**
     * 重置
     */
    reset () {
      this.oneIndex = 0
      this.secIndex = 0
    },
    /**
     * 确定
     */
    confirm () {
      console.log(this.tabs)
      const day = setTime()
      getFilmsByCon(JSON.stringify(day), this.oneId, this.tabs[0].id, this.tabs[1].id, this.hs.hallType.id, this.hs.service.id, false).then(res => {
        this.$store.dispatch('setCinemas', res.data.cinemas)
        this.$store.dispatch('setFixed', false)
        this.$emit('hideMask')
      })
    }
  }
}
</script>
<style scoped lang="less">
.special {
  width: 100%;
  height: 50%;
  background-color: #fff;
  font-size: .12rem;
  color: #888;
  .special-top {
    width: 100%;
    padding: 0 .15rem;
    height: calc(100% - .5rem);
    overflow-x: hidden;
    overflow-y: auto;
  }
  .special-bot {
    height: .5rem;
    background-color: #fafafa;
    width: 100%;
    padding: 0 .15rem;
    border-top: 1px solid #e5e5e5;
    .mint-button--small {
      width: .8rem;
      &:first-child {
        background-color: #fafafa
      }
    }
  }
  .special-title {
    line-height: .4rem;
    font-size: .16rem;
  }
  .special-list {
    display: flex;
    flex-wrap: wrap;
    div {
      margin-right: .1rem;
      margin-bottom: .1rem;
      width: calc(25% - .1rem);
      text-align: center;
      line-height: .3rem;
      border: 1px solid #ccc;
      border-radius: .04rem;
      &.active {
        border-color: @theme-orange;
        color: @theme-orange;
      }
    }
  }
}
</style>