# PreloadProgress.vue图片预加载及进度条封装









---
## 封装了什么？
1、预加载及进度条组件 `PreloadProgress.vue`

预加载图片资源的逻辑为什么写在进度条组件中？
因为进度条的作用，就是给图片资源加载缓冲时间，等图片加载好后在显示，所以将预加载的逻辑和进度条组件写在一起。









---
## 怎么用？

### 1、图片资源位置
首先，要知道 `assets/images/` 对应文件夹的作用。
#### frame 帧动画
- 该文件夹中的图片，打包时都会被压缩为 base-64 （避免动画卡断）
- 注意：如果不止一个帧动画，需要在 vue.config.js 添加文件夹

#### noPreload 非必要图片
- 不需要预加载图片

#### preload1 首屏加载进度条必要图片
- 即加载页面需要的图片资源，比如进度条、背景图片
- 加载中，显示白屏（尽量少的图片，减少白屏时间）

#### preload2 其他页面必要图片
- 比如：进度条100%后，第一个显示页面中需要的图片资源
- 加载中，显示进度条

*文件夹中的 .gitkeep 是为了能够创建空的文件夹(如果文件夹中确定有内容，则可以删除)*

### 2、使用组件
在 App.vue 中使用组件 `PreloadProgress.vue` ，当预加载完成会执行回调函数 `onFinish`。
``` HTML
<template>
  <div id="app">
    <PreloadProgress @onFinish="onFinishPreload" v-show="!isShowView" />
    <transition name="fade">
      <router-view class="page" v-show="isShowView" /> <!-- 未加载好不显示，子路由 -->
    </transition>
  </div>
</template>

<script>
import PreloadProgress from "@/components/PreloadProgress.vue"

export default {
  data() {
    return {
      isShowView: true, // 是否显示路由内容
    }
  },
  components: { PreloadProgress },
  methods: {
    onFinishPreload() {
      this.isShowView = true
    },
  },
}
</script>
```
