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
        <cart-item
         v-for="(item,index) in cartList" 
         :cartMsg="item" 
         v-on:showSelect="showSelect"
         :key="index"></cart-item>
         
         <div class="count-btn-container">
            <div class="count-btn">
                <checkbox class="checkbox-btn" :label="'全选'" :showLabel="true" v-model="allSelect"></checkbox>
                <div class="right">
                    <p>合计：<span>￥{{totalPrice}}</span></p>
                    <button class="red-linear">结算({{totalNum}})</button>
                </div>
            </div>
        </div>
        <Menu></Menu>
        <select-type
        class="cart-select-type" 
        v-if="isSelectType=='open'"
        :goodImg="selectMsg.img"
        :spuPrice="selectMsg.spu_price"
        :spuStore="selectMsg.spu_store"
        :skuList="selectMsg.sku_list"
        :spu_code="selectMsg.spu_code"
        :selectedSkuCode="oldSkuCode"
        :selectedType="selectMsg.attr"
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
import Checkbox from "@/components/Checkbox.vue"
import SelectType from "@/components/SelectType.vue"
import CartItem from "@/components/CartItem.vue"
    export default {
        name:"Cart",
        components:{
            Menu,
            Checkbox,
            SelectType,
            CartItem
        },
        data() {
            return {
                isManage:true,
                cartList:[],
                totalNum:0,
                allSelect:false,
                isSelectType:'close', //是否打开selectType
                selectMsg:{}, //当前被点击产品（购物车列表）的属性列表
                oldSkuCode:"", //购物车列表每项产品，当前被点击产品的sku_code,也就是加入点击弹窗后都还未修正的
                selectSkuCode:"", //属性选择弹窗选择的产品的sku_code
                selectSpuCode:"" //当前被选择产品大类的spu_code
            }
        },
        created(){
            
        },
        mounted(){
            this.getCartList();
        },
        computed:{
            totalPrice(){
                return 0;
            }
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
            },
            showSelect(data){
                let {spu_code,sku_code} = data;
                this.isSelectType = "open";
                this.selectSpuCode = spu_code;
                this.oldSkuCode = sku_code;
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
                        sku_code:_this.oldSkuCode, //列表项的sku_code，更改前的
                        update_code:_this.selectSkuCode, //列表属性的sku_code,新的sku_code
                    }
                }).then(res=>{
                    if(res.data=='success'){
                        _this.closeSelect('close');
                        _this.getCartList();
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
.count-btn-container{
    position:relative;
    height:$menu-h;
}
.count-btn{
    display:flex;
    justify-content: space-between;
    position:fixed;
    bottom:$menu-h;
    left:0;
    right:0;
    height:$menu-h;
    background-color:#fff;
    border-top:1px solid $border-color-ee;
    padding:0 vm(25);
    .checkbox-btn{
        font-size:vm(28);
    }
}
</style>