<template>
    <div class="good-details">
        <back>
            <template #back-title>详情页</template>
        </back>
            
        <template v-if="goodMsg">
            <div class="bg-ff">
                <img :src="goodMsg.product_img" alt="" class="banner">
                <div class="price">
                    <p>￥<span>{{goodMsg.price}}</span></p>
                    <b>价格<i>￥{{goodMsg.original_price}}</i></b>
                </div>
                <div class="title">{{goodMsg.title}}</div>
            </div>
            <div class="bg-ff">
                <div class="delivery">
                    <div class="left">
                        发货
                        <p class="address">{{goodMsg.address}}</p>
                        <p class="fee">快递{{goodMsg.express_fee}}</p>
                    </div>
                    <div class="right">月销{{monthlyScales}}</div>
                </div>
            </div>
        </template>
        <template v-else>
            <div>{{emptyMsg}}</div>
        </template>
    </div>
</template>

<script>
    export default {
        name:"GoodDetails",
        data(){
            return {
                id:"",
                detailsType:"",
                goodMsg:"",
                emptyMsg:""
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
</style>