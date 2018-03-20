<template>
    <div id="wind_control" v-cloak class="wrapper-content animated fadeInRight">
      <div class="row">
          <div class="col-md-12">
              <div class="ibox">
                  <div class="ibox-content">
                      <el-form :model="form" :rules="rules" ref="form" label-position="top" class="demo-ruleForm" >
                          <el-tabs>
                              <el-tab-pane label="新锐一物一码系统" style="margin-bottom:16px;padding-left:16px" >
                                  <el-form-item label="开启" label-width="180px">
                                      <el-switch v-model="sinre" on-text="" off-text="" @change="toggle"></el-switch>
                                  </el-form-item>
                                  <div v-if="sinre"  >
                                      <el-form-item label="物码长度:" prop="digit">
                                          <el-input v-model="form.digit " class="shuru"></el-input>
                                          <i class="el-icon-information"></i>
                                          <span> 物码长度建议在16 - 20范围内取值</span>
                                      </el-form-item>
                                      <el-form-item label="密钥:" prop="secret">
                                          <el-input v-model="form.secret" class="shuru"></el-input>
                                      </el-form-item>
                                      <el-form-item label="核销URL:" prop="checkurl">
                                          <el-input v-model="form.checkurl" class="shuru"></el-input>
                                      </el-form-item>
                                      <el-form-item class="btn_margin">
                                          <el-button type="primary" @click="onSubmit('form')">保存</el-button>
                                      </el-form-item>
                                  </div>
                              </el-tab-pane>
                              <el-tab-pane label="第三方一物一码平台" name="second"  style="margin-bottom:16px;padding-left:16px">
                                  <el-form-item label="开启" label-width="160px">
                                      <el-switch v-model="third" on-text="" off-text="" @change="toggle"></el-switch>
                                  </el-form-item>
                                  <div v-if="third" >
                                      <el-form-item label="核销接口地址:">
                                          <el-input v-model="form.apiurl" class="shuru"></el-input>
                                      </el-form-item>
                                      <el-form-item class="btn_margin">
                                          <el-button type="primary" @click="onSubmit('form')">保存</el-button>
                                      </el-form-item>
                                  </div>
                              </el-tab-pane>
                              <el-tab-pane label="高级设置" name="third"  style="margin-bottom:16px;padding-left:16px">
                                  <el-form-item label="核销限制：" label-width="200px">
                                      <el-switch v-model="enablesecurity" on-text="" off-text="" @change="toggle"></el-switch>
                                  </el-form-item>
                                  <div v-if="enablesecurity" >
                                      <el-form-item label="每个码允许查询次数:">
                                          <el-input v-model="form.checknum" class="shuru"></el-input>
                                      </el-form-item>
                                      <el-form-item label="用户每日允许核销个数:">
                                          <el-input v-model="form.uiddatenum" class="shuru"></el-input>
                                      </el-form-item>
                                      <el-form-item label="用户每月允许核销个数">
                                          <el-input v-model="form.uidmonthnum" class="shuru"></el-input>
                                      </el-form-item>
                                      <el-form-item label="禁止核销时间段：" prop="checkbanperiods">
                                          <el-input type="textarea" v-model="form.checkbanperiods"  :autosize="{ minRows: 6}" class="shuru"></el-input>
                                          <div class="text" style="padding: 0px;">
                                              <i class="el-icon-information"></i>
                                              <span>每天该时间段内用户不能核销积分码，请使用 24 小时时段格式，每个时间段一行，如需要也可跨越零点，留空为不限制。例如:
                                              </span>
                                              <p>每日晚 11:25 到次日早 5:05 可设置为: 23:25-5:05
                                              </p>
                                              <p>每日早 9:00 到当日下午 2:30 可设置为: 9:00-14:30
                                              </p>
                                              <p>注意: 格式不正确将可能导致意想不到的问题。</p>
                                          </div>
                                      </el-form-item>
                                      <el-form-item label="禁止核销IP列表：" prop="ipban">
                                          <el-input type="textarea" v-model="form.ipban"  :autosize="{ minRows: 4}" class="shuru"></el-input>
                                          <div class="text" style="padding: 0px;">
                                              <i class="el-icon-information"></i>
                                              <span>每个 IP 一行，既可输入完整地址，也可只输入 IP 开头，例如：</span>
                                              <p>"192.168."(不含引号) 可匹配 192.168.0.0～192.168.255.255 范围内的所有地址，留空为不设置
                                              </p>
                                              <p>注意: 格式不正确将可能导致意想不到的问题。
                                              </p>
                                          </div>
                                      </el-form-item>
                                      <el-form-item label="同一IP在24小时允许错误次数：" prop="iperrnum">
                                          <el-input v-model="form.iperrnum" class="shuru"></el-input>
                                          <i class="el-icon-information"></i>
                                          <span> 同一IP在24小时内验证积分码错误次数限制，建议在 10 - 100 范围内取值，0 为不限制</span>
                                      </el-form-item>
                                      <el-form-item label="同一IP最大错误次数冻结时间：" prop="iperrctrltime">
                                          <el-input v-model="form.iperrctrltime" class="shuru"></el-input>
                                          <i class="el-icon-information"></i>
                                          <span>同一IP达到最大错误次数将被冻结的时间(小时)，建议在 1 - 72 范围内取值，0 为不限制</span>
                                      </el-form-item>
                                      <el-form-item label="同一IP在24小时允许核销次数：" prop="ipmaxnum">
                                          <el-input v-model="form.ipmaxnum" class="shuru"></el-input>
                                          <i class="el-icon-information"></i>
                                          <span>同一IP在24小时内允许成功核销积分码最大次数限制，建议在 5 - 20 范围内取值，0 为不限制</span>
                                      </el-form-item>
                                      <el-form-item label="同一IP最大核销次数冻结时间：" prop="ipmaxnumctrltime">
                                          <el-input v-model="form.ipmaxnumctrltime" class="shuru"></el-input>
                                          <i class="el-icon-information"></i>
                                          <span>同一IP达到最大核销次数将被冻结的时间(小时)，建议在 1 - 72 范围内取值，0 为不限制</span>
                                      </el-form-item>
                                      <el-form-item class="btn_margin">
                                          <el-button type="primary" @click="onSubmit()">保存</el-button>
                                      </el-form-item>
                                  </div>
                              </el-tab-pane>
                          </el-tabs>
                      </el-form>
                  </div>
              </div>
          </div>
      </div>
    </div>
