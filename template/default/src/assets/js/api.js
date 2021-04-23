import axios from "axios"
// const BASE_URL = "https://pt-heart-test.interval.im" // 后端接口地址

export default {
  // 获取微信配置（微信分享需要）
  getWxToken(params) {
    return axios.get(`${process.env.VUE_APP_FD_SERVER}api/wx/js_sdk_config/`, {
      params: params,
    })
  },

  // // 核销二维码
  // checkOrCode(sign) {
  //   return axios.put(`${BASE_URL}/api/reserve/employ/`, {
  //     sign,
  //   })
  // },
}
