<template>
  <div class="menu">
      <router-link
        class="item iconfont"
        v-for="item in menuList"
        :key="item.path"
        :class="[item.icon,{'selected':item.path==$route.path}]" 
        :to="item.path">{{item.name}}</router-link>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data(){
    return {
      menuList:[
        {name:'首页',path:'/',icon:'icon-home'},
        {name:'购物车',path:'/cart',icon:'icon-gouwuche'},
        {name:'我的',path:'/my',icon:'icon-wode'}
      ]
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../css/base.scss';
.menu{
  position:fixed;
  bottom:0;
  left:0;
  right:0;
  height:$menu-h;
  display:flex;
  justify-content: space-around;
  align-items:center;
  color:$txt-gray2;
  border-top:1px solid $border-color-dd;
  background-color:#fff;
  .item{
    &::before{
      display:block;
      text-align:center;
      font-size:vm(40);
    }
    color:inherit;
    font-size:vm(24);
    &.selected{
      color:$theme-color;
    }
  }
}
</style>
