<template>
    <div class="cart-item">
        <div class="up">
            <checkbox
                class="checkbox-btn"
                :disabled="false" 
                :label="cartMsg.shop_id"
                :showLabel="false"
                v-model='isChecked'></checkbox>
            <div class="right">
                <img :src="cartMsg.shop_logo" alt="">
                <p>
                    {{cartMsg.shop_name}}
                <span>></span>
                </p>
            </div>
        </div>
        <product-item 
        v-on:productItemSelect="productItemSelect"
         v-on="$listeners" 
         v-for="(item,index) in cartMsg.product" 
         :productMsg="item"
         :checked="isAllSelect" 
         :key="index"></product-item>
        <!-- product>item2   -->
        <!-- <div class="down" v-for="(item2,index2) in cartMsg.product" :key="index2">
            <div class="left">
                <checkbox
                class="checkbox-btn"
                :disabled="false" 
                :label="item2.is_checked"
                :showLabel="false" 
                v-model='item2.is_checked'></checkbox>
                <img :src="item2.img" alt="">
            </div>
            <div class="right">
                <h2>{{item2.title}}</h2>
                <div class="select-attr" @click="showSelect(item2.spu_code,item2.sku_code)">
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
                    <buy-num
                    :max="item2.repertory" 
                    v-on:addNumClick="addNumClick(item2.sku_code,$event)"
                    v-model="item2.cart_num"></buy-num>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import Checkbox from "@/components/Checkbox.vue"
// import BuyNum from "@/components/BuyNum.vue"
import ProductItem from "@/components/ProductItem.vue"
    export default {
        name:"CartItem",
        components:{
            Checkbox,
            // BuyNum,
            ProductItem
        },
        props:{
            cartMsg:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        data(){
            return {
                shopIdList:[],
                skuCodeList:[],
                isChecked:false
            }
        },
        computed:{
            isAllSelect(){
                return this.cartMsg.product.length===this.skuCodeList.length;
            }
        },
        methods:{
            isHasSkuCode(sku_code){
                let pos = -1;
                for(let i=0;i<this.skuCodeList.length;i++){
                    if(this.skuCodeList[i] === sku_code){
                        pos = i;
                        break;
                    }
                }
                return pos;
            },
            productItemSelect(data){
                let sku_code = data.sku_code;
                let index = this.isHasSkuCode(sku_code);
                if(index<0){
                    this.skuCodeList.push(sku_code);
                }else{
                    this.skuCodeList.splice(index,1);
                }
                
                // this.isChecked = (this.cartMsg.product.length===this.skuCodeList.length);
            },
        }
    }
</script>

<style lang="scss" scoped>
@import '../css/base.scss';
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
        /* .down{
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
        } */
        .checkbox-btn{
            ::v-deep .input{
                border-radius:50%;
            }
        }
    }
</style>