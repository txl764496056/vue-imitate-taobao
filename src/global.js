
let userKey = "";

let collect = []; //收藏商品的id
let attention = 0; //关注店铺
let track = 0; //足迹
let coupon = 4;//优惠卷
let nickname = '';
let searchRecord = []; //搜索记录
//所有产品列表,只有当刷新或者关闭网页时，生成过的产品数据才会被清楚，比如：点击2次搜索，这2次生成的产品都会保存在这里
let productList = { 
    "search_list":[]
}; 

/**
 * 1、产品类型名称，1、便于在所有产品列表中进行增删改查2、便于修改列表键值而不需要代码里一个个修改
 * 2、键：值，键》前端页面访问接口时需要带上，标记增删改查的是哪类数据
 *           值》后端接口拿到了 键 ，就根据键访问到对应的值，然后再从productList里拿到数据
 */
let listType = { 
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