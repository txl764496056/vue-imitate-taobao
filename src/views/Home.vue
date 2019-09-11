<template>
  <div class="home">
    <router-link to="/search" class="top red-linear">
      <!-- <search class="home-search" disabled v-model="search" :placeholder="'搜索'"></search> -->
      <input-item v-model="search" disabled :placeholder="'搜索'">
        <template #left>
          <i class="iconfont icon-sousuo"></i>
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
  }
}
</style>
