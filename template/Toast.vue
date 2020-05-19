<template>
  <transition :name="transition" mode="out-in">
    <div class="itv-toast" :style="styles" v-show="show" v-html="content"></div>
  </transition>
</template>

<script>
export default {
  name: "Toast",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    content: {
      type: [String, Number],
      default: ""
    },
    duration: {
      type: Number,
      default: 1000
    },
    transition: {
      type: String,
      default: "fade"
    },
    top: {
      type: String,
      default: "75vh"
    }
  },
  computed: {
    styles() {
      let style = {
        top: this.top
      };
      return style;
    }
  },
  watch: {
    show(val) {
      if (val) {
        setTimeout(() => {
          this.$emit("update:show", false);
        }, this.duration);
      }
    }
  }
};
</script>

<style lang="less">
.itv-toast {
  position: fixed;
  left: 50%;
  top: 70vh;
  padding: 20px 40px;
  background: rgba(0, 0, 0, 0.8);
  font-size: 30px;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  z-index: 9999;
  transform: translate(-50%);
  font-family: "PingFang SC", "Helvetica Neue", sans-serif;
}
</style>
