import Vue from 'vue';
import Router from 'vue-router';
import Explore from '@/containers/Explore';
import Account from '@/containers/Account';
import Bookmarks from '@/containers/Bookmarks';
import Home from '@/containers/Home';
import Refine from '@/containers/Refine';
import Build from '@/containers/Build';
import C404 from '@/containers/C404';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/home',
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
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/refine',
      name: 'Refine',
      component: Refine,
    },
    {
      path: '/build',
      name: 'Build',
      component: Build,
    },
    {
      path: '/404',
      name: '404',
      component: C404,
    },
    {
      path: '*',
      redirect: '/404',
    },
  ],
});
