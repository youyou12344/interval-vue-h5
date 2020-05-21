import axios from "axios";

export default {
  // 获取微信配置（微信分享需要）
  getWxToken(params) {
    // TODO 需要修改
    return axios.get("http://wxc8f356adb367c7b6.wx.interval.im/api/wx/js_sdk_config/", { params: params });
  }
};
