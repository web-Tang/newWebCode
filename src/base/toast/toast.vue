<template>
  <div class="toast" v-show="toastShow">{{toastStr}}</div>
</template>

<script>
export default {
  props: {
    toastShow: {
      type: Boolean,
      default: false,
    },
    toastStr: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
};
</script>

<style>
.toast {
  position: fixed;
  z-index: 2100;
  left: 50%;
  top: 45%;
  transition: all 0.5s;
  -webkit-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  -o-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
  border-radius: 5px;
  color: #fff;
  background: rgba(17, 17, 17, 0.7);
  height: 45px;
  line-height: 45px;
  padding: 0 15px;
  max-width: 150px;
}
</style>
