<template>
    <div>
        <back>
            <template #back-title>编辑收货地址</template>
            <template #back-right>
                <span class="save-btn">保存</span>
            </template>
        </back>
        <div class="edit-address mt20 padlr">
            <input-item v-model="adMsg.name" :clearBg="true" :clearIcon="true"></input-item>
            <input-item v-model="adMsg.tell" :clearBg="true" :clearIcon="true"></input-item>
        </div>
    </div>
</template>

<script>
    export default {
        name:'EditAddresss',
        data(){
            return {
                id:"",
                adMsg:{}
            }
        },
        created(){
          this.id = this.$route.query.id;
        },
        mounted(){
            this.getAddress();
        },
        methods:{
            getAddress(){
                let _this = this;
                this.axios.get('/getAddress',{
                    params:{
                        id:_this.id
                    }
                }).then(res=>{
                    console.log(res);
                    _this.adMsg = res.data[0] ;
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
}
</style>