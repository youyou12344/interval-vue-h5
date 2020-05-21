const path = require("path");

function resolve(dir) {
  return path.join(__dirname, "./", dir);
}

module.exports = {
  productionSourceMap: false,
  /* TODO：这里需要找ly配置路径 */
  publicPath: process.env.NODE_ENV === "production" ? "/路径/" : "/",
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "src/style/a.less")]
    }
  }
};
