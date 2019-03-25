<template>
  <!-- filmtab -->
  <div class="film-tab df-sb">
    <div>
      <div class="inner">全城 <i class="iconfont icon-xia"></i></div>
    </div>
    <div>
      <div class="inner">品牌 <i class="iconfont icon-xia"></i></div>
    </div>
    <div>
      <div class="inner">特色 <i class="iconfont icon-xia"></i></div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.film-tab {
  height: .4rem;
  color: #888;
  border-bottom: 1px solid #eee;
  > div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #eee;
    height: .2rem;
    &:last-child {
      border-right-width: 0;
    }
    i {
      font-size: .12rem;
    }
  }
}
</style>
