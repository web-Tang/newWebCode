<template>
  <div class="commentarea">
    <div class="nav">评论({{list.length}})</div>
    <div class="content" v-for="(item, index) in showcomments" :key="index">
      <div class="item">
        <div class="imgdiv">
          <img class="img" :src="item.avatar" />
        </div>
        <div class="itemcontent">
          <div class="name">{{item.username}}</div>
          <div class="commentcontent">
            {{item.contentitem}}
            <span class="time">{{item.time}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="more" @click="showmore" v-if="showmorediv">点击加载更多评论</div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      num: 5,
      showmorediv: true, // 点击加载更多的评论的按钮的显示
    };
  },
  methods: {
    showmore() {
      this.num = this.num + 5;
      if (this.list.length <= this.num) {
        this.showmorediv = false; // 隐藏点击加载更多的评论的按钮
      }
    },
  },
  computed: {
    showcomments() {
      if (this.list.length <= 5) {
        return this.list;
      } else {
        let newlist = [];
        let currentlist = this.list;
        for (let i in currentlist) {
          if (i <= this.num - 1) {
            newlist.push(currentlist[i]);
          } else {
            break;
          }
        }
        return newlist;
      }
    },
  },
};
</script>

<style scoped>
.commentarea {
  margin-bottom: 4px;
}
.nav {
  height: 25px;
  width: 100%;
  padding: 5px 10px 5px 10px;
  font-size: 14px;
}
.item {
  display: flex;
  margin-bottom: 5px;
}
.imgdiv {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  padding: 5px 10px 5px 10px;
}
.img {
  height: 30px;
  width: 30px;
  border-radius: 20px;
}
.itemcontent {
  display: block;
  padding-top: 3px;
}
.name {
  font-size: 13px;
}
.commentcontent {
  font-size: 13px;
  color: #615f5f;
}
.more {
  height: 20px;
  text-align: center;
  font-size: 14px;
  padding: 8px;
  border-top: 1px solid #eeeeee;
}
.icon {
  margin-top: 3px;
}
</style>
