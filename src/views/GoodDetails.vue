<template>
    <div class="good-details">
        <back>
            <template #back-title>详情页</template>
        </back>
            
        <template v-if="goodMsg">
            <div class="bg-ff item">
                <img :src="goodMsg.product_img" alt="" class="banner">
                <div class="price padlr">
                    <p>￥<span>{{goodMsg.price}}</span></p>
                    <b>价格<i>￥{{goodMsg.original_price}}</i></b>
                </div>
                <div class="title padlr">
                    <span v-if="goodMsg.type">{{goodMsg.type}}</span>
                    {{goodMsg.title}}
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
        <div v-show="addCart" @click.self="closeSelect" class="select-type">
            <div class="content">
                <div class="good-msg unit">
                    <img :src="goodMsg.product_img" alt="">
                    <div class="msg">
                        <p>￥<span>{{goodMsg.price}}</span></p>
                        <b>库存{{goodMsg.repertory}}件</b>
                    </div>
                </div>
                <!-- @input="goodsNum=$event" -->
                <div class="good-num unit">
                    购买数量
                    <buy-num class="num"
                     v-model="goodsNum"
                     :max="goodMsg.repertory"></buy-num>
                </div>
                <div class="btns">
                    <button class="left yellow-linear" @click="addCartClick">加入购物车</button>
                    <button class="right red-linear">立即购买</button>
                </div>
                <i class="close" @click="closeSelect">x</i>
            </div>
        </div>
        <toast
         :isShow="addCartTips!=''" 
         :position="'bottom'"
         :time="500"
         @changeIsShow="toastShow">
            <template>{{addCartTips}}</template>
        </toast>
    </div>
</template>

<script>
import toast from "@/components/toast.js";
import BuyNum from "@/components/BuyNum.vue";
    export default {
        name:"GoodDetails",
        components:{
            BuyNum,
            toast
        },
        data(){
            return {
                id:"",
                goodsType:"",
                goodMsg:"",
                emptyMsg:"",
                addCartTips:"",
                goodsNum:1,
                addCart:false //加入购物车弹窗
            }
        },
        mounted(){
            this.getId();
            this.getGoodType();
            this.getGoodMsg();
        },
        methods:{
            getId(){
                this.id = this.$route.query.id;
            },
            getGoodType(){
                this.goodsType = this.$route.query.goodsType;
            },
            getGoodMsg(){
                let _this = this;
                this.axios.get("/getGoodMsg",{
                    params:{
                        id:_this.id,
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
                        id:_this.id,
                        goodsType:_this.goodsType,
                        isCollect:_this.goodMsg.collect
                    }
                }).then(()=>{
                    _this.getGoodMsg();
                })
            },
            openSelect(){
                this.addCart = true;
            },
            closeSelect(){
                this.addCart = false;
            },
            addCartClick(){
                let _this = this;
                this.axios.get("/addCart",{
                    params:{
                        id:_this.id,
                        goodsType:_this.goodsType,
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
            toastShow(data){
                this.addCartTips = data;
                this.closeSelect();
            }
        },
        computed:{
            monthlyScales(){
                return this.goodMsg.sales/100+'万';
            }
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

.select-type{
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
}
</style>