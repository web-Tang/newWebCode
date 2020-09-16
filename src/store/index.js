import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    topShow: true,
    tabbarShow: true,
    currentUser: {},
    isLogin: false,
  },
  getters: {
    getTopShow(state) {
      return state.topShow
    },
    getTabbarShow(state) {
      return state.tabbarShow
    },
    getCurrentUser(state) {
      return state.currentUser
    },
    getIsLogin(state) {
      return state.isLogin
    }
  },
  mutations: {
    updateTabbarShow(state, payload) {
      state.tabbarShow = payload
    },
    updateTopShow(state, payload) {
      state.topShow = payload
    },
    updateUserStatus(state, user) {
      if (user) {
        state.currentUser = user
        state.isLogin = true
        sessionStorage.setItem("userName", user.username)
        sessionStorage.setItem("realName", user.realname)
      } else if (user == null) {
        sessionStorage.setItem("userName", null)
        sessionStorage.setItem("realName", null)
        state.currentUser = null
        state.isLogin = false
      }
    }
  },
  actions: {},

  plugins: [createPersistedState()]
});
