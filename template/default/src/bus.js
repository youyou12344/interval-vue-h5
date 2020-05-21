import Vue from "vue";
// import { Howl } from "howler";

export default new Vue({
  data() {
    return {
      audio_btn: null, // 按钮的点击音效
      audio_bgm: null, // 背景音乐
      isPlayingBgm: false, // 正在播放背景音乐

      // 当前显示的页面
      showPage: 'loading',

      // 屏幕的长宽比例
      sizeClass: "",

      // 提示框
      toast: {
        show: false,
        content: ""
      },
    };
  },

  created() {
  },

  methods: {
    // 弹出提示
    _toast(params = { show: true, content: "提示" } || "") {
      this.toast = {
        show: params.show || true,
        content: params.content || params
      };
    },


    // 初始化按钮的点击音效
    initMusic() {
      // this.audio_btn = new Howl({
      //   src: require("./assets/bgm.mp3")
      // });
    },

    // 播放音乐（用在一开始）
    palyMusic() {
      if (this.audio_bgm) {
        this.audio_bgm.play();
        this.audio_bgm.volume = 0.5;
        this.audio_bgm.loop = true;
        this.isPlayingBgm = true;
      }
    },

    // 切换背景音乐是否播放
    swichBgm(type) {
      if (type === "stop" && this.isPlayingBgm) {
        this.audio_bgm.pause();
        this.isPlayingBgm = false;
        // console.log("停止", this.bgmClose);
      } else if (type === "play" && !this.isPlayingBgm) {
        this.audio_bgm.play();
        this.isPlayingBgm = true;
        // console.log("播放", this.bgmClose);
      }
    },
  }
});
