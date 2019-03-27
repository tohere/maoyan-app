<!-- 手机Loading -->
<template>
  <div class="loading">
    <div class="toast toast-loading">
      <ul class="toast-loading-wrap">
        <li
          class="toast-loading-leaf"
          v-for="(v, i) in 12"
          :style="{transform: `rotate(${30*i}deg) translate(7.92px)`, animationDelay: i*0.1+'s'}"
          :key="i"
        ></li>
      </ul>
      <p class="toast-loading-text">数据加载中...</p>
    </div>
  </div>
</template>
<style lang="less" scoped>
.loading {
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100%;
    top: .1rem;
    left: 0;
    font-size: .16rem;
    .toast {
        left: 50%;
        top: 35%;
        margin-left: -3.8em;
        position: fixed;
        width: 7.6em;
        background: rgba(0, 0, 0, .5);
        min-height: 7.6em;
        color: #fff;
        text-align: center;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        transform: scale(0.9);
        transition-duration: .2s;
    }
    .toast-loading-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 3em;
        // background: #fff;
    }
    .toast-loading-leaf {
        top: -1px;
        opacity: .25;
        animation: toast-loading 1.2s linear infinite;
    }
    .toast-loading-leaf:before {
        content: "";
        position: absolute;
        width: 8.14px;
        height: 3.08px;
        background: #d1d1d5;
        box-shadow: 0 0 5px rgba(0, 0, 0, .5);
        border-radius: 1px;
        transform-origin: left 50% 0;
    }
    @keyframes toast-loading {
        0%,16.6767% {
            opacity: .25;
        }
        16.6867% {
            opacity: 1;
        }
        76.6767%, 100% {
            opacity: .25;
        }
    }
}
</style>
