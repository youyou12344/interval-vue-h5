/* 首页、loading、输入框 */
<template>
  <div :class="['Index', 'page__wrap', $bus.sizeClass]">
    <view-loading v-show="$bus.showPage === 'loading'" />
    <!-- 备注：其他页面可以v-if晚点渲染 -->
  </div>
</template>

<script>
import ViewLoading from "./Loading.vue";

export default {
  name: "Index",
  mixins: [],
  props: {},
  components: { ViewLoading },
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
@import "../style/a.less";

.Index {
  width: 100%;
  height: 100%;
}
</style>
