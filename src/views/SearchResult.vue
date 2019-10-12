<template>
    <div class="search-result">
        <nav-list 
        :navList="list" 
        :currType="currType"
        v-on:navListClick="navListClick"></nav-list>
        <div  class="product-list">
            <!-- {path:'/home/search/gooddetails/'+item.id+'/search'} -->
            <!-- {path:'/home/search/gooddetails',query:{id:item.id,goodsType:'search'}} -->
            <router-link class="item"
            :to="{path:'/home/search/gooddetails/'+item.spu_code+'/search'}"
            v-for="(item,index) in productList"
            :key="index">
                <img :src="item.product_img" alt="">
                <div class="content">
                    <div class="title">
                        <span v-if="item.type">{{item.type}}</span>
                        {{item.spu_name.slice(0,17)}}
                    </div>
                    <div class="tips">
                        <div class="left">
                            <span v-for="(item2,index2) in item.tips" :key="index2">{{item2}}</span>
                        </div>
                        <b>{{item.address}}</b>
                    </div>
                    <div class="price">
                        <p>￥<span>{{item.spu_price}}</span></p>
                        <b>{{item.sales}}人付款</b>
                    </div>
                    <div class="shop">{{item.shop_name}}></div>
                </div>
            </router-link>
        </div>
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
            },
            search:{
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
                productList:[]   
            }
        },
        created(){
            this.navListClick(this.currType);
        },
        methods:{
            navListClick(data){
                let _this = this;
                this.axios.get('/getSearchResult',{
                    params:{
                        type:data,
                        product:_this.search
                    }
                }).then(res=>{
                    _this.productList = res.data.search_list;
                })
            }
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