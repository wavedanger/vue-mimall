import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import env from './env'
Vue.use(VueAxios, axios);
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000;
// 根据环境变量获取不同的请求地址
axios.defaults.baseURL = env.baseURL;
// 接口错误拦截
axios.interceptors.response.use(function (response) {
  let res = response.data;
  if (res.status == 0) {
    return res.data;
  } else if (res.status == 10) {
    window.location.href = '/#/login';
  } else {
    console.log("error")
  }
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
