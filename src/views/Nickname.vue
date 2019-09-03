<template>
    <div class="nickname-page">
        <back :titlePos="'left'">
            <template #back-title>设置昵称</template>
        </back>
        <input-item
        class="nick-input"
        v-model.trim="nickname"
        :clearShow="true"
        :clearBg="true"
        placeholder="请设置昵称"></input-item>
        <p class="txt-tips padlr">注意：昵称是用户在互动场景下的称谓，能更有效保护购买记录等隐私信息。</p>
        <button class="red-linear big-btn nick-save-btn" @click="setNickname" :disabled="nickname==''">保存</button>
    </div>
</template>

<script>
    export default {
        name:"Nickname",
        data(){
            return {
                nickname:""
            }
        },
        methods:{
            setNickname(){
                let _this = this;
                this.axios.post('/setnickname',{
                    nickname:_this.nickname
                }).then(res=>{
                    if(res.data.state=='ok'){
                        _this.$router.go(-1);
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "../css/base.scss";
.nick-input{
    border-radius:vm(10);
    background-color:#fff;
    padding: 0 vm(10);
    margin: vm(25) {
        top:vm(80);
    }
}
.nick-save-btn{
    margin-top:vm(40);
}
</style>