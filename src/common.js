let Mock = require("mockjs");
let Random = Mock.Random;

/* 获取地址链接？后所有参数 */
const getUrlParams = function(url){
    let result={};
    let str = url.slice(url.indexOf("?")+1,url.length)
    let arr = str.split("&");
    for(let i=0;i<arr.length;i++){
        let temp = arr[i].split("=");
        if(temp.length==2){
            let value = decodeURIComponent(temp[1]).replace(/\+/g," ");
            if(value=='true'||value=='false'){
                value = (value==='true');
            }
            result[temp[0]] = value;
        }
    }
    return result;
};

/* 收藏商品id保存 */
const addCollect = function(id,arr){
    let temp = arr.filter(function(value){
        return value==id;
    });
    if(temp.length==0){
        arr.push(id);
    }
    return arr;
}

const createProduct = function({product='',type=''}={product,type}){
    return Mock.mock({
        "search_list|4":[{
            "id":"@id()",
            "title":"@ctitle(8,15)"+(product||''),
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
            "original_price|100-200.0-2":200,
            "sales|1-1000":5,
            "express_fee|1-25.2":10,
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
            "cart_num":0,
            "shop_name":"@ctitle()"+'店',
            "shop_logo":Random.image('60x60','#fecda8','jpg','shop'),
            "product_img|1":[
                Random.image('300x300','#a9c7ff','jpg','product'),
                Random.image('300x300','#fecda8','jpg','product')
            ],
            "details_img":function(){
                return [
                    Random.image('300x100','#a9c7ff','jpg','details'),
                    Random.image('300x140','#fecda8','jpg','details')
                ];
            },
            "collect":false,
            "repertory|0-50":9
        }]
    });
}


export default{
    getUrlParams,
    addCollect,
    createProduct
}