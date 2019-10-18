<template>
    <div class="select-type" @click.self="closeSelect">
        <div class="content">
            <!-- spu 信息 start -->
            <div class="good-msg unit">
                <img :src="goodImg" alt="">
                <div class="msg">
                    <p>￥<span>{{price}}</span></p>
                    <b>库存{{store}}件</b>
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
                <div class="attr-item" v-for="(attr_item,key,attr_index) in attrList" :key="key">
                    <h2>{{attr_item.title}}</h2>
                    <div class="attr-item-unit"
                        v-for="(sku_item,sku_index) in attr_item.list" :key="sku_index"
                        :class="{'selected':attrItemSlected[key]&&attrItemSlected[key].code==sku_item.code}"
                        @click="attrItemClick(key,sku_item,attr_index)">
                        <img v-if="sku_item.img" :src="sku_item.img" alt="">
                        <span>{{sku_item.value}}</span>
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
                <slot></slot>
            </div>
            <i class="close" @click="closeSelect">x</i>
        </div>
    </div>
</template>

<script>
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
            spu_code:{
                type:String,
                default:""
            }
        },
        components:{
            BuyNum,
        },
        data(){
            return {
                attrList:{},
                goodsNum:1,
                attrItemSlected:{},
                compoleteChoice:"",
                needSelected:"",
                price:0,
                store:0,
                sku_items:[]
            }
        },
        created(){
            this.attrList = this.skuList.attr;
            this.price = this.goodPrice;
            this.store = this.goodStore;
            this.sku_items = this.skuList.sku_items;
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
                let sku_code = (id!='' ? (this.spu_code + id):'');
                this.$emit("getSkuCode",sku_code)
                return sku_code;
            }
        },
        methods:{
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
        },
        watch:{
            goodsNum:{
                immediate:true,
                handler(newVal){
                    this.$emit("getGoodNum",newVal);
                }
            },
            skuCode(){
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
                this.price = price;
                this.store = store;
            }
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