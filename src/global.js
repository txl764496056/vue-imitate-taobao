
let userKey = "";

let collect = []; //收藏商品的id
let attention = 0; //关注店铺
let track = 0; //足迹
let coupon = 4;//优惠卷
let nickname = '';
let searchRecord = []; //搜索记录
let productList = {}; //所有产品
let detailsType = { //产品详情页类型，
    search:"search_list"
}

export default{
    userKey,
    collect,
    track,
    attention,
    coupon,
    nickname,
    searchRecord,
    productList,
    detailsType
}