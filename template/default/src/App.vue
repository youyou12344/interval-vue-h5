<template>
  <div id="app">
    <BgMusic />
    <div>
      <button class="btn" @click="onMusicButton(1)">微信自动播放</button>
      <button class="btn" @click="onMusicButton(2)">点击播放音乐</button>
      <button class="btn" @click="onMusicButton(3)">点击暂停音乐</button>
      <button class="btn" @click="onMusicButton(4)">显示音乐按钮</button>
      <button class="btn" @click="onMusicButton(5)">隐藏音乐按钮</button>
    </div>

    <PreloadProgress class="mb40" @onFinish="onFinishPreload" v-show="!isShowView" />

    <transition :name="transitionName">
      <router-view class="page" v-show="isShowView" />
    </transition>
  </div>
</template>

<script>
import BgMusic from "@/components/BgMusic.vue"
import PreloadProgress from "@/components/PreloadProgress.vue"

export default {
  mixins: [],
  props: {},
  data() {
    return {
      transitionName: "fade",
      isShowView: false, // 是否显示路由内容
    }
  },
  components: { BgMusic, PreloadProgress },
  computed: {},
  watch: {
    // // 路由切换动画
    // $route(to, from) {
    //   const toDepth = to.path.split("/").length
    //   const fromDepth = from.path.split("/").length
    //   this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left"
    // },
  },
  created() {},
  mounted() {
    this.$store.dispatch("doWxConfig") // 微信权限校验配置
    wx.ready(() => {
      // this.$store.dispatch("setPageWxShare") // 设置页面微信分享
      // this.$store.dispatch("palyBgm") // 微信自动播放背景音乐
    })
  },
  methods: {
    onMusicButton(type) {
      if (type === 1) {
        return this.$store.dispatch("palyBgm")
      } else if (type === 2) {
        return this.$store.dispatch("swichBgm", "play")
      } else if (type === 3) {
        return this.$store.dispatch("swichBgm", "stop")
      } else if (type === 4) {
        return this.$store.commit("setIsShowBtnMusic", true)
      } else if (type === 5) {
        return this.$store.commit("setIsShowBtnMusic", false)
      }
    },
    onFinishPreload() {
      this.isShowView = true
    },
  },
}
</script>

<style lang="scss">
.btn {
  width: 60%;
  display: block;
  margin: 10px auto;
}

/* 路由切换动画 */
.page {
  position: absolute;
  width: 100%;
  min-height: 100vh;
  position: relative;
  transition: all 0.75s cubic-bezier(0.55, 0, 0.1, 1);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to,
.fade-leave-active {
  opacity: 0;
}
/* .slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
} */
</style>
