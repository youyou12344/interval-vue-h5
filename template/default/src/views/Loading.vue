/* 进度条 */
<template>
  <div class="Loading page__wrap">
    <div class="page__cnt" v-show="showPage">
      <div class="wrap--precent">
        <div class="progress" :style="{ width: `${percent}%` }"></div>
        <div>{{ percent }} %</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  mixins: [],
  props: {},
  components: {},
  data() {
    return {
      percent: 0,
      showPage: false
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.preloadFirstPage();
  },
  watch: {},
  methods: {
    // 预加载.第一个页面需要的图片
    preloadFirstPage() {
      // 标示下面的超时定时器是否执行了
      let doTimer = false;

      // 若超过2s后，第一个页面需要的图片还没有加载好，则跳过，进入加载全部页面需要的图片的逻辑
      this.timerPreloadFirstPage = setTimeout(() => {
        console.warn("1、预加载.第一个页面需要的图片.超时");
        doTimer = true;
        this.afterPreloadFirstPage();
      }, 2000);

      // 第一个页面需要的图片
      const images = ["logo.png"];

      // 预加载图片
      let loaded = 0; // 当前已经加载的图片数
      images.forEach(src => {
        let image = new Image();
        image.onload = () => {
          loaded += 1;
          if (loaded === images.length && !doTimer) {
            console.log("1、预加载.第一个页面需要的图片.完成");
            clearTimeout(this.timerPreloadFirstPage);
            this.afterPreloadFirstPage();
          }
        };
        image.src = require(`../assets/images/${src}`);
      });
    },

    // 首页图片预加载后
    afterPreloadFirstPage() {
      this.preloadOtherPages();
    },

    // 预加载.非首页的其他图片
    preloadOtherPages() {
      this.showPage = true;
      // 获取所有图片
      // eslint-disable-next-line prettier/prettier
      const req = require.context("../assets/images/", true, /\.png|gif|jpeg|jpg$/);
      const images = req.keys().map(item =>
        // eslint-disable-next-line prettier/prettier
        item.split("").splice(2).join("")
      );

      // 预加载图片
      let loaded = 0; // 当前已经加载的图片数
      images.forEach(src => {
        let image = new Image();
        image.onload = () => {
          // console.log(src);
          loaded += 1;
        };
        image.src = require(`../assets/images/${src}`);
      });

      // 进度条前进的时间间隔，取值范围为[40ms, 80ms]，即总时长范围为[1s, 2s]
      const interval = Math.max(Math.min((images.length * 15) / 25, 80), 40);
      // 标示下面的超时定时器是否执行了
      let doTimer = false;
      // 若超过2s后，其他页面需要的图片还没有加载好，则跳过，进入h5逻辑
      this.timerPreloadOtherPages = setTimeout(() => {
        console.warn("2、预加载.非首页的其他图片.超时");
        doTimer = true;
        clearInterval(this.intervalId);
        this.afterPreloadOtherPages();
      }, 2000);
      this.intervalId = setInterval(() => {
        // 进度条大于100，且图片加载好了，且定时器没有触发
        if (this.percent >= 100 && loaded >= images.length && !doTimer) {
          console.log("2、预加载.非首页的其他图片.完成");
          clearTimeout(this.timerPreloadOtherPages);
          clearInterval(this.intervalId);
          this.afterPreloadOtherPages();
        }
        if (this.percent < 100) {
          this.percent += 4;
        }
      }, interval); // 加载一张图片大概需要 10ms
    },

    // 非首页的其他图片预加载后
    afterPreloadOtherPages() {
      console.log("3、开始h5");
      if (this.$bus.showPage === "loading") {
        setTimeout(() => {
          this.$bus.showPage = "start";
        }, 300);
      }
    }
  },

  destroyed() {
    this.intervalId && clearInterval(this.intervalId);
    this.timerPreloadFirstPage && clearTimeout(this.timerPreloadFirstPage);
    this.timerPreloadOtherPages && clearTimeout(this.timerPreloadOtherPages);
  }
};
</script>

<style scoped lang="less">
.Loading {
  // background-image: url(../assets/images/logo.png);
  background-position: bottom, bottom;
  background-attachment: fixed, fixed;
  background-size: 100% auto, 100% auto;
  background-color: pink;
  background-repeat: no-repeat, no-repeat;

  .wrap--precent {
    color: #fff;
    background: #fff;
    margin-top: 740px;
    width: 244px;
    height: 12px;
    position: relative;

    .progress {
      background-color: #cc66cc;
      position: absolute;
      height: 12px;
      width: 0;
      transition: width 60ms;
    }
  }

  .page__cnt {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    position: relative;
    overflow-y: hidden;
  }
}
</style>
