<template>
    <div class="product-item">
        <div class="left">
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
                    <template v-for="(attr_item) in productMsg.attr">{{attr_item.value}}</template>
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
            /**
             * 父-全选
             */
            allSelect:{
                type:Boolean,
                default:false
            },
             /**
             * 父-全不选（么有一个选中）
             */
            noneSelect:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return {
                currChecked:false  //记录选中状态
            }
        },
        computed:{
            isChecked:{
                /**
                 * 1、父的选择状态:返回true,
                 * 2、全不选:返回false，
                 * 3、（兄弟节点）选中部分，则返回当前原有状态，不根据父状态改变
                 */
                get(){
                    return this.allSelect ? true:( this.noneSelect ? false:(this.currChecked) );
                },
                set(val){
                    this.currChecked = val;
                    this.$emit('productItemSelect',{sku_code:this.productMsg.sku_code});
                }
            }
        },
        methods:{
            addNumClick(sku_code,num){
                this.axios.get('/updateProductNum',{
                    params:{
                        sku_code,
                        num
                    }
                // 添加成功在发送事件，否则会出现：后端更新数据慢一步，重新获得的是未更新的旧数据，从而导致页面不更新，偶尔页面数据会闪动
                }).then(res=>{ 
                    if(res.data=='success'){
                        this.$emit("addProductNum");
                    }
                });
                
            },
            showSelect(spu_code,sku_code){
                this.$emit('showSelect',{spu_code,sku_code});
            },
        },
        watch:{
            isChecked(val){
                this.currChecked = val;
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