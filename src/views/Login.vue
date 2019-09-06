<template>
    <div class="login-page">
        <back></back>
        <img src="images/logo.jpg" alt="" class="logo">
        <input-item 
        class="login-unit"
        v-model='tell' 
        type="text"
        :clearIcon="true&&tell!=''"
        :clearShow="true"
        @keydown="tellKeydown"
        @keyup="tellKeyup"
        placeholder="请输入手机号码">
            <template #left>
                <div @click="getCallingCode" class="area-code">
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
        <button 
        @click="login" 
        :disabled="tell==''||verifyCode.length!=verifyCodeLen" 
        class="red-linear big-btn">登录</button>
        <toast 
        :isShow="toast!=''"
        :time="2000" 
        v-on:changeIsShow="toast=$event">
            <template>
                {{toast}}
            </template>
        </toast>
    </div>
</template>

<script>
import Toast from '@/components/toast.js'
    export default {
        name:'Login',
        components:{
            Toast
        },
        data(){
            return {
                verifyCode:'',
                verifyCodeLen:6,
                tell:'',
                tellMax:12,
                areaCode:86,
                isTint:false,
                time:60, //倒计时,
                type:'number',
                toast:'',
            }
        },
        mounted(){
            this.getAreaCode();
        },
        computed:{
            tellNumber(){
                return this.tell.replace(/\s/g,"");
            }
        },
        methods:{
            getAreaCode(){
                let code = this.$route.params.areaCode;
                if(code){
                    this.areaCode = code;
                }
            },
            getCallingCode(){
                this.$router.push("/arealist");
            },
            tellKeyup(evt){
                this.checkNumber(evt.key);
                let str = this.tellNumber;
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
            tellKeydown(evt){
                this.checkNumber(evt.key);
            },
            /* 验证手机号 */
            checkTell(){
                return /^1[3456789]\d{9}$/.test(this.tellNumber);
            },
            /* 数字验证 */
            checkNumber(key){
                if( !(/^[0-9]$/.test(key)) ){
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
                if( !this.checkTell() ){
                    this.toast = '请输入正确手机号码';
                    return ;
                }
                this.cutdown();
                this.axios.get('/verifyCode',{params:{tell:this.tellNumber}}).then(res=>{
                    let code = res.data.verify_code.code;
                    _this.toast = "验证码 "+code+"有效时间2分钟！";
                    _this.verifyCode = code;
                });
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
            },
            /* 登录 */
            login(){
                let _this = this;
                if( !this.checkTell() ){
                    this.toast = '请输入正确手机号码';
                    // 跳转
                }else{
                    this.axios.get("/login",{
                        params:{
                            code:this.verifyCode,
                            tell:this.tellNumber
                        }
                    }).then(res=>{
                        if(res.data.msg=='登录成功'){
                            localStorage.setItem("userKey",res.data.user_key);
                            let nextPath = localStorage.getItem("loginNextPath") || '/';
                            _this.$router.push(nextPath);
                            localStorage.removeItem("loginNextPath");
                        }else{
                            _this.toast=res.data.msg;
                        }
                    });
                    
                }
            }
        }
       
    }
</script>

<style lang="scss" scoped>
@import '../css/base.scss';
.login-page{
    background-color:#fff;
    min-height:100vh;
}
.logo{
    $logo-size:vm(140);
    width:$logo-size;
    height:$logo-size;
    border-radius:50%;
    margin: vm(60) auto vm(40);
    display:block;
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
    border-bottom:1px solid $theme-color;
    background-color:#fff;
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