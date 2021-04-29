# wx.js微信相关封装

[微信网页开发文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#49)

为什么写在store中？
因为全部页面都有可能会用到微信的相关api。

*注意：已默认在index.html中注入了微信JS-SDK脚本。*


wx.js 封装了什么？
- 封装了调用微信api的相关逻辑，如调用前需要 `wx.config` 。
- 封装了常用的`微信分享`功能。







---
## 一、 doWxConfig 微信权限配置

### doWxConfig 何时调用？
如果项目要用到 wx 相关的 API ，这意味着一定要调用 wx.config，就建议直接在 App.js 中调用 `doWxConfig`，避免之后忘记调用。

### doWxConfig 封装了什么？
1. `判断是否是微信浏览器`，如果不是直接返回，如果是继续下面的微信全新配置逻辑。
2. 向后端`请求获取公众号信息`的接口。
3. 再带着公众号信息，调用 `wx.config` 校验微信 api 调用权限。
4. 然后在 `wx.ready` 中，回调传入的参数 `wxReadyCb` (若不是微信浏览器，则不会执行)。

### 语法
``` js
this.$store.dispatch("doWxConfig")
```

### 微信 api 失效？
- 注意 wx.config **本地测试环境无法生效**，会报错 signature invalid，需要发不到线上环境才能测试哦。
- 注意如果用到 wx 的 JS-API 接口（除了微信分享），需要更新 `WX_JS_API`(jsApiList) 数组。











---
## 二、应用

### x、自动播放背景音乐
微信浏览器中可以自动播放背景音乐。
具体实现：在 App.vue 中调用 doWxConfig，再在回调 wxReadyCb 中调用播放背景音乐的函数。
``` JS
this.$store.dispatch("doWxConfig")

wx.ready(() => {
  this.$store.dispatch("palyBgm") // 自动播放背景音乐
})
```

### x、微信分享
1、修改设置 `wx.js` 中的 `DEFAULT_SHARE_PARAMS` （h5默认微信分享参数）。
``` JS
const DEFAULT_SHARE_PARAMS = {
  title: "分享标题",
  link: "分享点击跳转链接 (默认是项目的根路由)",
  imgUrl: "分享图片",
  desc: "分享描述",
}
```

2、判断当前是否可以调用微信API
``` JS
const canWxApi = await this.$store.dispatch("getCanWxApi")
if (!canWxApi) return
```
*在分享之前需调用 `doWxConfig`（App.js中）*

3、调用 `setPageWxShare` 设置某个页面的分享信息，可以取默认分享信息，也可以传入自定义的参数。
``` JS
this.$store.dispatch("setPageWxShare") // 分享信息取默认值

wx.ready(async () => { // 建议在 page 中，外部包裹一层 wx.ready 使用
  const link = await this.$store.dispatch("getWxShareLink")
  this.$store.dispatch("setPageWxShare", {
    title: "该页面 分享标题",
    link: "该页面 分享点击跳转链接",
    imgUrl: "该页面 分享图片",
    desc: "该页面 分享描述",
  })
})
```
但这里需注意，如果动态的设置 `分享点击跳转链接` ，应该设置为中间页的地址，并设置中间页跳转页面参数。（为什么要中间页？兼容ios，hash路由模式分享链接只能设置为根路由，会截断#）

4、调用 `getWxShareLink` 获取当前页面的分享中间页地址
``` JS
const link = await this.$store.dispatch("getWxShareLink") // 分享路径默认去当前页面

const link = await this.$store.dispatch("getWxShareLink", {
  link: "指定的分享路径"
})
```




### x、新增微信API（如：扫一扫）
1、修改设置 `wx.js` 中的 `WX_JS_API` （项目中用到微信API）。
``` JS
const WX_JS_API = [
  "updateAppMessageShareData", // 分享好友
  "updateTimelineShareData", // 分享朋友圈
  "scanQRCode", // 微信扫一扫
]
```
2、判断当前是否可以调用微信API
``` JS
const canWxApi = await this.$store.dispatch("getCanWxApi")
if (!canWxApi) return
```
*在分享之前需调用 `doWxConfig`（App.js中）*

3、调用扫一扫功能
``` JS
wx.scanQRCode({
  needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
  scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
  success: (res) => {
    const { errMsg, resultStr } = res
    if (errMsg === "scanQRCode:ok") {
      this.doCheck(resultStr)
    } else {
      this.$toast(`扫码出错了 ${errMsg}`)
    }
  },
  fail: (res) => {
    this.$toast(JSON.stringify(res))
  },
})
```