<template>
  <!-- 影院套餐组件 -->
  <div class="film-meal" v-if="dealList.dealList[0]">
    <div class="h-title">
      <h3>影院超值套餐</h3>
    </div>
    <div class="meal-box">
      <div class="meal-item" v-for="item in dealList.dealList" :key="item.dealId">
        <div class="left">
          <span v-if="item.cardTag">{{ item.cardTag }}</span>
          <img :src="item.imageUrl | changeImg" alt="">
        </div>
        <div class="right">
          <div class="title ellipsis2">
            <span v-if="item.recommendPersonNum === 1">单人</span>
            <span v-if="item.recommendPersonNum === 2">双人</span>
            <span v-if="item.recommendPersonNum >= 3">多人</span>
            <strong>{{ item.title }}</strong>
          </div>
          <div class="sold">{{ item.curNumberDesc }}</div>
          <div class="bot df-sb">
            <div class="price"><span>￥</span>{{ item.price }}</div>
            <mt-button type='danger' size='small'>去购买</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Meal',
  props: ['dealList'],
  created () {
    console.log(this.dealList)
  },
  filters: {
    /**
     * 进行图片处理
     */
    changeImg (url) {
      return url.split('/w.h').join('')
    }
  }
}
</script>
<style lang="less" scoped>
.film-meal {
  background-color: #fff;
}
.h-title {
  line-height: .4rem;
  font-size: .16rem;
  padding: 0 .1rem;
  h3 {
    border-bottom: 1px solid #e5e5e5;
  }
}
.meal-box {
  padding: 0 .1rem;
}
.meal-item {
  border-bottom: 1px solid #e5e5e5;
  padding: .1rem 0;
  display: flex;
  &:last-child {
    border-bottom: none;
  }
  .left {
    width: .92rem;
    height: .92rem;
    position: relative;
    flex-shrink: 0;
    span {
      position: absolute;
      top: 0;
      left: 0;
      color: #fff;
      padding: .03rem;
      font-size: .13rem;
      background-color: @theme-orange;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    padding-left: .1rem;
    .title {
      span {
        background-color: #ff9900;
        color: #fff;
        font-size: .12rem;
        padding: 0 .03rem;
        border-radius: .02rem;
        margin-right: .02rem;
      }
    }
    strong {
      line-height: .2rem;
    }
    .sold {
      line-height: .2rem;
      font-size: .12rem;
      text-align: right;
      color: #888;
      padding-right: .08rem;
    }
    .bot {
      height: .3rem;
      .price {
        color: #ef4f4f;
        font-size: .16rem;
        span {
          font-size: .13rem;
        }
      }
      .mint-button--small {
        transform: scale(.8)
      }
    }
  }
}
</style>
