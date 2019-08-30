let Mock = require('mockjs');

let jsonData = require("./json-data.js");
import common from '../common.js'
let Random = Mock.Random;

/* 登录 */
Mock.mock(RegExp('/login'),'get',function(options){
    let params = common.getUrlParams(options.url);
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

Mock.mock(RegExp("/verifyCode"),'get',function(options){
        
       let params = common.getUrlParams(options.url);
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