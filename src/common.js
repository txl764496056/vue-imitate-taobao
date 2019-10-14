const Mock = require("mockjs");
const Random = Mock.Random;

const randomImage = function({size='60x60',type='jpg',text=''}={}){
    // console.log(arguments)
    // let {size='60x60',type='jpg',text=''} = arguments[0];
    let color = Mock.mock({"color":"@color()"}).color;
    return Random.image(size,color,type,text);
}

/* 店铺id */
const shops = Mock.mock({
    "list|5-20":[{
        "id":"@id()",
        "name":"@ctitle()"+'店'
    }]
});

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
    let shop_id_index = -1;
    let num = 0;
    let color_code = [];
    let spu_code = 's1';
    let loop = 0;
    return Mock.mock({
        "search_list|8":[{
            //参数初始化函数，不会返回这个字段（不带return）
            "baseFn":function(){
                color_code = [];
            },  
            "spu_code":function(){
                spu_code = Mock.mock({"code":"@increment()"}).code;
                spu_code = spu_code+1;
                spu_code = 's' + spu_code;
                return spu_code;
            },
            "spu_name":"@ctitle(8,15)"+(product||''),
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
            "spu_price|5-100.0-2":20.5,
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
            "shop_id":function(){
                //目的：生成同一个店铺有多个商品3-5，3个产品是同一个店铺的
                if( !(num>2&&num<6)){
                    shop_id_index = parseInt(Math.random()*(shops.list.length-1));
                }
                return shops.list[shop_id_index].id;
            },  
            "shop_name":function(){
                if(shop_id_index>=0){
                    return shops.list[shop_id_index].name;
                }else{
                    return '';
                }
            },
            "shop_logo":randomImage.bind(this,{size:'60x60',text:"shop"}),
            "product_img|1":randomImage.bind(this,{size:'300x300',text:"product"}),
            "details_img":function(){
                return [
                    Random.image('300x100','#a9c7ff','jpg','details'),
                    Random.image('300x140','#fecda8','jpg','details')
                ];
            },
            "collect":false,
            "store|200-500":20,
            "sku_list":{
                "attr":{
                    "color":{
                        "title":"颜色分类",
                        "list|4-6":[{
                            "code":function(){
                                let code = Mock.mock({"code":"k"+"@increment()"}).code;
                                color_code.push(code);
                                return code;
                            },
                            "value":"@ctitle(1,4)"+'色',
                            "img":randomImage.bind(this,{size:'60x60',text:"product"})
                        }]
                    },
                    "size":{
                        "title":"尺码",
                        "list":[{
                            "value":"S",
                            "code":"ss",
                        },{
                            "value":'M',
                            "code":"sm",
                        },{
                            "value":"L",
                            "code":"sl",
                        }]
                    }
                },
                "sku_items":function(){
                    let result = [];
                    let size_list = this.attr.size.list;
                    for(let i=0;i<color_code.length;i++){
                        for(let j=0;j<size_list.length;j++){
                            let temp = {};
                            temp = Mock.mock({
                                "temp":{
                                    "price|20-80.0-2":20,
                                    "store|0-100":50,
                                    "code":spu_code+color_code[i]+size_list[j].code,
                                }
                            }).temp;
                            result.push(temp);
                        }
                    }
                    return result;
                }
            }
        }]
    });
}

export default{
    getUrlParams,
    addCollect,
    createProduct
}