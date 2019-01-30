const express = require("express")
const app = express()

//获取cookie的中间件
var cookie = require('cookie-parser');
app.use(cookie())

//静态资源
app.use(express.static("www"))
//获取post请求的数据 res.body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
//session
let session = require("cookie-session")
app.use(session({
    keys: ["123", "asda"]
}))


app.all('*', function (req, res, next) {
    //跨域处理
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers",
        "X-Requested-With,Origin,Content-Type,Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next();
    }
});
app.use("/", (req, res) => {
    // req.secure="密钥"
    // 只能用cookie获取

    // 用cookie-parser 设置的签名cookie
    //用  req.signedCookies 获取
    // res.cookie('user', 1, {
    //     signed: true
    // })
    //加密
    // res.clearCookie() 删除cookie
    
    // 获取
    if (req.session["user"]) {
        req.session["user"]++
    } else {
        req.session["user"] = 1 //设置
    }
    delete req.session["user"] //删除

    res.sendStatus(200)
})
app.listen(99)