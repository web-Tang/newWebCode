<template>
  <div class="top">
    <div class="img_div">
      <img src="../../assets/logomin.jpg" class="img" />
      <div class="text">轻松学算法</div>
    </div>
    <div class="tool">
      <div class="sign" @click="login" ref="sign" v-if="!islogin">登陆</div>
      <div class="out" @click="logout" ref="out" v-if="islogin">退出</div>
      <div class="more" @click="more">更多信息</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    more() {
      this.$emit("more");
    },
    login() {
      this.$emit("login");
    },
    logout() {
      this.$emit("logout");
    },
  },
  computed: {
    islogin() {
      return this.$store.getters.getIsLogin;
    },
  },
};
</script>

<style scoped>
.top {
  height: 50px;
  width: 100%;
  display: flex;
  background-color: #69d78a;
  position: fixed;
  top: 0;
  z-index: 1000;
}
.img_div {
  width: 180px;
  display: flex;
  margin: 5px 10px 5px 10px;
}
.img {
  height: 40px;
  width: 40px;
  border-radius: 20px;
}
.text {
  font-size: 14px;
  margin: 10px 0px 0px 20px;
  color: white;
}
.tool {
  display: flex;
  margin: 12px 10px 7px 50px;
  margin-left: auto;
}
.sign {
  margin-right: 10px;
  border: 1px white solid;
  padding: 4px 10px 5px 10px;
  border-radius: 15px;
  font-size: 14px;
  color: white;
}
.out {
  margin-right: 10px;
  border: 1px white solid;
  padding: 4px 10px 5px 10px;
  border-radius: 15px;
  font-size: 14px;
  color: white;
}
.more {
  border: 1px white solid;
  border-radius: 15px;
  padding: 4px 10px 5px 10px;
  font-size: 14px;
  color: white;
}
</style>
