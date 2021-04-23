// 样式中的px转化为vw
module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      unitToConvert: "px",
      viewportWidth: 375, // 设计稿的宽度
      // viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      unitPrecision: 10, // 指定`px`转换为视窗单位值的小数位数
      propList: ["*"],
      viewportUnit: "vw", // 指定需要转换成的视窗单位，建议使用vw
      fontViewportUnit: "vw",
      selectorBlackList: [], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false, // 允许在媒体查询中转换`px`
      replace: true,
      exclude: [],
      landscape: false,
      landscapeUnit: "vw",
      landscapeWidth: 568
    }
  }
};
