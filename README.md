## 这是一个什么项目？

vue-cli 3.0 提供了 preset 入口，让我们能够自定义项目内容。<br/>
比如：添加安装需要的npm包、自定义的文件、修改App.vue等。

## 如何使用本项目



1、**记得更新 vue/cli的版本**，才可以重写readme.md

``` shell
npm upadte @vue/cli
```

2、这里可能要 安装一下 inquirer，为了命令行工具
``` shell
npm install
```

3、在你的本地运行下面的命令就可以了。
``` shell
vue create --preset youyou12344/vue-h5 test2
```

运行的时候会询问你是否需要安装相应的库，是否需要获取用户权限，按需加载代码。

最后，会生成如下图的文件结构
<img src="https://user-gold-cdn.xitu.io/2020/5/19/1722ba94d66ed617?w=2784&h=1778&f=png&s=896944" style="display:block;width: 800px;" />


## 我是如何开发的？

### 文件解释
template 模版文件
- default 是默认一定需要的
- handler 是可选的/需要手动处理的（比如文件名）


### 注意事项：
- 微信 JS-SDK 的 JS 文件之后可能要更新哦，如果要使用新的功能。


### 还存在的问题

- [x] HelloWorld.vue 文件无法删除
- [x] README.md 文佳无法覆盖
- [x] vant 按需安装
- [ ] 请输入项目的html标题，无法取到 vue-create 设置的名字
