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
    productList,
    listType,
    cart
} = global;
let {
    getUrlParams,
    addCollect,
    createProduct,
    shops
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

/* 购物车-产品数量增加 */
Mock.mock(RegExp('/updateProductNum'),'get',function(options){
    let params = getUrlParams(options.url);
    let sku_code = params.sku_code;
    let num = parseInt(params.num);
    let status = 'fail';
    for(let i=0;i<cart.length;i++){
        if(cart[i].sku_code===sku_code){
            cart[i].cart_num = num;
            status = 'success';
        }
    }
    return status;
});

/* 购物车-更新已选产品属性 */
Mock.mock(RegExp('/updateCartProduct'),'get',function(options){
    let params = getUrlParams(options.url);
    let sku_code = params.sku_code;
    let update_code = params.update_code;
    let status = "fail";
    let arr = cart.filter(function(item){
        return item.sku_code===update_code;
    });
    
    for(let i=0;i<cart.length;i++){
        if( cart[i].sku_code===sku_code ){
            // 删除
            if(arr.length!=0){
                cart.splice(i,1);
            // 更新
            }else{
                cart[i].sku_code = update_code;
            }
            status = 'success';
            break;
        }
    }
    
    return status;
})

/* 购物车列表 */
Mock.mock(RegExp('/cartList'),'get',function(){
    let result = [];
    let group_arr = [];

    // 从productList中筛选出已经加入购物车的产品
    for(let i=0;i<cart.length;i++){
        let temp = {};
        let sku_code = cart[i].sku_code;
        Object.assign(temp,cart[i]);
        for(let key in productList){
            // 循环每个类型的所有产品
            for(let j=0;j<productList[key].length;j++){
                let item = productList[key][j];

                let sku_items = item.sku_list.sku_items;
                // 筛选出sku_code与购物车sku_code相等的
                let sku_product = sku_items.filter(function(sku_item){
                    return sku_item.sku_code === sku_code;
                })[0];

                // spu的title,shop_id,sku_list,
                // sku下准确的price,attr,img
                if( sku_product ){
                    temp.product_type = key; //****购物车产品需要带上产品在productList里的类型名，进入详情页需要 */
                    temp.title = item.spu_name;
                    temp.spu_price = item.spu_price;
                    temp.shop_id = item.shop_id;
                    temp.sku_list = item.sku_list;
                    temp.spu_store = item.spu_store;

                    temp.attr = sku_product.attr;
                    temp.img = sku_product.img;
                    temp.price = sku_product.price;
                    
                    group_arr.push(temp);
                    break;
                }
            }
            
        }
    }

    // 将产品信息根据店铺分组
    group_arr =  _.groupBy(group_arr,'shop_id');

    // 加上店铺信息
    for(let key in group_arr){
        for(let i=0;i<shops.length;i++){
            if( shops[i].id==key ){
                result.push({
                    "shop_id":shops[i].id,
                    "shop_name":shops[i].name,
                    "shop_logo":shops[i].logo,
                    "product":group_arr[key]
                })
                break;
            }
        }
    }

    return result;
});

function addCartfilter(sku_code){
    for(let key in productList){
        let product = productList[key];
        for(let i=0;i<product.length;i++){
            let item = product[i];
            // 查询每一个item下的所有sku_code是否有与传过来的sku_code匹配的
            let arr = item.sku_list.sku_items.filter(function(sku_item){
                return sku_item.sku_code === sku_code;
            });
            if(arr.length>0){
                // spu_code = item.spu_code;
                return item.spu_code;
                // break;
            }
        }
    }
}

/* 加入购物车 */
Mock.mock(RegExp('/addCart'),'get',function(options){
    let params = getUrlParams(options.url);
    let {sku_code,num} = params;

    // 查找产品是否已经在购物车中
    let cart_arr = cart.filter(function(cart_item){
        return cart_item.sku_code===sku_code;
    });

    if(cart_arr.length>0){
        cart_arr[0].cart_num += parseInt(num);
    }else{
        let spu_code = addCartfilter(sku_code);

        cart.push({
            sku_code,
            spu_code,
            cart_num:parseInt(num)
        });
    }

    return "添加成功";
});

/* 收藏商品 */
Mock.mock(RegExp('/collectGoods'),'get',function(options){
    let params = getUrlParams(options.url);
    let {spu_code,goodsType,isCollect} = params;
    let status = "收藏失败";
    for(let item of productList[listType[goodsType]]){
        if(item.spu_code==spu_code){
            item.collect = !isCollect;
            status = "修改成功";
            collect = addCollect(spu_code,collect);
        }
    }
    return status;
})

/* 商品详情页信息 */
Mock.mock(RegExp("/getGoodMsg"),'get',function(options){
    if( !Object.keys(productList).length ) return "暂无商品信息";
    let params = getUrlParams(options.url);
    let {spu_code,goodsType} = params;
    return productList[listType[goodsType]].filter(function(item){
        return item.spu_code===spu_code;
    })[0];
})

/* 搜索-返回搜索结果 */
Mock.mock(RegExp('/getSearchResult'),'get',function(options){
    let result = {};
    let type = getUrlParams(options.url).type; //搜索结果，产品的小标签类型，不是产品类型
    let product = getUrlParams(options.url).product;
    let list =  createProduct({product,type});
    productList[listType.search].push(...list);
    result[listType.search]=list
    return result;
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
    let arr = searchRecord.filter(function(item){
        return item==record;
    });
    if(arr.length==0){
        searchRecord.push(record);
    }
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
            collect:collect.length,
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