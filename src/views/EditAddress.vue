<template>
    <div>
        <back>
            <template #back-title>{{backTitle}}</template>
            <template #back-right>
                <span class="save-btn" :type="type" @click="saveBtnClick">保存</span>
            </template>
        </back>
        <div class="edit-address mt20">
            <input-item class="item" v-model="adMsg.name" placeholder="请输入姓名" :clearBg="true" :clearIcon="true"></input-item>
            <input-item class="item" v-model="adMsg.tell" placeholder="请输入手机号" :clearBg="true" :clearIcon="true">
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
        <button v-if="type=='edit'" class="big-btn w100 no-radiu bg-ff delete-ad-btn" @click="deleteAddress">删除地址</button>
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
                backTitle:'添加收货地址',
                adMsg:{
                    name:'',
                    tell:''
                },
                type:'',
                isDefault:false,
                area:areaCode || 86
            }
        },
        created(){
          this.id = this.$route.query.id || '';
          this.type = this.$route.query.type;
        },
        mounted(){
            if(this.type=='edit'){
                this.getAddress();
                this.backTitle = '编辑收货地址';
            }
            
        },
        computed:{
            address(){
                return (this.adMsg.address ? this.adMsg.address.split(" "):['湖北省','恩施市','木抚办事处','东头组12号']);
            },
            adDetail:{
                set(val){
                    this.address[this.address.length-1] = val;
                    this.$set(this.adMsg,'address',this.address.join(" "));
                },
                get(){
                    return this.address[this.address.length-1] || '';
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
            saveBtnClick(){
                return this.type=='edit' ? this.editAddress():this.addAddress();
            },
            addAddress(){
                let _this = this;
                let {name,tell} = this.adMsg;
                this.axios.get('/addAddress',{
                    params:{
                        name,
                        tell,
                        address:_this.address.join(" "),
                        isDefault:_this.isDefault
                    }
                }).then(res=>{
                    if(res.data=='添加成功'){
                        _this.$router.push({
                            path:'/address'
                        });
                    }
                });
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
            },
            deleteAddress(){
                let _this = this;
                let {id} = this.adMsg;
                this.axios.get('/deleteAddress',{
                    params:{
                        id
                    }
                }).then(res=>{
                    if( res.data=="删除成功" ){
                        _this.$router.push('/address');
                    }
                })
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
    margin-top:vm(20);
}
</style>