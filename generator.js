module.exports = (api, options, rootOptions) => {
  // 安装一些基础公共库
  api.extendPackage({
    dependencies: {
      "axios": "^0.19.0",
      // "core-js": "^2.6.5",
      // "vue-router": "^3.0.3"
    },
    devDependencies: {
      // "@vue/cli-plugin-babel": "~4.3.0",
      // "@vue/cli-plugin-eslint": "~4.3.0",
      // "@vue/cli-plugin-router": "~4.3.0",
      // "@vue/eslint-config-prettier": "^6.0.0",
      // "babel-eslint": "^10.1.0",
      // "eslint": "^6.7.2",
      // "eslint-plugin-prettier": "^3.1.1",
      // "eslint-plugin-vue": "^6.2.2",
      // "less": "^3.0.4",
      // "less-loader": "^5.0.0",
      // "prettier": "^1.19.1",
      // "vue-template-compiler": "^2.6.11",
      "postcss-px-to-viewport": "^1.1.1"
    }
  });

  // 安装 howler
  if (options.howler) {
    api.extendPackage({
      dependencies: {
        howler: "^2.1.2"
      }
    });
  }

  // 公共基础目录和文件
  // api.render('./template/default');

  // 配置文件
  api.render({
    './.editorconfig': './template/_editorconfig',
    './.eslintrc.js': './template/_eslintrc.js',
    './src/style/a.less': './template/a.less',
    './src/api.js': './template/api.js',
    './src/App.vue': './template/App.vue',
    './src/assets/bgm.mp3': './template/bgm.mp3',
    './src/bus.js': './template/bus.js',
    './src/views/Index.vue': './template/Index.vue',
    './Jenkinsfile': './template/Jenkinsfile',
    './src/main.js': './template/main.js',
    './src/assets/images/music-on.png': './template/music-on.png',
    './src/assets/images/music-off.png': './template/music-off.png',
    './postcss.config.js': './template/postcss.config.js',
    './src/router.js': './template/router.js',
    './src/components/Toast.vue': './template/Toast.vue',
    './src/utils.js': './template/utils.js',
  });
}