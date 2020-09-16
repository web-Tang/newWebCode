<template>
  <div class="article_group">
    <div class="back" @click="back">
      <van-icon name="arrow-left"  class="icon-back"/>
    </div>
    <h1 class="title" ref="title">{{nav}}</h1>
    <div class="bg-image" ref="bgImage">
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll :data="article" @scroll="scroll" :listen-scroll="listenScroll" :probe-type="probeType" class="group-list" ref="list">
      <div class="card_group">
         <div class="ca" v-for="(item, index) in article" :key="index" @click="to($event)"
            :ID="item.id">
            <img :src="item.pic" class="caimg">
            <div class="caleft">
              <div class="title1">{{item.title}}</div>
              <div class="text">{{item.lei}}</div>
              <div class="imformation">点击量 {{item.hits}}     收藏量 {{item.likes}}</div>
            </div>
          </div>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import Vue from 'vue';
import { Icon } from 'vant';
import { Card } from 'vant';
import { prefixStyle } from '@/common/js/dom'

import { get } from '@/api/article'

Vue.use(Card);
Vue.use(Icon);

const RESERVED_HEIGHT = 40

const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')

export default {
  data() {
    return {
      article: [],
      scrollY: 0, // songlist偏移量
        minTransalteY: 0, // bglayer滚动的最大高度
        num: 0
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    scroll(pos) {
        this.scrollY = pos.y
    },
    to(e) {
      // console.log(e.currentTarget)
      console.log(this.$route.params)
      this.$router.push({
        path: `${this.$route.params.id}/${e.currentTarget.id}`
      })
    },
    _get() {
      let number = this.num + 10
      let lei = this.$route.params.id
      get(lei, number).then(res => {
        if(res.data.errno == 0) {
          console.log(res.data)
          this.article = res.data.data
        }
      })
    }
  },
  created() {
      // 可以监听快速滑动的位置
      this._get()
      this.probeType = 3
      // 需要监听滚动
      this.listenScroll = true
    },
  mounted() {
   console.log(this.$route.params.id);
   this.imageHeight = this.$refs.bgImage.clientHeight
   this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
  //  console.log(this.imageHeight);
   this.$refs.list.$el.style.top = `${this.imageHeight}px`
  },
  computed: {
    nav() {
      return this.$route.params.id;
    }
  },
  watch: {
    scrollY(newVal) {
      let translateY = Math.max(this.minTransalteY, newVal)
      let scale = 1    // 图片的缩放，默认为1
      let zIndex = 0    // 歌手图片的z-lindex
      let blur = 0       // 高斯模糊
      const percent = Math.abs(newVal / this.imageHeight)
      if (newVal > 0) {
        scale = 1 + percent
        zIndex = 10
      } else {
        blur = Math.min(20, percent * 20)
      }

      this.$refs.layer.style[transform] = `translate3d(0, ${translateY}px)`
      this.$refs.filter.style[backdrop] = `blur(${blur}px)`

      if (newVal < this.minTransalteY) {
        zIndex = 10
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
      } else { // 下拉还原原来的样式
        this.$refs.bgImage.style.paddingTop = '70%'
        this.$refs.bgImage.style.height = 0
      }
      this.$refs.bgImage.style[transform] = `scale(${scale})`
      this.$refs.bgImage.style.zIndex = zIndex
    }
  },
  components: {
    Scroll
  }
}
</script>

<style scoped>
.article_group{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  background-color: white;
}
.slide-enter-active, .slide-leave-active{
  transition: all 0.3s
}

.slide-enter, .slide-leave-to{
  transform: translate3d(100%, 0, 0);
}

.back{
  position: absolute;
  top: 0;
  left: 6px;
  z-index: 50;
  padding-top: 2px;
}

.icon-back{
  display: block;
  padding: 10px;
  font-size: 22px;
}

.title{
  position: absolute;
  top: 0;
  left: 10%;
  z-index: 40;
  width: 80%;
  text-align: center;
  line-height: 26px;
  font-size: 14px;
}

.bg-image{
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 70%;
  transform-origin: top;
  background-size: cover;
  background-image: url('https://y.gtimg.cn/music/photo_new/T002R300x300M0000025IFqx1GVjzw.jpg?max_age=2592000');
}

.filter{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(7, 17, 27, 0.4);
}

.bg-layer{
  position: relative;
  height: 100%;
}

.group-list{
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
}
.van-card{
  margin-top: 0 !important;
}
.ca{
  height: 100px;
  display: flex;
  background-color: #f3f2f2;
  margin-bottom: 5px;
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
.title1{
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
