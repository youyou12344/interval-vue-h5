import Vue from "vue";

export default new Vue({
  data() {
    return {
      <%_ if (options.wx_user) { _%>
      // 用户信息
      user: {
        textarea: null,
        sex: null,
        name: null
      },

      <%_ } _%>
      <%_ if (options.bgm) { _%>
      // 是否显示音乐按钮，有的页面不需要显示
      showMusicBtn: true,

      <%_ } _%>
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
    //
    <%_ if (options.wx_user) { _%>
    this.getSaveUserInfo()
    <%_ } _%>
  },

  methods: {
    <%_ if (options.wx_user) { _%>
    // 获取保存用户信息
    getSaveUserInfo() {
      // 防止在结果页刷新，姓名数据丢失
      const user = JSON.parse(localStorage.getItem("itv-h5-user") || "{}");
      this.user.sex = user.sex;
      this.user.textarea = user.textarea;
      this.user.name = user.name;
    },

    <%_ } _%>
    // 弹出提示
    _toast(params = { show: true, content: "提示" } || "") {
      this.toast = {
        show: params.show || true,
        content: params.content || params
      };
    }
  }
});
