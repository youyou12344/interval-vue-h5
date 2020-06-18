import Vue from "vue";
export default {
  // 初始化微信分享
  initShare(params) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-undef
      wx.updateTimelineShareData({
        title: params.timelineTitle || params.title,
        link: params.link,
        imgUrl: params.img,
        success: res => {
          resolve(res);
        },
        cancel: err => {
          reject(err);
        }
      });

      // eslint-disable-next-line no-undef
      wx.updateAppMessageShareData({
        title: params.title,
        link: params.link,
        imgUrl: params.img,
        desc: params.desc || params.title,
        success: res => {
          resolve(res);
        },
        cancel: err => {
          reject(err);
        }
      });
    });
  },

  // 初始化微信配置
  initToken(params = {}, cb) {
    return new Promise((resolve, reject) => {
      if (window.entryUrl === undefined || window.entryUrl === "") {
        window.entryUrl = location.href.split("#")[0];
      }
      let signLink = /(Android)/i.test(navigator.userAgent)
        ? location.href.split("#")[0]
        : window.entryUrl;
      Vue.prototype.$api
        .getWxToken({ url: signLink })
        .then(res => {
          let data = res.data;
          if (data.code === 0) {

            // 不是微信浏览器，立即执行播放背景音乐的回调函数（要等用户第一次交互后才会播放）
            var userAgent = window.navigator.userAgent.toLowerCase();
            var is_weixin_browser = /micromessenger/.test(userAgent);
            if (!is_weixin_browser) {
              if (typeof cb === "function") {
                cb();
              }
            }


            // eslint-disable-next-line no-undef
            wx.config({
              debug: false,
              beta: true,
              appId: data.data.appid,
              timestamp: data.data.timestamp,
              nonceStr: data.data.noncestr,
              signature: data.data.signature,
              jsApiList: [
                "updateAppMessageShareData",
                "updateTimelineShareData"
              ]
            });
            // eslint-disable-next-line no-undef
            wx.ready(() => {
              // 是微信浏览器，在ready后自动播放背景音乐
              if (typeof cb === "function") {
                cb();
              }
              this.initShare(params)
                .then(res => {
                  resolve(res);
                })
                .catch(err => {
                  reject(err);
                });
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
  },

  // 获取url的参数
  // getParameterByName(name, url) {
  //   if (!url) url = window.location.href;
  //   // eslint-disable-next-line
  //   name = name.replace(/[\[\]]/g, '\\$&')
  //   let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  //   let results = regex.exec(url);
  //   if (!results) return "";
  //   if (!results[2]) return "";
  //   return decodeURIComponent(results[2].replace(/\+/g, " "));
  // },

  // 屏幕的长宽比例（可能没有啥用）
  // initSizeClass() {
  //   let ratio = window.innerHeight / window.innerWidth;
  //   let res;
  //   if (ratio < 1.58) {
  //     res = "pad";
  //   } else if (ratio > 1.8) {
  //     res = "phonex";
  //   } else {
  //     res = "phone";
  //   }
  //   Vue.prototype.$bus.sizeClass = res;
  // }
};