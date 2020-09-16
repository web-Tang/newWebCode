<template>
  <div class="right">
    <div class="img-div">
      <img src="../../assets/logo.jpg" class="logo" />
      <p class="rightp">轻松学算法</p>
      <p class="rightp">小程序:轻松学算法</p>
    </div>
    <div class="button_div">
      <van-button type="primary" size="mini" to="/home">首页</van-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Button } from "vant";

Vue.use(Button);
export default {};
</script>

<style scoped>
.img-div {
  margin-top: 30px;
  text-align: center;
}
.logo {
  height: 160px;
  width: 160px;
}
.rightp {
  font-size: 14px;
  margin-top: 0;
}
.button_div {
  padding-left: 10px;
}
</style>
