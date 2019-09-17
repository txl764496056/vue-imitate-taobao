<template>
    <div class="search-result">
        <nav-list :navList="list" :currType="currType"></nav-list>
    </div>
</template>

<script>
import NavList from "@/components/NavList.vue";
    export default {
        name:"SearchResult",
        props:{
            currType:{
                type:String,
                default:""
            }
        },
        components:{
            NavList
        },
        data() {
            return {
                 list:[{
                    name:"全部",
                    type:'all'
                },{
                    name:"天猫",
                    type:'tianmao'
                },{
                    name:"店铺",
                    type:'shop'
                },{
                    name:"淘宝经验",
                    type:'taobaojingyan'
                }],     
            }
        },
        created(){
            this.search = this.$route.query.search;
        },
        methods:{
        }
    }
</script>

<style lang="scss" scoped>
@import "../css/base.scss";
.search{
    background-color:#f5f5f5;
    margin-top:vm(4.6);
    padding: 0 vm(25);
    border-radius:vm(50);
    height:vm(60);
    margin-right:vm(45);
}
</style>