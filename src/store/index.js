import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('TOKEN')),
    userInfo: JSON.parse(localStorage.getItem('USERINFO')),
    allChannel: []
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      localStorage.setItem('TOKEN', JSON.stringify(data))
    },
    setUserInfo (state, data) {
      state.userInfo = data
      localStorage.setItem('USERINFO', JSON.stringify(data))
    },
    setAllChannel (state, data) {
      state.allChannel = data
    }
  }
})
