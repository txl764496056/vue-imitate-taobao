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
         :isChildChecked="isChildChecked"
         :key="index"></product-item>
    </div>
</template>

<script>
import Checkbox from "@/components/Checkbox.vue"
import ProductItem from "@/components/ProductItem.vue"
    export default {
        name:"CartItem",
        components:{
            Checkbox,
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
                isChecked:false,
                isChildChecked:3, //1:选中  2:不选中 3：保持原有状态
            }
        },
        computed:{
            isAllSelect(){
                return (this.skuCodeList.length>0&&this.cartMsg.product.length===this.skuCodeList.length);
            },
            /* halfSelect(){
                return this.skuCodeList.length>0&&(this.skuCodeList.length<this.cartMsg.product.length);
            }, */
            noSelected(){
                return this.skuCodeList.length<=0;
            },
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

            },
        },
        watch:{
            isAllSelect(newVal){
                this.isChecked = newVal;
                if(newVal){
                    this.isChildChecked = 1;
                }
            },
            noSelected(newVal){
                if(newVal){
                    this.isChildChecked = 2;
                }
            },
            isChecked(newVal){
                if( newVal ){
                    this.isChildChecked = 1;
                }else{
                    if(this.isAllSelect){
                        this.isChildChecked = 2;
                    }else{
                        this.isChildChecked = 3;
                    }
                }
            }
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