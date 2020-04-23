# mall

## Project setup
```
npm install
```

## 学习记录
### 知识点
1. 跨域
  * CORS(后端修改)
    * 服务端设置Access-Control-Allow-Origin
  * JSONP(前后端配合)
    * 安装JSONP插件
    ```javascript
    jsonp(url,(err,res)=>{})
    ```
  * 接口代理(前端修改)
    * 修改nginx服务器
    * vue中设置vue.config.js
2.  需求梳理
    * 熟悉文档、查看原型、读懂需求
    * 了解前端设计稿-设计前端业务架构
    * 了解后台接口文档-制定相关对接规范
    * 协调资源
    * 搭建前端架构 
3.  路由封装
    * 公用组件提取
    * 合理使用router-view
    * children层级关系
3.  Storage封装
    * cookie,storage：大小，有效期，cs端，路径，有无特定api
    * Storage只能存储字符串，只能一次性清空
    * 利用传参和JSON.parse重写，数据保存在一个JSON对象中
4.  接口错误拦截
    * 统一报错
    * 未登录统一拦截
    * 请求值返回值统一处理
    ```JSON
    {
      status:0,
      data:[],
      msg:''
    }
    ```
5.  接口环境设置
    * 开发上线的不同阶段，需要不同的配置
    * 不同的跨域方式，配置不同
    * 打包的时候统一注入环境参数，统一管理，输出不同的版本包
    ```javascript
    //修改package.json
    //--mode后命名有规范，自定义需在最外层路径新建自定义文件
    //如以下te_st，则新建.env.te_st里面写NODE_ENV='te_st'方可识别
    "scripts": {
    "serve": "vue-cli-service serve --mode=development",
    "te_st": "vue-cli-service serve --mode=te_st",
    "test": "vue-cli-service serve --mode=test",
    "prev": "vue-cli-service serve --mode=prev",
    "build": "vue-cli-service build --mode=production",
    "lint": "vue-cli-service lint"
    },
    //再通过env.js中process.env.NODE_ENV更改对应baseurl
    ```
6.  Mock设置
    * 提高效率，减少沟通，减少接口联调时间
    * 方案：
      * 本地JSON
      * easy-mock
      * 集成Mock API
7.  scss
    * 重置、通用样式
    * @mixin,@include