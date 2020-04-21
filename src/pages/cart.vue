<template>
  <div>
    <order-header></order-header>
    购物车
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import OrderHeader from './../components/OrderHeader'
import NavFooter from './../components/NavFooter'
export default {
  name:'order',
  components:{
    OrderHeader,
    NavFooter
  }
}
</script>