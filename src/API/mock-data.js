let Mock = require('mockjs');

let jsonData = require("./json-data.js");
import common from '../common.js'
import global from '../global.js'
let Random = Mock.Random;

let {
    collect,
    attention,
    track,
    coupon,
    nickname,
} = global;
let {
    getUrlParams
} = common;

/* 设置昵称 */
Mock.mock(RegExp("/setnickname"),'post',function(options){
    let name = JSON.parse(options.body).nickname;
    nickname = name;
    return {
        state:'ok',
        content:'修改成功'
    };
})

/* 我的页面 */
Mock.mock(RegExp("/my"),'get',function(options){
    return Mock.mock({
        "person":{
            "nickname":function(){
                return nickname ? nickname:"设置昵称";
            },
            "photo":Random.image("100x100","#fdd48a",'png','photo'),
            collect,
            attention,
            track,
            coupon
        }
    })    
})

/* 登录 */
Mock.mock(RegExp('/login'),'get',function(options){
    let params = getUrlParams(options.url);
    let local_msg = localStorage.getItem('verify_code');
    local_msg = local_msg ? JSON.parse(local_msg).verify_code:'';
    let user_key = Mock.mock("@guid");
    if(local_msg&&local_msg.tell===params.tell&&local_msg.code===params.code){
        return {
            msg:"登录成功",
            user_key
        };
    }else{
        return {
            msg:"验证码错误"
        };
    }
});

/* 手机验证码 */
Mock.mock(RegExp("/verifyCode"),'get',function(options){
       let params = getUrlParams(options.url)
       let msg = Mock.mock({
           "verify_code":{
               "tell":params.tell,
               "code":/^\d{6}$/
           }
       });
       //验证码存储起来，2分钟后清除，模拟有效时间
       localStorage.setItem("verify_code",JSON.stringify(msg));
        setTimeout(function(){
            localStorage.removeItem("verify_code");
        },1000*60*2);
       return msg;
})

/* 世界各国电话区号 */
Mock.mock('/counryCallingcode',{
    "countryCallingCodes":jsonData.countryCallingCodes
});