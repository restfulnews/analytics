// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueMaterial from 'vue-material';
import VueChartkick from 'vue-chartkick';
import Chart from 'chart.js';
import App from './App';
import router from './router';
import store from './store';
import './assets/sass/main.scss';


Vue.use(VueMaterial);
Vue.use(VueChartkick, { adapter: Chart });

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
