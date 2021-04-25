/* 微信相关封装 */
import Api from "@/assets/js/api"
import { Toast } from "vant"

// 【根据项目修改配置】 h5默认微信分享参数
const DEFAULT_SHARE_PARAMS = {
  title: "分享标题", // 分享标题
  link: process.env.VUE_APP_FD_URL, // 分享点击跳转链接(默认是项目的根路由)
  imgUrl: "https://static.interval.im/interval/FTh2QzE7mF5ke2Xy.jpeg", // 分享图片
  desc: "分享描述", // 分享描述
}

// 【根据项目修改配置】 项目中用到微信API（用到别的api，记得添加，比如扫一扫）
const WX_JS_API = [
  "updateAppMessageShareData", // 分享好友
  "updateTimelineShareData", // 分享朋友圈
]

// 【下面内容是固定配置，无需修改】
const moduleWx = {
  state: () => ({
    isWx: false, // 是微信浏览器
    isWxConfig: false, // wx.config已执行（不确保配置成功，不成功微信的api无法掉用
    // 默认的分享信息
  }),
  mutations: {
    setIsWx(state, v) {
      state.isWx = v
    },
    setIsWxConfig(state, v) {
      state.isWxConfig = v
    },
  },
  actions: {
    // 设备信息（主要用于判断是不是微信浏览器）
    getDevice() {
      var userAgent = window.navigator.userAgent.toLowerCase()
      var isWx = /micromessenger/.test(userAgent)
      var isAndroid = /(android)/.test(userAgent)
      var isIos = /(iphone|ios)/.test(userAgent)
      return {
        isWx, // 是微信浏览器
        isAndroid, // 是安卓设备
        isIos, // 是ios设备
      }
    },

    // 判断是否可以调用微信API
    getCanWxApi({ state }) {
      if (!state.isWx) {
        Toast("请在微信浏览器中打开")
        return false
      }
      if (!state.isWxConfig) {
        Toast("微信配置中")
        return false
      }
      return true
    },

    // 获取当前页面/指定路径的`中间页`分享链接（hash模式的路由，为了兼容ios，分享需要跳转到中间页，然后再重定向到真正分享的页面。）
    // eslint-disable-next-line no-unused-vars
    getWxShareLink({ state }, link) {
      const _link = link || window.location.href
      // eslint-disable-next-line prettier/prettier
      return `${process.env.VUE_APP_FD_URL}redirect.html?shareRedirect=${encodeURIComponent(_link)}`
    },

    // 设置当前页面微信分享信息（可以传入自定义的 params 与默认的 DEFAULT_SHARE_PARAMS 合并生成微信分享参数）
    async setPageWxShare({ dispatch }, params = {}) {
      try {
        const canWxApi = await dispatch("getCanWxApi")
        if (!canWxApi) return
        const wxShareParams = { ...DEFAULT_SHARE_PARAMS, ...params }
        const { title, link, imgUrl, desc } = wxShareParams
        wx.updateTimelineShareData({ title, link, imgUrl }) // 分享朋友圈
        wx.updateAppMessageShareData({ title, link, imgUrl, desc }) // 分享好友
      } catch (e) {
        console.error(e)
      }
    },

    // 微信权限配置
    async doWxConfig({ state, dispatch, commit }) {
      if (state.isWxConfig) return // 已经配置过了
      try {
        const device = await dispatch("getDevice")
        const isWx = device.isWx
        commit("setIsWx", isWx)
        if (!isWx) {
          return console.dev("不是微信浏览器")
        }
        // 是微信浏览器，注入权限验证配置，然后执行回调函数（如：自动播放媒体文件、设置微信分享）
        // const signLink = location.href.split("#")[0] // 项目路径
        const signLink = `${process.env.VUE_APP_FD_SERVER}${process.env.VUE_APP_FD_FILENAME}/` // 项目路径
        const res = await Api.getWxToken({ url: signLink })
        if ((res.data || {}).code !== 0) return
        const data = (res.data || {}).data
        console.dev("校验", data)
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.appid, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.noncestr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名
          jsApiList: WX_JS_API, // 必填，需要使用的JS接口列表
        })
        wx.ready(() => {
          // 注意config信息验证失败也会执行ready（校验失败还是可以自动播放音乐）
          commit("setIsWxConfig", true)
        })
        wx.error(function (res) {
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          console.dev("wx.config 失败：", res)
        })
      } catch (e) {
        console.error(e)
      }
    },
  },
}

export default moduleWx
