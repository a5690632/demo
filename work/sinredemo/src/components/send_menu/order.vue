<template>
  <div id="order" v-cloak>
    <div class="wrapper animated fadeInRight">
      <div class="row">
        <div class="col-md-12">
          <div class="ibox">
            <div class="ibox-content" >
              <el-tabs v-model="tag" @tab-click="handleClick" style="margin-bottom:16px;">
                <el-tab-pane label="未发货订单" name="first">

                </el-tab-pane>
                <el-tab-pane label="已发货订单" name="second">
                  <a href="/pages/order/sent.html" id="jump"></a>
                </el-tab-pane>
              </el-tabs>
              <el-row>
                <el-form :inline="true" :model="form" class="demo-form-inline">
                  <el-col :span="24">
                    <el-form-item>
                      <el-date-picker v-model="form.time" type="daterange" placeholder="选择时间范围" format="yyyy-MM-dd" @change="dateRangeChange" :picker-options="pickerOptions"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                      <el-select v-model="form.business_type" placeholder="订单来源" @change="search" filterable>
                        <el-option key=" " value=" " label="全部来源" selected></el-option>
                        <el-option v-for="item in sourceList" :key="item.id" :value="item.id" :label="item.name"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item>
                      <el-input v-model="form.truename" placeholder="收货人姓名"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-input v-model="form.phone" placeholder="联系方式"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-input v-model="form.uid" placeholder="会员ID"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-input v-model="form.address" placeholder="地址搜索"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="search">
                        <i class="fa fa-search"></i>
                      </el-button>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="reload">
                        <i class="fa fa-refresh"></i>
                      </el-button>
                    </el-form-item>
                  </el-col>
                </el-form>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-button @click="merge">合并订单</el-button>
                  <el-button @click="split">拆分订单</el-button>
                </el-col>
              </el-row>

              <!-- 表格 -->
              <el-row>
                <table class="table">
                  <thead>
                    <th></th>
                    <th>会员ID</th>
                    <th>收货人姓名</th>
                    <th>商品名称</th>
                    <th>商品编号</th>
                    <th>订单来源</th>
                    <th>订单时间</th>
                    <th>订单编号</th>
                    <th>联系方式</th>
                    <th>收货地址</th>
                    <th>操作</th>
                  </thead>
                  <tbody v-if="list.length>0">
                    <tr v-for="order,i in list">
                      <td>
                        <el-checkbox v-model="check[i]" @change="toggle_check"></el-checkbox>
                      </td>
                      <td>
                        <table class="in_table">
                          <tr v-for="item in order">
                            <td>{{item.uid}}</td>
                          </tr>
                        </table>
                      </td>
                      <td>
                        <table class="in_table">
                          <tr v-for="item in order">
                            <td>{{item.truename}}</td>
                          </tr>
                        </table>
                      </td>
                      <td>
                        <table class="in_table">
                          <tr v-for="item in order">
                            <td>{{item.goods_name}}</td>
                          </tr>
                        </table>
                      </td>
                      <td>
                        <table class="in_table">
                          <tr v-for="item in order">
                            <td>{{item.goods_id}}</td>
                          </tr>
                        </table>
                      </td>
                      <td>
                        <table class="in_table">
                          <tr v-for="item in order">
                            <td>{{item.source}}</td>
                          </tr>
                        </table>
                      </td>
                      <td>
                        <table class="in_table">
                          <tr v-for="item in order">
                            <td>{{item.posttime}}</td>
                          </tr>
                        </table>
                      </td>
                      <td>
                        <table class="in_table">
                          <tr v-for="item in order">
                            <td>{{item.idnum}}</td>
                          </tr>
                        </table>
                      </td>
                      <td>
                        <table class="in_table">
                          <tr v-for="item in order">
                            <td>{{item.phone}}</td>
                          </tr>
                        </table>
                      </td>
                      <td>
                        <table class="in_table">
                          <tr v-for="item in order">
                            <td>{{item.address}}</td>
                          </tr>
                        </table>
                      </td>
                      <td>
                        <el-button size="mini" @click="oprate_edit(i)" v-if="list[i].length==1" title="编辑收货订单">
                          <i class="fa fa-pencil-square-o"></i>
                        </el-button>
                        <el-button size="mini" @click="oprate_print(i)" title="打印订单">
                          <i class="fa fa-print"></i>
                        </el-button>
                        <el-button size="mini" @click="oprate_send(i)" title="填写快递订单">
                          <i class="fa fa-paper-plane"></i>
                        </el-button>
                        <el-button size="mini" @click="del($event,i)" title="删除" icon="delete">

                        </el-button>

                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <th colspan="11" style="text-align: center;">
                        暂无数据
                      </th>
                    </tr>
                  </tbody>
                </table>
              </el-row>

              <!-- 页码 -->
             <el-row>
            <el-col :span="12">
                显示第 {{(page-1) * pagesize + 1}} 到第 {{Math.min(page * pagesize)}} 条记录，总共 {{number}} 条记录 每页显示
                <el-select v-model="pagesize" >
                    <el-option v-for="item in size_list" :key="item.value" :value="item.value" :label="item.value"></el-option>
                </el-select>
                条记录
            </el-col>
            <el-col :span="12" style="text-align: right;">
                <el-pagination  :page-size="pagesize"  layout="prev, pager, next, jumper"   :current-page="page"
                    :total="10"></el-pagination>
            </el-col>
        </el-row>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 编辑订单弹层 -->
    <el-dialog title="编辑订单" :visible.sync="dialogEdit" :modal="false" :close-on-click-modal="false">
      <el-form :model="dialogEditForm">
        <el-form-item label="收货地址" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="4" v-model="dialogEditForm.address" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEdit = false">取 消</el-button>
        <el-button type="primary" @click="save_edit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 下载打印订单 -->
    <el-dialog title="打印订单" :visible.sync="dialogPrint" :modal="false" :close-on-click-modal="false" custom-class="dialogPrint"
      :before-close="closePrint" id="dialogPrint">
      <div class="order-down" ref="orderDown" id="orderBox">
        <header>
          <img src="/static/admin/img/filogra_logo.png">
        </header>
        <section>
          <div class="section1">
            <h3 class="title">尊敬的菲洛嘉会员：</h3>
            <p>感谢您选购菲洛嘉护肤系列产品，我们坚持科技与美的研发，倾注修护、滋养、抵御、复颜力量，让肌肤不见时光痕迹，愿您与年龄轻松相处，做更好的自己。</p>
          </div>
          <div class="section2" v-if="list.length>0 && list[current_index].length==1">
            <p>
              <span class="lab">收件姓名：</span>{{download.form.truename}}</p>
            <p>
              <span class="lab">联系方式：</span>{{download.form.phone}}</p>
            <p>
              <span class="lab">收货地址：</span>{{download.form.address}}</p>
          </div>
          <el-row class="section2" v-else="list.length>0 && list[current_index].length==1">
            <el-form :model="form">
              <el-col :span="24">
                <el-form-item label="收货姓名：">
                  <el-select v-model="download.form.truename" size="large" filterable>
                    <el-option v-for="item in download.nameList" :key="item" :value="item" :label="item"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="联系方式：">
                  <el-select v-model="download.form.phone" size="large" filterable>
                    <el-option v-for="item in download.phoneList" :key="item" :value="item" :label="item"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="收货地址：">
                  <el-select v-model="download.form.address" size="large" filterable>
                    <el-option v-for="item in download.addList" :key="item" :value="item" :label="item"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
          <div class="section3">
            <h3 class="title">订单详情</h3>
            <table>
              <thead>
                <tr>
                  <th>用户ID</th>
                  <th>商品名称</th>
                  <th>原价</th>
                  <th>数量</th>
                  <th>实付</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in download.goodsList">
                  <td>{{item.uid}}</td>
                  <td>{{item.name}}</td>
                  <td>￥{{item.worth}}</td>
                  <td>{{item.num}}{{item.units}}</td>
                  <td>￥0</td>
                </tr>
              </tbody>
            </table>
            <div class="total">
              <p>
                <span class="lab">运费：</span>
                <span class="price">￥0</span>
              </p>
              <p>
                <span class="lab">优惠额：</span>
                <span class="price">￥{{download.total}}</span>
              </p>
              <p class="total-txt">
                <span class="lab">合计：</span>
                <span class="price">￥0</span>
              </p>
            </div>
          </div>
        </section>
        <footer>
          <p>温馨提示：</p>
          <p>兑换产品不再参与产品积分，礼品换领成功后，系统会将相应积分自动扣除，无法取消或更改，请您谅解。如有任何意见或建议，欢迎拨打客服热线：400-000-9291</p>
        </footer>
      </div>
      <el-row class="center">
        <el-col :span="24">
          <el-button type="primary" @click="save_down">
            <i class="fa fa-download"></i> 保存并下载</el-button>
        </el-col>
      </el-row>
    </el-dialog>

    <!-- 发货弹层 -->
    <el-dialog title="编辑订单" :visible.sync="dialogSend" :modal="false" :close-on-click-modal="false">
      <el-form :model="dialogSendForm">
        <el-form-item label="快递公司" :label-width="formLabelWidth">
          <el-select v-model="dialogSendForm.express" filterable>
            <el-option v-for="item in expressList" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="快递单号" :label-width="formLabelWidth">
          <el-input v-model="dialogSendForm.express_order" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogSend = false">取 消</el-button>
        <el-button type="primary" @click="save_send">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style scoped>
  #order{
    padding: 16px
  }
  .dialogPrint {
    width: 40%;
  }
  .order-down .section2 .el-form-item__label {
    font-size: 40px;
    color: #231815;
  }
  .order-down .section2 .el-select input {
    width: 500px;
    height: 40px;
    font-size: 36px;
    padding: 36px;
  }
  .order-down {
    width: 1654px;
    transform-origin: 0 0;
    background: #fff;
  }
  .order-down header {
    width: 100%;
    height: 500px;
    background: #231815;
    text-align: center;
    padding-top: 170px;
  }

  .order-down header img {
    width: 420px;
  }

  .order-down section {
    font-size: 40px;
    color: #231815;
    min-height: 1500px;
    padding: 140px 140px 20px;
  }

  .order-down section .section1 {
    margin-bottom: 40px;
  }

  .order-down section .section1 .title {
    font-size: 48px;
    font-weight: bold;
  }

  .order-down section .section2 {
    margin-bottom: 70px;
    line-height: 56px;
  }

  .order-down section .section2 .lab {
    font-weight: bold;
  }

  .order-down section .section3 {
    font-size: 34px;
  }

  .order-down section .section3 .title {
    font-size: 48px;
    font-weight: bold;
  }

  .order-down section .section3 table {
    margin-bottom: 20px;
    width: 100%;
  }

  .order-down section .section3 table thead tr {
    border-bottom: 2px solid #717171;
    height: 100px;
    font-weight: bold;
  }

  .order-down section .section3 table tbody tr {
    border-bottom: 2px solid #bcbbbb;
    height: 100px;
  }

  .order-down section .section3 table thead th:last-child {
    text-align: right;
  }

  .order-down section .section3 table tbody td:last-child {
    text-align: right;
  }

  .order-down section .section3 .total {
    text-align: right;
    line-height: 100px;
  }

  .order-down section .section3 .total p {}

  .order-down section .section3 .total .price {
    display: inline-block;
    width: 400px;
  }

  .order-down section .section3 .total .lab {
    display: inline-block;
    width: 160px;
  }

  .order-down section .section3 .total .total-txt {
    font-weight: bold;
    border-top: 2px solid #bcbbbb;
    display: inline-block;
  }

  .order-down footer {
    font-size: 34px;
    color: #878789;
    padding: 20px 140px 140px;
  }

  .center {
    text-align: center;
  }

  .el-row {
    margin-bottom: 20px;
  }

  .el-card .header h3 {
    line-height: 36px;
  }

  .button_margin {
    margin-left: 10%;
  }

  .table {
    width: 100%;
    background: #fff;
    border-top: 1px solid #ddd;
  }

  .table thead {
    background: #eef1f6;
  }

  .in_table tr td {
    height: 24px;
    line-height: 36px;
  }
  
  .table thead th{
    height: 40px;
  }
