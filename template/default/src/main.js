import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import bus from "./bus";
import api from "./api";
import utils from "./utils";

import "./style/a.less";

// import VConsole from "vconsole";
// let vConsole = new VConsole();

Vue.config.productionTip = false;

Vue.prototype.$bus = bus;
Vue.prototype.$api = api;
Vue.prototype.$utils = utils;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
