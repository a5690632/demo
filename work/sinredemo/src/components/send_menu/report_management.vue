<template>
  <div id="report_management" v-cloak>

    <div class="header" style="boder-bottom:0px">

      <el-button type="primary" icon="plus">添加新的数据报表</el-button>

      <el-button type="primary">定制表单管理</el-button>

      <el-input class="search_input" placeholder="请输入报表名称" v-model="search_input" :on-icon-click="handleIconClick">
        <el-button slot="append" icon="search"></el-button>
      </el-input>


    </div>
    <div class="list" style="margin-top: 16px">
      <el-table :data="tableData" style="width: 100%;" :default-sort="{prop: 'number', order: 'descending'}" @sort-change="handleSortChange">
        <el-table-column width="100" prop="id" label="序号" sortable="custom"></el-table-column>
        <el-table-column prop="name" label="报表名称"></el-table-column>
        <el-table-column width="150" prop="status" label="报表状态">
          <template slot-scope="scope">
            <span v-if="scope.row.feeds.length > 0">生成并发送</span>
            <span v-else>仅生成</span>
          </template>
        </el-table-column>
        <el-table-column width="300" prop="accept_email" label="接收邮箱">
          <template slot-scope="scope">
            <div v-for="item in scope.row.feeds">{{item.email}}</div>
          </template>
        </el-table-column>
        <el-table-column width="200" label="发送周期以及时间">
          <template slot-scope="scope">
            <div v-for="item in scope.row.feeds">
              <div v-show="item.cycle == 'day'">每天 {{item.time}}</div>
              <div v-show="item.cycle == 'week'">每周一 {{item.time}}</div>
              <div v-show="item.cycle == 'month'">每月1号 {{item.time}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="150" prop="shape" label="发送形式">
          <template slot-scope="scope">
            <div v-for="item in scope.row.feeds">
              <span v-if="item.format == 2">csv</span>
              <span v-if="item.format == 1">html</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="250" label="操作">
          <template slot-scope="scope">
            <el-switch v-model="tableData[scope.$index].status" @change="change(scope)" on-text="启用" off-text="禁用" :on-value="1" :off-value="2"
              style="margin-right:10px;line-height: 36px;"></el-switch>
            <el-button size="mini" title="订阅管理" @click="open_d(scope)">
              <i class="fa fa-rss"></i>
            </el-button>
            <el-button size="mini" icon="edit" title="编辑报表" @click="edit(scope.row.id)"></el-button>
            <el-button size="mini" icon="delete" title="删除" @click="del(scope)"></el-button>
            <el-button size="mini" title="报表下载" @click="open_dowload(scope.row)">
              <i class="fa fa-download"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row style="margin-top:16px">
        <el-col :span="12">
          显示第 {{(page-1) * pagesize + 1}} 到第 {{Math.min(page * pagesize)}} 条记录，总共 {{number}} 条记录 每页显示
          <el-select v-model="pagesize">
            <el-option v-for="item in size_list" :key="item.value" :value="item.value" :label="item.value"></el-option>
          </el-select>
          条记录
        </el-col>
        <el-col :span="12" style="text-align: right;">
          <el-pagination :page-size="pagesize" layout="prev, pager, next, jumper" :current-page="page" :total="10"></el-pagination>
        </el-col>
      </el-row>




      <el-dialog title="订阅管理" :visible.sync="dialogFormVisible" size="large" :close-on-click-modal="false">
        <el-form :model="form">
          <el-table :data="form.tableData4" style="width: 100%" max-height="350">
            <el-table-column prop="email" label="接受邮箱">
              <template slot-scope="scope">
                <el-input v-if="off[scope.$index].state" v-model="scope.row.email" placeholder="请输入内容"></el-input>
                <span v-else>{{scope.row.email}}</span>
              </template>
            </el-table-column>
            <el-table-column label="发送周期以及时间">
              <template slot-scope="scope">
                <div v-if="off[scope.$index].state">
                  <el-select style="width: 45%" v-model="scope.row.cycle" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                  <el-time-select v-model="scope.row.time" :picker-options="time">
                  </el-time-select>
                </div>
                <div v-else>
                  <span v-show="scope.row.cycle == 'day'">每天</span>
                  <span v-show="scope.row.cycle == 'week'">每周一</span>
                  <span v-show="scope.row.cycle == 'month'">每月一号</span>
                  <span>{{scope.row.time}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="发送形式">
              <template slot-scope="scope">
                <div v-if="off[scope.$index].state">
                  <el-select v-model="scope.row.format" placeholder="请选择">
                    <el-option v-for="item in send_cycle
                                                " :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </div>
                <div v-else>
                  <div v-show="scope.row.format == 2">csv</div>
                  <div v-show="scope.row.format == 1">html</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column width="150" label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="kaiqishuru(scope)" v-if="!off[scope.$index].state" icon="edit"></el-button>
                <el-button size="mini" @click="add(scope)" icon="check" v-else></el-button>
                <el-button size="mini" @click="del_dia(scope)" icon="delete"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="close_d">关闭</el-button>
        </div>
      </el-dialog>


      <el-dialog title="报表下载" :visible.sync="dialogVisible_download" size="tiny" :close-on-click-modal="false">
        <el-form :model="form" :rules="rules" ref="form" label-width="140px">
          <el-form-item label="请选择时间范围" prop="date">
            <el-date-picker v-model="form.date" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
          <el-button type="primary" @click="submitForm('form')" class="download">下载</el-button>
        </el-form>
      </el-dialog>

      <el-dialog title="报表下载" :visible.sync="dialogVisible_download" size="tiny" :close-on-click-modal="false">
        <el-form label-width="150px" label-suffix="：">
          <el-form-item label="请选择时间范围">
            <el-date-picker v-model="timeRange" type="daterange" placeholder="选择日期范围" :picker-options="pickerOptions" :editable="false"></el-date-picker>
            </el-date-picker>
          </el-form-item>

          <el-form-item label="请选择文件类型">
            <el-radio-group v-model="form.down.format">
              <el-radio :label="1">csv</el-radio>
              <el-radio :label="2">pdf</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-button v-if="form.down.isDownFDF" type="primary" class="download" icon="loading">正在生成PDF，请稍后...</el-button>
          <el-button v-else type="primary" @click="download" class="download">下载</el-button>
        </el-form>
      </el-dialog>


    </div>

  </div>
</template>
<script>
  export default {

    name: "",

    data() {

      return {
        size_list: [{
          value: 20
        }, {
          value: 30
        }, {
          value: 40
        }, {
          value: 50
        }],
        number: 1,
        pagesize: 20,
        page: 1,
        currentPage: 1,
        total: 0,
        time: {
          start: '00:00',
          step: '01:00',
          end: '23:00'
        },
        id: "",
        sent_time: [],
        search_input: '',
        tableData: [{
            "id": 85,
            "name": "hehe1",
            "status": 1,
            "disabled": 0,
            "posttime": "2018-01-04 16:15:00",
            "feeds": [{
                "id": 62,
                "report_id": 85,
                "email": "215200824@qq.com",
                "cycle": "day",
                "time": "01:00",
                "format": 2
              },
              
              {
                "id": 62,
                "report_id": 85,
                "email": "215200824@qq.com",
                "cycle": "day",
                "time": "01:00",
                "format": 2
              }, {
                "id": 62,
                "report_id": 85,
                "email": "215200824@qq.com",
                "cycle": "day",
                "time": "01:00",
                "format": 2
              }
            ]
          }, {
            "id": 82,
            "name": "1112223333",
            "status": 1,
            "disabled": 0,
            "posttime": "2018-01-04 15:14:47",
            "feeds": [{
              "id": 62,
              "report_id": 85,
              "email": "215200824@qq.com",
              "cycle": "day",
              "time": "01:00",
              "format": 2
            }]
          }, {
            "id": 79,
            "name": "112233",
            "status": 1,
            "disabled": 0,
            "posttime": "2018-01-04 11:08:03",
            "feeds": [{
              "id": 62,
              "report_id": 85,
              "email": "215200824@qq.com",
              "cycle": "day",
              "time": "01:00",
              "format": 2
            }]
          }, {
            "id": 74,
            "name": "23213",
            "status": 1,
            "disabled": 0,
            "posttime": "2018-01-02 15:15:44",
            "feeds": [{
              "id": 62,
              "report_id": 85,
              "email": "215200824@qq.com",
              "cycle": "day",
              "time": "01:00",
              "format": 2
            }]
          }, {
            "id": 73,
            "name": "报表名称",
            "status": 1,
            "disabled": 0,
            "posttime": "2018-01-02 15:14:14",
            "feeds": []
          }, {
            "id": 72,
            "name": "112233",
            "status": 1,
            "disabled": 0,
            "posttime": "2018-01-02 15:01:06",
            "feeds": [{
              "id": 62,
              "report_id": 85,
              "email": "215200824@qq.com",
              "cycle": "day",
              "time": "01:00",
              "format": 2
            }]
          }, {
            "id": 69,
            "name": "332",
            "status": 1,
            "disabled": 0,
            "posttime": "2017-12-29 14:59:40",
            "feeds": []
          }, {
            "id": 68,
            "name": "1",
            "status": 1,
            "disabled": 0,
            "posttime": "2017-12-29 12:22:29",
            "feeds": []
          }, {
            "id": 59,
            "name": "会员和访问相关",
            "status": 1,
            "disabled": 0,
            "posttime": "2017-12-27 15:32:32",
            "feeds": []
          }, {
            "id": 47,
            "name": "基本表单-扫码、积分、积分商城分析",
            "status": 1,
            "disabled": 0,
            "posttime": "2018-01-04 16:14:14",
            "feeds": []
          },





          {
            "id": 85,
            "name": "hehe1",
            "status": 1,
            "disabled": 0,
            "posttime": "2018-01-04 16:15:00",
            "feeds": [{
                "id": 62,
                "report_id": 85,
                "email": "215200824@qq.com",
                "cycle": "day",
                "time": "01:00",
                "format": 2
              },
              {
                "id": 62,
                "report_id": 85,
                "email": "215200824@qq.com",
                "cycle": "day",
                "time": "01:00",
                "format": 2
              }, {
                "id": 62,
                "report_id": 85,
                "email": "215200824@qq.com",
                "cycle": "day",
                "time": "01:00",
                "format": 2
              }
            ]
          }, {
            "id": 82,
            "name": "1112223333",
            "status": 1,
            "disabled": 0,
            "posttime": "2018-01-04 15:14:47",
            "feeds": [{
              "id": 62,
              "report_id": 85,
              "email": "215200824@qq.com",
              "cycle": "day",
              "time": "01:00",
              "format": 2
            }]
          }, {
            "id": 79,
            "name": "112233",
            "status": 1,
            "disabled": 0,
            "posttime": "2018-01-04 11:08:03",
            "feeds": [{
              "id": 62,
              "report_id": 85,
              "email": "215200824@qq.com",
              "cycle": "day",
              "time": "01:00",
              "format": 2
            }]
          }, {
            "id": 74,
            "name": "23213",
            "status": 1,
            "disabled": 0,
            "posttime": "2018-01-02 15:15:44",
            "feeds": [{
              "id": 62,
              "report_id": 85,
              "email": "215200824@qq.com",
              "cycle": "day",
              "time": "01:00",
              "format": 2
            }]
          }, {
            "id": 73,
            "name": "报表名称",
            "status": 1,
            "disabled": 0,
            "posttime": "2018-01-02 15:14:14",
            "feeds": []
          }, {
            "id": 72,
            "name": "112233",
            "status": 1,
            "disabled": 0,
            "posttime": "2018-01-02 15:01:06",
            "feeds": [{
              "id": 62,
              "report_id": 85,
              "email": "215200824@qq.com",
              "cycle": "day",
              "time": "01:00",
              "format": 2
            }]
          }, {
            "id": 69,
            "name": "332",
            "status": 1,
            "disabled": 0,
            "posttime": "2017-12-29 14:59:40",
            "feeds": []
          }, {
            "id": 68,
            "name": "1",
            "status": 1,
            "disabled": 0,
            "posttime": "2017-12-29 12:22:29",
            "feeds": []
          }, {
            "id": 59,
            "name": "会员和访问相关",
            "status": 1,
            "disabled": 0,
            "posttime": "2017-12-27 15:32:32",
            "feeds": []
          }, {
            "id": 47,
            "name": "基本表单-扫码、积分、积分商城分析",
            "status": 1,
            "disabled": 0,
            "posttime": "2018-01-04 16:14:14",
            "feeds": []
          }


        ],
        dialogFormVisible: false, //是否显示订阅弹窗
        dialogVisible_download: false, //是否显示下载弹窗
        rules: {
          date: [{
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }],
        },
        options: [{
            value: 'day',
            label: '每天'
          },
          {
            value: 'week',
            label: '每周一'
          },
          {
            value: 'month',
            label: '每月一号'
          }
        ],
        send_cycle: [{
            label: "csv",
            value: 2
          },
          {
            label: "html",
            value: 1
          }
        ],
        off: [],
        form: {
          date: "",
          tableData4: [{
            "id": 45,
            "report_id": 35,
            "email": "cuizhipeng@sinreweb.com",
            "cycle": "week",
            "time": "06:00",
            "format": 2
          }, {
            "id": 56,
            "report_id": 35,
            "email": "22@qq.com",
            "cycle": "day",
            "time": "01:00",
            "format": 2
          }, {
            "id": 57,
            "report_id": 35,
            "email": "332@qq.com",
            "cycle": "day",
            "time": "01:00",
            "format": 2
          }, {
            "id": 58,
            "report_id": 35,
            "email": "44@qq.com",
            "cycle": "day",
            "time": "01:00",
            "format": 2
          }, {
            "id": 59,
            "report_id": 35,
            "email": "55@qq.com",
            "cycle": "day",
            "time": "01:00",
            "format": 1
          }],
          down: {
            isDownFDF: false, //是否正在下载PDF
            format: 1, //文件类型
          }
        },
        timeRange: "", //时间范围
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              const reportIframeWindow = document.getElementById("report-iframe").contentWindow
              reportIframeWindow.vm.currentTime = 0
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              const reportIframeWindow = document.getElementById("report-iframe").contentWindow
              start.setTime(start.getTime() - secondsOfDay)
              end.setTime(end.getTime() - secondsOfDay)
              reportIframeWindow.vm.currentTime = -1
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近7天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              const reportIframeWindow = document.getElementById("report-iframe").contentWindow
              start.setTime(start.getTime() - secondsOfDay * 7)
              end.setTime(end.getTime() - secondsOfDay)
              reportIframeWindow.vm.currentTime = 7
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近30天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              const reportIframeWindow = document.getElementById("report-iframe").contentWindow
              start.setTime(start.getTime() - secondsOfDay * 30)
              end.setTime(end.getTime() - secondsOfDay)
              reportIframeWindow.vm.currentTime = 30
              picker.$emit('pick', [start, end])
            }
          }]
        },
        sortConfig: { // 排序条件
          sortName: 'id',
          sortOrder: 'desc',
        },
        pdfFileName: 'report.pdf' // 下载PDF的文件名
      }

    },

    methods: {
      download(formName) {
        if (this.form.down.format == 1) {
          // 如果选择的是CSV
          let timeRange = this.timeRange,
            timeRangeFormat = new Date(timeRange[0]).format("yyyy-MM-dd") + " - " + new Date(timeRange[1]).format(
              "yyyy-MM-dd");
          $ajax.get(INTERFACE.reportfeed.down, {
            params: {
              id: this.id,
              date: timeRangeFormat,
            }
          }).then((res) => {
            if (res.data.err === 0) {
              window.open(res.data.file);
              this.dialogVisible_download = false;
            } else {
              alert(res.data.msg)
            }
          })
        } else {
          // 如果选择的是PDF
          if (this.form.down.isDownFDF) return

          const reportIframeWindow = document.getElementById("report-iframe").contentWindow
          reportIframeWindow.vm.timeRange = this.timeRange
          this.form.down.isDownFDF = true // 提示正在下载PDF文件

          // 更改子窗口站点ID，拉取信息
          if (reportIframeWindow.vm.id !== this.id) {
            reportIframeWindow.vm.id = this.id
          } else {
            reportIframeWindow.vm.getData()
          }
        }
      },
      edit(id) {
        location.href = `/pages/statsreport/config_data.html?id=${id}`
      },
      administration() {
        location.href = "/pages/statsreport/config_data.html"
      },
      jump() {
        location.href = "/pages/statsreport/custom_form_list.html"
      },
      open_dowload(row) {
        // 打开下载弹窗
        const start = new Date();
        const end = new Date();
        start.setTime(start.getTime() - secondsOfDay);
        end.setTime(end.getTime() - secondsOfDay);
        this.timeRange = [start, end];
        this.dialogVisible_download = true

        this.id = row.id

        currentReportName = row.name
      },
      handleSortChange(val) {
        this.sortConfig.sortOrder = val.order == 'ascending' ? 'asc' : 'desc'
        this.getData()
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $ajax.post(INTERFACE.report.delete, {
              params: {
                id: this.id,
                time: this.form.date
              }
            }).then(res => {
              window.open(res.data.url)
              this.dialogVisible_download = false
            })
          } else {
            return false
          }
        });
      },
      change(scope) {
        this.id = scope.row.id;
        let currentData = this.tableData[scope.$index]
        $ajax.post(INTERFACE.report.status, {
          id: this.id,
          status: currentData.status,
        }).then((res) => {
          if (res.data.err == 0) {
            this.$message.success(res.data.msg)
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      handleIconClick() {
        $ajax({
          url: INTERFACE.manage_list.search,
          method: "get",
          params: {
            search_input: this.search_input
          }
        }).then((res) => {
          this.tableData = [];
          for (var i = 0; i < res.data.length; i++) {
            this.tableData.push(res.data[i])
          }
        })
      },
      del(scope) {
        this.id = scope.row.id
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
        }).then(() => {
          $ajax.post(INTERFACE.report.delete, {
            id: this.id
          }).then((res) => {
            if (res.data.err == 0) {
              this.tableData.splice(scope.$index, 1)
              this.$message.success('删除成功!')
            }
          })
        }).catch(() => {
          this.$message.error('已取消删除')
        })
      },
      del_dia(scope) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
        }).then(() => {
          $ajax({
            url: INTERFACE.reportfeed.del,
            method: "post",
            data: {
              id: scope.row.id, //选择的模板
            }
          }).then((res) => {
            if (res.data.err == 0) {
              this.form.tableData4.splice(scope.$index, 1)
              this.$message.success('删除成功!')
              this.tableData = null
              this.getData()
            } else {
              this.$message.error(res.data.msg)
            }
          })
        }).catch(() => {
          this.$message.info('已取消删除')
        })
      },
      open_d(scope) {
        this.id = scope.row.id
        this.dialogFormVisible = true

        this.off = []
        for (let i = 0; i < 5; i++) {
          this.off.push({
            state: false
          })
        }

      },
      close_d() {
        this.dialogFormVisible = false;
      },
      kaiqishuru(scope) {
        this.off[scope.$index].state = true
      },
      handleIconClick() {
        $ajax.get(INTERFACE.report.lists, {
          params: {
            name: this.search_input
          }
        }).then(res => {
          this.tableData = res.data.rows
        })
      },
      add(scope) {
        var id = this.form.tableData4[scope.$index].id

        $ajax.post(INTERFACE.reportfeed.edit, {
          info: this.form.tableData4[scope.$index],
          id: id
        }).then((res) => {
          if (res.data.err == 0) {
            this.$message.success(res.data.msg)
          } else {
            this.$message.error(res.data.msg)
          }
        })
        this.off[scope.$index].state = false
        $ajax.get(INTERFACE.report.lists)
          .then((res) => {
            this.tableData = res.data.rows

          });
      },
      getData() {
        let params = _.extend({
          pageSize: this.pageSize,
          pageNumber: this.currentPage
        }, this.sortConfig)
        $ajax.get(INTERFACE.report.lists, {
          params
        }).then((res) => {
          this.total = res.data.total
          this.tableData = res.data.rows
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.currentPage = 1
        this.getData()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getData()
      },
    },



  }

</script>
<style scoped>
  #report_management {

    padding: 16px;
  }

  .search_input {
    float: right;
    width: 300px;
  }

  #report_management .header {
    border: none
  }

</style>
