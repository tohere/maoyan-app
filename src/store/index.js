import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import film from './modules/film'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    film
  },
  getters
})

export default store