</template>
<script>
export default {
  name: "wind_control",
  data() {
    return {
      sinre: true,
      third: true,
      enablesecurity: true,
      form: {
        sinre: 0, //是否开启新锐一物一码
        digit: "", //物码长度
        secret: "", //密钥
        checkurl: "", //核销URL

        third: 0, //是否开启第三方一物一码
        apiurl: "", //apiURL

        enablesecurity: 0, //是否开启核销限制
        checknum: 5, //每个码查询的次数
        uiddatenum: "", //用户每日允许核销个数
        uidmonthnum: "", //用户每月允许核销个数
        checkbanperiods: "", //禁止核销时间段：
        ipban: "", //禁止核销IP列表：
        iperrnum: "", //同一IP在24小时允许错误次数：
        iperrctrltime: "", //同一IP最大错误次数冻结时间：
        ipmaxnum: "", //同一IP在24小时允许核销次数：
        ipmaxnumctrltime: "" //同一IP最大核销次数冻结时间：
      },
      rules: {
        digit: [
          {
            required: true,
            integer: true,
            message: "请输入物码长度",
            trigger: "blur"
          }
        ],
        secret: [
          {
            required: true,
            message: "请输入密匙",
            trigger: "blur"
          }
        ],
        checkurl: [
          {
            required: true,
            url: true,
            message: "请输入核销URL",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created: function() {
    // var self = this;
    // $ajax.get(INTERFACE.yiwuyima.setting + "?skey=code").then(function(res) {
    //   self.form = res.data.data.settings;
    //   self.sinre = self.form.sinre == 1 ? true : false;
    //   self.third = self.form.third == 1 ? true : false;
    //   self.enablesecurity = self.form.enablesecurity == 1 ? true : false;
    //   self.$mount("#app");
    // });
  },
  methods: {
    onSubmit: function(type) {
    //   var self = this;
    //   this.$refs["form"].validate(function(valid) {
    //     if (valid) {
    //       //保存
    //       self.form.sinre = self.sinre ? 1 : 0;
    //       self.form.third = self.third ? 1 : 0;
    //       self.form.enablesecurity = self.enablesecurity ? 1 : 0;
    //       $ajax
    //         .post(INTERFACE.yiwuyima.setting, {
    //           skey: "code",
    //           setting: self.form
    //         })
    //         .then(function(res) {
    //           if (res.data.err == 0) {
    //             if (type != "close") alert("保存成功");
    //           } else {
    //             alert(res.data.msg);
    //           }
    //         });
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    },
    toggle: function() {
      /* 开启关闭 */
      var self = this;
      self.onSubmit("close");
    }
  }
};
</script>

  <style scoped>
#wind_control{
  padding: 16px;
}
.el-card .header h3 {
  line-height: 36px;
}

.el-tabs__header {
  border-bottom: 0;
}

.el-tabs__nav-wrap {
  margin-left: 100px;
}

.el-input,
.el-input__inner,
.el-textarea,
.el-textarea__inner {
  width: 500px;
}


.text {
  display: inline-block;
  vertical-align: top;
}

.text p {
  margin-bottom: 0;
  margin-left: 18px;
}
</style>