</style>
<script>
  export default {
    name: "order",
    data() {
      return {
        tag: "first",
        form: {
          time: '',
          business_type: '',
          truename: '',
          phone: '',
          uid: '',
          address: ""
        },

        time: "",
        sourceList: [ //来源列表
          {
            id: '40001',
            name: '积分兑换'
          },
          {
            id: '40002',
            name: '限时抢购'
          },
          {
            id: '61300',
            name: '抽奖活动'
          },
          {
            id: '61600',
            name: '生日贺礼'
          },
          {
            id: '71000',
            name: '事件营销'
          }
        ],
        list: [
          [{"id":201,"gid":201,"business_type":0,"business_id":362,"goods_id":1,"goods_name":"手机充值卡10元","uid":55,"truename":"","phone":"","address":"","express":"","express_order":"","status":0,"disabled":0,"posttime":"0000-00-00 00:00:00","mflag":0,"default_address":"0","query_params":"id=201"}],[{"id":200,"gid":200,"business_type":0,"business_id":359,"goods_id":2,"goods_name":"手机充值卡20元","uid":54,"truename":"","phone":"","address":"","express":"","express_order":"","status":0,"disabled":0,"posttime":"0000-00-00 00:00:00","mflag":0,"default_address":"0","query_params":"id=200"}],[{"id":199,"gid":199,"business_type":0,"business_id":358,"goods_id":1,"goods_name":"手机充值卡10元","uid":54,"truename":"","phone":"","address":"","express":"","express_order":"","status":0,"disabled":0,"posttime":"0000-00-00 00:00:00","mflag":0,"default_address":"0","query_params":"id=199"}],[{"id":198,"gid":198,"business_type":0,"business_id":355,"goods_id":2,"goods_name":"手机充值卡20元","uid":53,"truename":"","phone":"","address":"","express":"","express_order":"","status":0,"disabled":0,"posttime":"0000-00-00 00:00:00","mflag":0,"default_address":"0","query_params":"id=198"}],[{"id":195,"gid":195,"business_type":0,"business_id":350,"goods_id":1,"goods_name":"手机充值卡10元","uid":52,"truename":"","phone":"","address":"","express":"","express_order":"","status":0,"disabled":0,"posttime":"0000-00-00 00:00:00","mflag":0,"default_address":"0","query_params":"id=195"}],[{"id":194,"gid":194,"business_type":0,"business_id":347,"goods_id":2,"goods_name":"手机充值卡20元","uid":50,"truename":"","phone":"","address":"","express":"","express_order":"","status":0,"disabled":0,"posttime":"0000-00-00 00:00:00","mflag":0,"default_address":"0","query_params":"id=194"}],[{"id":193,"gid":193,"business_type":0,"business_id":346,"goods_id":1,"goods_name":"手机充值卡10元","uid":50,"truename":"","phone":"","address":"","express":"","express_order":"","status":0,"disabled":0,"posttime":"0000-00-00 00:00:00","mflag":0,"default_address":"0","query_params":"id=193"}],[{"id":190,"gid":190,"business_type":0,"business_id":339,"goods_id":2,"goods_name":"手机充值卡20元","uid":48,"truename":"","phone":"","address":"111","express":"","express_order":"","status":0,"disabled":0,"posttime":"0000-00-00 00:00:00","mflag":0,"default_address":"a:3:{s:8:\"truename\";N;s:5:\"phone\";N;s:7:\"address\";s:3:\"111\";}","query_params":"id=190"}],[{"id":187,"gid":187,"business_type":0,"business_id":334,"goods_id":1,"goods_name":"手机充值卡10元","uid":47,"truename":"","phone":"","address":"","express":"","express_order":"","status":0,"disabled":0,"posttime":"0000-00-00 00:00:00","mflag":0,"default_address":"0","query_params":"id=187"}],[{"id":185,"gid":185,"business_type":0,"business_id":330,"goods_id":1,"goods_name":"手机充值卡10元","uid":46,"truename":"","phone":"","address":"","express":"","express_order":"","status":0,"disabled":0,"posttime":"0000-00-00 00:00:00","mflag":0,"default_address":"0","query_params":"id=185"}]
        ], //订单列表
     
          page: 1,
          number: 1,
          size_list:[{
            value:20,

          },{
            value:30,

          },{
            value:40,

          },{
            value:50,

          }],
          pagesize: 20,
     
        dialogEdit: false, //编辑弹窗
        dialogSend: false, //发送弹窗
        dialogPrint: false, //打印弹窗
        dialogEditForm: { //编辑表单
          address: '' // 地址
        },

        dialogSendForm: { // 发送表单
          express: '', //快递公司
          express_order: '' //快递单号
        },
        dialogPrintForm: { //打印表单
          address: ''
        },
        formLabelWidth: '120px',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        check: [],
        checked_id: [],
        checked_index: [],
        checkAll: false,
        current_index: 0, // 当前正在编辑的订单的index
        expressList: [], //快递公司列表
        scale: 1, //订单缩放系数
        download: {
          nameList: [],
          phoneList: [],
          addList: [],
          goodsList: [],
          total: 0,
          form: {
            truename: '',
            phone: '',
            address: ''
          }
        },

        loadingOptions: {
          body: false,
          fullscreen: true,
          lock: true
        }
      }
    },
    methods: {
      del(val, i) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $ajax.post(INTERFACE.order.del, {
            gid: this.list[i][0].gid
          }).then(res => {
            if (res.data.err == 0) {

              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              this.getData();
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleClick(tab) {
        //跳转
        if (tab._data.index == 1) {
          document.getElementById("jump").click();
        }
      },

      reload: function () {
        /* 刷新 */
        location.reload();
      },
      getData() {
        var self = this;
        var load = self.$loading(self.loadingOptions);
        $ajax.get(INTERFACE.order.getOrderList, {
          params: {
            nums: self.page.size,
            page: self.page.current,
            time: self.time,
            business_type: self.form.business_type,
            truename: self.form.truename,
            phone: self.form.phone,
            uid: self.form.uid,
            address: self.form.address,
          }
        }).then(function (res) {
          load.close();
          self.list = res.data.rows;
          self.page.total = res.data.total;
          self.check = new Array(parseInt(self.page.size));
        });
      },
      toggle_check: function () {
        /* 选中的订单的id数组 */
        var self = this,
          orders = [],
          indexs = [];
        _.each(self.check, function (e, i) {
          if (e == true) {
            orders = orders.concat(self.list[i]);
          }
        });
        self.checked_id = _.map(orders, 'id');
        /* 选中的订单的index数组 */

        _.each(self.check, function (e, i) {
          if (e == true) {
            indexs.push(i);
          }
        });
        self.checked_index = indexs;
      },
      merge: function () {
        /* 合并 */
        var self = this;
        if (self.checked_index.length < 2) return;
        var load = self.$loading(self.loadingOptions);
        $ajax.post(INTERFACE.order.merge, {
            ids: self.checked_id
          })
          .then(function (res) {
            load.close();
            if (res.data.err == 0) {
              // 合并后获取到组id data.gid
              // 选中的记录合并到第一条记录中
              _.each(self.checked_index, function (e, i) {
                _.each(self.list[e], function (e2, i2) {
                  e2.gid = res.data.gid;
                  i != 0 && self.list[self.checked_index[0]].push(
                    e2);
                });
              });
              // 删除除第一条的全部记录
              _.each(self.checked_index.reverse(), function (e, i) {
                if (i == self.checked_index.length - 1) return;
                self.list.splice(e, 1);
              });
              Vue.nextTick(function () {
                self.check = new Array(self.list.length);
                _.each(self.check, function (e, i) {
                  self.check[i] = false;
                });
                self.checked_index = [];
                self.checked_id = [];
              });

            } else {
              self.$message.error('合并失败');
            }
          });
      },
      split: function () {
        /* 拆分 */
        var self = this;
        if (self.checked_index.length < 1) return;

        _.each(self.checked_index.reverse(), function (e, i) {
          if (self.list[e].length == 1) return;
          var load = self.$loading(self.loadingOptions);
          $ajax.post(INTERFACE.order.split, {
              gid: self.list[e][0].gid
            })
            .then(function (res) {
              load.close();
              if (res.data.err == 0) {
                var order = self.list.splice(e, 1);
                _.each(order[0], function (e2, i2) {
                  e2.gid = e2.id;
                  self.list.splice(e, 0, [e2]);
                });
                Vue.nextTick(function () {
                  self.check = new Array(self.list.length);
                  _.each(self.check, function (e, i) {
                    self.check[i] = false;
                  });
                  self.checked_index = [];
                  self.checked_id = [];
                });
              } else {
                self.$message.error('拆分失败');
              }
            });

        });
      },
      dateRangeChange: function (value) {
        /* 时间控件 */
        var self = this;
        self.time = value;
        Vue.nextTick(function () {
          self.getData();
        });
      },
      search: function () {
        /* 搜索 */
        this.page.current = 1;
        this.getData();
      },
      oprate_edit: function (i) {
        /* 编辑 */
        this.current_index = i;
        this.dialogEditForm.address = this.list[i][0].address;
        this.dialogEdit = true;
      },
      save_edit: function () {
        /* 保存编辑地址 */
        var self = this;
        if (self.dialogEditForm.address == '') {
          self.$message.error('请填写地址');
          return;
        }
        var load = self.$loading(self.loadingOptions);
        $ajax.post(INTERFACE.order.edit, {
            id: self.list[self.current_index][0].id,
            info: self.dialogEditForm
          })
          .then(function (res) {
            load.close();
            if (res.data.err == 0) {
              self.$message({
                message: '修改成功！',
                type: 'success'
              });
              self.list[self.current_index][0].address = self.dialogEditForm.address;
              self.dialogEdit = false;
            } else {
              self.$message.error('修改失败！');
            }
          });
      },
      oprate_print: function (i) {
        /* 打印 */
        var self = this,
          gid;
        self.current_index = i;
        gid = self.list[self.current_index][0].gid;
        // 获取相关信息
        var load = self.$loading(self.loadingOptions);
        axios.all([$ajax.get(INTERFACE.order.getAddList + '?gid=' + gid), $ajax.get(INTERFACE.order
            .getPrintData + '?gid=' + gid)])
          .then(axios.spread(function (res1, res2) {
            load.close();
            self.download.nameList = [];
            self.download.phoneList = [];
            self.download.addList = [];
            self.download.goodsList = [];
            self.download.total = 0;

            _.each(res1.data.data, function (e, i) {
              self.download.nameList.push(e.truename);
              self.download.phoneList.push(e.phone);
              self.download.addList.push(e.address);
            });

            self.download.form.truename = self.download.nameList[0];
            self.download.form.phone = self.download.phoneList[0];
            self.download.form.address = self.download.addList[0];

            _.each(res2.data.data.list, function (e, i) {
              self.download.total += e.worth;
              self.download.goodsList.push(e);
            });

            self.dialogPrint = true;

            Vue.nextTick(function () {
              self.scale = $(
                '.el-dialog.el-dialog--small.dialogPrint .el-dialog__body'
              ).width() / 1654;
              $(this.$refs.orderDown).css({
                transform: 'scale(' + self.scale + ')'
              });
              $('.order-down').height($('.order-down').height() * self.scale);
            });
          }));
      },
      closePrint: function () {
        /* 关闭打印弹层 */
        $('.order-down').height($('.order-down').height() / this.scale);
        this.dialogPrint = false;
      },
      save_down: function () {
        /* 保存并下载 */
        var self = this,
          gid;
        gid = self.list[self.current_index][0].gid;

        if (self.list[self.current_index].length > 1) {
          $ajax.post(INTERFACE.order.getAddList, {
              gid: gid,
              info: self.download.form
            })
            .then(function (res) {
              if (res.data.err == 0) {} else {
                self.$message.error('保存收货信息失败');
              }
            });
        }

        // 画一个订单
        var canvas = document.createElement('canvas'),
          cWidth = 1654,
          cHeight = 2480;
        canvas.width = 1654;
        canvas.height = 2480;
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, 1654, 500);

        ctx.fillStyle = '#717171';
        ctx.fillRect(110, 1290, 1486, 1);

        ctx.fillStyle = '#bcbbbb';
        _.each(self.download.goodsList, function (e, i) {
          /* body... */
          ctx.fillRect(110, 1390 + i * 100, 1486, 1);
        });
        ctx.fillRect(970, 1540 + (self.download.goodsList.length - 1) * 100, 625, 1);

        var img = new Image();
        img.src = '/static/admin/img/filogra_logo.png';
        ctx.drawImage(img, 662, 183);

        ctx.fillStyle = '#231815';

        ctx.font = "normal normal bold 48px Microsoft YaHei";
        ctx.fillText("尊敬的菲洛嘉会员：", 148, 670);
        ctx.fillText("订单详情：", 148, 1150);

        ctx.font = "normal normal normal 40px Microsoft YaHei";
        ctx.fillText("感谢您选购菲洛嘉护肤系列产品，我们坚持科技与美的研发，倾注修护、滋养、抵", 148, 745);
        ctx.fillText("御、复颜力量，让肌肤不见时光痕迹，愿您与年龄轻松相处，做更好的自己。", 148, 806);
        ctx.fillText(self.download.form.truename, 355, 907);
        ctx.fillText(self.download.form.phone, 355, 966);
        ctx.fillText(self.download.form.address, 355, 1026);

        ctx.font = "normal normal bold 40px Microsoft YaHei";
        ctx.fillText("收件姓名：", 148, 907);
        ctx.fillText("联系方式：", 148, 966);
        ctx.fillText("收货地址：", 148, 1026);

        ctx.font = "normal normal bold 34px Microsoft YaHei";
        ctx.fillText("用户ID", 148, 1260);
        ctx.fillText("商品名称", 391, 1260);
        ctx.fillText("原价", 1004, 1260);
        ctx.fillText("数量", 1218, 1260);
        ctx.fillText("实付", 1465, 1260);
        ctx.fillText("合计", 1000, 1601 + (self.download.goodsList.length - 1) * 100);
        ctx.fillText("￥0", 1465 - 8, 1601 + (self.download.goodsList.length - 1) * 100);

        ctx.font = "normal normal normal 34px Microsoft YaHei";
        ctx.fillText("运费：", 1000, 1456 + (self.download.goodsList.length - 1) * 100);
        ctx.fillText("优惠额：", 1000, 1516 + (self.download.goodsList.length - 1) * 100);
        ctx.fillText("￥0", 1465 - 8, 1456 + (self.download.goodsList.length - 1) * 100);
        ctx.fillText('￥' + self.download.total, 1465 - String(self.download.total).length * 12 -
          5, 1516 + (self.download.goodsList.length - 1) * 100);
        _.each(self.download.goodsList, function (e, i) {
          ctx.fillText(e.id, 148, 1356 + i * 100);
          ctx.fillText(e.name, 391, 1356 + i * 100);
          ctx.fillText('￥' + e.worth, 1004, 1356 + i * 100);
          ctx.fillText(e.num + e.units, 1218, 1356 + i * 100);
          ctx.fillText('￥0', 1456, 1356 + i * 100);

        });

        ctx.fillStyle = '#878789';
        ctx.fillText("温馨提示：", 148, 2152);
        ctx.fillText("兑换产品不再参与产品积分，礼品换领成功后，系统会将相应积分自动扣除，无法取消或更改，请", 148, 2222);
        ctx.fillText("您谅解。如有任何意见或建议，欢迎拨打客服热线：400-000-9291", 148, 2267);


        var url = canvas.toDataURL();
        var triggerDownload = $("<a>").attr("href", url).attr("download", '订单').appendTo("body");
        triggerDownload[0].click();
        triggerDownload.remove();

        // html2canvas($("#orderBox"), {
        //     allowTaint:true,
        //     height: $('#orderBox').outerHeight() + 140}).then(function (canvas) {
        //         var url = canvas.toDataURL();
        //           //以下代码为下载此图片功能
        //         var triggerDownload = $("<a>").attr("href", url).attr("download", '订单').appendTo("body");
        //         triggerDownload[0].click();
        //         triggerDownload.remove();
        //     }
        // );
      },
      oprate_send: function (i) {
        /* 发货 */
        var self = this;
        var load = self.$loading(self.loadingOptions);
        $ajax.get(INTERFACE.order.get_express)
          .then(function (res) {
            load.close();
            if (res.data.err == 0) {
              self.expressList = res.data.data;
            } else {
              self.$message.error('获取快递公司信息失败');
            }
          });
        this.current_index = i;
        this.dialogSend = true;
      },
      save_send: function () {
        /* 保存发货信息 */
        var self = this,
          ids = [];
        ids = _.map(self.list[self.current_index], 'id');
        if (self.dialogSendForm.express == '' || self.dialogSendForm.express_order == '') {
          self.$message.error('请填写发货信息');
          return;
        }
        var load = self.$loading(self.loadingOptions);
        $ajax.post(INTERFACE.order.send, {
            id: ids,
            data: self.dialogSendForm
          })
          .then(function (res) {
            load.close();
            if (res.data.err == 0) {
              self.$message({
                message: '发货成功！',
                type: 'success'
              });
              self.dialogSend = false;
              setTimeout(function () {
                if (self.list.length == 1) {
                  (self.page.current > 1) && (self.page.current -= 1);
                }
                if (self.current_index > 0) {
                  self.current_index -= 1;
                }
                self.getData();
              }, 2000);
            } else {
              self.$message.error('发货失败！');
            }
          });
      },
      handleSizeChange(val) {
        /* 切换每页显示的条数 */
        this.page.size = val;
        this.page.current = 1;
        this.getData();
      },
      handleCurrentChange(val) {
        /* 翻页 */
        this.page.current = val;
        this.getData();
      }
    }


  }

</script>
