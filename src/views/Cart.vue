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
        <div class="cart-item"
        v-for="(item,index) in cartList"
        :key="index">
            <div class="up">
                <checkbox
                 class="checkbox-btn"
                 :disabled="false" 
                 :label="item.id"
                 :showLabel="false" 
                 v-model='checkboxList'></checkbox>
                 <div class="right">
                     <img :src="item.shop_logo" alt="">
                     <p>{{item.shop_name}}</p>
                 </div>
            </div>
        </div>
        <Menu></Menu>
    </div>
</template>

<script>
import Menu from "@/components/Menu.vue"
import Checkbox from "@/components/Checkbox.vue"
    export default {
        name:"Cart",
        components:{
            Menu,
            Checkbox
        },
        data() {
            return {
                isManage:true,
                cartList:[],
                checkboxList:[]
            }
        },
        mounted(){
            this.getCartList();
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
            }
        },
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
    .cart-item{
        background-color:#fff;
        margin:vm(25);
        border-radius:vm(10);
        padding:vm(20);
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
                }
            }
        }
    }
}
</style>