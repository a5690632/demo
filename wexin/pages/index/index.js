//index.js
//获取应用实例
const app = getApp();

Page({
    data: {
        motto: "Hello World",
        userInfo: {},
        hasUserInfo: false,
        imgUrls: [


        ],
    },
    onShow() {
        let arr = []
        for (var i = 0; i < 20; i++) {
            arr.push(i)
        }
        this.setData({
            imgUrls: arr
        })

    },
    //事件处理函数
    haha() {
        console.log(2);
    }
});