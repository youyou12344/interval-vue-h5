const path = require("path")
function resolve(dir) {
  return path.join(__dirname, "./", dir)
}

const IS_MODE_PROD = process.env.NODE_ENV === "production" // 是生产环境
process.env.VUE_APP_FD_FILENAME = "h5-interval" // 前端项目部署的子文件夹名称（部署项目时，需告知后端）
process.env.VUE_APP_FD_SERVER = "http://wxc8f356adb367c7b6.wx.interval.im/" // 前端项目部署的服务器位置（默认h5都部署在这里）
process.env.VUE_APP_FD_URL = `${process.env.VUE_APP_FD_SERVER}${process.env.VUE_APP_FD_FILENAME}/` // 前端项目部署的入口路径（hash）

module.exports = {
  devServer: {
    progress: false, // 不显示具体进度
  },
  productionSourceMap: false,
  publicPath: `/${IS_MODE_PROD ? process.env.VUE_APP_FD_FILENAME : ""}`,
  chainWebpack: (config) => {
    config.resolve.alias.set("~", resolve("src")) // 添加别名
    config.resolve.alias.set("@", resolve("src")) // 添加别名

    config.module
      .rule("images") // 默认的图片处理
      .exclude.add(resolve("src/assets/images/frame")) // 将帧图文件夹移除
      .end()

    config.module
      .rule("imagesBase64") // 新规则的名字
      .test(/\.png$/) // 规则处理的文件
      .include.add(resolve("src/assets/images/frame")) // 只处理帧图文件夹
      .end()
      .use("url-loader")
      .loader("url-loader")
      .options({
        limit: 11300,
        name: "[name].[hash:8].[ext]",
        outputPath: "img",
      })
  },
  configureWebpack: {
    module: {},
  },
}
