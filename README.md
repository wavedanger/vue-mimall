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
    ```
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
