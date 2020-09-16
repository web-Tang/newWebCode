<template>
  <div class="comment">
    <div class="box">
      <input class="input" v-model="content" placeholder="写评论" />
      <button class="but" @click="submit">发送</button>
    </div>
    <div class="tool">
      <div class="like" @click="like">
        <van-icon name="star" size="20" :class="{ 'active': infolike, 'unactive': !infolike}" />
        <p class="likenum">{{likenum}}</p>
      </div>
      <div class="good" @click="good">
        <van-icon name="good-job" size="20" :class="{ 'active': infogood, 'unactive': !infogood }" />
        <p class="likenum">{{goodnum}}</p>
      </div>
      <div class="share">
        <van-icon name="share" size="20" />
        <p class="likenum" style="margin-top: -2px;">分享</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
    };
  },
  props: {
    infogood: {
      type: Boolean,
      default: false,
    },
    infolike: {
      type: Boolean,
      default: false,
    },
    goodnum: {
      type: Number,
      default: 0,
    },
    likenum: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    submit() {
      console.log("需要提交的评论内容", this.content); // 对评论内容的打印
      this.$emit("commentsubmit", this.content);
      this.content = "";
    },
    like() {
      this.$emit("like");
    },
    good() {
      this.$emit("good");
    },
  },
};
</script>

<style scoped>
.comment {
  height: 40px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #fcfcfc;
}
.box {
  margin: 5px;
  width: 60%;
}
.input {
  background-color: #eeeeee;
  width: 65%;
  height: 30px;
  border-radius: 10px;
  color: black;
  outline: none;
  border: none;
  font-size: 13px;
  padding: 0 8px 0 8px;
}
.but {
  height: 26px;
  width: 40px;
  background-color: #69d78a;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  margin: 3px;
}
.tool {
  display: flex;
  padding: 2px;
  text-align: right;
  width: 100px;
}
.like {
  display: block;
  flex: 1;
  text-align: center;
}
.good {
  display: block;
  flex: 1;
  text-align: center;
}
.share {
  display: block;
  flex: 1;
  text-align: center;
}
.likenum {
  font-size: 12px;
  margin-top: 0;
}
.active {
  color: red;
}
.unactive {
  color: #8a8a8a;
}
</style>
