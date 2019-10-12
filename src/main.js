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
import global from  "./global.js"

import "./assets/iconfont/iconfont.css"
import "./css/main.css";

import _ from 'lodash';

Vue.use(VueAxios,axios);
Vue.use(Vant);

Vue.config.productionTip = false
Vue.prototype.$global = global;

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
let witeSite = ['/login','/arealist','/','/home/search','/home/search/gooddetails'];
router.beforeEach((to,from,next)=>{
  let  userKey = localStorage.getItem('userKey');
  
  let isExis = _.findIndex(witeSite,function(item){
      if(to.path==='/'){
        return 2;
      }else{
        return _.startsWith(to.path,item,0)&&item!=='/';
      }
  });
  
    if(!userKey){
        if( isExis<0){
          // 登录成功后跳转至这个页面
          localStorage.setItem('loginNextPath',to.path);
          next('/login')
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
  created(){
    let  userKey = localStorage.getItem('userKey');
    if(userKey){
      this.$global.userKey = userKey;
    }
  }
}).$mount('#app')
