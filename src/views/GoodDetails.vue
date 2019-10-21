<template>
    <div class="good-details">
        <back>
            <template #back-title>详情页</template>
        </back>
            
        <template v-if="goodMsg">
            <div class="bg-ff item">
                <img :src="goodMsg.product_img" alt="" class="banner">
                <div class="price padlr">
                    <p>￥<span>{{goodMsg.spu_price}}</span></p>
                    <b>价格<i>￥{{goodMsg.original_price}}</i></b>
                </div>
                <div class="title padlr">
                    <span v-if="goodMsg.type">{{goodMsg.type}}</span>
                    {{goodMsg.spu_name}}
                </div>
            </div>
            <div class="bg-ff item mt20 pdt25">
                <div class="delivery padlr">
                    <div class="left">
                        发货
                        <p class="address iconfont icon-dingwei">{{goodMsg.address}}</p>
                        <p class="fee">快递{{goodMsg.express_fee}}</p>
                    </div>
                    <div class="right">月销{{monthlyScales}}</div>
                </div>
            </div>
            <div class="mt20 details-img">
                <img v-for="(item,index) in goodMsg.details_img" :key="index" :src="item" alt="">
            </div>
        </template>
        <template v-else>
            <div>{{emptyMsg}}</div>
        </template>
        <div class="buy-btn">
            <div class="collect" 
            :class="{'light':goodMsg.collect}"
            @click="collectGoods">
                <i class="iconfont icon-star"></i>
                收藏
            </div>
            <div class="add-cart-btn item red-linear" @click="openSelect">加入购物车</div>
            <div class="limit-buy-btn item" @click="openSelect">立即购买</div>
        </div>
        <!-- <div v-if="addCart" @click.self="closeSelect" class="select-type">
            <div class="content">
                <div class="good-msg unit">
                    <img :src="goodMsg.product_img" alt="">
                    <div class="msg">
                        <p>￥<span>{{goodsPrice}}</span></p>
                        <b>库存{{goodsStore}}件</b>
                        <div class="type">
                            <template v-if="compoleteChoice">
                                已选:"
                                {{compoleteChoice}}
                                "
                            </template>
                            <template v-if="needSelected">
                                选择:
                                {{needSelected}}
                            </template>
                        </div>
                    </div>
                </div>
                <div class="c-content">
                    <div class="attr-item" v-for="(item3,key,index3) in attrList" :key="key">
                        <h2>{{item3.title}}</h2>
                        <div class="attr-item-unit"
                         v-for="(item4,index4) in item3.list" :key="index4"
                         :class="{'selected':attrItemSlected[key]&&attrItemSlected[key].code==item4.code}"
                         @click="attrItemClick(key,item4,index3)">
                            <img v-if="item4.img" :src="item4.img" alt="">
                            <span>{{item4.value}}</span>
                        </div>
                    </div>
                    <div class="good-num unit">
                        购买数量
                        <buy-num class="num"
                        v-model="goodsNum"
                        :max="goodsStore"></buy-num>
                    </div>
                </div>
                <div class="btns">
                    <button class="left yellow-linear" @click="addCartClick">加入购物车</button>
                    <button class="right red-linear">立即购买</button>
                </div>
                <i class="close" @click="closeSelect">x</i>
            </div>
        </div> -->
        <toast
         :isShow="addCartTips!=''" 
         :position="'bottom'"
         :time="500"
         @changeIsShow="toastShow">
            <template>{{addCartTips}}</template>
        </toast>
        <select-type 
          v-if="addCart"
          :skuList="goodMsg.sku_list" 
          :goodImg="goodMsg.product_img"
          :goodStore="goodMsg.store"
          :goodPrice="goodMsg.spu_price"
          :spu_code="spu_code"
          v-on:getSkuCode="getSkuCode"
          v-on:closeSelect="closeSelect">
            <template #good-num>
                <div class="good-num unit">
                    购买数量
                    <buy-num class="num"
                    v-model="goodsNum"
                    :max="goodMsg.store"></buy-num>
                </div>
            </template>
            <template>
                <button class="left yellow-linear" @click="addCartClick">加入购物车</button>
                <button class="right red-linear">立即购买</button>
            </template>
          </select-type>
    </div>
</template>

