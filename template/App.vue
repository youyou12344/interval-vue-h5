<template>
  <div id="app">
    <!-- 音乐按钮 -->
    <transition name="fade">
      <img
        :src="musicSrc"
        alt="btn"
        class="btn-music"
        @click="switchMusic(!isPlaying)"
        v-show="musicSrc && $bus.showMusicBtn"
      />
    </transition>

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

export default {
  name: "app",
  components: { ItvToast },
  data() {
    return {
      isPlaying: false, // 是否播放背景音乐
      bgm: null, // 背景音乐
      musicBtn: [
        require("./assets/images/music-off.png"),
        require("./assets/images/music-on.png")
      ] // 音乐的按钮
    };
  },

  computed: {
    musicSrc() {
      return this.musicBtn[this.isPlaying ? 1 : 0];
    }
  },

  created() {
    this.$utils.initSizeClass()
    this.bgm = new Audio(require("./assets/bgm.mp3"));
    this.bgm.loop = true;
  },

  mounted() {
    this.$nextTick(async () => {
      try {
        // await this.$utils.initToken({
        //   title: "wx分享的标题",
        //   desc: "wx分享的描述",
        //   img:
        //     "https://static.interval.im/platinum_inventory/R8kYSCmEzpBBz5rJ.jpeg",
        //   link: "http://wxc8f356adb367c7b6.wx.interval.im/cmbc/"
        // });
        this.initPage();
        <%_ if (options.wx_user) { _%>
        // this.getUserInfo();
        <%_ } _%>
      } catch (e) {
        console.error(e);
      }
    });
  },
  methods: {
    // 初始化页面
    initPage() {
      this.bgm.play();
      this.isPlaying = true;
    },

    <%_ if (options.wx_user) { _%>
    // 获取用户信息
    async getUserInfo() {
      try {
        const res = await this.$api.getUserInfo();
        if (res.data.code === 1101) {
          const reloadParam = encodeURIComponent("/1908/");
          location.href =
            "http://wxf32cbcefa406b60e.wx.interval.im/ext/wx/user/authorize/?state=" +
            reloadParam;
        } else {
          this.$bus.user.img = res.data.data.user.headimgurl;
          this.$bus.user.name = res.data.data.user.nickname;
        }
      } catch (e) {
        console.error(e)
      }
    },
    <%_ } _%>

    // 播放背景音乐
    switchMusic(isPlaying) {
      if (isPlaying) {
        this.bgm && this.bgm.play();
        console.log("paly");
      } else {
        this.bgm && this.bgm.pause();
        console.log("pause");
      }
      this.isPlaying = isPlaying;
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
  position: absolute;
  top: 20px;
  right: 24px;
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
}

.pa100 {
  position: absolute;
  width: 100%;
}

.page__wrap {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
