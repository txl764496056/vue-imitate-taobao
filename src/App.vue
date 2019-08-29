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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color:#fff;
  min-height:100vh;
}

</style>
