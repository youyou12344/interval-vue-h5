import Vue from "vue";

export default new Vue({
  data() {
    return {
      // // 用户信息
      // user: {
      //   textarea: null,
      //   sex: null,
      //   name: null
      // },

      // 屏幕的长宽比例
      sizeClass: "",

      // 提示框
      toast: {
        show: false,
        content: ""
      },

      // 是否显示音乐按钮，有的页面不需要显示
      showMusicBtn: true
    };
  },
  created() {
    // this.getSaveUserInfo()
  },
  methods: {
    // // 获取保存用户信息
    // getSaveUserInfo() {
    //   // 防止在结果页刷新，姓名数据丢失
    //   const user = JSON.parse(localStorage.getItem("itv-h5-user") || "{}");
    //   this.user.sex = user.sex;
    //   this.user.textarea = user.textarea;
    //   this.user.name = user.name;
    // },

    // 弹出提示
    _toast(params = { show: true, content: "提示" } || "") {
      this.toast = {
        show: params.show || true,
        content: params.content || params
      };
    }
  }
});
