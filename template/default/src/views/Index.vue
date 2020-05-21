/* 首页、loading、输入框 */
<template>
  <div :class="['Index', 'page__wrap', $bus.sizeClass]">
    <div>{{ percent }}%</div>
  </div>
</template>

<script>
export default {
  name: "Index",
  mixins: [],
  props: {},
  components: {},
  data() {
    return {
      showBtnStart: true, // 显示开始按钮
      percent: 0,
      loadingOver: false // 显示loading（预加载）
    };
  },
  computed: {},
  created() {
    this.preload();
  },
  mounted() {},
  watch: {},
  methods: {
    // /* 预加载图片 */
    preload() {
      /* TAG: 获取所有的图片 */
      const req = require.context("../assets/images/", true, /\.png$/);
      let loaded = 0;
      let images = req.keys().map(item =>
        // eslint-disable-next-line prettier/prettier
        item.split("").splice(2).join("")
      );
      /* TAG：预加载图片 */
      images.forEach(src => {
        let image = new Image();
        image.onload = () => {
          // console.log(src);
          loaded += 1;
        };
        image.src = require(`../assets/images/${src}`);
      });
      /* TAG：loading设置 */
      let startTime = Date.now();
      let intervalId = setInterval(() => {
        if (this.percent >= 100) {
          const costTime = Date.now() - startTime;
          const c1 = loaded >= images.length; // TAG: 预加载完成
          const c2 = costTime > 2000; // TAG: 兼容预加载超时(超过2s)
          if (c1 || c2) {
            c1 && console.log("加载时长：", costTime);
            c2 && console.warn("预加载超时");
            clearInterval(intervalId);
            this.$bus.showMusicBtn = true;
            return;
          }
        }
        if (this.percent < 100) {
          this.percent += 4;
        }
      }, 60); // TAG: 100KB的文件一般10ms内能下载下来，这里设置了60ms，应该够了。（24 * 60 = ）1140ms后就显示100%
    }
  }
};
</script>

<style scoped lang="less">
@import "../style/a.less";

.Index {
  width: 100%;
  height: 100%;
}
</style>
