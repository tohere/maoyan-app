<template>
  <!-- tab栏全城下拉菜单部分 -->
  <div class="all-city">
    <div class="top-tab">
      <div v-for='(item, index) in menuTabs' :key='index' :class='{ active: tabIndex === index }' @click='changeTab(index)'>{{ item }}</div>
    </div>
    <div class="bot">
      <ul class="left fl ellipsis sc-h">
        <li class="ellipsis" :class='{active: oneIndex === index}' @click='changeLeftTab(index, item.id)' v-for='(item, index) in menuData.subItems' :key='item.id'>{{ item.name }}({{ item.count }})</li>
      </ul>
      <ul class="right ellipsis sc-h">
        <li class="ellipsis df-sb" :class='{active: (isAll && item.id === -1) || (isNow && i === secIndex)}' v-for='(item, i) in menuData.subItems[oneIndex].subItems' :key='item.id' @click='secTabChange(i, item)'>
          <p class="ellipsis">
            <i class="iconfont icon-dui" :class='{active: (isAll && item.id === -1) || (isNow && i === secIndex)}'></i>
            <span>{{ item.name }}</span>
          </p>
          <span>{{ item.count }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getFilmsByCon } from '@/api/getData'
import { setTime } from '@/utils/util'
export default {
  name: 'All',
  data () {
    return {
      menuTabs: ['商区', '地铁站'],
      tabIndex: 0,
      oneIndex: 0,
      secIndex: 0,
      // oneId: 0, // 一级导航id
      // secId: 0, // 二级导航id
      isNow: false, // 用来记录二级导航的激活
      isAll: true // 用来设置全部选中
    }
  },
  computed: {
    ...mapGetters(['tabs', 'hs', 'district', 'subway', 'oneId', 'secId']),
    menuData () {
      if (this.tabIndex === 0) {
        return this.district
      } else {
        return this.subway
      }
    }
  },
  methods: {
    /**
     * 切换tab
     */
    changeTab (index) {
      if (this.tabIndex === index) {
        return
      }
      this.tabIndex = index
      this.oneIndex = 0
      this.secIndex = 0
    },
    /**
     * 左边导航切换
     */
    changeLeftTab (index, oneId) {
      this.$store.dispatch('setOneId', oneId)
      if (index !== 0) {
        // 确定二级导航中选中的位置
        this.isNow = this.district.subItems[index].subItems.some(item => {
          return item.id === this.secId
        })
      }
      if (this.tabs[0].name !== '全城' && index === 0) {
        this.$store.dispatch('setOneTab', { name: '全城', id: -1 })
        this.$store.dispatch('setSecId', '-1')
        const day = setTime()
        getFilmsByCon(JSON.stringify(day), oneId, this.secId, this.tabs[1].id, this.hs.hallType.id, this.hs.service.id, false).then(res => {
          this.$store.dispatch('setCinemas', res.data.cinemas)
          this.$store.dispatch('setFixed', false)
          this.$emit('hideMask')
          this.isAll = true
          this.isNow = false
        })
      }
      this.oneIndex = index
    },
    /**
     * 右侧导航切换
     */
    secTabChange (i, item) {
      const day = setTime()
      if (i === 0) {
        this.$store.dispatch('setOneTab', this.menuData.subItems[this.oneIndex])
        this.isAll = true
      } else {
        this.$store.dispatch('setOneTab', item)
        this.isAll = false
      }
      getFilmsByCon(JSON.stringify(day), this.oneId, item.id, this.tabs[1].id, this.hs.hallType.id, this.hs.service.id, false).then(res => {
        this.$store.dispatch('setCinemas', res.data.cinemas)
        this.$store.dispatch('setSecId', item.id)
        this.$store.dispatch('setFixed', false)
        this.$emit('hideMask')
      })
      this.isNow = this.district.subItems[this.oneIndex].subItems.some(subItem => {
        return subItem.id === item.id
      })
      this.secIndex = i
    }
  }
}
</script>
<style scoped lang="less">
.all-city {
  font-size: .14rem;
}
.top-tab {
  display: flex;
  line-height: .5rem;
  padding-right: .2rem;
  background-color: #fff;
  div {
    flex: 1;
    text-align: center;
    border-bottom: .02rem solid transparent;
    &.active {
      color: @theme-orange;
      border-bottom-color: @theme-orange;
    }
  }
}
.bot {
  height: 60%;
  width: 100%;
  position: fixed;
  background-color: @theme-bg;
  display: flex;
  .left {
    width: 26%;
    height: 100%;
    background-color: #fff;
    overflow-x: hidden;
    overflow-y: auto;
    text-align: center;
    flex-shrink: 0;
    li {
      width: 100%;
      line-height: .4rem;
      background-color: #fff;
      &.active {
        background-color: @theme-bg;
        color: @theme-orange;
      }
    }
  }
  .right {
    width: 100%;
    height: 100%;
    padding: 0 .2rem;
    overflow-y: auto;
    overflow-x: hidden;
    border-right: .2rem solid #fff;
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
}
</style>
