<template>
  <div class="me" ref="me">
    <div class="user">
      <van-image round width="5rem" height="5rem" :src="avatar" />
      <div class="username" v-html="name"></div>
    </div>
    <div class="hr"></div>
    <div class="tooldiv">
      <van-cell
        title="我的收藏"
        is-link
        class="cell"
        icon="label-o"
        to="/me/like"
        icon-color="#eeeeee"
      />
      <van-cell title="历史阅读" is-link class="cell" icon="bookmark-o" />
      <van-cell title="设置" is-link class="cell" icon="setting-o" to="/me/imformation" />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import { Image as VanImage } from "vant";
import { Cell, CellGroup } from "vant";

Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(VanImage);

export default {
  data() {
    return {};
  },
  methods: {
    to() {
      this.$router.push({
        path: `/me/like`,
      });
    },
  },
  computed: {
    avatar() {
      if (this.$store.getters.getIsLogin) {
        return this.$store.getters.getCurrentUser.avatar;
      } else {
        return "http://47.112.***.***:80/api/file/avatar?pic=logo.png";
      }
    },
    name() {
      if (this.$store.getters.getIsLogin) {
        return this.$store.getters.getCurrentUser.realname;
      } else {
        return "轻松学算法";
      }
    },
  },
};
</script>

<style scoped>
.me {
  padding-top: 80px;
  background-color: #f1f1f1;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.user {
  background-color: #a2ebb9;
  padding: 30px 0 30px 0;
  text-align: center;
  margin: 10px 30px 10px 30px;
  border-radius: 20px;
}
.tooldiv {
  display: block;
  margin-top: 20px;
}
.hr {
  height: 1.5px;
  background-color: #d8d8d8;
  margin: 4px 20px 4px 20px;
}
.cell {
  margin-bottom: 3px;
}
</style>
