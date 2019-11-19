<template>
    <div class="product-item">
        <div class="left">
            <!-- @click.native="checkboxClick" -->
            <checkbox
            class="checkbox-btn"
            :disabled="false" 
            :label="productMsg.sku_code"
            :showLabel="false"
            v-model='isChecked'></checkbox>
            <img :src="productMsg.img" alt="">
        </div>
        <div class="right">
            <h2>{{productMsg.title}}</h2>
            <div class="select-attr" @click="showSelect(productMsg.spu_code,productMsg.sku_code)">
                <div class="left">
                    <template v-for="(attr_item) in productMsg.attr">{{attr_item}}</template>
                </div>
                <i class="arrow-b iconfont icon-arrow-b"></i>
            </div>
            <div class="price-num">
                <p>
                    ￥
                <span>{{productMsg.price}}</span>
                </p>
                <buy-num
                :max="productMsg.repertory" 
                v-on:addNumClick="addNumClick(productMsg.sku_code,$event)"
                v-model="productMsg.cart_num"></buy-num>
            </div>
        </div>
    </div>
</template>

<script>
import Checkbox from "@/components/Checkbox.vue"
import BuyNum from "@/components/BuyNum.vue"
    export default {
        name:"ProductItem",
        components:{
            Checkbox,
            BuyNum,
        },
        props:{
            productMsg:{
                type:Object,
                default(){
                    return {};
                }
            },
            allChecked:{
                type:Boolean,
                default:false
            },
            isChildChecked:{
                type:Number,
                default:3  //1:选中  2:不选中 3：保持原有状态
            }
        },
        data(){
            return {
                isChecked:false
            }
        },
        computed:{
        },
        methods:{
            addNumClick(sku_code,num){
                this.axios.get('/updateProductNum',{
                    params:{
                        sku_code,
                        num
                    }
                });
            },
            showSelect(spu_code,sku_code){
                this.$emit('showSelect',{spu_code,sku_code});
            },
        },
        watch:{
            isChecked(){
                this.$emit('productItemSelect',{sku_code:this.productMsg.sku_code});
            },
            isChildChecked(newVal){
                if(newVal==1){
                    this.isChecked = true;
                }else if(newVal==2){
                    this.isChecked = false;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "../css/base.scss";
 .product-item{
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
    .checkbox-btn{
        ::v-deep .input{
            border-radius:50%;
        }
    }
}
</style>