const path = require("path");

function resolve(dir) {
  return path.join(__dirname, "./", dir);
}

module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "src/style/a.less")]
    }
  }
};
