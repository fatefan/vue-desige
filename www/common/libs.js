/**
 * 将数组中制定字段 序列化
 * @arr 数组
 * @name 字段名称
 * return 
 *  字符串
 */
export const arrStringify = function  (arr,name) {
    let str = '';
    for(let i = 0, l = arr.length; i < l; i++) {
        str = str+arr[i][name]+',';
    };
    str = str.slice(0,-1);
    return str;
}

var isLogin = sessionStorage.isLogin;

if(!isLogin) {
    location.href = './index.html';
}