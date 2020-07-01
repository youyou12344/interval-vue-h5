import Vue from "vue";
import BgmMixins from './mixins/bgm.js';

export default new Vue({
  mixins: [BgmMixins],
  data() {
    return {
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
    }
  }
});
