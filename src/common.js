/* 获取地址链接？后所有参数 */
const getUrlParams = function(url){
    let result={};
    let str = url.slice(url.indexOf("?")+1,url.length)
    let arr = str.split("&");
    for(let i=0;i<arr.length;i++){
        let temp = arr[i].split("=");
        if(temp.length==2){
            result[temp[0]] = temp[1];
        }
    }
    return result;
};

let collect = 0; //收藏
let attention = 0; //关注店铺
let track = 0; //足迹
let coupon = 4;//优惠卷
let nickname = '';

export default{
    getUrlParams,
    collect,
    track,
    attention,
    coupon,
    nickname
}