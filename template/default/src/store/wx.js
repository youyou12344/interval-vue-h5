// 微信网页开发文档： https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#49
// ！注意 wx.config 本地测试环境无法生效，会报错 signature invalid，需要发不到线上环境才能测试哦。
// ！注意如果用到 wx 的 JSApi 接口（除了微信分享），需要更新 jsApiList 数组，不然微信的 api 功能无法生效哦。
import Api from "@/assets/js/api"

// h5的默认分享配置（路由是hash模式的，所以只需要配置一次）
const DEFAULT_SHARE_PARAMS = {
  title: "分享标题", // 分享标题
  link: `${process.env.VUE_APP_FD_SERVER}${process.env.VUE_APP_FD_FILENAME}/#/`, // 分享点击跳转链接
  imgUrl: "https://static.interval.im/interval/FTh2QzE7mF5ke2Xy.jpeg", // 分享图片
  desc: "分享描述", // 分享描述
}

const moduleWx = {
  state: () => ({
    isWx: false, // 是微信浏览器
    isWxReady: false, // wx.config已完成（不确保配置成功，不成功微信的api无法掉用），wx.ready已执行
    // 默认的分享信息
  }),
  mutations: {
    setIsWx(state, v) {
      state.isWx = v
    },
    setIsWxReady(state, v) {
      state.isWxReady = v
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

    // 获取微信分享点击跳转链接（跳转到中间页）
    // eslint-disable-next-line no-unused-vars
    getWxShareLink({ state }, link) {
      // eslint-disable-next-line prettier/prettier
      return `${process.env.VUE_APP_FD_SERVER}redirect.html?shareRedirect=${encodeURIComponent(link)}`
    },

    //设置页面微信分享（可以传入自定义的 params 与默认的 DEFAULT_SHARE_PARAMS 合并生成微信分享参数）
    setPageWxShare({ state }, params = {}) {
      try {
        if (!state.isWxReady) return console.error("isWxReady 0")
        const wxShareParams = { ...DEFAULT_SHARE_PARAMS, ...params }
        const { title, link, imgUrl, desc } = wxShareParams
        wx.updateTimelineShareData({ title, link, imgUrl }) // 分享朋友圈
        wx.updateAppMessageShareData({ title, link, imgUrl, desc }) // 分享好友
      } catch (e) {
        console.error(e)
      }
    },

    // 微信权限配置（请求获取微信公众号相关信息，并带着信息向微信查询是否有权限调用微信api）
    async doWxConfig({ state, dispatch, commit }, { doAfterWxConfig } = {}) {
      if (state.isWxReady) return // 已经配置过了
      try {
        const device = await dispatch("getDevice")
        const isWx = device.isWx
        commit("setIsWx", isWx)
        const doCb = () => {
          console.dev("执行回调函数，并返回 isWx 告知是否是微信浏览器")
          typeof doAfterWxConfig === "function"
            ? doAfterWxConfig({ isWx })
            : null
        }
        if (!isWx) {
          console.dev("不是微信浏览器（立即执行回调函数）")
          return doCb()
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
          jsApiList: [
            "scanQRCode", // 微信扫一扫
            "updateAppMessageShareData", // 分享好友
            "updateTimelineShareData", // 分享朋友圈
          ], // 必填，需要使用的JS接口列表（需要用到别的api，记得添加）
        })
        wx.ready(() => {
          // 注意config信息验证失败也会执行ready（校验失败还是可以自动播放音乐）
          doCb()
          commit("setIsWxReady", true)
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
