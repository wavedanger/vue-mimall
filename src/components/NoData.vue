<template>
  <div class="no-data">
    <img
      src="/imgs/icon-no-data.png"
      alt=""
    >
    <p>暂无数据</p>
  </div>
</template>
<script>
export default {
  name:'no-data'
}
</script>
<style lang="scss">
.no-data {
  text-align: center;
  font-size: 20px;
  color: #999;
  margin-top: 25px;
  img {
    width: 240px;
    height: 184px;
  }
}
</style>