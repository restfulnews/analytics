import Vue from 'vue';
import Vuex from 'vuex';
import app from './app';
import auth from './auth';
import search from './search';
import develop from './develop';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    auth,
    search,
    develop,
  },
});
