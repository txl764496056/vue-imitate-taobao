<template>
  <div class="home">
    <router-link to="/home/search" class="top red-linear">
      <input-item class="home-search" v-model="search" disabled :placeholder="'搜索'">
        <template #left>
          <i class="sousuo iconfont icon-sousuo"></i>
        </template>
      </input-item>
    </router-link>
    <Menu></Menu>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from '@/components/Menu.vue'

export default {
  name: 'home',
  components: {
    Menu,
  },
  data(){
    return {
      search:'兰蔻粉底液'
    }
  },
  created(){
   
  }
}
</script>

<style lang='scss' scoped>
@import "../css/base.scss";
$toph:vm(100);
.home{
  padding-top:$toph;
}
.top{
  position:fixed;
  top:0;
  left:0;
  right:0;
  height:$toph;
  display:flex;
  justify-content: center;
  align-items: center;
  .home-search{
    width:80%;
    background-color:#fff;
    border-radius:vm(50);
    padding:0 vm(30);
    input{
      font-size:vm(30);
    }
    .sousuo{
      margin-right:vm(15);
      color:$txt-gray2;
    }
  }
}
</style>
