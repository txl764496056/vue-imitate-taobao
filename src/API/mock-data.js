let Mock = require('mockjs');

let jsonData = require("./json-data.js");

let Random = Mock.Random;

/* 登录 */
Mock.mock('/login',{
    "arr|4":[{
        "name":"@cname()"
    }]
})

/* 世界各国电话区号 */
Mock.mock('/counryCallingcode',{
    "countryCallingCodes":jsonData.countryCallingCodes
})