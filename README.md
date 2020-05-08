# mall

## Project setup
```
git clone git@github.com:wavedanger/vue-mimall.git
cd vue-mimall
npm install //安装依赖
npm run serve //服务端运行 访问 http://localhost:8080
npm run build //项目打包
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
      * 集成Mock API
8.  net::ERR_BLOCKED_BY_CLIENT
    * Adblock-Plus插件拦截，显示不出广告
    * 实质为拦截类名，文件名包含ads之类的广告字眼
9. 组件吸顶
    ```javascript
    //挂载
     mounted() {
    window.addEventListener('scroll',this.initHeight)
    },
    methods: {
      initHeight(){
        //兼容浏览器
        let y=window.pageYOffset||document.documentElement.offsetTop||document.body.scrollTop
        this.isFixed=y>152?true:false
      }
    },
    //销毁
    destroyed() {
      window.removeEventListener('scroll',this.initHeight,false)
    },
    ```
10. 按需加载和按需引入
    * 后者会全部打包，前者会按需打包，减少包大小
11. babel
    * .babelrc 适用于单个软件包的配置
    * babel.config.js 适用于编译node_modules目录下的模块
12. 单页面数据更新问题
    * 登录后返回首页并不会刷新，所以需再次请求数据
    * 通过判断登录页面来源，来避免资源浪费
    * router的query和params传参
    * query为明文会拼接到url上，而params不会，类似于get和post
    ```javascript
    //query
    this.$router.push({
      path:'/index',
      query:{
        from:'login'
      }
    })
    //params
    this.$router.push({
      name:'index',
      params:{
        from:'login'
      }
    })
    ```
13. 支付
    * 支付宝：接口返回form表单，通过document.form[0].submit()提交名单来跳转到支付宝支付界面
    * 微信：接口返回二维码字符串，使用qrcode转化成base64图片，再展示为二维码
    * 微信支付状态轮循：二维码生成后，setInterval后端订单接口判断是否支付成功，从而跳转到订单列表，网络或者关闭二维码等问题则进行二次弹框进行确认，支付完成可在axios.interceptors.response.use配置拦截
14. 分页
    * 分页器
    * 加载更多按钮
    * 滚动加载
15. 性能优化
    * 路由懒加载
    ```javascript
    //第一种
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['./pages/login.vue'], resolve)
    }
    //第二种 为es7语法，可能需要安装syntax-dynamic-import插件
    () => import('./pages/login.vue'),
    //默认会预加载js，但有些浏览器不支持，可以在vue.config.js中配置，禁用预加载
    chainWebpack: (config) => {
      config.plugins.delete('prefetch');
    }
    ```
    * [图片压缩](https://tinypng.com/)
    * [七牛云-加速服务器](https://www.qiniu.com/)
    * CDN  
16. 项目部署
    * nginx安装和配置
      * 登录服务器(腾讯云服务器可以直接可视化登录，以下路径以腾讯云路径为例，系统为centOS)
        ```
        <!-- 第一种 -->
        ssh root@49.234.15.213+服务器密码
        <!-- 第二种 -->
        密钥对
        ```
      * 常用命令
        * ls 展开文件
        * cd 进入文件目录 cd.. 返回上一级
        * which 查看文件安装路径
        * cat 查看文件
        * vi 修改文件 按i进入编辑 enter或esc加wq退出保存,q!为不保存
        * cp index.html /workspace/index.html克隆前者到后者
      * 安装nginx
        * yum install nginx 
        * which nginx查看安装路径（/usr/sbin/nginx）
        * nginx -t查看配置文件（/etc/nginx/nginx.conf）
        * cd /etc/nginx/进入目录
        * cat nginx.conf进入文件
          ```
          server {
                      listen       80 default_server;
                      listen       [::]:80 default_server;
                      server_name  _;
                      root         /usr/share/nginx/html;

                      # Load configuration files for the default server block.
                      include /etc/nginx/default.d/*.conf;

                      location / {
                      }

                      error_page 404 /404.html;
                          location = /40x.html {
                      }

                      error_page 500 502 503 504 /50x.html;
                          location = /50x.html {
                      }
                  }
          ``` 
        * nginx -s stop 停止服务
        * nginx -s reload 重启服务
        * nginx 启动服务
      * 设置二级域名
        * 通过include在nginx.conf引入配置
          ```
          include /etc/nginx/vhost/*.conf
          ```
        * 编写配置mi.weibinhong.conf
          ```
          server {
                    listen 80;
                    server_name mi.weibinhong.com;
                          root /workspace;
                          index index.html index.htm login.html;
                          location ^~/api/ {
                            proxy_pass http://mall-pre.springboot.cn/;
                          }
                    location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
                    {
                      root /workspace;
                    }

                    location ~ .*\.(js|html|css)?$
                    {
                      root /workspace;
                      expires 30d;
                    }
                  }
          ```
        * 搭建FTP
          * 安装vsftpd (yum install -y vsftpd)
          * 配置
          * 下载FileZilla远程连接服务器，上传打包后的文件，即可访问
    * node.js安装和配置  
### 参考文档
* [swiper中文网](https://www.swiper.com.cn/)
* [npmjs](https://www.npmjs.com/)
* [vue-cli](https://cli.vuejs.org/zh/config/#vue-config-js)