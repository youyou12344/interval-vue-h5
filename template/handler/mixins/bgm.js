import { Howl } from "howler";

export default {
  data() {
    return {
      audio_btn: null, // 按钮的点击音效
      audio_bgm: null, // 背景音乐
      isPlayingBgm: false // 正在播放背景音乐
    };
  },

  computed: {},

  created() {},

  methods: {
    // 初始化按钮的点击音效
    initBgmMusic() {
      this.audio_bgm = new Howl({
        src: require("../assets/bgm.mp3")
      });
    },

    // 播放音乐（用在一开始）
    palyBgmMusic() {
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
    }
  }
};
