module.exports = (api, options, rootOptions) => {
  // 需要 vant 库
  const tool_vant = options.toolNeed.includes('vant');
  
  // 需要安装的依赖
  let dependencies = {
      "axios": "^0.19.0",
      "vue-router": "^3.0.3"
  }
  options.mode === 0 && (dependencies["howler"] = "^2.2.0")
  tool_vant && (dependencies["vant"] = "^2.8.7")

  // 需要安装的开发依赖
  let devDependencies = {
    "style-resources-loader": "^1.3.3",
    "postcss-px-to-viewport": "^1.1.1"
  }
  tool_vant && (dependencies["babel-plugin-import"] = "^1.13.0")

  // 安装一些基础公共库
  api.extendPackage({
    dependencies,
    devDependencies
  });


  // 公共基础目录和文件
  // 将一整个文件夹的内容加载在根目录下
  // 但是，如果使用了 @vue/cli-plugin-router ，可能就不能直接覆盖src
  // 删除不了 helloworld.vue
  api.render('./template/default');

  // 加入 bgm 相关文件
  options.mode === 0 && api.render({
    './src/components/Bgm.vue': './template/handler/components/Bgm.vue',
    './src/mixins/bgm.js': './template/handler/mixins/bgm.js',
    './src/assets/images/music-on.png': './template/handler/assets/images/music-on.png',
    './src/assets/images/music-off.png': './template/handler/assets/images/music-off.png',
    './src/assets/bgm.mp3': './template/handler/assets/bgm.mp3',
  })

  // 加入隐藏文件
  api.render({
    './.editorconfig': './template/handler/_editorconfig',
    './.eslintrc.js': './template/handler/_eslintrc.js',
    './.gitignore': './template/handler/_gitignore'
  })

  // 加入vant配置
  tool_vant && api.render({
    './.babelrc': './template/handler/_babelrc'
  })

  api.onCreateComplete(() => {
    const fs = require('fs')
    const path = require('path')
    const path1 = api.resolve("./README.md");
    const path2 = api.resolve("./src/components/HelloWorld.vue");
    const path3 = api.resolve("./babel.config.js");

    // 删除 HelloWorld.vue
    fs.unlink(path2, (err) => {
      if (err) throw err;
    })

    // 重写 README.md
    fs.readFile(path.resolve(__dirname, './template/handler/README.md'), (err, data) => {
      if (err) throw err;
      fs.writeFileSync(path1, data)
    })

    // 重写 babel.config.js
    tool_vant && fs.readFile(path.resolve(__dirname, './template/handler/babel.config.js'), (err, data) => {
      if (err) throw err;
      fs.writeFileSync(path3, data)
    })
  })
}