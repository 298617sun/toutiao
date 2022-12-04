import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('TOKEN'))
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      localStorage.setItem('TOKEN', JSON.stringify(data))
    }
  }
})
