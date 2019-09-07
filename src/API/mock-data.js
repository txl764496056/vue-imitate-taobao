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

// 生成用户头像
let photo = Random.image("100x100","#fdd48a",'png','photo');
// 生成地址数据
let addressMsg = Mock.mock({
    "address_list|15":[
        {
           "id":"@id()",
           "name":"@cname()",
           "address":"@county(true)"+"@ctitle()",
           "tell":/^1[35789]\d{9}/,
           "isDefault":false
        }
    ]
});
// 设置默认地址
addressMsg.address_list[0]['isDefault'] = true;

/* 修改地址 */
Mock.mock(RegExp('/editAddress'),'get',function(options){
    let params = getUrlParams(options.url);
    let id = params.id;
    let arr = addressMsg.address_list;
    for(let i=0;i<arr.length;i++){
        if(arr[i].id==id){
            arr[i] = params;
            console.log(addressMsg.address_list[i]);
            return '修改成功';
        }
    }
    return '地址不存在';
})

/* 获取将要修改的地址信息 */
Mock.mock(RegExp('/getAddress'),'get',function(options){
    let id = getUrlParams(options.url).id;
    return addressMsg.address_list.filter(function(item,index){
        return item.id==id;
    });
})

/* 收货地址 */
Mock.mock(RegExp('/address'),'get',function(options){
     return addressMsg;
});

/* 设置页用户信息 */
Mock.mock(RegExp('/seting'),'get',function(options){
    return Mock.mock({
        "nickname":function(){
            return nickname ? nickname:"设置昵称";
        },
        photo
    })
});

/* 设置昵称 */
Mock.mock(RegExp("/setNickname"),'post',function(options){
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
            photo,
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