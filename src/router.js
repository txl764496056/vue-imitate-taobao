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
      path: '/home/search',
      name: 'search',
      component: ()=>import('./views/Search.vue')
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
      path: '/my/nickname',
      name: 'nickname',
      component: ()=>import('./views/Nickname.vue')
    },
    {
      path: '/my/seting/nickname',
      name: 'setingNickname',
      component: ()=>import('./views/Nickname.vue')
    },
    {
      path: '/my/seting',
      name: 'seting',
      component: ()=>import('./views/Seting.vue')
    },
    {
      path: '/my/seting/authority',
      name: 'authority',
      component: ()=>import('./views/Authority.vue')
    },
    {
      path: '/my/seting/address',
      name: 'address',
      component: ()=>import('./views/Address.vue')
    },
    {
      path: '/my/seting/address/editaddress',
      name: 'editaddress',
      component: ()=>import('./views/EditAddress.vue')
    },
    {
      path: '/home/search/gooddetails/:spu_code/:goodsType',
      // path: '/home/search/gooddetails',
      name: 'gooddetails',
      component: ()=>import('./views/GoodDetails.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: ()=>import('./views/Cart.vue')
    }
  ]
})
