# 使用itv-vue-h5指南










---
## interval-vue-h5 实现/封装了什么?

### 封装了h5常用的功能
1. 微信分享 *(src/store/wx.js)*
2. 图片预加载进度条 *(src/components/PreloadProgress.vue)*
3. 背景音乐 *(src/components/BgMusic.vue)*

### 自动注入了常用库
1. vant 的 toast 组件 *(src/main.js)*
2. axios 接口调用 *(src/assets/js)*
3. vconsole 调试组件 *(src/main.js)*
4. postcss-px-to-viewport 适配屏幕 *(postcss.config.js)*


### 添加h5项目常用文件
1. Jenkinsfile 打包部署配置文件
2. eslint 及 prettier 代码风格配置
3. css 样式 *(src/assets/css/index.scss)*


想要保存时，vscode自动根据 eslint 格式化，要添加编辑器设置 setting.json
``` JS
{
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
      "source.organizeImports": false
    }, // 每次保存的时候将代码按eslint格式进行修复
}
```




### 须知
1. 项目的路由模式： `hash` (不用麻烦后端配置不同的路径)
2. css 扩展语言： `scss` (变量、函数比less好用)
3. 项目是在本地打包的！需要 npm run build 提交 dist 文件夹，才能看到效果哦！！！
4. 要找后端配置 `VUE_APP_FD_FILENAME` 项目部署的服务器文件夹位置。 *(./vue.config.js)*





---
## 怎么使用 interval-vue-h5 ？

创建项目
``` shell
vue create --preset youyou12344/interval-vue-h5 项目名称
```

查看 ./docs 下的相关说明文档，查看封装的内容如何具体使用。

