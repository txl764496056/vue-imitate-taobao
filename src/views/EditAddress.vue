<template>
    <div>
        <back>
            <template #back-title>编辑收货地址</template>
            <template #back-right>
                <span class="save-btn" @click="editAddress">保存</span>
            </template>
        </back>
        <div class="edit-address mt20">
            <input-item class="item" v-model="adMsg.name" :clearBg="true" :clearIcon="true"></input-item>
            <input-item class="item" v-model="adMsg.tell" :clearBg="true" :clearIcon="true">
                <template #right>
                    <router-link to="/arealist" class="select-area">
                        +{{area}}
                        <i class="iconfont icon-arrow-r"></i>
                    </router-link>
                </template>
            </input-item>
            <div class="details iconfont item">
                <template v-for="(item,index) in address">
                    <p v-if="index<address.length-1" :key="index">
                        {{item}}
                    </p>
                </template>
            </div>
            <textarea  v-model="adDetail"></textarea>
        </div>
        <div class="default-btn mt20 padlr">
            <div class="left">设为默认地址</div>
            <div class="right smoonth-btn" :class="{'close':!isDefault}" @click="setDefault"></div>
        </div>
        <button class="big-btn w100 no-radiu bg-ff delete-ad-btn">删除地址</button>
    </div>
</template>

<script>
import eventBus from "../event-bus.js"
let areaCode;
eventBus.$on('areaCode',function(data){
    areaCode = data.areaCode;
});
    export default {
        name:'EditAddresss',
        data(){
            return {
                id:"",
                adMsg:{},
                isDefault:false,
                area:areaCode || 86
            }
        },
        created(){
          this.id = this.$route.query.id;
        },
        mounted(){
            this.getAddress();
        },
        computed:{
            address(){
                if(Object.keys(this.adMsg).length<=0) {
                    return [];
                }
               return this.adMsg.address.split(" ");
            },
            adDetail:{
                set(val){
                    this.address[this.address.length-1] = val;
                    this.$set(this.adMsg,'address',this.address.join(" "));
                },
                get(){
                    return this.address[this.address.length-1];
                }
            }
        },
        methods:{
            getAddress(){
                let _this = this;
                this.axios.get('/getAddress',{
                    params:{
                        id:_this.id
                    }
                }).then(res=>{
                    _this.adMsg = res.data[0] ;
                    _this.isDefault = res.data[0].isDefault;
                })      
            },
            setDefault(){
                this.isDefault = !this.isDefault;

            },
            editAddress(){
                let _this = this;
                let {name,tell,address,id} = this.adMsg;
                this.axios.get('/editAddress',{
                    params:{
                        id,
                        name,
                        tell,
                        address,
                        isDefault:_this.isDefault
                    }
                }).then(res=>{
                    if(res.data=='修改成功'){
                        _this.$router.push({
                            path:'/address'
                        });
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "../css/base.scss";
.save-btn{
    color:$theme-color;
    padding-right:vm(25);
}
.edit-address{
    background-color:#fff;
    .item{
        border-bottom:1px solid $border-color-ee;
    }
    textarea{
        border:none;
        width:100%;
        resize:none;
    }
    .item,textarea{
        padding:vm(20) vm(25);
    }
    .details{
        position:relative;
        padding-right:vm(40);
        &::after{
            content:"\e60d";
            position:absolute;
            right:vm(25);
            top:35%;
            display: inline-block;
            color:$txt-gray2;
        }
    }
    .select-area{
        color:$txt-gray2;
        display:flex;
        align-items:center;
    }
}
.default-btn{
    background-color:#fff;
    padding-top:vm(20);
    padding-bottom:vm(20);
    display:flex;
    justify-content: space-between;
    align-items:center;
}
.delete-ad-btn{
    color:$theme-color;
    position:fixed;
    bottom:0;
}
</style>