const fs = require('fs');
const path = require('path');

module.exports = (api, options, rootOptions) => {
  // 需要安装的依赖
  let dependencies = {
    "axios": "^0.21.1",
    "vant": "^2.12.14",
    "vconsole": "^3.4.1",
  }
  // 需要安装的开发依赖
  let devDependencies = {
    "postcss-px-to-viewport": "^1.1.1"
  }
  // 安装一些基础公共库
  api.extendPackage({
    dependencies,
    devDependencies
  });


  // 公共基础目录和文件
  api.render('./template/default');

  // // 加入隐藏文件
  // api.render({
  //   './.editorconfig': './template/handler/_editorconfig',
  //   './.eslintrc.js': './template/handler/_eslintrc.js',
  //   './.gitignore': './template/handler/_gitignore'
  // })

  api.afterInvoke(() => {
    // 删除文件
    (function doDeleteFile() {
      const needDeleteFile = [
        api.resolve("./public/favicon.ico"),
        api.resolve("./src/assets/logo.png"),
        api.resolve("./src/components/HelloWorld.vue"),
        api.resolve("./src/views/About.vue"),
        api.resolve("./src/views/Home.vue"),
      ]
      needDeleteFile.forEach(file => {
        fs.unlink(file, (err) => {
          if (err) throw err;
        })
      })
    })();

    // 重写文件
    (function doRewrite() {
      const needRewriteFile = [
        // 路由文件
        {
          targetPath: api.resolve("./src/router/index.js"),
          useFilePath: path.resolve(__dirname, './template/custom/router/index.js')
        },
        // main文件
        {
          targetPath: api.resolve("./src/main.js"),
          useFilePath: path.resolve(__dirname, './template/custom/main.js')
        },
      ]
      needRewriteFile.forEach(file => {
        fs.readFile(file.useFilePath, (err, data) => {
          if (err) throw err;
          fs.writeFileSync(file.targetPath, data)
        })
      })
    })();

    // 复制文件夹
    (function doCopyDir() {
      const needCopyDir = [
        {
          targetDir: api.resolve("./docs"),
          useDir: path.resolve(__dirname, './template/custom/docs')
        },
      ]

      // 拷贝方法
      function _copy(err, src, dist) {
        if (err) return callback(err);
        fs.readdir(src, function (err, paths) {
          if (err) return callback(err);
          paths.forEach(function (path) {
            var _src = src + '/' + path;
            var _dist = dist + '/' + path;
            // 判断文件是否存在
            fs.stat(_src, function (err, stat) {
              if (err) return callback(err);
              // 判断是文件还是目录
              if (stat.isFile()) {
                fs.writeFileSync(_dist, fs.readFileSync(_src));
              } else if (stat.isDirectory()) {
                // 当是目录是，递归复制
                copyDir(_src, _dist, callback)
              }
            })
          })
        })
      }

      needCopyDir.forEach(dir => {
        // 判断将要写入的目录是存在
        fs.access(dir.targetDir, function (err) {
          err && fs.mkdirSync(dir.targetDir);
          _copy(null, dir.useDir, dir.targetDir);
        })
      })
    }());

    // 创建空的文件夹
    (function doCreateEmptyDir() {
      const neesEmptyDir = [
        api.resolve("./src/assets/images/frame"),
        api.resolve("./src/assets/images/noPreload"),
        api.resolve("./src/assets/images/preload2"),
      ]
      neesEmptyDir.forEach(dir => {
        // 判断将要写入的目录是存在
        fs.access(dir, function (err) {
          err && fs.mkdirSync(dir);
        })
      })
    }());
  })
}