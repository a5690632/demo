const http = require("http");
const urlLib = require("url");
const queryString = require("querystring");

const arr = [{
        user: 1,
        password: 1
    },
    {
        user: 2,
        password: 1
    }
];

http.createServer((req, res) => {
    let url = urlLib.parse(req.url, true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,Origin,Content-Type,Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "PUT,POST,GET,DELETE,OPTIONS"
    );

    if (req.method == "POST") {
        if (url.pathname == "/login") {
            let str = "";
            let data = {};
            req.on("data", data => {
                str += data;
            });
            req.on("end", () => {
                // let obj = JSON.parse(str);
                // let find = arr.find(e => e.user == obj.user);

                // if (find) {
                //     if (find.password == obj.password) {
                //         data.message = "登录成功";
                //         data.code = "0000";
                //     } else {
                //         data.message = "密码不对";
                //         data.code = "0001";
                //     }
                // } else {
                //     data.message = "用户不存在";
                //     data.code = "0001";
                // }
                res.write("123");
                res.end("结束");
            });
        }
        // if (url.pathname == "/registered") {
        //     let str = "";
        //     let data = {};
        //     req.on("data", data => {
        //         str += data;
        //     });
        //     req.on("end", () => {
        //         let obj = JSON.parse(str);
        //         let find = arr.find(e => e.user == obj.user);
        //         if (find) {
        //             data.message = "用户名已存在";
        //             data.code = "0001";
        //         } else {
        //             let shuju = {
        //                 user: obj.user,
        //                 password: obj.password
        //             };
        //             arr.push(shuju);
        //             data.message = "注册成功";
        //             data.code = "0000";
        //         }
        //         res.write("123");
        //     });
        // }
    }

}).listen(99);