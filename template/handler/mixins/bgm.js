export default {
  data() {
    return {
      isPlaying: false, // 是否播放背景音乐
      bgm: null, // 背景音乐
      musicBtn: [
        require("../assets/images/music-off.png"),
        require("../assets/images/music-on.png")
      ] // 音乐的按钮
    };
  },

  computed: {
    musicSrc() {
      return this.musicBtn[this.isPlaying ? 1 : 0];
    }
  },

  created() {
    this.bgm = new Audio(require("../assets/bgm.mp3"));
    this.bgm.loop = true;
  },

  initBgm() {
    this.bgm.play();
    this.isPlaying = true;
  },

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
};
