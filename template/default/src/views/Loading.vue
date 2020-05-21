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
    this.prepreload();
  },
  watch: {
    // 预加载完成后，进入开始页面
    percent(v) {
      if (v >= 100 && this.$bus.showPage === "loading") {
        setTimeout(() => {
          this.$bus.showPage = "start";
        }, 300);
      }
    }
  },
  methods: {
    // 预加载loading页面需要的信息
    prepreload() {
      let doTimer = false;
      const timer = setTimeout(() => {
        doTimer = true;
        this.preload();
        this.$bus.initMusic();
      }, 2000);
      const imgs = [ "logo.png"];
      let loaded = 0;
      imgs.forEach(src => {
        let image = new Image();
        image.onload = () => {
          loaded += 1;
          if (loaded === imgs.length) {
            !doTimer && this.preload();
            !doTimer && this.$bus.initMusic();
            clearTimeout(timer);
          }
        };
        image.src = require(`../assets/images/${src}`);
      });
    },

    // 预加载图片
    preload() {
      this.showPage = true;
      /* 获取所有的图片 */
      const req = require.context("../assets/images/", true, /\.png$/);
      let loaded = 0;
      let images = req.keys().map(item =>
        // eslint-disable-next-line prettier/prettier
        item.split("").splice(2).join("")
      );

      /* 预加载图片 */
      images.forEach(src => {
        let image = new Image();
        image.onload = () => {
          // console.log(src);
          loaded += 1;
        };
        image.src = require(`../assets/images/${src}`);
      });

      /* loading设置 */
      let startTime = Date.now();
      let intervalId = setInterval(() => {
        if (this.percent >= 100) {
          const costTime = Date.now() - startTime;
          const c1 = loaded >= images.length; // 预加载完成
          const c2 = costTime > 2000; // 兼容预加载超时(超过2s)
          if (c1 || c2) {
            c1 && console.log("加载时长：", costTime);
            c2 && console.warn("预加载超时");
            clearInterval(intervalId);
            return;
          }
        }
        if (this.percent < 100) {
          this.percent += 4;
        }
      }, 60); //（24 * 60 = ）1140ms 可以加载大概100张图片
    }
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
