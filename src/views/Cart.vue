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
        <!-- <div class="cart-item"
        v-for="(item,index) in cartList"
        :key="index">
            <div class="up">
                <checkbox
                 class="checkbox-btn"
                 :disabled="false" 
                 :label="item.is_checked"
                 :showLabel="false"
                 @click="checkClick" 
                 v-model='item.is_checked'></checkbox>
                 <div class="right">
                     <img :src="item.shop_logo" alt="">
                     <p>
                         {{item.shop_name}}
                        <span>></span>
                     </p>
                 </div>
            </div>
            <div class="down" v-for="(item2,index2) in item.product" :key="index2">
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
            </div>
        </div> -->
        <cart-item v-for="(item,index) in cartList" :cartMsg="item" :key="index"></cart-item>
        <Menu></Menu>
        <select-type
        class="cart-select-type" 
        v-if="isSelectType"
        :goodImg="selectMsg.img"
        :goodPrice="selectMsg.price"
        :goodStore="selectMsg.store"
        :skuList="selectMsg.sku_list"
        :spu_code="selectMsg.spu_code"
        v-on:getSkuCode="getSelectSkuCode"
        v-on:closeSelect="closeSelect">
            <template>
                <button @click="updateCartProduct" class="big-btn confirm-btn">确定</button>
            </template>
        </select-type>
    </div>
</template>

<script>
import Menu from "@/components/Menu.vue"
// import Checkbox from "@/components/Checkbox.vue"
// import BuyNum from "@/components/BuyNum.vue"
import SelectType from "@/components/SelectType.vue"
import CartItem from "@/components/CartItem.vue"
    export default {
        name:"Cart",
        components:{
            Menu,
            // Checkbox,
            // BuyNum,
            SelectType,
            CartItem
        },
        data() {
            return {
                isManage:true,
                cartList:[],
                // productIdList:[],
                // shopIdList:[],
                isSelectType:false,
                selectMsg:{}, //当前被点击产品（购物车列表）的属性列表
                cartItemSkuCode:"", //购物车列表每项产品，当前被点击产品的sku_code
                selectSkuCode:"", //属性选择弹窗选择的产品的sku_code
                selectSpuCode:"" //当前被选择产品大类的spu_code
            }
        },
        mounted(){
            this.getCartList();
        },
        computed:{
        },
        methods: {
            getCartList(){
                let _this = this;
                this.axios.get('/cartList').then(res=>{
                    // _this.cartList = res.data;
                    // _this.cartList = Object.assign({},res.data);
                    let list = res.data;
                    for(let i=0;i<list.length;i++){
                        let item = list[i].product;
                        item.is_checked = false;
                        for(let j=0;j<item.length;j++){
                            item[j].is_checked = false;
                        }
                    }
                    _this.cartList = list;
                })
            },
            hiddenManage() {
                this.isManage = false;
            },
            showManage() {
                this.isManage = true;
            },
            showSelect(spu_code,sku_code){
                this.isSelectType = true;
                this.selectSpuCode = spu_code;
                this.cartItemSkuCode = sku_code;
            },
            closeSelect(data){
                this.isSelectType = data;
            },
            getSelectSkuCode(sku_code){
                this.selectSkuCode = sku_code;
            },
            updateCartProduct(){
                let _this = this;
                this.axios.get("/updateCartProduct",{
                    params:{
                        sku_code:_this.cartItemSkuCode, //列表项的sku_code，更改前的
                        update_code:_this.selectSkuCode, //列表属性的sku_code,新的sku_code
                    }
                }).then(res=>{
                    if(res.data=='success'){
                        _this.closeSelect();
                        _this.getCartList();
                    }
                });
            },
            addNumClick(sku_code,num){
                this.axios.get('/updateProductNum',{
                    params:{
                        sku_code,
                        num
                    }
                });
            },
            checkClick(){
                console.log("ddd");
            }
        },
        watch:{
            /* 筛选出当前被点击的产品大类（根据spu_code) */
            selectSpuCode(){
                let _this = this;
                for(let i=0;i<this.cartList.length;i++){
                    let item = this.cartList[i];
                    let product = _.filter(item.product,function(o){
                        return o.spu_code==_this.selectSpuCode;
                    });
                    if(product.length>0){
                        _this.selectMsg = product[0];
                        break;
                    }
                }
            }
        }
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
   
    /* .cart-item{
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
    } */
}

.cart-select-type{
    .confirm-btn{
        background-color:$theme-color;
    }
    ::v-deep &.select-type{
        .content{
            .btns{
                .confirm-btn{
                    width:100%;
                }
            }
        }
    }
}
</style>