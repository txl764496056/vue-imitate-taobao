<template>
    <div class="address-container">
        <back>
            <template #back-title>我的收货地址</template>
            <template #back-right>
                <router-link class="address-link" to="">添加新地址</router-link>
            </template>
        </back>
        <div class="address-item"
        v-for="(item,index) in addressList"
        :key="index">
            <i>{{item.name.substr(0,1)}}</i>
            <div class="msg">
                <div class="up">
                    <p>{{item.name}}</p>
                    <span>{{item.tell}}</span>
                </div>
                <div class="dw">
                    <span v-if="item.isDefault">默认</span>
                    <p>{{item.address}}</p>
                </div>
            </div>
            <router-link :to="{path:'/editaddress',query:{id:item.id}}" class="edit">编辑</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name:'Address',
        data(){
            return {
                addressList:[]
            }
        },
        created(){
            let _this = this;
            this.axios.get('/address',{
                params:{
                    userKey:_this.$global.userKey
                }
            }).then(res=>{
                _this.addressList = res.data.address_list;

            });
        },
    }
</script>

<style lang="scss" scoped>
@import '../css/base.scss';
.address-link{
    font-size:vm(28);
    color:$txt-gray1;
    margin-right:vm(25);
}
.address-container{
    margin-top:vm(20);
}
.address-item{
    $icon-size:vm(66);
    display:flex;
    justify-content: space-between;
    align-items:center;
    background-color:#fff;
    padding:vm(15) vm(25);
    >i{
        background-image:linear-gradient(90deg,#ccc,#aaa);
        display:inline-block;
        width:$icon-size;
        height:$icon-size;
        border-radius:50%;
        display:flex;
        justify-content: center;
        align-items:center;
        color:#fff;
        font-size:vm(30);
        font-style:normal;
    }
    .msg{
        flex:1;
        padding:0 vm(20);
        .up{
            display: flex;
            align-items:flex-end;
            p{
                color:$txt-black;
                font-size:vm(32);
            }
            span{
                color:$txt-gray2;
                margin-left:vm(10);
                font-size:vm(26);
            }
        }
        .dw{
            span{
                color:$theme-color;
                font-size:inherit;
                background-color:themeColor(0.2);
                padding:0 vm(8);
                display:inline-block;
                margin-right:vm(10);
                font-size:vm(24);
                border-radius:vm(4);
            }
            p{
                display:inline-block;
                font-size:inherit;
                font-size:vm(28);
            }
        }
    }
    .edit{
        padding-left:vm(15);
        border-left:1px solid $border-color-dd;
        font-size:vm(26);
        color:$txt-gray2;
        padding-bottom:2px;
    }
}
</style>