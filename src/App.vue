<template>
  <div id="app">
    <button class="remove-login" @click="removeUserKey">删除登录缓存</button>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
// import Back from "@/components/Back.vue"
export default {
  components:{
    // Back
  },
  data(){
    return {
      userKey:''
    }
  },
  created(){
    this.userKey = localStorage.getItem("userKey");
  },
  methods:{
    removeUserKey(){
        localStorage.removeItem("userKey");
    },
  }
}
</script>

<style lang="scss">
@import './css/base.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color:#f4f4f4;
  min-height:100vh;
}
.remove-login{
  background-color:rgba(0,0,0,0.5);
  color:#fff;
  border:none;
  padding:vm(10) vm(15);
  position:fixed;
  bottom:vm(150);
}

</style>
