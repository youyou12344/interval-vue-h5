import Vue from "vue";
<%_ if (options.mode === 0) { _%>
import BgmMixins from './mixins/bgm.js';
<%_ } _%>

export default new Vue({
  <%_ if (options.mode === 0) { _%>
  mixins: [BgmMixins],
  <%_ } _%>
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

  created() {},

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
