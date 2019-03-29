<template>
  <!-- 影院播放时间列表 -->
  <div class="time-list" v-if="newDur && newPlist[0]">
    <ul>
      <li v-for="(item, index) in newPlist" :key="index">
        <div class="inner">
          <div class="time">
            <p>{{ item.tm }}</p>
            <p>{{ item.tm | calcTime(dur) }} 散场</p>
          </div>
          <div class="lang ellipsis">
            <p class="ellipsis">{{ item.lang }} {{ item.tp }}</p>
            <p class="ellipsis">{{ item.th }}</p>
          </div>
          <div class="price">
            <div>
              <div class="sell-pr">
                <div v-if="item.vipPrice"><span>￥</span>{{ parseInt(item.vipPrice) + 11 }}</div>
                <div v-if="!item.vipPrice"><span>￥</span>{{ getRandom() }}</div>
                <div class="left" v-if="item.vipPrice">
                  <span>{{ item.vipPriceName }}</span>
                  <span>￥{{ item.vipPrice }}</span>
                </div>
              </div>
              <div>
                {{ item.extraDesc }}
              </div>
            </div>
          </div>
          <div class="btn">
            <mt-button size='small' type='danger'>购票</mt-button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'TimeList',
  props: ['plist', 'dur'],
  data () {
    return {
      newDur: 0,
      newPlist: []
    }
  },
  filters: {
    /**
     * 通过电影时长和开场时间对退场时间进行计算
     * @params {String} startTime 开场时间字符串
     */
    calcTime (startTime, duration) {
      const arr = startTime.split(':')
      const h = parseInt(arr[0])
      const m = parseInt(arr[1])
      const allM = h * 60 + m + parseInt(duration)
      let newH = Math.floor(allM / 60)
      let newM = Math.round(allM % 60)
      newH = newH >= 10 ? newH : '0' + newH
      newM = newM >= 10 ? newM : '0' + newM
      return newH + ':' + newM
    }
  },
  watch: {
    dur (newVal) {
      this.newDur = newVal
    },
    plist: {
      handler (newVal) {
        this.newPlist = newVal
      },
      deep: true
    }
  },
  methods: {
    /**
     * 生成随机数字
     */
    getRandom () {
      return parseInt((Math.random() + 1) * 90)
    }
  }
}
</script>
<style lang="less" scoped>
.time-list {
  background-color: @theme-bg;
}
ul {
  background-color: #fff;
}
li {
  padding: 0 .1rem;
  clear: both;
}
.inner {
  display: flex;
  font-size: .12rem;
  padding: .17rem 0;
  color: #aaa;
  height: .77rem;
  border-bottom: 1px solid #eaeaea;
  // padding: .1rem 0;
  > div {
    flex-shrink: 0;
    line-height: .2rem;
  }
  .time {
    width: .6rem;
    height: .43rem;
    p:first-child {
      font-size: .16rem;
      font-weight: bold;
      color: #333;
    }
  }
  .lang {
    margin-left: .17rem;
    flex: 1;
    p:first-child {
      color: #333;
      font-size: .13rem;
    }
  }
  .price {
    width: 1.3rem;
    padding-left: .15rem;
    .sell-pr {
      display: flex;
      > div:first-child {
        color:#f03d37;
        font-size: .16rem;
        span {
          font-size: .12rem;
        }
      }
      .left {
        display: flex;
        transform: scale(.8);
        float: left;
      }
      .left {
        span:nth-of-type(1) {
          background-color: #ff941a;
          color: #fff;
          border-top-left-radius: .02rem;
          border-bottom-left-radius: .02rem;
          padding: 0 .02rem;
          font-size: .12rem;
        }
        span:nth-of-type(2) {
          border: 1px solid #ff941a;
          padding-right: .02rem;
          border-bottom-right-radius: .02rem;
          border-top-right-radius: .02rem;
          color: #ff941a;
        }
      }
    }
  }
  .btn {
    width: .6rem;
  }
  .mint-button--small {
    transform: scale(.8)
  }
}
</style>
