/* 背景音乐 BgMusic bg-music */
<template>
  <div class="bg-music" v-show="isShowBtnMusic">
    <img
      class="btn-img"
      v-show="isPlayingBgm"
      src="@/assets/images/preload1/btn-music-play.png"
      alt="关闭音乐"
      @click="swichBgm('stop')"
    />
    <img
      class="btn-img"
      v-show="!isPlayingBgm"
      src="@/assets/images/preload1/btn-music-pause.png"
      alt="播放音乐"
      @click="swichBgm('play')"
    />
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: "BgMusic",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState({
      isPlayingBgm: (state) => state.bgm.isPlayingBgm, // 正在播放背景音乐
      isShowBtnMusic: (state) => state.bgm.isShowBtnMusic, // 是否显示播放按钮
    }),
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 切换背景音乐是否播放
    swichBgm(type) {
      this.$store.dispatch("swichBgm", type)
    },
  },
}
</script>

<style scoped lang="scss">
.bg-music {
  width: 40px;
  height: 40px;
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 100;

  .btn-img {
    width: 100%;
    height: 100%;
  }
}
</style>
