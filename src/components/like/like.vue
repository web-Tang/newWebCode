<template>
  <div class="like">
    <topnav @back="back" :text="text"></topnav>
    <scroll
      :listen-scroll="listenScroll"
      :probe-type="probeType"
      class="list"
      ref="list"
      :data="list"
      @scrollToEnd="upmethod"
      :pullup="up"
      @scroll="scroll"
    >
      <div class="article-list-wrapper">
        <van-divider>{{liketext}}</van-divider>
        <div class="card_group">
          <div
            class="ca"
            v-for="(item, index) in list"
            :key="index"
            @click="to($event)"
            :ID="item.id"
          >
            <img :src="item.pic" class="caimg" />
            <div class="caleft">
              <div class="title">{{item.title}}</div>
              <div class="text">{{item.lei}}</div>
            </div>
          </div>
        </div>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import topnav from "@/components/top-nav/top-nav";
import Vue from "vue";
import scroll from "@/base/scroll/scroll";
import { Divider, ContactList } from "vant";
import { get } from "@/api/home";

Vue.use(Divider);

export default {
  data() {
    return {
      isLoading: false,
      list: [],
      num: 0,
      more: "true",
      text: "我的收藏",
      config: 0, //未收藏
    };
  },
  methods: {
    to(e) {
      this.$router.push({
        path: `/me/like/${e.currentTarget.id}`,
      });
    },
    _get() {
      if (!this.$store.getters.getIsLogin) {
        //检验登陆
        console.log("未登录");
        this.config = 1;
        return;
      }

      let number = this.num + 10;
      // console.log(number)
      get(number).then((res) => {
        if (res.data.errno == 0) {
          // console.log(res.data)
          // this.list = res.data.data
          this.more = res.data.message;

          let mylike = this.$store.getters.getCurrentUser.likes.split(",");
          console.log(mylike);

          let articlelist = res.data.data;
          console.log(articlelist);
          for (let i in articlelist) {
            if (mylike.indexOf(articlelist[i].id + "") > -1) {
              this.list.push(articlelist[i]);
              this.config = 2; //登陆且收藏了
            }
          }
        }
      });
    },
    back() {
      this.$router.back();
    },
    getsession() {
      getSession().then((res) => {
        console.log(res);
      });
      // console.log(this.$store.getters.getCurrentUser)
      // console.log(this.$store.getters.getIsLogin)
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    upmethod() {
      console.log("jiazai");
      if (this.more == "true") {
        this._get();
      } else {
        console.log("meile");
      }
    },
  },
  created() {
    this._get();
    this.listenScroll = true;
    this.probeType = 3;
    this.up = true;
  },
  computed: {
    liketext() {
      if (this.config == 0) {
        return "未收藏文章";
      } else if (this.config == 1) {
        return "未登陆";
      } else {
        return "我的收藏";
      }
    },
  },
  components: {
    scroll,
    topnav,
  },
};
</script>

<style scoped>
.like {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  background-color: #f1f1f1;
}
.nav {
  height: 30px;
  display: flex;
  position: fixed;
  top: 50px;
  width: 100%;
  z-index: 100;
  background-color: white;
}
.icon-back {
  display: block;
  padding: 5px;
  font-size: 22px;
}
.nav-text {
  margin-top: 5px;
  font-size: 15px;
}
.list {
  position: fixed;
  top: 50px;
  bottom: 0;
  width: 100%;
}

.ca {
  height: 100px;
  display: flex;
  background-color: #fdfbfb;
  margin: 5px 10px 15px 10px;
  border-radius: 10px;
}
.caimg {
  margin: 15px 20px 10px 20px;
  border-radius: 10px;
  height: 70px;
  width: 70px;
}
.caleft {
  padding: 20px 10px 10px 0px;
  display: block;
}
.title {
  font-size: 14px;
  margin-right: 8px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.text {
  font-size: 13px;
  margin-right: 8px;
  margin-top: 2px;
  color: #8a8a8a;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.imformation {
  margin-top: 10px;
  font-size: 11px;
  margin-right: 8px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  color: #8c8a8a;
}
</style>
