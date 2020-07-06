# 项目发布

## 1、tip: 发布要本地打包，需要上传dist文件。

``` shell
npm run build
```



---



## 2、tip: vue.config.js 需要配置目录路径。再找吕遥配置

``` JS
// vue.config.js 下面的路径要修改
  publicPath: process.env.NODE_ENV === "production" ? "/路径/" : "/",
```


