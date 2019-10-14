import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      roomList: null
  },
  mutations: {
      getRooms(state, payload) {
          state.roomList = payload.roomList
      }
  },
  actions: {

  }
})
