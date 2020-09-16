<template>
  <div class="login">
    <div class="modal-body">
      <!-- Nav tabs -->
      <ul class="nav nav-tabs">
        <li
          v-for="(item,index) in tabsParam"
          @click="toggleTabs(index)"
          :class="{active:index == nowIndex}"
          :key="index"
        >{{item}}</li>
      </ul>
      <!-- Tab panes -->
      <div class="tab-content">
        <div class="tab-pane fade in" id="login" v-show="nowIndex === 0">
          <div class="signup-form-container text-center">
            <form class="mb-0" @submit.prevent="_login($event)">
              <div class="form-group">
                <input type="text" class="form-control" name="username" placeholder="*用户名或邮箱" />
              </div>
              <div class="form-group">
                <input type="password" class="form-control" name="password" placeholder="*密码" />
              </div>
              <button type="submit" class="go-login btn btn--primary btn--block">
                <i class="fa fa-bullseye"></i> 安全登录
              </button>
              <!-- <a href="#" class="forget-password">忘记密码?</a> -->
            </form>
            <!-- form  end -->
          </div>
          <!-- .signup-form end -->
        </div>
        <div class="tab-pane fade in" id="signup" v-show="nowIndex === 1">
          <form class="mb-0" @submit.prevent="_signup($event)">
            <div class="form-group">
              <input type="text" class="form-control" name="username" placeholder="输入账号" />
            </div>
            <div class="form-group">
              <input type="text" class="form-control" name="realname" placeholder="输入用户名" />
            </div>
            <!-- .form-group end -->
            <div class="form-group">
              <input type="email" class="form-control" name="email" placeholder="绑定邮箱" />
            </div>
            <!-- .form-group end -->
            <div class="form-group">
              <input type="password" class="form-control" name="password" placeholder="密码最小长度为6" />
            </div>
            <div class="form-group">
              <input type="password" class="form-control" name="password1" placeholder="再次输入密码" />
            </div>
            <button type="submit" class="go-register btn btn--primary btn--block">
              <i class="fa fa-bullseye"></i> 立即注册
            </button>
          </form>
          <!-- form  end -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, signup } from "@/api/user";
import { ContactList } from "vant";
export default {
  data() {
    return {
      tabsParam: ["登陆", "注册"],
      nowIndex: 0, //默认第一个tab为激活状态
    };
  },
  methods: {
    toggleTabs: function (index) {
      this.nowIndex = index;
    },
    _login() {
      var formData = new FormData(event.target);
      login(formData).then((res) => {
        if (res.data.errno == 0) {
          console.log(res);
          let userinfo = res.data.data;
          this.$store.commit("updateUserStatus", userinfo);
        }
        this.$emit("closelogin", res.data.errno);
      });
    },
    _signup(event) {
      let message = event.target;
      if (message.password.value != message.password1.value) {
        // console.log('buyiy')
        this.$emit("passwordNoSame");
        return;
      }
      var formData = new FormData(message);
      formData.email = message.email.value;
      formData.username = message.username.value;
      formData.password = message.password.value;
      formData.realname = message.realname.value;
      // console.log(formData)
      signup(formData).then((res) => {
        if (res.data.errno == 0) {
          console.log(res);
        }
        this.$emit("closesign", res.data.errno);
      });
    },
  },
  mounted() {
    console.log(this.$store.getters.getCurrentUser);
    console.log(this.$store.getters.getIsLogin);
  },
};
</script>

<style scoped>
.login {
  border: none;
  box-shadow: none;
  position: relative;
  background-color: transparent;
}
.model-body {
  position: relative;
  padding: 15px;
}
.nav-tabs {
  border-bottom: none;
  text-align: center;
  padding-left: 0;
  padding: 10px;
  list-style: none;
  margin: 0;
}
.nav-tabs li {
  float: none;
  display: inline-block;
  margin: 0 5px;
}
.tab-content {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 4px;
}
.form-group {
  margin-bottom: 15px;
  position: relative;
}
.form-control {
  border-radius: 0;
  font-family: Lato, sans-serif;
  line-height: 30px;
  margin-bottom: 10px;
  padding: 0 12px;
  transition: border-color cubic-bezier(0.77, 0, 0.175, 1);
  border: 1px solid #dad9d9;
  font-size: 14px;
  border-radius: 10px;
}
.active {
  color: #69d78a;
}
.tabnav {
  color: red;
}
.mb-0 {
  text-align: center;
}
.btn {
  background-color: #69d78a;
  border: 1px solid #69d78a;
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 14px;
}
</style>
