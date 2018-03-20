import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    show_text:true
  },
  mutations: {
    status(state) {
      state.show_text=!state.show_text
    }
  }
})

export default store