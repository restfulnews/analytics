import Vue from 'vue';
import Router from 'vue-router';
import Explore from '@/containers/Explore';
import Develop from '@/containers/Develop';
import Projects from '@/containers/Projects';
import Account from '@/containers/Account';
import C404 from '@/containers/C404';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/develop',
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
      path: '/develop',
      name: 'Develop',
      component: Develop,
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects,
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
