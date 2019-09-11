<template>
    <div class="back-nav">
      <div class="nav">
          <div class="left">
            <slot name="back-left">
                <i @click="goBack" class="back-arrow iconfont icon-arrow-l"></i>
            </slot>
        </div>
        <div class="center" :class="titlePos">
            <slot name="back-title"></slot>
        </div>
        <div class="right">
            <slot name="back-right"></slot>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name:'Back',
        props:{
            titlePos:{
                type:String,
                default:''
            }
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "../../css/base.scss";
.abs{
    position:absolute;
}
.back-nav{
    position:relative;
    z-index:9999;
    &::after{
        display:block;
        content:"";
        height:$back-nav-h;
    }
}
.nav{
    position:fixed;
    top:0;
    left:0;
    right:0;
    height:$back-nav-h;
    line-height:$back-nav-h;
    background-color:#fff;
    font-size:vm(34);
    display:flex;
    align-items:center;
    .left{
        @extend .abs;
        left:0;
        top:0;
        bottom:0;
        .back-arrow{
            font-size:vm(40);
            color:$back-arrow;
            font-weight:bold;
            padding: {
                left:$pd25;
                right:$pd25;
            };
        }
    }
    .right{
        @extend .abs;
        right:0;
        top:0;
        bottom:0;
        color:$txt-black;
        font-size:vm(30);
    }
    .center{
        text-align:center;
        font-size:vm(34);
        flex:1;
        margin:0 vm(70);
        &.left{
            text-align:left;
        }
    }
}
</style>