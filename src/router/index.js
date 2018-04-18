import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/containers/Home';
import Explore from '@/containers/Explore';
import Account from '@/containers/Account';
import Bookmarks from '@/containers/Bookmarks';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/explore',
      name: 'Explore',
      component: Explore,
    },
    {
      path: '/account',
      name: 'Account',
      component: Account,
    },
    {
      path: '/bookmarks',
      name: 'Bookmarks',
      component: Bookmarks,
    },
  ],
});
