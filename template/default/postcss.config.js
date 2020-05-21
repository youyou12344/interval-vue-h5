module.exports = {
  plugins: {
    autoprefixer: {},
    /* Q：这个有什么用？ */
    /* A：比如切出来的背景图片的宽度是TAG1，但是显示在手机上的大小应该是100vw。postcss-px-to-viewport插件的作用就是将px转为vw，比例为TAG1:100 */
    "postcss-px-to-viewport": {
      unitToConvert: "px",
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750（如果我们设置的宽度是300px，那么编译之后的宽度为(300/750*100)=40vw,如果频宽实际为375px，那么该元素的宽度为（375*0.4）= 150px）
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
