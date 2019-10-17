<template>
    <div class="select-type" @click.self="closeSelect">
        <div class="content">
            <!-- spu 信息 start -->
            <div class="good-msg unit">
                <img :src="goodImg" alt="">
                <div class="msg">
                    <p>￥<span>{{goodPrice}}</span></p>
                    <b>库存{{goodStore}}件</b>
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
            <!-- spu 信息 end -->
            <!-- 属性列表  start -->
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
                    :max="goodStore"></buy-num>
                </div>
            </div>
            <!-- 属性列表  end -->
            <div class="btns">
                <button class="left yellow-linear" @click="addCartClick">加入购物车</button>
                <button class="right red-linear">立即购买</button>
            </div>
            <i class="close" @click="closeSelect">x</i>
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
        name:"SelectType",
        props:{
            skuList:{
                type:Object,
                default(){
                    return {};
                }
            },
            goodImg:{
                type:String,
                default:""
            },
            goodPrice:{
                type:Number,
                default:0
            },
            goodStore:{
                type:Number,
                default:0
            },
            goodType:{
                type:String,
                default:""
            },
            spu_code:{
                type:String,
                default:""
            }
        },
        components:{
            BuyNum,
            toast
        },
        data(){
            return {
                attrList:{},
                goodsNum:1,
                attrItemSlected:{},
                compoleteChoice:"",
                needSelected:"",
                addCartTips:""
            }
        },
        created(){
            this.attrList = this.skuList.attr;
        },
        computed:{
            skuCode(){
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
            }
        },
        methods:{
            addCartClick(){
                let _this = this;
                if( !this.skuCode ){ return ; }
                this.axios.get("/addCart",{
                    params:{
                        // spu_code:_this.spu_code,
                        sku_code:_this.skuCode,
                        goodsType:_this.goodType,
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
            attrItemClick(key,obj,index){
                if( this.attrItemSlected[key] && (this.attrItemSlected[key].code == obj.code) ){
                    this.$delete(this.attrItemSlected,key);
                }else{
                    this.$set(this.attrItemSlected,key,{
                        "code":obj.code,
                        "value":obj.value,
                        index
                    });
                }
            },
            closeSelect(){
                this.$emit('closeSelect',false);
            },
            toastShow(data){
                this.addCartTips = data;
                this.closeSelect();
            },
        }
    }
</script>

<style lang="scss" scoped>
@import "../css/base.scss";
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
}
</style>