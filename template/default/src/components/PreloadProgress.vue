/* 预加载需要的图片、显示进度 PreloadProgress preload-progress */
<template>
  <!-- tip：逻辑和UI放在一起比较好 -->
  <div class="preload-progress">
    <!-- 默认的进度条 -->
    <div class="progress-wrap" v-if="progress.isShow">
      <div class="progress-line" :style="{ width: `${progress.count}%` }" />
      <div class="progress-text">{{ progress.count }} %</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PreloadProgress",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      /**
       * 预加载配置 pXXX 即 preloadConfigXXX
       * timer         计时器，目的：避免预加载loading页面需要的图片超时或出错
       * hasOverTime   超时定时器是否执行，目的：避免多次执行
       * hasFinish     已加载完成（超时也算完成）
       * timeout       超过timeout毫秒，即超时
       * dirName       资源目录的名称（需在assets/images下）
       */
      // "预加载，首屏需要显示的图片(即加载页面需要的图片资源，比如进度条、背景图片)"
      preload1: {
        timer: null,
        hasOverTime: false,
        hasFinish: false,
        timeout: 2000,
        dirName: "preload1",
      },
      // "预加载，其他需要立刻显示的图片(比如：进度条100%后，第一个显示页面中需要的图片资源)"
      preload2: {
        timer: null,
        hasOverTime: false,
        hasFinish: false,
        timeout: 4000,
        dirName: "preload2",
      },
      progress: {
        total: 100, // 总共多少
        isShow: true, // 展示
        timer: null, // 进度条的计数定时器
        count: 0, // 计数
        speed: 20, // 每次加 step 需要耗时speed毫秒
        step: 2, // 每次加多少
      }, // 默认进度条视图
    }
  },
  mounted() {
    this.doPreload1()
  },
  methods: {
    // 执行预加载图片
    doPreloadImgs({ imagesArr, cbPreload, preload }) {
      // 通用校验
      if (!preload) return console.error("preload 未传入")
      if (!imagesArr) return console.error("imagesArr 未传入")
      if (typeof cbPreload !== "function")
        return console.error("cbPreload 不是函数")

      // 获取需要预加载的图片
      const images = imagesArr.keys().map((item) =>
        // eslint-disable-next-line prettier/prettier
        item.split("").splice(2).join("")
      )

      // 如果文件夹为空，直接返回
      if (images.length === 0) {
        preload.hasFinish = true
        cbPreload()
        return
      }

      // 预加载超时逻辑
      const timeout = preload.timeout || 0
      preload.timer = setTimeout(() => {
        console.warn(`${preload.dirName} 超时`, images)
        preload.hasOverTime = true
        preload.hasFinish = true
        cbPreload()
      }, timeout)

      // 预加载图片逻辑
      let count = 0 // 当前已经加载的图片数
      const total = images.length // 总共需要加载图片数量
      images.forEach((src) => {
        let image = new Image()
        image.onload = () => {
          count += 1
          if (count === total && !preload.hasOverTime) {
            clearTimeout(preload.timer)
            console.dev(`${preload.dirName} 完成`)
            preload.hasFinish = true
            cbPreload()
          }
        }
        image.src = require(`../assets/images/${preload.dirName}/${src}`)
      })
    },
    // 预加载，首屏需要显示的图片 （白屏）
    doPreload1() {
      // eslint-disable-next-line prettier/prettier
      const imagesArr = require.context('../assets/images/preload1/', false, /\.png|gif|jpeg|jpg$/);
      this.doPreloadImgs({
        imagesArr,
        cbPreload: this.cbPreload1,
        preload: this.preload1,
      })
    },
    // 显示进度、预加载其他需要预加载的图片（进度条动画）
    cbPreload1() {
      this.setProgressTimer()
      this.doPreload2()
    },
    // 进度条动画
    setProgressTimer() {
      if (!this.progress.isShow) return // 不显示进度条就不开启
      clearTimeout(this.progress.timer)
      this.progress.timer = setTimeout(() => {
        const count = this.progress.count + this.progress.step
        if (count < 100) {
          this.progress.count = count
          this.setProgressTimer()
        } else if (count >= 100) {
          this.progress.count = 100
          console.dev("进度条100%")
          if (this.preload2.hasFinish) {
            this.cbPreload2()
          }
        }
      }, this.progress.speed)
    },
    // 预加载，其他需要立刻显示的图片
    doPreload2() {
      // eslint-disable-next-line prettier/prettier
      const imagesArr = require.context("../assets/images/preload2/", true, /\.png|gif|jpeg|jpg$/);
      this.doPreloadImgs({
        imagesArr,
        cbPreload: this.cbPreload2,
        preload: this.preload2,
      })
    },
    // 显示首页（显示别的页面）
    cbPreload2() {
      if (this.progress.count === 100) {
        this.$emit("onFinish") // 预加载结束
      }
    },
  },
  beforeDestroy() {
    clearTimeout(this.progress.timer)
    clearTimeout(this.preload1.timer)
    clearTimeout(this.preload2.timer)
  },
}
</script>

<style scoped lang="scss">
.preload-progress {
  .progress-wrap {
    position: relative;
    width: 100%;
    height: 12px;
    background: #ccc;
  }
  .progress-line {
    background-color: #cc66cc;
    position: absolute;
    width: 0;
    height: 100%;
    transition: width 60ms;
  }
  .progress-text {
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translate(0, 100%);
  }
}
</style>
