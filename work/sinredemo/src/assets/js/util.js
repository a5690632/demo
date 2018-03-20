/**
 * 原生js操作cookie
 */
function addCookie(objName, objValue, objHours) {
    // 添加cookie
    var str = objName + "=" + escape(objValue);
    if (typeof objHours != "undefined") {// 为0时不设定过期时间，浏览器关闭时cookie自动消失，这种cookie被叫做会话cookie
        var date = new Date();
        var ms = objHours * 3600 * 1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toUTCString()+"; path=/";
    }
    document.cookie = str;
    //console.log("添加cookie成功");
}

function getCookie(objName) {
    // 获取指定名称的cookie的值
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName)
            return unescape(temp[1]);
    }
}

function delCookie(name) {
    // 为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    document.cookie = name + "=" + cval + "; expires="+ exp.toUTCString()+"; path=/";
}

// 获取查询字符串的值
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2];
    return null;
}

// 检测登录、获取用户信息
// 参数:
//   callback 登录后执行的回调函数
//   activity_id活动id 默认为1
function checkLogin(callback, activity_id = 1) {
    if(/192.168/.test(location.href)){
        //开发环境不检测，直接执行回调
        typeof callback == "function" && callback();
    }else{
        //生产环境
        $.get("http://maotai.bm.sinreweb.com/activity2/api/check_login", {format: 'json', activity_id}, function (data) {
            if(data.err == 101){
                // 如果返回101 跳转去登录
                location.href = `http://maotai.bm.sinreweb.com/member/auth.auth/oauth?activity_id=${activity_id}&u=${location.href}`;
            }else if(data.err == 0){
                
                typeof callback == "function" && callback();
            }else {
                console.log("获取用户信息失败");
            }
        });
    }
}


Date.prototype.format = function (fmt, opt) {
    opt = $.extend({
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    }, opt || {});
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in opt)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (opt[k]) : (("00" + opt[k]).substr(("" + opt[k]).length)));
    return fmt;
}

export default {
    addCookie,
    getCookie,
    delCookie,
    getQueryString,
    checkLogin
};