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

// 是开发者（会显示 console.dev 信息)
const isDeveloper = window.localStorage.getItem("interval") === "888"
/**
 * 开发时调试打印
 * @param {String} v 打印的信息
 * @param {Object} options 打印其他信息
 * @param {Object} options.where 备注打印其他信息来自的位置（快速定位）
 * @param {Object} options.isImportant 是否醒目打印，多用于异常打印
 * @param {String} options.otherValue 打印的其他信息
 */
console.dev = (v, { where, isImportant, otherValue } = {}) => {
  const showConsoleDev = process.env.NODE_ENV === "development" || isDeveloper // 能显示的打印结果
  if (showConsoleDev) {
    const bgColor = isImportant === true ? "#ff000050" : "#00ffff20"
    const otherV = otherValue === undefined ? "" : otherV
    console.log("%c 🚀 开发：%s", `background: ${bgColor}`, v, otherV)
    where && console.log("%c    --- 打印来自： %s", "color: #ccc", where)
  }
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
