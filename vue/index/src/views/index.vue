<template>
  <div id="box">
    <div class="left fl">
      <div class="clearfix">
        <img src="../assets/images/ic_launcher.png" class="img1-1 fl">
        <div class="title fl">伴婚礼</div>
      </div>
      <div class="text">
        <h3>伴婚礼</h3>
        <h3>一个懂你的婚礼管家</h3>
      </div>
      <div class="code">
        <dl>
          <dt>客户端下载</dt>
          <dd>
            <img src="../assets/images/erweima.png" class="img1-2">
          </dd>
        </dl>
        <dl>
          <dt>客户端下载</dt>
          <dd>
            <img src="../assets/images/erweima.png" class="img1-3">
          </dd>
        </dl>
      </div>
    </div>
    <div class="right fr">
      <img src="../assets/images/home_pic_decorate.png" class="img1-4">
      <img src="../assets/images/home_pic_phone.png" class="img1-5">
    </div>
    <div class="footer">
      <span class="contact_us">联系我们</span>
      <span>公安备案号199856265662</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "index"
};
</script>
<style scoped lang="less">
#box {
  width: 1200px;
  height: 900px;
  margin: 0 auto;
  position: relative;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
.left {
  position: relative;
  padding-left: 72px;
  padding-top: 32px;
  .title {
    margin-left: 8px;
    font-size: 18px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    height: 36px;
    line-height: 36px;
  }
  .text {
    margin-top: 224px;
    h3 {
      height: 40px;
      font-size: 40px;
      font-family: PingFangSC-Medium;
      color: rgba(34, 34, 34, 1);
      line-height: 40px;
      margin-bottom: 22px;
    }
  }

  .code {
    margin-top: 40px;
    display: flex;
    justify-content: space-around;
    dl {
      width: 172px;
      height: 192px;
      border: 1px solid rgba(204, 204, 204, 1);
      border-radius: 8px;
      dt {
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 21px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
      dd {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}

.right {
  position: relative;
  .img1-4 {
    position: absolute;
    right: 0;
  }
  .img1-5 {
    position: absolute;
    top: 185px;
    right: 0;
  }
}
.footer {
  height: 14px;
  width: 230px;
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-around;
  span {
    display: block;
    font-size: 12px;
    line-height: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(178, 178, 178, 1);
    text-align: center;
  }
  .contact_us {
    border-right: 1px solid rgba(178, 178, 178, 1);
    padding-right: 12px;
  }
}
img {
  display: block;
}
</style>