<script>
import toast from "@/components/toast.js";
import BuyNum from "@/components/BuyNum.vue";
import SelectType from "@/components/SelectType.vue";
    export default {
        name:"GoodDetails",
        components:{
            BuyNum,
            toast,
            SelectType
        },
        data(){
            return {
                // goodsPrice:0, //商品价格
                // goodsStore:0, //商品库存
                spu_code:"", //产品大类id
                sku_code:"", //产品唯一id -- 已用skuCode计算属性代替
                goodsType:"", //产品分类（搜索类...)
                goodMsg:"", //产品所有信息
                emptyMsg:"", //无此产品时的提示
                addCartTips:"", //加入购入车的toast文本
                goodsNum:1, //商品数量
                attrItemSlected:{}, //已选中属性（值）
                // attrList:{}, //属性列表
                // sku_items:[], //产品列表（带有sku_code和基本信息)
                addCart:false //加入购物车弹窗
            }
        },
        mounted(){
            this.getSpuCode();
            this.getGoodType();
            this.getGoodMsg();
        },
        methods:{
            /* dataInit(){
                if( !this.goodMsg ) {return ;}
                // this.attrList = this.goodMsg.sku_list.attr;
                // this.sku_items = this.goodMsg.sku_list.sku_items;
                // this.goodsPrice = this.goodMsg.spu_price;
                // this.goodsStore = this.goodMsg.store;
            }, */
            getSpuCode(){
                this.spu_code = this.$route.params.spu_code;
            },
            getGoodType(){
                this.goodsType = this.$route.params.goodsType;
            },
            getGoodMsg(){
                let _this = this;
                this.axios.get("/getGoodMsg",{
                    params:{
                        spu_code:_this.spu_code,
                        goodsType:_this.goodsType
                    }
                }).then(res=>{
                    if(typeof res.data =="string"){
                        _this.emptyMsg = res.data;
                    }else{
                        _this.goodMsg = res.data;
                        // this.dataInit();
                    }
                })
            },
            collectGoods(){
                let _this = this;
                this.axios.get('/collectGoods',{
                    params:{
                        spu_code:_this.spu_code,
                        goodsType:_this.goodsType,
                        isCollect:_this.goodMsg.collect
                    }
                }).then(()=>{
                    _this.getGoodMsg();
                })
            },
            openSelect(){
                let userKey = localStorage.getItem('userKey');
                if(userKey){
                    this.addCart = true;
                }else{
                    localStorage.setItem('loginNextPath',this.$route.path);
                    this.$router.push('/login');
                }
            },
            closeSelect(data){
                this.addCart = data;
            },
            addCartClick(){
                let _this = this;
                if( !this.sku_code ){ return ; }
                this.axios.get("/addCart",{
                    params:{
                        sku_code:_this.sku_code,
                        num:_this.goodsNum
                    }
                }).then(res=>{
                    if(res.data=='添加成功'){
                        _this.addCartTips = '加入购物车成功';
                        
                    }else{
                        _this.addCartTips = '加入购物车失败';
                    }
                })
                
            },
            getSkuCode(data){
                this.sku_code = data;
            },
            toastShow(data){
                this.addCartTips = data;
                this.closeSelect();
            },
            /* getGoodNum(data){
                this.goodsNum = data;
            }, */
            /* attrItemClick(key,obj,index){
                if( this.attrItemSlected[key] && (this.attrItemSlected[key].code == obj.code) ){
                    this.$delete(this.attrItemSlected,key);
                }else{
                    this.$set(this.attrItemSlected,key,{
                        "code":obj.code,
                        "value":obj.value,
                        index
                    });
                }
            }, */
            
        },
        computed:{
            monthlyScales(){
                return this.goodMsg.sales/100+'万';
            },
            /* 
            * 返回没有任何已选值的属性
             */
           /*  needSelected(){
                let arr = [];
                for(let key in this.attrList){
                    // 属性没有已选值
                    if( !this.attrItemSlected[key] ){ 
                        arr.push(this.attrList[key].title);
                    }
                }
                return arr.join(" ");
            }, */
            /* 
            * 所有属性都选择了值,
             */
            /* compoleteChoice(){
                let arr = [];
                if(Object.keys(this.attrList).length==Object.keys(this.attrItemSlected).length){
                    for(let key in this.attrItemSlected){
                        arr.push(this.attrItemSlected[key].value);
                    }
                }
                return arr.join(" ");
            }, */
            /**
             * 计算sku_code 产品唯一id
             */
            /* skuCode(){
                let id = '';
                let arr = [];
                if(Object.keys(this.attrList).length==Object.keys(this.attrItemSlected).length){
                    for(let key in this.attrItemSlected){
                        arr.push(this.attrItemSlected[key].index);
                    }
                    arr.sort(function(a,b){ return a-b; });//排序
                    // 拼接code
                    for(let i=0;i<arr.length;i++){
                        for(let key2 in this.attrItemSlected){
                            if(arr[i]==this.attrItemSlected[key2].index){
                                id += this.attrItemSlected[key2].code;
                            }
                        }
                    }
                }
                return id!='' ? (this.spu_code + id):'';
            }, */
        },
        watch:{
            /* skuCode(){
                let price = 0;
                let store = 0;
                if(this.skuCode!=''){
                    for(let i=0;i<this.sku_items.length;i++){
                        let item = this.sku_items[i];
                        if(this.skuCode==item.sku_code){
                            price = item.price;
                            store = item.store;
                            break;
                        }
                    }
                }else{
                    price = this.goodMsg.spu_price;
                    store = this.goodMsg.store;
                }
                this.goodsPrice = price;
                this.goodsStore = store;
            } */
        }

    }
</script>

