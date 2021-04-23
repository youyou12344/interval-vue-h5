import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import api from "@/assets/js/api" // 注入接口 axios
import "@/assets/css/index.scss" // 全局公共样式

// vconsole 组件的测试环境注入
// import VConsole from "vconsole"
// new VConsole()

// vant 组件的注入
import { Toast } from "vant"
import "vant/lib/toast/style"
Vue.use(Toast)

Vue.config.productionTip = false
Vue.prototype.$api = api

// 开发时调试
console.dev = (v) => {
  process.env.NODE_ENV === "development" ? console.log("🚀 开发调试：", v) : ""
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
