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
        <!--  v-on="$listeners"  将cart父绑定的事件绑定到product-item上，这里指v-on:showSelect -->
        <product-item 
        v-on:productItemSelect="productItemSelect"
         v-on="$listeners" 
         v-for="(item,index) in cartMsg.product" 
         :productMsg="item"
         :allSelect="isAllSelect"
         :noneSelect="allNoneSelect"
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
            },
            /**
             * 父-全选
             */
            allSelect:{
                type:Boolean,
                default(){
                    return false
                }
            },
            /**
             * 父-全不选（么有一个选中）
             */
            noneSelect:{
                type:Boolean,
                default(){
                    return false;
                }
            }
        },
        data(){
            return {
                skuCodeList:[],
                currChecked:false,
            }
        },
        computed:{
            isAllSelect(){
                return this.skuCodeList.length>0&&this.cartMsg.product.length===this.skuCodeList.length;
            },
            allNoneSelect(){
                return this.skuCodeList.length==0;
            },
            /**
             * 店铺是否选中
             * 注意：只有在按钮被点击的时候才会触发
             */
            isChecked:{
                get(){
                    return this.allSelect ? true:(this.noneSelect ? false:(this.isAllSelect));
                },
                set(val){
                    if(val){
                        this.selectAll();
                    }else{
                        this.clearSelectAll();
                    }
                    this.$emit("selectedShop",{shop_id:this.cartMsg.shop_id,skuCodeList:this.skuCodeList});
                }
            },
        },
        methods:{
            /**
             * 获取sku_code在存储列表中的索引值
             */
            getSkuCodeIndex(sku_code){
                for(let i=0;i<this.skuCodeList.length;i++){
                    if(this.skuCodeList[i] === sku_code){
                        return i;
                    }
                }
                return -1;
            },
            /**
             * 全选，将所有产品sku_code存入
             */
            selectAll(){
                let arr = this.cartMsg.product.map((item)=>{
                    return item.sku_code;
                });
                this.skuCodeList = arr;
            },
            /**
             * 取消全选，产品id数组清空
             */
            clearSelectAll(){
                this.skuCodeList = [];
            },
            /**
             * 添加或删除已选产品sku_code
             */
            productItemSelect(data){
                let sku_code = data.sku_code;
                
                if(this.skuCodeList.indexOf(sku_code)==-1){
                    this.skuCodeList.push(sku_code);
                }else{
                    let index = this.getSkuCodeIndex(sku_code);
                    this.skuCodeList.splice(index,1);
                }
                this.$emit("selectedShop",{shop_id:this.cartMsg.shop_id,skuCodeList:this.skuCodeList});
            },
        },
        watch:{
           allSelect(newVal){
               if(newVal){
                   this.selectAll(); 
               }
           },
           noneSelect(newVal){
               if(newVal){
                   this.clearSelectAll();
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