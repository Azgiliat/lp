import Vue from 'vue';
import Vuex from 'vuex';

import chats from './chats/index.js'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    chats
  }
});

// store.$axios = Axios.create({
//   baseURL: conf.baseURL
// });

export default store
