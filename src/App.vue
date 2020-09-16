<template>
  <div id="app" ref="app">
    <top @more="showPopup" @login="showLogin" @logout="showLogout" v-show="topShow"></top>
    <toast :toastShow="isLoading" :toastStr="str"></toast>
    <keep-alive>
      <router-view />
    </keep-alive>

    <van-popup
      v-model="showloginstate"
      position="center"
      :style="{  width: '70%',borderRadius: '10px' }"
    >
      <login @closelogin="closeLogin" @closesign="closeSign" @passwordNoSame="passwordno"></login>
    </van-popup>
    <van-popup v-model="showmore" position="right" :style="{ height: '100%', width: '70%' }">
      <right></right>
    </van-popup>

    <div class="tab" v-if="tabbarShow">
      <van-tabbar
        v-model="active"
        v-bind:placeholder="true"
        v-bind:fixed="false"
        active-color="#69d78a"
      >
        <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
        <van-tabbar-item icon="search" to="/article">分类</van-tabbar-item>
        <van-tabbar-item icon="setting-o" to="/me">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import top from "@/components/top/top";
import Vue from "vue";
import login from "@/components/login/login";
import right from "@/components/right/right";
import toast from "@/base/toast/toast";

import { getSession, logOut } from "@/api/user";
import { Tabbar, TabbarItem } from "vant";
import { Popup } from "vant";

Vue.use(Popup);
Vue.use(Tabbar);
Vue.use(TabbarItem);
export default {
  name: "App",
  components: {
    top,
    right,
    login,
    toast,
  },
  data() {
    return {
      active: 0,
      icon: {
        active: "https://img.yzcdn.cn/vant/user-active.png",
        inactive: "https://img.yzcdn.cn/vant/user-inactive.png",
      },
      showmore: false, //更多信息弹出框
      showloginstate: false, //登陆弹出框
      isLoading: false, //提示框
      str: "", //提示框现实的字
    };
  },
  methods: {
    handlelong() {
      //对tab栏的占位补充
      const bodyheight = document.body.clientHeight;
      const app = document.querySelector("#app");
      const appheight = app.clientHeight;
      console.log(app);
      if (appheight + 60 > bodyheight) {
        const bottom = "50px";
        this.$refs.app.style.marginBottom = bottom;
        return;
      }
      console.log(appheight);
    },
    showPopup() {
      //点击更多信息跳出的右边框
      this.showmore = true;
    },
    showLogin() {
      // 点击登陆跳出弹出层
      this.showloginstate = true;
    },
    toastshow(str) {
      this.showloginstate = false;
      this.isLoading = true; //提示框的显示
      this.str = str;
      setTimeout(() => {
        this.isLoading = false; //提示框的消失
        this.str = "";
      }, 1500);
    },
    closeLogin(errno) {
      // 登陆后弹出层的消失
      // console.log('zhuceshibai',errno)
      if (errno == 0) {
        this.toastshow("登陆成功");
      } else {
        this.toastshow("账号或密码错误");
      }
    },
    closeSign(errno) {
      if (errno == 0) {
        this.toastshow("注册成功");
      } else {
        this.toastshow("账号已存在");
      }
    },
    passwordno() {
      this.toastshow("两次密码不一样，请重新输入");
    },
    showLogout() {
      //点击退出登录
      logOut().then((res) => {
        //退出登陆的api
        console.log(res);
      });
      this.toastshow("退出登陆成功");
      this.$store.commit("updateUserStatus", null); //重置vuex的用户数据，登陆状态
    },
  },
  mounted() {
    //对tab的active确定
    // this.handlelong()
    if (this.$route.fullPath == "/home") {
      this.active = 0;
    } else if (this.$route.fullPath == "/article") {
      this.active = 1;
    } else {
      this.active = 2;
    }
  },
  computed: {
    tabbarShow() {
      //返回tab的vuex显示状态
      return this.$store.getters.getTabbarShow;
    },
    topShow() {
      //返回tab的vuex显示状态
      return this.$store.getters.getTopShow;
    },
  },
  watch: {
    $route(to, from) {
      //通过对路由的查看，确定tab栏的显示或者隐藏，操作vuex
      if (
        to.path == "/" ||
        to.path == "/home" ||
        to.path == "/article" ||
        to.path == "/me"
      ) {
        this.$store.commit("updateTabbarShow", true);
        this.$store.commit("updateTopShow", true);
      } else {
        this.$store.commit("updateTabbarShow", false);
        this.$store.commit("updateTopShow", false);
      }
    },
  },
};
</script>

<style>
.tab {
  z-index: 10;
  bottom: 0;
  position: fixed;
  width: 100%;
}
</style>
