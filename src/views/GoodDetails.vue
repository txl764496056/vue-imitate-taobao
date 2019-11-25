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
            :class="{'light':goodMsg&&goodMsg.collect}"
            @click="collectGoods">
                <i class="iconfont icon-star"></i>
                收藏
            </div>
            <div class="add-cart-btn item red-linear" @click="openSelect">加入购物车</div>
            <div class="limit-buy-btn item" @click="openSelect">立即购买</div>
        </div>
        <toast
         :isShow="addCartTips!=''" 
         :position="'bottom'"
         :time="500"
         @changeIsShow="toastShow">
            <template>{{addCartTips}}</template>
        </toast>
        <!-- 保持已选择的内容 -->
        <keep-alive>
            <select-type 
            v-if="addCart=='open'"
            :skuList="goodMsg.sku_list" 
            :goodImg="goodMsg.product_img"
            :spuStore="goodMsg.spu_store"
            :spuPrice="goodMsg.spu_price"
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
        </keep-alive>
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
                spu_code:"", //产品大类id
                sku_code:"", //产品唯一id -- 已用skuCode计算属性代替
                goodsType:"", //产品分类（搜索类...)
                goodMsg:"", //产品所有信息
                emptyMsg:"", //无此产品时的提示
                addCartTips:"", //加入购入车的toast文本
                goodsNum:1, //商品数量
                addCart:'close' //加入购物车弹窗
            }
        },
        mounted(){
            this.getSpuCode();
            this.getGoodType();
            this.getGoodMsg();
        },
        methods:{
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
                    this.addCart = 'open';
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
        },
        computed:{
            monthlyScales(){
                return this.goodMsg.sales/100+'万';
            },
        },
        watch:{
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

</style>