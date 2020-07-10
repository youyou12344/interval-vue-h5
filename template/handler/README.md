# h5 项目开发须知

## 发布

### 0、修改 Jenkinsfile
将收邮件的地址修改为自己的

### 1、配置项目路径
vue.config.js 需要配置项目目录路径。（再找吕遥配置）

``` JS
// vue.config.js 下面的路径要修改
  publicPath: process.env.NODE_ENV === "production" ? "/路径/" : "/",
```

### 2、本地打包上传
先要本地打包，需要 git push 上传dist文件。

``` shell
npm run build
```


---







