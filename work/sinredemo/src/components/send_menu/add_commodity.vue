<template>
   <div id="add_commodity" class="wrapper-content animated fadeInRight" v-cloak>
        <el-breadcrumb separator="/" style="font-size: 18px;margin-bottom:25px">
            <a class="el-icon-arrow-left prev" href="/pointmall/admin.flashgoods/lists.html" style="float: left ;margin-right: 10px"></a>
            <el-breadcrumb-item>
                <a href="/pointmall/admin.flashgoods/lists.html">抢购商品</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item v-if="id">编辑限时低价商品</el-breadcrumb-item>
            <el-breadcrumb-item v-else>新增限时低价商品</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :model="form" :rules="rules" ref="form"  class="demo-ruleForm" style="margin-top: 16px;margin-left:30px" :label-position="labelPosition">
            <el-form-item label="商品名称：" prop="name">
                <el-input v-model="form.name" class="shuru" placeholder="请输入内容"></el-input>
            </el-form-item>
            
            <el-form-item label="英文名称/别名：">
                <el-input v-model="form.en_name" class="shuru" placeholder="请输入内容"></el-input>
            </el-form-item>
              
            <el-form-item label="商品类别：" prop="catname">
                <el-autocomplete v-model="form.catname" :fetch-suggestions="querySearch" placeholder="请输入内容" class="shuru"></el-autocomplete>
            </el-form-item>
              
            <el-form-item label="商品标签：" prop="tagtype">
                <el-select v-model="form.tagtype" placeholder="请选择标签" filterable class="shuru">
                    <el-option v-for="item in  tag_options" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
              
            <el-form-item label="商品选择：" prop="goods_type" :rules="rules.goods_type">
                    <el-select v-model="form.goods_type" placeholder="请选择商品类型" filterable class="shuru">
                            <el-option v-for="item in good_type" :label="item.label" :value="item.value"></el-option>
                    </el-select>
            </el-form-item>
            
            <el-form-item label-width="20px" >
                    <el-select v-model="form.goods_id" placeholder="请选择商品" prop="goods_id" filterable class="shuru">
                            <el-option v-for="items in good_id" :label="items.label" :value="items.value"></el-option>
                    </el-select>
            </el-form-item>
              
            <el-form-item label="商品价值：" prop="goods_price">
                <el-input v-model="form.goods_price" class="shuru" placeholder="请输入内容"></el-input>
            </el-form-item>
              
            <el-form-item label="商品上架数量：" prop="online_stock" :rules="rules.online_stock">
                    <el-input v-model="form.online_stock" class="shuru" placeholder="请输入内容"></el-input>
            </el-form-item>
              
            <el-form-item label="商品当前库存："  prop="stock">
                    <el-input v-model.number="form.stock" placeholder="请输入内容" class="shuru"></el-input>
            </el-form-item>
              
            <el-form-item label="收货地址字段：">
                <el-checkbox-group v-model="form.address_fields">
                    <el-checkbox v-for="item in address_options" :label="item.field" name="type">{{item.alias}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
              
            <el-form-item label="消耗积分类型：" prop="point_field">
                <el-select v-model="form.point_field" placeholder="请选择积分类型" filterable class="shuru">
                    <el-option v-for="item in point_options" :label="item.name" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
              
            <el-form-item label="兑换商品所需积分：" prop="point">
                <el-input v-model="form.point" class="shuru" placeholder="请输入内容"></el-input>
            </el-form-item>
              
            <el-form-item label="商品预告起止时间：">
                <el-date-picker v-model="form.notice_time" type="datetimerange" :picker-options="pickerOptions" placeholder="选择时间范围" @change="fommat_notice"
                    range-separator="," class="shuru">
                </el-date-picker>
            </el-form-item>
              
            <el-form-item label="商品上架起止时间：" prop="online_time" :rules="rules.time">
                <el-date-picker v-model="form.online_time" type="datetimerange" :picker-options="pickerOptions" placeholder="选择时间范围" @change="fommat_online"
                    range-separator="," class="shuru">
                </el-date-picker>
            </el-form-item>
              
            <el-form-item label="商品兑换起止时间：" prop="exchange_time" :rules="rules.time">
                <el-date-picker v-model="form.exchange_time" type="datetimerange" :picker-options="pickerOptions" placeholder="选择时间范围" @change="fommat_exchange"
                    range-separator="," class="shuru">
                </el-date-picker>
            </el-form-item>
              
            <el-form-item label="商品预告图：">
                <el-upload class="upload-demo" :action="uploadConfig.action" name="upfile" :file-list="fileList" :data="uploadConfig.data"
                    list-type="picture" :on-success="handleAvatarSuccess1" :before-upload="upload1" :on-remove="handleRemove1">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,建议尺寸750*500</div>
                </el-upload>
            </el-form-item>
              
            <el-form-item label="商品图：">
                <el-upload class="upload-demo" :action="uploadConfig.action" name="upfile" :file-list="fileList1" :data="uploadConfig.data"
                    list-type="picture" :on-success="handleAvatarSuccess" :before-upload="upload" :on-remove="handleRemove">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,建议尺寸750*500</div>
                </el-upload>
            </el-form-item>
              
            <el-form-item label="商品简介：">
                <el-input type="textarea" v-model="form.description" style="width:500px"   :autosize="{ minRows: 3}"  placeholder="请输入内容"></el-input>
            </el-form-item>
              
            <el-form-item label="商品详情：">
                <el-input type="textarea" v-model="form.content" style="width:500px"    :autosize="{ minRows: 3}"  placeholder="请输入内容" ></el-input>
            </el-form-item>
              
            <el-form-item label="单用户最多兑换数量：" prop="max_exchanged_num">
                <el-input v-model="form.max_exchanged_num" class="shuru" placeholder="请输入内容"></el-input>
            </el-form-item>
              
            <el-form-item label="是否启用限制条件：">
                <el-radio-group v-model="form.islimit">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
            </el-form-item>
              
            <el-form-item label="限制规则：" v-if="form.islimit==1" >
                <el-form-item label="限制扫码次数：" style="padding-left:16px">
                    <el-input v-model="form.limit_setting.scancode_times" class="shuru" @change="clear_group"></el-input>
                </el-form-item>
                <el-form-item label="限制会员组：" style="padding-left:16px">
                    <el-select v-model="form.limit_setting.groups" placeholder="请选择限制组" @change="clear" filterable class="shuru">
                        <el-option v-for="item in groups_options" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form-item>
            <el-form-item label="购买链接：">
                <el-input v-model="form.url" class="shuru" placeholder="请输入内容"></el-input>
            </el-form-item>
        </el-form>
        <el-row>
            <el-col :span="24" style="margin-left: 220px">
                <el-button type="primary" @click="submitForm('form')">提交</el-button>
            </el-col>
        </el-row>
    </div>
</template>
  <script>
var y = "";
var INTERFACE = {
  buy: {
    address: y + "/pointmall/admin.flashgoods/public_ajax_get_address_fields", //获取地址
    add: y + "/pointmall/admin.flashgoods/add", //增加
    edit: y + "/pointmall/admin.flashgoods/edit", //编辑
    catname: y + "/pointmall/admin.flashgoods/public_ajax_get_catename", //获取分类名称
    type: y + "/prizes/admin.goods/public_get_goods_lists", //获取商品
    integral: y + "/platform/admin.point/public_get_point_type", //积分消耗
    shangchuan: y + "/attachment/attachment/webuploader.html", //上传文件接口
    group: y + "/member/admin.membergroups/public_ajax_get_groups" //限制会员组
  }
};

var i = 0;
var m = 0;
export default {
  name: "add_commodity",
  data() {
    var checktime = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入时间"));
      } else {
        if (value[0] === null || value[1] === null) {
          return callback(new Error("请输入时间"));
        } else {
          callback();
        }
      }
    }; //检查是否为空
    var checkvalue = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入内容"));
      } else {
        callback();
      }
    }; //检查是否为空
    return {
      labelPosition: 'top',
      form: {
        name: "", //商品名称
        en_name: "", //英文名
        catname: "", //分类名
        tagtype: "", //商品标签
        goods_type: "", //商品类型
        goods_id: "", //商品
        goods_price: "", //商品价格
        online_stock: "", //商品上架数量
        stock: "", //库存
        point_field: "", //消耗积分类型
        point: "", //消耗积分
        notice_time: "", //商品预告起止时间
        online_time: "", //商品上架起止时间
        exchange_time: "", //商品兑换起止时间
        notice_starttime: "", //商品预告起止时间
        notice_endtime: "", //商品预告起止时间
        online_starttime: "", //商品上架起止时间
        online_endtime: "", //商品上架起止时间
        exchange_starttime: "", //商品兑换起止时间存
        exchange_endtime: "", //商品兑换起止时间
        address_fields: [], //收货地址字段
        image: "", //商品图
        notice_image: "", //预告图
        description: "", //商品简介
        content: "", //商品详情
        max_exchanged_num: "", //单用户最多兑换数量
        islimit: 0, //是否启用限制条件 :
        limit_setting: {
          scancode_times: "", //限制扫码次数
          groups: "" //限制会员组
        },
        url: "" //购买链接
      },
      rules: {
        catname: [
          {
            required: true,
            message: "请选择类别",
            trigger: "change"
          }
        ],
        stock: [
          {
            required: true,
            message: "请输入库存",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: "blur"
          }
        ],
        goods_type: [
          {
            required: true,
            message: "请选择商品类型",
            validator: checkvalue
          }
        ],
        goods_id: [
          {
            required: true,
            message: "请选择商品",
            trigger: "change"
          }
        ],
        goods_price: [
          {
            required: true,
            message: "请输入商品价格",
            trigger: "blur"
          }
        ],
        online_stock: [
          {
            required: true,
            message: "请输入商品数量",
            validator: checkvalue
          }
        ],
        point_field: [
          {
            required: true,
            message: "请选择积分类型",
            trigger: "change"
          }
        ],
        max_exchanged_num: [
          {
            required: true,
            message: "请输入内容",
            validator: checkvalue
          }
        ],
        point: [
          {
            required: true,
            message: "请输入内容",
            validator: checkvalue
          }
        ],
        time: [
          {
            required: true,
            message: "请输入时间",
            trigger: "change",
            validator: checktime
          }
        ]
      },
      uploadConfig: {
        action: INTERFACE.buy.shangchuan, //文件上传接口
        data: {
          data_type: "image" //上传文件类型
        }
      },
      address:{"err":0,"data":{"truename":{"field":"truename","alias":"姓名","pattern":"","require":true},"phone":{"field":"phone","alias":"手机","pattern":"\/^1[34578][0-9]{9}$\/","require":true},"address":{"field":"address","alias":"地址","pattern":"","require":true},"idcard":{"field":"idcard","alias":"身份证","pattern":"","require":true},"province":{"field":"province","alias":"省份","pattern":"","require":true},"city":{"field":"city","alias":"城市","pattern":"","require":true},"county":{"field":"county","alias":"区域","pattern":"","require":false}}},
      fileList1: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}], //商品图
      fileList: [], //预告图
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      tag_options: [
        {
          label: "口碑推荐",
          value: 1
        },
        {
          label: "媒体推荐",
          value: 2
        },
        {
          label: "明星产品",
          value: 3
        }
      ], //标签
      point_options: [    {
          label: "口碑推荐",
          value: 1
        },
        {
          label: "媒体推荐",
          value: 2
        },
        {
          label: "明星产品",
          value: 3
        }], //积分类型
      catname_options: [], //分类
      address_options: [], //地址
      good_type: [
        {
          label: "口碑推荐",
          value: 1
        },
        {
          label: "媒体推荐",
          value: 2
        },
        {
          label: "明星产品",
          value: 3
        }
      ], //商品类型
      good_id: [
        {
          label: "口碑推荐",
          value: 1
        },
        {
          label: "媒体推荐",
          value: 2
        },
        {
          label: "明星产品",
          value: 3
        }
      ], //商品
      groups_options: [
         {
          label: "口碑推荐",
          value: 1
        },
        {
          label: "媒体推荐",
          value: 2
        },
        {
          label: "明星产品",
          value: 3
        }
      ] //会员组
    };
  },
  methods: {
    clear(val) {
      // if (val) {
      //   this.form.limit_setting.scancode_times = "";
      // }
    },
    clear_group(val) {
      // if (val) {
      //   this.form.limit_setting.groups = "";
      // }
    },
    submitForm(formName) {
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     var data = Object.assign({}, this.form);
      //     data.content = data.content.split("\n").join("<br/>");
      //     data.description = data.description.split("\n").join("<br/>");
      //     if (this.id) {
      //       $ajax
      //         .post(INTERFACE.buy.edit, {
      //           id: this.id,
      //           info: data
      //         })
      //         .then(res => {
      //           if (res.data.err == 0) {
      //             this.$message({
      //               message: res.data.msg,
      //               type: "success"
      //             });
      //             location.href =
      //               "/pointmall/admin.flashgoods/lists.html?" + this.page;
      //           } else {
      //             this.$message({
      //               message: res.data.msg,
      //               type: "error"
      //             });
      //           }
      //         });
      //     } else {
      //       $ajax
      //         .post(INTERFACE.buy.add, {
      //           info: data
      //         })
      //         .then(res => {
      //           if (res.data.err == 0) {
      //             this.$message({
      //               message: res.data.msg,
      //               type: "success"
      //             });
      //           } else {
      //             this.$message({
      //               message: res.data.msg,
      //               type: "error"
      //             });
      //           }
      //         });
      //     }
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    handleAvatarSuccess(res, file) {
      //上传成功
      // this.form.image = res.url;
    },
    upload(fileList) {
      //上传前
      // i++;
      // if (i > 1) {
      //   return false;
      // }
    },
    handleRemove() {
      //上传删除
      // i--;
    },
    handleAvatarSuccess1(res, file) {
      //上传成功
      // this.form.notice_image = res.url;
    },
    upload1(fileList) {
      //上传前
      // m++;
      // if (m > 1) {
      //   return false;
      // }
    },
    handleRemove1() {
      //上传删除
      // m--;
    },
    init() {
       this.address_options = this.address.data;
      //初始化
      // $ajax.get(INTERFACE.buy.group).then(res => {
      //   this.groups_options = res.data;
      // });
      // $ajax.get(INTERFACE.buy.integral).then(res => {
      //   this.point_options = res.data;
      // });
      // $ajax.get(INTERFACE.buy.type).then(res => {
      //   this.good_id = res.data.data[0].childPrizeList;
      //   this.good_type.push(res.data.data[0]);
      // });
      // $ajax.get(INTERFACE.buy.catname).then(res => {
      //   for (var i = 0; i < res.data.data.length; i++) {
      //     this.catname_options[i] = {
      //       value: res.data.data[i]
      //     };
      //   }
      // });
      // $ajax.get(INTERFACE.buy.address).then(res => {
      //  
      // });
    },
    fommat_notice(val) {
      //转换时间
      // this.form.notice_starttime = val.split(",")[0];
      // this.form.notice_endtime = val.split(",")[1];
    },
    fommat_online(val) {
      //转换时间
      // this.form.online_starttime = val.split(",")[0];
      // this.form.online_endtime = val.split(",")[1];
    },
    fommat_exchange(val) {
      //转换时间
      // this.form.exchange_starttime = val.split(",")[0];
      // this.form.exchange_endtime = val.split(",")[1];
    },
    querySearch(queryString, cb) {
      cb(this.catname_options);
    },
    handlePictureCardPreview(file) {
      // this.dialogImageUrl = file.url;
      // this.dialogVisible = true;
    }
  },
  created() {
    this.init();
    // if (this.id) {
    //   $ajax
    //     .get(INTERFACE.buy.edit, {
    //       params: {
    //         id: this.id
    //       }
    //     })
    //     .then(res => {
    //       this.form = Object.assign(this.form, res.data.data);
    //       this.form.content = this.form.content.split("<br/>").join("\n");
    //       this.form.description = this.form.description
    //         .split("<br/>")
    //         .join("\n");
    //       if (this.form.address_fields == "") {
    //         this.form.address_fields = [];
    //       } else if (typeof this.form.address_fields == "string") {
    //         this.form.address_fields = this.form.address_fields.split(",");
    //       }
    //       if (!this.form.limit_setting) {
    //         this.form.limit_setting = {
    //           scancode_times: "",
    //           groups: ""
    //         };
    //       }
    //       this.form.notice_time = [
    //         new Date(this.form.notice_starttime),
    //         new Date(this.form.notice_endtime)
    //       ];
    //       if (this.form.image) {
    //         this.fileList1 = [
    //           {
    //             url: this.form.image
    //           }
    //         ];
    //         i = 1;
    //       }
    //       if (this.form.notice_image) {
    //         this.fileList = [
    //           {
    //             url: this.form.notice_image
    //           }
    //         ];
    //         m = 1;
    //       }
    //       this.form.online_time = [
    //         new Date(this.form.online_starttime),
    //         new Date(this.form.online_endtime)
    //       ];
    //       this.form.exchange_time = [
    //         new Date(this.form.exchange_starttime),
    //         new Date(this.form.exchange_endtime)
    //       ];
    //     });
    // }
  },
  computed: {
    id() {
      return window.location.search.substr(1).split(",")[0];
    },
    page() {
      return window.location.search.substr(1).split(",")[1];
    }
  }
};
</script>
    <style >
#add_commodity {
  padding: 16px;
}

[v-cloak] {
  display: none;
}

#add_commodity .shuru {
  width: 500px;
}

#app  .el-upload__input {
  display: none;
}

.upload-demo ul li {
  width: 400px;
}
</style>
