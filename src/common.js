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

export default{
    getUrlParams
}