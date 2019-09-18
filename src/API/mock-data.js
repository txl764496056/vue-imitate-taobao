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
    searchRecord,
    productList
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


/* 搜索-返回搜索结果 */
Mock.mock(RegExp('/getSearchResult'),'get',function(options){
    let type = getUrlParams(options.url).type;
    let product = getUrlParams(options.url).product;
    let list =  Mock.mock({
        "search_list|4":[{
            "id":"@id()",
            "title":"@ctitle()"+product,
            "tips":function(){
                let arr = ['直送','包邮','满99减20','过敏包退'];
                let len = parseInt(Math.random()*arr.length);
                let result = [];
                for(let i=0;i<len;i++){
                    result.push(arr[parseInt(Math.random()*len)]);
                }
                return result;
            },
            "address":"@city()",
            "price|5-100.0-2":20.5,
            "sales|1-100":5,
            "type":function(){
                let arr = [];
                switch(type){
                    case 'all':arr = ['天猫','','店铺','经验'];break;
                    case 'tianmao':arr = ['天猫'];break;
                    case 'shop':arr = ['店铺'];break;
                    case 'taobaojingyan':arr = ['经验'];break;
                    default:break;
                }
                return Mock.mock({
                    "type|1":arr
                }).type;
            },
            "shop_name":"@ctitle()"+'店',
            "product_img|1":[
                Random.image('200x200','#a9c7ff','jpg','product'),
                Random.image('200x200','#fecda8','jpg','product')
            ]
        }]
    });
    productList.push(...list.search_list);
    return list;
});

/* 获取搜索发现 */
Mock.mock(RegExp("/getSearchFind"),'get',function(){
    return Mock.mock({
        "list|12":["@ctitle(2,5)"]
    }).list;
});

/* 获取搜索历史记录 */
Mock.mock(RegExp("/getSearchRecord"),'get',function(){
    return searchRecord;
});

/* 搜索历史记录保存 */
Mock.mock(RegExp("/saveSearchRecord"),'get',function(options){
    let record = getUrlParams(options.url).record;
    searchRecord.push(record);
    return '保存成功';
});

/* 搜索-热门搜索 */
Mock.mock(RegExp('/searchHot'),'get',function(options){
    let hot_key = (getUrlParams(options.url)).hot_key;
    let result = [];
    let pattern = new RegExp(hot_key,'gi');
    for(let i=0;i<27;i++){
        let num = parseInt(Math.random()*10);
        let temp = "";
        if(num%3>0){
            temp = Mock.mock('@ctitle(3,9)');
        }else{
            temp = Mock.mock('@title(1,3)');
        }
        
        /* 避免没有生成符合要求的热词 */
        if(i==3){
            temp = temp + hot_key;
        }

        if(pattern.test(temp)){
            result.push(temp);
        }
    }
    return result;
})

/* 将默认地址为true的项改为false */
function setDefaultAddress(id){
    let arr = addressMsg.address_list;
    for(let i=0;i<addressMsg.address_list.length;i++){
        if(arr[i].id!==id&&arr[i].isDefault){
            arr[i].isDefault = false;
        }
    }
}

/* 添加地址 */
Mock.mock(RegExp('/addAddress'),'get',function(options){
    let params = getUrlParams(options.url);
    let id = Mock.mock({
        "id":"@id()"
    }).id;
    params['id'] = id;
    addressMsg.address_list.push(params);
    if(params.isDefault){
        setDefaultAddress(id);
    }
    return '添加成功';
});

/* 删除地址 */
Mock.mock(RegExp("/deleteAddress"),'get',function(options){
    let id = getUrlParams(options.url).id;
    let arr = addressMsg.address_list;
    for(let i=0;i<arr.length;i++){
        if(arr[i].id==id){
            arr.splice(i,1);
            return '删除成功';
        }
    }
    return '删除失败';
})

/* 修改地址 */
Mock.mock(RegExp('/editAddress'),'get',function(options){
    let status = '地址不存在';
    let params = getUrlParams(options.url);
    let id = params.id;
    let arr = addressMsg.address_list;
    for(let i=0;i<arr.length;i++){
        if(arr[i].id==id){
            arr[i] = params;
            if(params.isDefault){
                setDefaultAddress(id);
            }
            status = '修改成功';
        }
    }
    return status;
})

/* 获取将要修改的地址信息 */
Mock.mock(RegExp('/getAddress'),'get',function(options){
    let id = getUrlParams(options.url).id;
    return addressMsg.address_list.filter(function(item){
        return item.id==id;
    });
})

/* 收货地址 返货收货地址 默认地址在数组第一项 */
Mock.mock(RegExp('/address'),'get',function(){
    let arr = addressMsg.address_list;
    let index = 0;
    for(let i = 0;i<arr.length;i++){
        if(arr[i].isDefault){
            index = i;
            break;
        }   
    }
    let temp = arr[index];
    arr.splice(index,1);
    arr.unshift(temp);
     return addressMsg;
});

/* 设置页用户信息 */
Mock.mock(RegExp('/seting'),'get',function(){
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
Mock.mock(RegExp("/my"),'get',function(){
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