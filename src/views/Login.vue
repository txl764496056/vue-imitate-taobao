<template>
    <div>
        <back></back>
        <img src="images/logo.jpg" alt="" class="logo">
        <input-item 
        class="login-unit"
        v-model='tell' 
        type="text" 
        @input="handleInput"
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
        type="number" 
        placeholder="请输入验证码">
            <template #right>
                <button 
                :class="{'tint':isTint}" 
                :disabled="isTint"
                @click="getVerifyCode" 
                class="code-btn">{{isTint ? time+"s后重新获取":"获取验证码"}}</button>
            </template>
        </input-item>
    </div>
</template>

<script>
    export default {
        name:'Login',
        data(){
            return {
                verifyCode:'',
                tell:'',
                tellMax:12,
                areaCode:86,
                isTint:false,
                time:60 //倒计时,
            }
        },
        mounted(){
            // this.getCallingCode();
        },
        methods:{
            // getCallingCode(){
            //     let _this = this;
            //     this.axios.get(_this.http+'/counryCallingcode',(res)=>{
            //         console.log(res)
            //     }).then(err=>{
            //         console.log(err);
            //     });
            // },
            handleInput(){
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
            /* 获取短信验证码 */
            getVerifyCode(){
                let _this = this;
                this.cutdown();
                this.axios.get(_this.http+'/verifyCode',(res)=>{
                    console.log(res);
                }).then(err=>{
                    console.log(err);
                })
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
        color:$color-66;
        display:flex;
        align-items: center;
        i{
            font-size:vm(28);margin:0 2px;
            color:$color-99;
            font-weight:bold;
            &.add{
                font-size:vm(18);
                color:inherit;
            }
        }
    }
}

</style>