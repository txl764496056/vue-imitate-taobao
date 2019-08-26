import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Vant from 'vant'

Vue.use(VueAxios,axios);
Vue.use(Vant);

Vue.config.productionTip = false

// 路由白名单
// let witeSite = ['/login'];
router.beforeEach((to,from,next)=>{
  let  userKey = localStorage.getItem('userKey');
  console.log("dd")
    if(!userKey){
        if(to.path!='/login'){
          next('/login');
        }else{
          next();
        }
    }else{
      next();
    }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
