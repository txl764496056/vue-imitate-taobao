import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: ()=>import('./views/Login.vue')
    },
    {
      path: '/arealist',
      name: 'arealist',
      component: ()=>import('./views/AreaList.vue')
    },
    {
      path: '/my',
      name: 'my',
      component: ()=>import('./views/My.vue')
    },
    {
      path: '/nickname',
      name: 'nickname',
      component: ()=>import('./views/Nickname.vue')
    },
    {
      path: '/seting',
      name: 'seting',
      component: ()=>import('./views/Seting.vue')
    }
  ]
})
