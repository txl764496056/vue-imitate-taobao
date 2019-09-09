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


export default{
    getUrlParams
}