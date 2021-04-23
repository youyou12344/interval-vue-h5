import Vue from "vue"
import Vuex from "vuex"
// 背景音乐和微信的相关vuex模块放在子文件夹中，分类管理会更加清晰。
import moduleWx from "./wx"
import moduleBgm from "./bgm"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    wx: moduleWx,
    bgm: moduleBgm,
  },
})
