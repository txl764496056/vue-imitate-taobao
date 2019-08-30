<template>
  <div class="home">
    dfdd
    <menu></menu>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from '@/components/Menu.vue'

export default {
  name: 'home',
  components: {
    Menu
  },
  created(){
    this.axios.get("http://localhost:3200/login",(res)=>{
      console.log(res)
    }).then((err)=>{
      // console.log(err);
    });
  }
}
</script>
