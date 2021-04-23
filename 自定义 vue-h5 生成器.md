# 自定义 vue-h5 生成器

vue-cli 可以用来快速创建一个 vue 项目，同时它还提供了 2 种让用户自定义项目初始内容。
1. 用户可以保存某次创建项目时所选的相关配置，下次可根据该配置直接生成项目。*（官方模版）*
2. 如果用户除了保存相关配置，还想进一步修改初始化的目录内容（增删改），就可以自己定一个 generator 生成器。 *（自定义模版）*

为了提高工作效率，可以自己写一个项目模版生成器。写入工作中每次都需要配置的文件（Jenkinsfile、.eslintrc、重置样式等）。

## 使用方式
``` shell
vue create --preset youyou12344/vue-h5 项目名称
```









---

下面是开发指南，可以自行扩展...
## 一、官方模版

*更多详细查看：[vue-cli官网/preset](https://cli.vuejs.org/zh/guide/plugins-and-presets.html#preset)*

### 1、preset 保存模版

如果你在本地运行 vue create xxx ，最后一步 vue-cli 会询问你是否保存将此次项目创建的选择项。
*目的：之后可以直接使用模版创建项目*
``` shell
vue create project-xxx

? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, Router, Vuex, CSS Pre-proce
ssors, Linter
? Use history mode for router? (Requires proper server setup for index fallback
in production) No
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported
by default): Sass/SCSS (with dart-sass)
? Pick a linter / formatter config: Prettier
? Pick additional lint features: Lint on save
? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated confi
g files
? Save this as a preset for future projects? (y/N) # 先生，保存模版吗？
```
选择 y 保存模版，vue-cli 会让给这个模版取一个名字。
``` shell
? Save this as a preset for future projects? Yes
? Save preset as: itv-vue-h5
```
下次，执行创建的时候就会看到模版（相关配置项写在括号中），可以直接选择它创建项目。
``` shell
? Please pick a preset: (Use arrow keys)
❯ itv-vue-h5 (dart-sass, babel, router, vuex, eslint) 
  default (babel, eslint)
  Manually select features
```

### 2、vuerc 查看修改模版

vue-cli 将 preset 的信息将保存在 `~/.vuerc` 中，打开查看。

``` shell
cd ~
open .
command shift . # 查看隐藏文件
```
``` diff {.line-numbers,highlight=[7-8, 20-21， 23-24]}
{
  "useTaobaoRegistry": false,
  "packageManager": "npm",
  "presets": {
    "itv-vue-h5": {
      "useConfigFiles": true,
      // 依赖的包
      "plugins": {
        "@vue/cli-plugin-babel": {},
        "@vue/cli-plugin-router": {
          "historyMode": false
        },
        "@vue/cli-plugin-vuex": {},
        "@vue/cli-plugin-eslint": {
          "config": "prettier",
          "lintOn": [
            "save"
          ]
        },
        // ！添加更多包 ！开发环境的依赖包 devDependencies
        "postcss-px-to-viewport": {},
      },
      // 样式预处理
      "cssPreprocessor": "dart-sass"
    }
  },
  "latestVersion": "4.5.12",
  "lastChecked": 1616496257550
}
```
可以修改 plugins ，自定义添加更多包。
``` shell
? Please pick a preset: (Use arrow keys)
❯ itv-vue-h5 (dart-sass, babel, router, vuex, eslint, postcss-px-to-viewport) # 可以看到这里新增了 postcss-px-to-viewport
  default (babel, eslint)
  Manually select features
```

平常创建完项目还需要 copy 一些打包部署的 CI 配置文件（Jenkinsfile）等，那这个添加开发依赖的 preset 就不够用了。















---
## 二、自定义模版

*更多详细查看：
[vue-cli/插件开发指南](https://cli.vuejs.org/zh/dev-guide/plugin-dev.html#%E5%BC%80%E5%A7%8B)
[GeneratorAPI.js 源码](https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli/lib/GeneratorAPI.js)*

自定义模版作用：跳过命令选择提示，直接使用模版创建项目。
*本地自己用的没有问题，就可以发布到 npm。*
*自定义模版，也可以继续使用命令提示选择器，使用自定义模版更加灵活。*

### 0、项目文件夹结构
已经创建好的自定义脚手架，目录结构如下：
``` shell
|-- generator.js                    添加/修改项目需要的文件，配置入口
|-- preset.json                     设置开发配置preset（开发依赖包、样式处理等）# 必要
|-- prompts.js                      创建时显示的命令行提示（选择结果给 generator.js 使用）
|-- template                        # 自定义的项目文件夹内容
    |-- custom                      按需添加的文件
    |-- default                     默认添加的文件夹内容
        |-- _browserslistrc
        |-- _editorconfig
        |-- _eslintignore
        |-- _eslintrc.js
        |-- _gitignore
        |-- Jenkinsfile
        |-- README.md
        |-- babel.config.js
        |-- jsconfig.json
        |-- postcss.config.js
        |-- vue.config.js
        |-- public
        |   |-- logo.png
        |   |-- index.html
        |   |-- redirect.html
        |-- src                     # 要有这个src文件夹哦
            |-- App.vue
            |-- main.js
            |-- assets
            |   |-- css
            |   |   |-- animation.scss
            |   |   |-- common.scss
            |   |   |-- index.scss
            |   |   |-- reset.scss
            |   |-- images
            |   |   |-- readme.md
            |   |   |-- frame
            |   |   |-- noPreload
            |   |   |-- preload1
            |   |   |   |-- btn-music-pause.png
            |   |   |   |-- btn-music-play.png
            |   |   |-- preload2
            |   |-- js
            |       |-- api.js
            |-- components
            |   |-- PreloadProgress.vue
            |-- router
            |   |-- index.js
            |-- store
            |   |-- index.js
            |   |-- wx.js
            |-- views
                |-- Index.vue
```

### 1、preset.json

preset.json 可以直接复制 `~/.vuerc` 文件中的 presets 属性值 *（不要复制全部哦）*。

``` JS
{
  "useConfigFiles": false,
  "plugins": {
    "@vue/cli-plugin-eslint": {
      "version": "^3.0.0", // 指定版本
       ... // 该插件的其它选项
    }
    ...
  },
  "cssPreprocessor": "dart-sass",
  // 集成工具添加配置
  "configs": {
    "vue": {...},
    "postcss": {...},
    "eslintConfig": {...},
    ...
  }
}
```
*这些额外的配置将会根据 useConfigFiles 的值被合并到 package.json 或相应的配置文件中。例如，当 "useConfigFiles": true 的时候，configs 的值将会被合并到 vue.config.js 中。*

*建议指定第三方插件的版本号。*






### 2、generator.js

插件的 Generator 部分通常在你想要为项目扩展包依赖，创建新的文件或者编辑已经存在的文件时需要。

*原理：使用 [EJS](https://github.com/mde/ejs) 渲染添加 template 文件夹中的模版文件。*

*项目的创建是基于 vue-cli 默认创建项目结构，即先根据 preset 创建默认项目，在根据 generator.js 修改相关的目录结构。(可以在 vue-create 时，打开对应的文件夹查项目内容)*



#### 接受参数
- generator.js 文件是一个函数，接受三个参数
- `api` 用于调用 GeneratorAPI 相关接口生成文件夹。
- `options` 用于查看从命令行中获取到的相关配置参数值。
- `rootOptions`
*rootOptions.projectName 项目的名称，emm....*
``` JS
module.exports = (api, options, rootOptions) => {
  api.extendPackage({...})
  api.render('./template/default')
  options.h5 && api.render('./custome/h5.vue')
}
```



#### api.extendPackage
- 负责给初始化项目中的 package.json `添加依赖包`；
``` JS
module.exports = (api, options, rootOptions) => {

  api.extendPackage({
    dependencies: {
      "axios": "^0.19.0",
      "vue-router": "^3.0.3"
    },
    devDependencies: {
      "style-resources-loader": "^1.3.3",
      "postcss-px-to-viewport": "^1.1.1"
    }
  });
}
```

#### api.render
- 负责将模板项目中提前定义好的`目录/文件拷贝`到初始化的项目的`根目录`中；

*render 参数是字符串，表示拷贝`整个文件夹内容`。（？有层次限制吗？拷贝的位置是哪里？src目录/根目录？）*
``` JS
module.exports = (api, options, rootOptions) => {
  api.render('./template/default'); // 拷贝目录
}
```

```!
FIXME  2021年 4月23日 星期五
但是，如果使用了 @vue/cli-plugin-router ，可能就不能直接覆盖src
且删除不了 helloworld.vue

怎么删除原本的文件？helloworld.vue？

? 拷贝目录的话，直接传地址字符串，render 函数会将你所传目录内的所有文件覆盖初始化项目中 src 目录下的文件（我的测试结果是限于两层目录）；
```

*render 参数是 {key: value} 对象，表示拷贝 value 文件到 key 路径。*
``` JS
module.exports = (api, options, rootOptions) => {
  api.render({
    './src/mixins/bgm.js': './template/handler/mixins/bgm.js',
    './src/assets/bgm.mp3': './template/handler/assets/bgm.mp3',
  })
}
```

*注意：当你需要创建一个以 . 开头的文件时，`文件名字中需要用 _ 替代 .`。*
``` JS
module.exports = (api, options, rootOptions) => {
  api.render({
    './.editorconfig': './template/handler/_editorconfig',
    './.eslintrc.js': './template/handler/_eslintrc.js'
  })
}
```

#### 按需加载代码

vue-cli 3 在拷贝文件时使用的是 EJS 模板去实现的，所以开发者是可以在任意文件中使用 EJS 语法去做**更细粒度**的控制，即是否加载这部分代码。

``` diff
<%_ if (options.vuex) { _%>
import store from './store'
<%_ } _%>

new Vue({
  router,
  <%_ if (options.vuex) { _%>
  store,
  <%_ } _%>
  render: h => h(App)
}).$mount('#app')
```
#### YAML 替换模版
- 可以使用 YAML 前置元信息继承并替换已有的模板文件的一部分（即使来自另一个包）：
``` diff
---
extend: '@vue/cli-service/generator/template/src/App.vue'
replace:
  - !!js/regexp /Welcome to Your Vue\.js App/
  - !!js/regexp /<script>[^]*?<\/script>
---

<%# REPLACE %>
替换欢迎信息
<%# END_REPLACE %>

<%# REPLACE %>
<script>
export default {
  // 替换默认脚本
}
</script>
<%# END_REPLACE %>
```

#### 修改 html
注意`标签属性值`里面的 `<%= xxx %>` 需要转义写成 `<%%= xxx %>`。
``` diff {.line-numbers,highlight=[7-8, 13]}
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, minimum-scale=1, maximum-scale=1">
    <link rel="icon" href="<%%= BASE_URL %>logo.png">
    <title><%= rootOptions.projectName %></title>
    <script src="//res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but <%= rootOptions.projectName %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <div style="display:none;">
      <!-- 埋点 -->
      <!-- <script type="text/javascript" src="https://v1.cnzz.com/z_stat.php?id=1278951998&web_id=1278951998"></script> -->
    </div>
    <!-- built files will be auto injected -->
  </body>
</html>
```


#### api.afterInvoke
api.afterInvoke 创建完成后回调，在这时删除/重写vue-cli原本的默认文件。

*似乎不能在template中直接覆盖vue-cli的默认文件，比如：main.js 、router/index.js，所以在创建完成后再手动覆盖。*
``` JS
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
  })
```

*注意：如果不能修改覆盖原有文件，请检查更新 vue/cli 的版本。*


#### 其他API

api.postProcessFiles 负责具体处理模板项目中的文件。

*其他API: [generator-api](https://cli.vuejs.org/dev-guide/generator-api.html#resolve)*





### 3、prompts.js
prompts.js 返回一个问题数组，并解析到的答案对象将作为选项传入到插件的 generator。
问题比如是否安装h5相关文件。

*更多查看：[Inquirer.js 源码](https://github.com/SBoudrias/Inquirer.js)*

``` JS
module.exports = [
  {
    name: "htmlTitle",
    type: "input", // 选项形式：输入框
    message: '请输入项目的html标题（若不设置，则默认取文件夹名称）',
    default: ''
  },
  {
    name: "vconsole",
    type: "confirm", // 选择形式：是否
    message: `是否是安装vconsole`, // 问题
    default: true
  },
  {
    name: "mode",
    type: "rawlist", // 选择方式：单选
    message: '请选择要创建项目类型',
    choices: ['pc项目', 'h5项目'], // 选项
    default: 0 // 默认值
  },
  {
    name: "toolNeed",
    type: "checkbox", // 选择方式：多选
    message: '请选择需要的工具库',
    choices: [
      new inquirer.Separator(' --- 样式工具 🎨 --- '),
      {name: 'vant'},
      {name: 'vconsole'},
    ],
    default: 0
  }
];
```
创建的时候就会有相关提示信息了。

*补充：prompts.js 的形式还可以使用一个函数返回一个问题数组，并将 `package.json` 作为参数传入函数。*
``` JS
module.exports = pkg => {
  if ('@vue/cli-plugin-eslint' in (pkg.devDependencies || {})) {
    prompts.push({
      type: 'confirm',
      name: 'useESLintPluginVueI18n',
      message: 'Use ESLint plugin for Vue I18n ?'
    })
  }
  return prompts
}
```

generator.js 获取到的信息如下：
``` JS
module.exports = (api, options, rootOptions) => {
  const tool_vant = options.toolNeed.includes('vant'); // 选择方式：多选
}
```


### 4、测试使用本地preset
在该项目的目录下，运行如下命令：
``` shell
vue create --preset ./itv-vue-h5 test1
```

远程包的使用
``` shell
vue create --preset youyou12344/vue-h5 test2
```

``` shell
➜  【勿删模版】 vue add itv-vue-h5

📦  Installing vue-cli-plugin-itv-vue-h5...

+ vue-cli-plugin-itv-vue-h5@2.0.0
added 35 packages from 28 contributors and audited 35 packages in 7.716s
found 0 vulnerabilities

✔  Successfully installed plugin: vue-cli-plugin-itv-vue-h5

 ERROR  Error: The package.json file at '/Users/lijing/Desktop/【勿删模版】/package.json' does not exist
Error: The package.json file at '/Users/lijing/Desktop/【勿删模版】/package.json' does not exist
    at getPackageJson (/usr/local/lib/node_modules/@vue/cli/lib/util/getPkg.js:14:11)
    at getPkg (/usr/local/lib/node_modules/@vue/cli/lib/util/getPkg.js:27:15)
    at invoke (/usr/local/lib/node_modules/@vue/cli/lib/invoke.js:29:15)
    at process._tickCallback (internal/process/next_tick.js:68:7)
```


当你开发自己的插件时，你需要测试它、查看它在使用 Vue CLI 创建的项目中如何工作。你可以使用已经存在的项目或者创建一个新的项目用来测试：

``` shell
vue create test-app
```
安装插件，在项目根目录运行下面的命令：
``` shell
npm install --save-dev file:/full/path/to/your/plugin
vue invoke <your-plugin-name>
```
每次插件修改后，你需要重复这个步骤。


成功发布后，你应该能够使用 vue add <plugin-name> 命令将你的插件添加到使用 Vue CLI 创建的项目。







---
## 三、待解决
- [ ] 请输入项目的html标题，无法取到 vue-create 设置的名字 【20200707】

``` HTML
    <title><%= options.htmlTitle || rootOptions.projectName %></title>
```





---
## x、参考

- [如何使用 vue-cli 3 的 preset 打造基于 git repo 的前端项目模板](https://segmentfault.com/a/1190000016389996)
- [参考别人的项目：custom-tpl](https://github.com/natee/vue-cli-plugin-custom-tpl)
- [How to build your own vue-cli 3 plugin](https://medium.com/@Seb_L/how-to-build-your-own-vue-cli-3-plugin-be4b1a6bb68b)
- [Vue Cli 插件开发记录](https://mrgaogang.github.io/vue/Vue-cli%E6%8F%92%E4%BB%B6%E5%BC%80%E5%8F%91.html#_3-generator-%E5%B8%B8%E7%94%A8-api)
