import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Vant from 'vant'

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

import "./API/mock-data.js"

import "./assets/iconfont/iconfont.css"
import "./css/main.css";

Vue.use(VueAxios,axios);
Vue.use(Vant);

Vue.config.productionTip = false

// 组件全局注册
const requireComponent = require.context(
  './components/global',
  false,
  /\.(vue|js)$/
);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);
  const componentName = upperFirst(
    camelCase(
      fileName
      .split("/")
      .pop()
      .replace(/\.\w+$/,"")
    )
  )
  Vue.component(
    componentName,
    componentConfig.default || componentConfig
    )
});

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
