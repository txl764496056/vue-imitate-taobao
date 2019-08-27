<template>
    <div>
        <back></back>
        <img src="images/logo.jpg" alt="" class="logo">
    </div>
</template>

<script>
    export default {
        name:'Login',
       
    }
</script>

<style lang="scss" scoped>
@import '../css/base.scss';
.logo{
    $logo-size:vm(140);
    width:$logo-size;
    height:$logo-size;
    border-radius:50%;
    margin-top:vm(100);
}
</style>