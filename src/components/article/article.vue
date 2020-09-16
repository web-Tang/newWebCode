<template>
  <div class="article" ref="article">
    <van-grid :gutter="10" column-num="3">
      <van-grid-item v-for="(item,index) in list" :key="index" :icon="item.icon" :text="item.text"
        :to="item.to" :id="item.to"
      />

    </van-grid>
    <router-view></router-view>
  </div>
</template>
<script>
import Vue from 'vue';
import { Grid, GridItem } from 'vant';

Vue.use(Grid);
Vue.use(GridItem);
export default {
  data() {
    return {
      list : [
        { icon : 'http://47.112.***.***:80/api/file/icon?pic=tikuman.png', text: '前端', to: '/article/前端', id: '前端'},
        { icon : 'http://47.112.***.***:80/api/file/icon?pic=string.png', text: 'htmlcss', to: '/article/htmlcss', id: 'htmlcss'},
        { icon : 'http://47.112.***.***:80/api/file/icon?pic=stack.png', text: 'javascript', to: '/article/javascript', id: 'javascript'},
        { icon : 'http://47.112.***.***:80/api/file/icon?pic=tree.png', text: 'jquery', to: '/article/jquery', id: 'jquery'},
        { icon : 'http://47.112.***.***:80/api/file/icon?pic=link.png', text: 'vue', to: '/article/vue', id: 'vue'},
        { icon : 'http://47.112.***.***:80/api/file/icon?pic=queue.png', text: '小程序', to: '/article/小程序', id: '小程序'},
        { icon : 'http://47.112.***.***:80/api/file/icon?pic=sort.png', text: '后端', to: '/article/后端', id: '后端'},
        { icon : 'http://47.112.***.***:80/api/file/icon?pic=hash.png', text: 'node', to: '/article/node', id: 'node'},
        { icon : 'http://47.112.***.***:80/api/file/icon?pic=heap.png', text: 'oj', to: '/article/华农oj', id: '华农oj'}
      ]
    }
  },
  methods: {
    to(e) {
       console.log(e.currentTarget.id)
      this.$router.push({
        path: `/article/${e.currentTarget.id}`
      })
    },
  }

}
</script>

<style scoped>
.article{
  padding-top: 80px;
  background-color: #f1f1f1;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
