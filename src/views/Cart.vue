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
         @selectedShop="handleSelectedShop"
         :allSelect="isAllSelect"
         :noneSelect="allNoneSelect"
         :key="index"></cart-item>
         <!-- :allSelect="isAllSelect"
         :noneSelect="allNoneSelect" -->
         
         <div class="count-btn-container">
            <div class="count-btn">
                <checkbox class="checkbox-btn"
                 :label="'全选'" 
                 :showLabel="true" 
                 v-model="isChecked"></checkbox>
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
                selectedShop:[], //已选中店铺的shop_id,以及改店铺下被选中的产品的sku_code列表
                isManage:true,
                cartList:[],
                
                // 
                allProductTypeNum:0, //购物车产品“类型”总数量
                selectedProductTypeNum:0, //已选中产品“类型”数量
                totalNum:0, //已选择产品总数量（注意哦！同类型可能有多个）

                isSelectType:'close', //是否打开selectType（产品属性弹窗）
                selectMsg:{}, //当前被点击产品的属性信息，（产品属性弹窗需要）
                oldSkuCode:"", //当前被点击产品的sku_code,也就是在产品属性弹窗里修改属性信息还没点击确认之前的
                selectSkuCode:"", //产品属性弹窗选择的产品的sku_code
                selectSpuCode:"", //当前被选择产品大类的spu_code
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
            },
            /**
             * 产品是否全部选中，这个根据产品数量决定（不是店铺选中数量）
             */
            isAllSelect(){
                return this.selectedProductTypeNum>0&&this.selectedProductTypeNum===this.allProductTypeNum;
            },
            /**
             * 产品是否都没选中，这个根据产品数量决定（不是店铺选中数量）
             */
            allNoneSelect(){
                return this.selectedProductTypeNum==0;
            },  
            /**
             * 全选按钮状态
             */
            isChecked:{
                get(){
                    return this.isAllSelect;
                },
                set(val){
                    if(val){
                        this.selectAll();
                    }else{
                        this.clearSelectAll();
                    }
                    this.updateSelectProductNum();
                }
            }
        },
        methods: {
            /**
             * 获得购物车产品总数量
             */
            getAllProduct(data){
                let num = 0;
                for(let i=0;i<data.length;i++){
                    num += data[i].product.length;
                }
                this.allProductTypeNum = num;
            },
            /**
             * 获得已选择产品的数量
             */
            updateSelectProductNum(){
                let num = 0;
                for(let i=0;i<this.selectedShop.length;i++){
                    num += this.selectedShop[i].skuCodeList.length;
                }
                this.selectedProductTypeNum = num;
            },
            /**
             * 查询已选择shop_id列表中是否含有当前选中的店铺id
             * 返回索引值
             */
            getShopIdIndex(shop_id){
                for(let i=0;i<this.selectedShop.length;i++){
                    if(this.selectedShop[i].shop_id==shop_id){
                      return i;
                    }
                }
                return -1;
            },
            /**
             * 存储或删除已选中店铺(shop_id)以及店铺下已选中产品id
             * 1、存储列表里没有，则添加进去
             * 2、存储列表里有，
             *      （1）店铺下的选中产品列表(skuCodeList)为空，则从存储列表中删除
             *      （2）店铺下的选中产品列表(skuCodeList)不为空，则更新存储列表的这个店铺
             */
            handleSelectedShop(data){
                let {shop_id,skuCodeList} = data;
                
                let index = this.getShopIdIndex(shop_id);
                // 添加
                if(index==-1&&skuCodeList.length>0){
                    this.selectedShop.push({
                        skuCodeList,
                        shop_id
                    });
                // 删除
                }else if(skuCodeList.length==0){
                    this.selectedShop.splice(index,1);
                // 更新
                }else{
                    this.selectedShop[index] = {
                        shop_id,
                        skuCodeList
                    }
                }
                // 更新当前被选中产品
                this.updateSelectProductNum();
            },
            /**
             * 全选-将所有店铺id及店铺下的产品id存入列表
             */
            selectAll(){
                 let arr = [];
                    for(let i=0;i<this.cartList.length;i++){
                        let skuCodeList = this.cartList[i].product.map((item)=>{
                            return item.sku_code;
                        })
                        arr.push({
                            shop_id:this.cartList[i].shop_id,
                            skuCodeList
                        })
                    }
                    this.selectedShop = arr;
            },
            /**
             * 取消全选-将存储选中的列表清空
             */
            clearSelectAll(){
                this.selectedShop = [];
            },
            getCartList(){
                this.axios.get('/cartList').then(res=>{
                    this.cartList = res.data;
                    this.getAllProduct(res.data);
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