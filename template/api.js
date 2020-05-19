import axios from "axios";

export default {
  // 获取微信配置
  getWxToken(params) {
    return axios.get("/api/wx/js_sdk_config/", { params: params });
  },

  <%_ if (options.wx_user) { _%>
  // 获取用户信息
  getUserInfo(params) {
    return axios.get("/api/current_user/", { params: params });
  }
  <%_ } _%>
};
