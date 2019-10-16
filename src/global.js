
let userKey = "";

let collect = []; //收藏商品的id
let attention = 0; //关注店铺
let track = 0; //足迹
let coupon = 4;//优惠卷
let nickname = '';
let searchRecord = []; //搜索记录
//所有产品,只有当刷新或者关闭网页时，生成过的产品数据才会被清楚，比如：点击2次搜索，这2次生成的产品都会保存在这里
let productList = { 
    "search_list":[]
}; 
let listType = { //详情产品类型，便于在所有产品中查询
    search:"search_list"
}
let cart = []; //购物车

export default{
    userKey,
    collect,
    track,
    attention,
    coupon,
    nickname,
    searchRecord,
    productList,
    listType,
    cart
}