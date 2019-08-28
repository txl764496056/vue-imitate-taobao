<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// import Back from "@/components/Back.vue"
export default {
  components:{
    // Back
  }
}
</script>

<style lang="scss">
@import './css/base.scss';
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-size:vm(30);
  font-family: 'Arail','微软雅黑';
}
input,
button{
  &:focus{
    outline: none;
  }
}

// 火狐：
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: $color-bb;  
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: $color-bb;
}

// IE：
input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
    color: $color-bb;
}

// 谷歌
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
    color: $color-bb;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
