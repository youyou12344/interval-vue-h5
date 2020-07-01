<template>
  <div id="app">
    <!-- 音乐按钮 -->
    <itv-bgm />

    <!-- 显示的内容 -->
    <router-view />

    <!-- 提示框 -->
    <itv-toast
      :show.sync="$bus.toast.show"
      :content="$bus.toast.content"
    ></itv-toast>
  </div>
</template>

<script>
import ItvToast from "./components/Toast";
import ItvBgm from "./components/Bgm";

export default {
  name: "app",
  mixins: [],
  components: { 
    ItvBgm,
    ItvToast
  },
  data() {
    return {
    };
  },

  computed: {},

  created() {
    // this.$utils.initSizeClass()
  },

  mounted() {
    this.$nextTick(async () => {
      try {
        this.initPage();
        await this.$utils.initToken({
          title: "wx分享的标题",
          desc: "wx分享的描述",
          img:
            "https://static.interval.im/platinum_inventory/R8kYSCmEzpBBz5rJ.jpeg",
          link: "http://wxc8f356adb367c7b6.wx.interval.im/cmbc/"
        }, this.$bus.palyBgmMusic);
      } catch (e) {
        console.error(e);
      }
    });
  },
  methods: {
    // 初始化页面
    initPage() {
      this.$bus.audio_bgm = new Audio(require("./assets/bgm.mp3"));
    }
  }
};
</script>

<style lang="less">
img[src=""],
img:not([src]) {
  opacity: 0;
}

.btn-music {
  width: 61px;
  position: fixed;
  top: 20px;
  right: 24px;
  z-index: 1;
  img {
    width: 100%;
    height: 100%;
  }
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  // overflow: hidden;
}

html,
body {
  width: 100vw;
  height: 100vh;
  // overflow: hidden;
  #app {
    width: 100%;
    height: 100%;
  }
}

.pa100 {
  position: absolute;
  width: 100%;
}

.page__wrap {
  width: 100%;
  height: 100%;
  position: relative;
  max-height: 100vh;
  overflow: hidden;
  .page__cnt {
    width: 100%;
    height: 100vh;
    max-height: 100vh;
    overflow-y: auto;
    padding: 5vh 0;
    box-sizing: border-box;
  }
}

</style>
