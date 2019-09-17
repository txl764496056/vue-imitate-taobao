<template>
    <div class="nav-list">
        <router-link 
        class="item"
        v-for="(item,index) in navList" 
        :key="index"
        :class="{'selected':selected==index}"
        :to="item.path || ''"
        @click.native="setSelected(index)">{{item.name}}</router-link>
    </div>
</template>

<script>
    export default {
        name:"TypeNav",
        props:{
            navList:{
                type:Array,
                default(){
                    return [];
                }
            },
            currType:{
                type:String,
                default:''
            }
        },
        data(){
            return {
                selected:0
            }
        },
        mounted(){
            this.initSelected();
        },
        methods:{
            initSelected(){
                let _this = this;
                let light = -1;
                this.navList.map(function(item,index){
                    if(item.type==_this.currType){
                        light = index;
                    }
                });
                this.selected = light>-1 ? light:this.selected;
            },
            setSelected(index){
                this.selected = index;
                this.$emit("navListClick",this.navList[index].type);
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "../css/base.scss";
.nav-list{
    display:flex;
    justify-content: space-around;
    .item{
        position:relative;
        flex:1;
        text-align:center;
        padding:vm(15);
        display:inline-block;
        color:$txt-black;
        &.selected{
            color:$theme-color;
            &::after{
                display:block;
                content:"";
                width:vm(40);
                height:vm(6);
                background-color:$theme-color;
                position:absolute;
                bottom:0;
                left:50%;
                transform:translateX(-50%);
            }
        }
    }
}
</style>