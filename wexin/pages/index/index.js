//index.js
//获取应用实例
const app = getApp();
let video = wx.createVideoContext("video")
Page({
  data: {

  },
  onShow() {


  },
  //事件处理函数
  haha() {

  },
  wait() {
    consoe.log(1)
    wx.showLoading({
      title: "加载中",
      mask: true,
    });
  }
});