<template>
    <div class="cart">
        <div class="title red-linear">
            <div class="up">
                购物车
                <button v-if="isManage" @click="hiddenManage">管理</button>
                <button v-else @click="showManage">完成</button>
            </div>
            <p>共11件宝贝</p>
        </div>
        <!-- cart > item  -->
        <div class="cart-item"
        v-for="(item,index) in cartList"
        :key="index">
            <div class="up">
                <checkbox
                 class="checkbox-btn"
                 :disabled="false" 
                 :label="item.shop_id"
                 :showLabel="false" 
                 v-model='shopIdList'></checkbox>
                 <div class="right">
                     <img :src="item.shop_logo" alt="">
                     <p>
                         {{item.shop_name}}
                        <span>></span>
                     </p>
                 </div>
            </div>
            <!-- product>item2   -->
            <div class="down" v-for="(item2,index2) in item.product" :key="index2">
                <div class="left">
                    <checkbox
                    class="checkbox-btn"
                    :disabled="false" 
                    :label="item2.id"
                    :showLabel="false" 
                    v-model='productIdList'></checkbox>
                    <img :src="item2.img" alt="">
                </div>
                 <div class="right">
                     <h2>{{item2.title}}</h2>
                     <div class="select-attr">
                         <div class="left">
                             <template v-for="(attr_item) in item2.attr">{{attr_item}}</template>
                         </div>
                         <i class="arrow-b iconfont icon-arrow-b"></i>
                     </div>
                     <div class="price-num">
                         <p>
                             ￥
                            <span>{{item2.price}}</span>
                         </p>
                         <buy-num :max="item2.repertory" v-model="item2.cart_num"></buy-num>
                     </div>
                 </div>
            </div>
        </div>
        <Menu></Menu>
    </div>
</template>

<script>
import Menu from "@/components/Menu.vue"
import Checkbox from "@/components/Checkbox.vue"
import BuyNum from "@/components/BuyNum.vue"
    export default {
        name:"Cart",
        components:{
            Menu,
            Checkbox,
            BuyNum
        },
        data() {
            return {
                isManage:true,
                cartList:[],
                productIdList:[],
                shopIdList:[]
            }
        },
        mounted(){
            this.getCartList();
        },
        methods: {
            getCartList(){
                let _this = this;
                this.axios.get('/cartList').then(res=>{
                    _this.cartList = res.data;
                })
            },
            hiddenManage() {
                this.isManage = false;
            },
            showManage() {
                this.isManage = true;
            }
        },
    }
</script>

<style lang="scss" scoped>
@import "../css/base.scss";
.cart{
    .title{
        padding: vm(25) {
            bottom:vm(120);
        };
        color:#fff;
        .up{
            display:flex;
            justify-content: space-between;
            font-size:vm(34);
            letter-spacing: 1px;
            button{
                font-size:vm(30);
                color:#fff;
                border:none;
                background-color:transparent;
            }
        }
        p{
            margin-top:vm(15);
        }
    }
    .checkbox-btn{
        ::v-deep .input{
            border-radius:50%;
        }
    }
   
    .cart-item{
        background-color:#fff;
        margin:vm(25);
        border-radius:vm(10);
        padding:vm(20);
        &:nth-of-type(2){
            margin-top:vm(-80);
        }
        .up{
            display:flex;
            align-items: center;
            .right{
                display:flex;
                align-items: center;
                margin-left:vm(20);
                img{
                    width:vm(44);
                    height:vm(44);
                    border-radius:50%;
                }
                p{
                    margin-left:vm(15);
                    color:$txt-black;
                    font-size:vm(28);
                    span{
                        color:$txt-gray2;
                    }
                }
            }
        }
        .down{
            padding-top:vm(30);
            display: flex;
            align-items: flex-start;
            .left{
                display: flex;
                align-items:center;
                >img{
                    $size:120;
                    width:vm($size);
                    height:vm($size);
                    border-radius:vm(6);
                }
            }
            .right{
                margin-left:vm(20);
                align-self:stretch;
                flex:1;
                display:flex;
                flex-direction:column;
                justify-content: space-between;
                h2{
                    font-weight: normal;
                }
                .price-num{
                    display:flex;
                    justify-content: space-between;
                    align-items: center;
                    p{
                        color:$theme-color;
                        display:flex;
                        align-items:flex-end;
                        span{font-size:vm(34);}
                    }
                }
                .select-attr{
                    display:flex;
                    background-color:$bg-ee;
                    margin: vm(5) auto{
                        left:0;
                    };
                    padding:vm(4) vm(10);
                    border-radius:vm(5);
                    align-items: center;
                    .left{
                        color:$txt-gray2;
                        font-size:vm(24);
                    }
                    .arrow-b{
                        font-size:vm(24);
                        color:$txt-gray2;
                        display:inline-block;
                        margin-left:vm(10);
                    }
                }
            }
        }
    }
}
</style>