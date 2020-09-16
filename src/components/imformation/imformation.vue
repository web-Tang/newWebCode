<template>
  <div class="information">
    <toast :toastShow="isLoading" :toastStr="str"></toast>
    <van-popup v-model="show" style="border-radius: 10px;">
      <div class="inputdiv">
        <input class="input" v-model="newName" />
        <button class="but" @click="chance">修改昵称</button>
      </div>
    </van-popup>
    <topnav @back="back" :text="text"></topnav>
    <div class="userimgdiv">
      <div class="text">头像</div>
      <div class="imgdiv">
        <img :src="avatar" class="img" />
        <van-icon name="arrow" class="myicon" size="20" />
      </div>
      <input id="fileImage" type="file" @change="avatarChange($event)" />
    </div>
    <div class="item" @click="showPopup">
      <div class="textitem">昵称</div>
      <div class="textdiv">
        <div class="textitem" v-html="realname"></div>
        <van-icon name="arrow" class="myiconitem" size="20" />
      </div>
    </div>
    <div class="item">
      <div class="textitem">账号</div>
      <div class="textdiv">
        <div class="textitem" v-html="username"></div>
      </div>
    </div>
  </div>
</template>

<script>
import toast from "@/base/toast/toast";
import topnav from "@/components/top-nav/top-nav";
import Vue from "vue";
import { Icon } from "vant";
import { upavatar, upname } from "@/api/user";

Vue.use(Icon);
export default {
  data() {
    return {
      text: "个人信息",
      show: false, //弹出层的显示
      isLoading: false, //消息提示框的显示
      str: "", //消息提示框的内容
      newName: "",
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    showPopup() {
      this.show = true;
    },
    chance() {
      // 修改接口
      this.show = false;
      // console.log(this.newName)
      let param = new FormData();
      param.append("name", this.newName);
      upname(param).then((res) => {
        if (res.data.errno == 0) {
          let userinfo = this.$store.getters.getCurrentUser;
          userinfo.realname = this.newName;
          this.toastshow("修改成功");
        }
      });
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
    avatarChange(el) {
      if (!this.$store.getters.getIsLogin) {
        return;
      }
      let file = el.target.files[0];
      console.log(file);
      let param = new FormData(); // 创建form对象
      param.append("file", file); // 通过append向form对象添加数据
      param.append("chunk", "0"); // 添加form表单中其他数据
      console.log(param.get("file")); // FormData私有类对象，访问不到，可以通过get判断值是否传进去

      upavatar(param).then((res) => {
        if (res.data.errno == 0) {
          let userinfo = this.$store.getters.getCurrentUser;
          userinfo.avatar = res.data.data.avatar_url;
          this.$store.commit("updateUserStatus", userinfo);
          this.toastshow("修改成功");
        } else {
          this.toastshow("修改失败");
        }
      });
    },
  },
  computed: {
    avatar() {
      if (this.$store.getters.getIsLogin) {
        return this.$store.getters.getCurrentUser.avatar;
      } else {
        return "http://localhost:8000/api/file/avatar?pic=logo.png";
      }
    },
    realname() {
      if (this.$store.getters.getIsLogin) {
        return this.$store.getters.getCurrentUser.realname;
      } else {
        return "轻松学算法";
      }
    },
    username() {
      if (this.$store.getters.getIsLogin) {
        return this.$store.getters.getCurrentUser.username;
      } else {
        return "xiaomizhou";
      }
    },
  },
  components: {
    topnav,
    toast,
  },
};
</script>

<style scoped>
.information {
  position: fixed;
  top: 50px;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  background-color: white;
}
.userimgdiv {
  height: 60px;
  display: flex;
  padding: 5px 0;
  border-bottom: 1.5px solid #eeeeee;
  margin: 0px 10px;
}
.text {
  font-size: 14px;
  margin: 15px 5px 5px 5px;
}
.imgdiv {
  margin-left: auto;
  height: 60px;
  width: 68px;
  padding: 8px 5px 8px 8px;
  display: flex;
}
.img {
  height: 44px;
  width: 44px;
  border-radius: 10px;
}
.myicon {
  margin-top: 10px;
  margin-left: 5px;
}
.item {
  height: 40px;
  display: flex;
  padding: 5px 0;
  border-bottom: 1.5px solid #eeeeee;
  margin: 0px 10px;
}
.textitem {
  font-size: 14px;
  margin: 8px 5px 5px 5px;
}
.textdiv {
  margin-left: auto;
  padding: 4px;
  display: flex;
}
.myiconitem {
  margin-top: 7px;
  margin-left: 5px;
}
.inputdiv {
  height: 160px;
  width: 280px;
  border-radius: 10px;
}
.input {
  margin: 40px 0 20px 0;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #a5a4a4;
  border-radius: 8px;
  height: 26px;
  padding: 2px 8px 2px 8px;
  font-size: 14px;
}
.but {
  margin: 30px 0 20px 0;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #a5a4a4;
  border-radius: 8px;
  height: 30px;
  padding: 3px 8px 3px 8px;
  font-size: 14px;
}
#fileImage {
  height: 70px;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
  position: absolute;
}
</style>
