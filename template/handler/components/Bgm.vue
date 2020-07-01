/* 背景音乐按钮 */
<template>
  <transition name="fade">
    <div class="btn-music itv-bgm">
      <img
        src="../assets/images/music-off.png"
        alt="静音"
        v-show="!$bus.isPlayingBgm"
        @click="$bus.swichBgm('play')"
      />
      <img
        src="../assets/images/music-on.png"
        alt="播放"
        v-show="$bus.isPlayingBgm"
        @click="$bus.swichBgm('stop')"
      />
    </div>
  </transition>
</template>

<script>
export default {
  name: "ItvBgm",
  mixins: [],
  props: {},
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {}
};
</script>

<style scoped lang="less">
//.itv-bgm {
//}
</style>
