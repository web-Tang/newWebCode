<template>
  <div class="home">
    <scroll :listen-scroll="listenScroll" :probe-type="probeType"
    class="list1" ref="list" :data="list" @scrollToEnd="upmethod"
    :pullup="up" @scroll="scroll"
    >
      <div class="article-list-wrapper">
        <Rotation :height= "handlheight" :list="bannerList" effect="zoom"></Rotation>
        <!-- <button @click="getsession">检验登录</button>
        <button @click="logout">退出登录登录</button> -->
        <van-divider>最新文章</van-divider>
        <div class="card_group">
          <div class="ca" v-for="(item, index) in list" :key="index" @click="to($event)"
            :ID="item.id">
            <img :src="item.pic" class="caimg">
            <div class="caleft">
              <div class="title">{{item.title}}</div>
              <div class="text">{{item.lei}}</div>
              <div class="imformation">点击量 {{item.hits}}     收藏量 {{item.likes}}</div>
            </div>
          </div>
        </div>
      </div>
    </scroll>

    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue';
import scroll from '@/base/scroll/scroll'
import toast from '@/base/toast/toast'
import { Divider, ContactList } from 'vant';
import { Card } from 'vant';
import Rotation from '@/components/Rotation/Rotation'
import { get, getbaners } from '@/api/home'
import { getSession, logOut } from '@/api/user'

Vue.use(Divider);
Vue.use(Card);


export default {
  data() {
    return {
      isLoading: false,
      list: [],
      num: 0,
      more: 'true',
      bannerList: []
    };
  },
  methods: {
    to(e) {         //查看文章详情
      this.$router.push({
        path: `/home/${e.currentTarget.id}`
      })
    },
    _get() {        //获取文章
      let number = this.num + 10
      // console.log(number)
      get(number).then((res) => {
        if (res.data.errno == 0) {
          // console.log(res.data)
          this.list = res.data.data
          console.log(this.list)
          this.more = res.data.message
        }
      })
    },
    _getbaners() {      //获取轮播图图片
      getbaners().then(res => {
        if (res.data.errno == 0) {
          this.bannerList = res.data.data
        }
      })
    },
    getsession(){       //检验登陆
      getSession().then(res => {
        console.log(res)
      })
      // console.log(this.$store.getters.getCurrentUser)
      // console.log(this.$store.getters.getIsLogin)
    },
    logout() {          //退出登录
      logOut().then(res => {
        console.log(res)
      })
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 1500);

      this.$store.commit('updateUserStatus',null);
    },
    scroll(pos) {         //滚动事实位置
        this.scrollY = pos.y
    },
    upmethod() {            //上拉加载
      console.log("jiazai")
      if (this.more == 'true') {
        this._get()
      } else {
        console.log('meile')
      }
    }
  },
  created () {
    this._get()
    this._getbaners()
    this.listenScroll = true
    this.probeType = 3
    this.up = true
  },
  computed: {
    handlheight() {
      return `${document.body.clientWidth/2.4}px`
    }
  },
  components: {
    Rotation,
    scroll,
    toast
  }
};
</script>

<style scoped>

.home{
  position: fixed;
  top: 50px;
  bottom: 50px;
  width: 100%;
  background-color: #f1f1f1;
}
.article-list-wrapper{
  padding-top: 10px;
}
.list1{
  height: 100%;
  overflow: hidden;
}
.ca{
  height: 100px;
  display: flex;
  background-color: #fdfbfb;
  margin: 5px 10px 15px 10px;
  border-radius: 10px;
}
.caimg{
  margin: 15px 20px 10px 20px;
  border-radius: 10px;
  height: 70px;
  width: 70px;
}
.caleft{
  padding: 20px 10px 10px 0px;
  display: block;
}
.title{
  font-size: 14px;
  margin-right: 8px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.text{
  font-size: 13px;
  margin-right: 8px;
  margin-top: 2px;
  color: #8a8a8a;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.imformation{
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
