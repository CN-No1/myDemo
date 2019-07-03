import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta:{ menuName:"首页" },
      component: () => import('./views/Home.vue'),
    },
    {
      path: '/entity',
      name: 'entity',
      meta:{ menuName:"实体类" },
      component: () => import('./views/entity/entity.vue'),
    },
  ],
});
