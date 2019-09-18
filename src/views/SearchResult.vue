<template>
    <div class="search-result">
        <nav-list 
        :navList="list" 
        :currType="currType"
        v-on:navListClick="navListClick"></nav-list>
        <div class="product-list">
            <div class="item"
            v-for="(item,index) in productList"
            :key="index">
                <img :src="item.product_img" alt="">
                <div class="content">
                    <div class="title">
                        <span v-if="item.type">{{item.type}}</span>
                        {{item.title}}
                    </div>
                    <div class="tips">
                        <div class="left">
                            <span v-for="(item2,index2) in item.tips" :key="index2">{{item2}}</span>
                        </div>
                        <b>{{item.address}}</b>
                    </div>
                    <div class="price">
                        <p>￥<span>{{item.price}}</span></p>
                        <b>{{item.sales}}人付款</b>
                    </div>
                    <div class="shop">{{item.shop_name}}></div>
                </div>
            </div>
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
.product-list{
    display:flex;
    flex-wrap:wrap;
    padding:vm(10);
    .item{
        $radius:vm(10);
        background-color:#fff;
        width:50%;
        border:vm(10) solid transparent;
        background-clip:content-box;
        border-radius:vm(20);
        img{
            max-width:100%;
            height:auto;
            border-radius:$radius $radius 0 0 ;
        }
        .title{
            font-size:vm(28);
            color:$txt-black;
            word-break: break-all;
            span{
                background-color:$light-red;
                color:#fff;
                font-size:vm(22);
                padding:0 vm(6);
                border-radius:vm(5);
                letter-spacing:1px;
            }
        }
        .content{
            padding: vm(20) {
                top:vm(10);
            };
        }
        .tips{
            display:flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-top:vm(10);
            span{
                background-color:themeColor(0.06);
                border:1px solid $theme-color;
                font-size:vm(22);
                color:$theme-color;
                display:inline-block;
                margin:0 vm(5);
                border-radius:vm(5);
                padding:0 vm(5);
            }
            b{
                color:$txt-gray2;
                font-weight:normal;
                font-size:vm(22);
                flex-shrink:0;
            }
        }
        .price{
            display:flex;
            align-items:flex-end;
            margin-top:vm(10);
            p{
                font-size:vm(24);
                color:$theme-color;
                span{
                    font-size:vm(34);
                }
            }
            b{
                font-size:vm(22);
                color:$txt-gray2;
                display:inline-block;
                margin-left:vm(10);
                font-weight:normal;
            }
        }
        .shop{
            margin-top:vm(10);
            font-size:vm(28);
            color:$txt-gray1;
        }
    }
}
</style>