<style lang="scss" scoped>
@import "../css/base.scss";
.banner{
    width:100%;
    height:auto;
}
.price{
    font-size:vm(24);
    margin-top:vm(10);
    p{
        color:$theme-color;
        span{
            font-size:vm(46);
        }
    }
    b{
        color:$txt-gray2;
        font-weight:normal;
        font-size:vm(26);
        i{
            font-style:normal;
            text-decoration: line-through;
        }
    }
}
.title{
    margin-top:vm(10);
    font-weight:bold;
    span{
        background-color:$light-red;
        color:#fff;
        font-weight:normal;
        font-size:vm(24);
        padding:vm(3) vm(10);
        border-radius:vm(5);
    }
}
.delivery{
    display:flex;
    justify-content: space-between;
    align-items:center;
    font-size:vm(28);
    .left{
        display:flex;
        align-items:center;
        color:$txt-gray2;
        p{
            color:$txt-black;
            margin-left:vm(20);
            font-size:inherit;
            &::before{
                display:inline-block;
                margin-right:vm(5);
            }
            &:not(:last-of-type){
                padding-right:vm(15);
                border-right:1px solid $border-color-ee;
            }
        }
    }
    .right{
        color:$txt-gray2;
        font-size:vm(28);
    }
}
.good-details>.item{
    padding-bottom:vm(25);
    &.pdt25{
        padding-top:vm(25);
    }
}
.details-img{
    display:flex;
    flex-wrap:wrap;
    img{
        width:100%;
        height:auto;
    }
}
.buy-btn{
    $h:90;
    position:fixed;
    bottom:0;
    left:0;
    right:0;
    height:vm($h);
    display:flex;
    align-items:stretch;
    background-color:#fff;
    .item{
        width:35%;
        justify-content:center;
        display:flex;
        align-items:center;
        color:#fff;
        font-size:vm(34);
        letter-spacing:1px;
    }
    .collect{
        flex:1;
        display:flex;
        flex-direction:column;
        justify-content: center;
        align-items:center;
        font-size:vm(26);
        color:$txt-gray2;
        &.light{
            color:$theme-color;
        }
    }
    .limit-buy-btn{
        background-color:$light-red;
    }
}

.good-num{
    display:flex;
    justify-content:space-between;
    align-items:center;
}

/* .select-type{
    position:fixed;
    left:0;
    right:0;
    bottom:0;
    top:0;
    background-color:rgba(0,0,0,0.3);
    z-index:999;
    display:flex;
    align-items:flex-end;
    .content{
        background-color:#fff;
        padding:vm(25);
        width:100%;
        position:relative;
        .unit{
            border-bottom:1px solid $border-color-ee;
            padding:vm(25) 0;
        }
        .close{
            position:absolute;
            right:vm(20);
            top:vm(20);
            font-style:normal;
            color:$txt-gray2;
            font-size:vm(34);
            border:1px solid $border-color-ee;
            display:inline-block;
            $size:40;
            height:vm($size);
            width:vm($size);
            border-radius:vm($size/2);
            font-weight:normal;
            text-align:center;
            line-height:vm($size - 10);
        }
        .good-msg{
            display:flex;
            align-items:center;
            img{
                $size:vm(120);
                width:$size;
                height:$size;
                border-radius:vm(5);
            }
            .msg{
                margin-left:vm(15);
                p{
                    color:$theme-color;
                    font-size:vm(26);
                    span{
                        font-size:vm(40);
                    }
                }
                b{
                    color:$txt-gray2;
                    font-weight:normal;
                    font-size:vm(24);
                }
                .type{
                    color:$txt-black;
                    font-size:vm(24);
                }
            }
        }
        .c-content{
            max-height:vm(675);
            overflow-y:auto;
        }
        .attr-item{
            margin-top:vm(20);
            h2{
                font-weight:normal;
                font-size:vm(28);
            }
            .attr-item-unit{
                background-color:#eee;
                padding:vm(6);
                display:inline-flex;
                align-items:center;
                margin:vm(10);
                border-radius:vm(6);
                border:1px solid transparent;
                img{
                    $size:vm(40);
                    width:$size;
                    height:$size;
                    border-radius:vm(4);
                }
                span{
                    font-size:vm(24);
                    margin:0 vm(20);
                    color:$txt-black;
                }
                &.selected{
                    color:$theme-color;
                    border-color: $theme-color;
                }
            }
        }
        
        .num{
            margin-top:vm(10);
            justify-content: flex-end;
        }
        .good-num{
            display:flex;
            justify-content:space-between;
            align-items:center;
        }
        .btns{
            margin-top:vm(60);
            display:flex;
            justify-content: space-between;
            button{
                $h:90;
                width:50%;
                text-align:center;
                height:vm($h);
                border:none;
                font-size:vm(32);
                color:#fff;
                &.left{
                    border-top-left-radius: vm($h/2);
                    border-bottom-left-radius: vm($h/2);
                }
                &.right{
                    border-top-right-radius: vm($h/2);
                    border-bottom-right-radius: vm($h/2);
                }
            }
        }
    }
} */
</style>