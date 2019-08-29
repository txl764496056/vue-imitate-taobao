<template>
    <div class="login-page">
        <back></back>
        <img src="images/logo.jpg" alt="" class="logo">
        <input-item 
        class="login-unit"
        v-model='tell' 
        type="text"
        :clearShow="true&&tell!=''"
        @keydown="tellKeydown"
        @keyup="tellKeyup"
        placeholder="请输入手机号码">
            <template #left>
                <div class="area-code">
                    <i class="iconfont add icon-plus"></i>
                    {{areaCode}}
                    <i class="iconfont icon-arrow-r"></i>
                </div>
            </template>
        </input-item>
        <input-item 
        class="login-unit"
        v-model='verifyCode' 
        type="text"
        @input="checkVerifyCode" 
        placeholder="请输入验证码">
            <template #right>
                <button 
                :class="{'tint':isTint||tell==''}" 
                :disabled="isTint||tell==''"
                @click="getVerifyCode" 
                class="code-btn">{{isTint ? time+"s后重新获取":"获取验证码"}}</button>
            </template>
        </input-item>
        <button disabled class="red-linear big-btn">登录</button>
    </div>
</template>

<script>
    export default {
        name:'Login',
        data(){
            return {
                verifyCode:'',
                verifyCodeLen:6,
                tell:'',
                tellMax:12,
                areaCode:86,
                isTint:false,
                time:60, //倒计时,
                type:'number'
            }
        },
        mounted(){
            this.getCallingCode();
            this.axios.get("/login",(res)=>{
                console.log(res);
            }).then((err)=>{
                console.log(err);
            });
        },
        methods:{
            getCallingCode(){
                let _this = this;
                this.axios.get('/counryCallingcode',(res)=>{
                    console.log(res)
                }).then(err=>{
                    console.log(err);
                });
            },
            tellKeyup(evt){
                this.checkNumber(evt.key);
            },
            tellKeydown(evt){
                this.checkNumber(evt.key);
                let str = this.tell.replace(/\s/g,"");
                let len = str.length;
                let arr = str.split("");
                if(len<this.tellMax){
                    for(let i=0;i<len;i++){
                        if(i==3){
                            arr.splice(i,0," ");
                        }else if(i==7){
                            arr.splice(i+1,0," ");
                        }
                        
                    }
                }
                this.tell = arr.join("");
            },
            /* 验证手机号 */
            checkTell(){
                return /^1[3456789]\d{9}$/.test(this.tell);
            },
            /* 数字验证 */
            checkNumber(key){
                if( !(/^[0-9]$/.test(key)) ){
                    console.log(this.tell)
                    this.tell = this.tell.replace(/\D/g,"")
                    return ;
                }
            },
            /* 验证码校验 */
            checkVerifyCode(){
                let len = this.verifyCode.length;
                if(len > this.verifyCodeLen){
                    this.verifyCode = this.verifyCode.slice(0,this.verifyCodeLen);
                }
            },
            /* 获取短信验证码 */
            getVerifyCode(){
                let _this = this;
                this.cutdown();
            },
            cutdown(){
                let _this = this;
                this.isTint = true;
                let interId = setInterval(function(){
                    _this.time--;
                    if(_this.time<=0){
                        clearInterval(interId);
                        _this.isTint = false;
                    }
                },1000);
            }
        }
       
    }
</script>

<style lang="scss" scoped>
@import '../css/base.scss';
.logo{
    $logo-size:vm(140);
    width:$logo-size;
    height:$logo-size;
    border-radius:50%;
    margin-top:vm(60);
    margin-bottom:vm(40);
}
.code-btn{
    height:100%;
    background-color:transparent;
    border:none;
    color:themeColor(1);
    &.tint{
        color:themeColor(0.5);
    }
}
.login-unit{
    margin: vm(40) {
        bottom:0;
    };
    .area-code{
        font-size:vm(32);
        color:#666666;
        display:flex;
        align-items: center;
        i{
            font-size:vm(28);margin:0 2px;
            color:#999999;
            font-weight:bold;
            &.add{
                font-size:vm(18);
                color:inherit;
            }
        }
    }
}

.login-page{
    .big-btn{
        margin-top:vm(80);
    }
}


</style>