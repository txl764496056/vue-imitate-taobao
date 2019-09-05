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
                    <span v-if="item.default">默认</span>
                    <p>{{item.address}}</p>
                </div>
            </div>
            <div class="edit">编辑</div>
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
        }
    }
</script>

<style lang="scss" scoped>
@import '../css/base.scss';
.address-link{
    font-size:vm(28);
    color:$txt-gray1;
    margin-right:vm(25);
}
.address-item{
    $icon-size:vm(60);
    display:flex;
    justify-content: space-between;
    align-items:center;
    background-color:#fff;
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
        font-size:vm(28);
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
            }
            span{
                color:$txt-gray2;
                margin-left:vm(10);
                font-size:vm(26);
            }
        }
        .dw{
            font-size:vm(26);
            span{
                color:$theme-color;
                font-size:inherit;
                background-color:themeColor(0.2);
                padding:vm(2) vm(8);
                display:inline-block;
                margin-right:vm(15);
            }
            p{
                display:inline-block;
                font-size:inherit;
            }
        }
    }
}
</style>