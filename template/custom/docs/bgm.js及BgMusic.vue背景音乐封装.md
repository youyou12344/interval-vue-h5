# bgm.js及BgMusic.vue背景音乐封装

## 封装了什么？
1、背景音乐的操作按钮写成了组件 `BgMusic.vue` ，在 App.vue 中注入。
2、在不同的页面中，都会对背景音乐进行操作，所以将背景音乐的操作逻辑放在在全局 store 的 `bgm.js` 模块中进行管理。

## 怎么用？
具体的使用方式如下：
``` HTML
<template>
  <div id="app">
    <BgMusic />

    <div>
      <button class="btn" @click="onMusicButton(1)">微信自动播放</button>
      <button class="btn" @click="onMusicButton(2)">点击播放音乐</button>
      <button class="btn" @click="onMusicButton(3)">点击暂停音乐</button>
      <button class="btn" @click="onMusicButton(4)">显示音乐按钮</button>
      <button class="btn" @click="onMusicButton(5)">隐藏音乐按钮</button>
    </div>
  </div>
</template>

<script>
import BgMusic from "@/components/BgMusic.vue"

export default {
  components: { BgMusic },
  mounted() {
    this.$store.dispatch("doWxConfig") // 微信权限校验配置
    wx.ready(() => {
      this.$store.dispatch("palyBgm") // 微信自动播放背景音乐
    })
  },
  methods: {
    onMusicButton(type) {
      if (type === 1) {
        return this.$store.dispatch("palyBgm")
      } else if (type === 2) {
        return this.$store.dispatch("swichBgm", "play")
      } else if (type === 3) {
        return this.$store.dispatch("swichBgm", "stop")
      } else if (type === 4) {
        return this.$store.commit("setIsShowBtnMusic", true)
      } else if (type === 5) {
        return this.$store.commit("setIsShowBtnMusic", false)
      }
    },
  },
}
</script>


<style lang="scss">
.btn {
  width: 60%;
  display: block;
  margin: 10px auto;
}
</style>
```


