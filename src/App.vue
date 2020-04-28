<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import storage from './storage'
export default {
  name: 'App',
  data(){
    return{
      res:{}
    }
  },
  components: {
  },
  mounted() {
    // let a=storage.getItem("name","user")
    // console.log(a)
    // 本地JSON
    // this.axios.get("/mock/user/login.json").then(res=>console.log(res))
    // mockjs
    // this.axios.get("/user/login").then(res=>this.res=res)
     if(this.$cookie.get('userId')){
      this.getUser();
      this.getCartCount();
    }
  },
  methods: {
    getUser(){
      this.axios.get('/user').then((res={})=>{
        this.$store.dispatch('saveUserName',res.username)
      })
    },
    getCartCount(){
      this.axios.get('/carts/products/sum').then((res=0)=>{
       this.$store.dispatch('saveCartCount',res);
      })
    }
  },
}
</script>

<style lang="scss">
@import "./assets/scss/reset.scss";
@import "./assets/scss/config.scss";
@import "./assets/scss/button.scss";
</style>
