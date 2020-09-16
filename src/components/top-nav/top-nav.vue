<template>
  <div class="top-nav">
    <div class="img_div">
      <van-icon name="arrow-left" size="24" @click="back" color="#ffffff" />
      <div class="text" v-html="text"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
  },
  methods: {
    back() {
      this.$emit("back");
    },
    like() {
      this.$emit("like");
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
.top-nav {
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
  margin: 13px 10px 5px 10px;
}
.text {
  font-size: 14px;
  margin: 2px 0px 0px 20px;
  color: white;
}
.tool {
  display: flex;
  margin: 12px 10px 7px 50px;
  margin-left: auto;
}
</style>
