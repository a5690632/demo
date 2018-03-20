<template>
  <div id="data_report" v-cloak class="wrapper-content animated fadeInRight">

    <div class="root-content">

      <el-row>

        <el-col :span="24">

          <el-radio-group v-model="id" class="report-list">

            <el-radio-button v-for="(item, index) in reportList" :label="item.id" :key="item.id">
              {{item.name}}
            </el-radio-button>

          </el-radio-group>

        </el-col>

        <el-button-group class="subscribe-group">

          <el-button type="primary" icon="fa-download" @click="show_dowload" title="下载"></el-button>

          <el-button type="primary" icon="fa-rss" @click="show_send" title="订阅"></el-button>

        </el-button-group>

      </el-row>

      <div class="model-box">

        <h1 class="model-title">
          {{name}}
        </h1>

        <el-row class="time-control-layout">

          <el-radio-group v-model="currentTime">

            <el-radio-button v-for="(item, index) in timeButtonGroup" :label="item.value">
              {{item.name}}



            </el-radio-button>

          </el-radio-group>

          <el-date-picker v-model="timeRange" type="daterange" placeholder="选择日期范围" :picker-options="pickerOptions" :editable="false"
            style="margin-left: 150px;"></el-date-picker>

          <el-button @click="statistics" class="m-l-xs">统计</el-button>

        </el-row>

        <div class="model-list clearfix">

          <div :class="[item.modelType == 'table' ? 'model2' : 'model']" v-for="(item, index) in configList" :key="item.idPrefix + item.alias + item.id">

            <!-- 渲染echarts图标 -->

            <template v-if="item.modelType == 'echart'">

              <el-card class="box-card">

                <div class="box-card-head" slot="header">

                  <span> {{item.name}}



                  </span>

                </div>

                <div class="echart-box" :id="item.idPrefix + '-' + item.alias"></div>

              </el-card>
            </template>
            <!-- 渲染bootstrap表格 -->
            <template v-if="item.modelType == 'table'">
              <el-card class="box-card">
                <div class="box-card-head" slot="header">
                  <span>
                    {{item.name}}
                  </span>
                </div>
                <table :id="item.idPrefix + '-' + item.alias"></table>
              </el-card>
            </template>
            <!-- 渲染漏斗 -->
            <template v-if="item.modelType == 'funnel'">
              <el-card class="box-card">

                <div class="box-card-head" slot="header">

                  <span> {{item.name}}



                  </span>

                </div>

                <div class="funnel-box" :id="item.idPrefix + '-' + item.alias"></div>

              </el-card>
            </template>
          </div>
        </div>
      </div>
      <el-dialog :visible.sync="dialogVisible_send" size="tiny" :close-on-click-modal="false">
        <el-form :model="form.info" :rules="rules" ref="ruleForm" label-width="100px" label-suffix="：">
          <el-form-item label="邮箱地址" prop="email">
            <el-input v-model="form.info.email" placeholder="请填写您的邮箱地址"></el-input>
          </el-form-item>
          <el-form-item label="文件类型" prop="format">
            <el-radio-group v-model="form.info.format">
              <el-radio :label="2">csv</el-radio>
              <el-radio :label="1">html</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="发送周期" prop="cycle">
            <el-radio-group v-model="form.info.cycle">
              <el-radio label="day">每天</el-radio>
              <el-radio label="week">每周一</el-radio>
              <el-radio label="month">每月一号</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="发送时间" prop="time">
            <el-time-select v-model="form.info.time" :picker-options="{start: '00:00', step: '01:00', end: '23:00'}" placeholder="请选择发送时间"></el-time-select>
          </el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" class="send">确定</el-button>
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
          <el-button type="primary" @click="download" class="download">下载</el-button>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import 'assets/css//bootstrap-table.min.css'
  import 'assets/js/bootstrap-table.min.js'
  import echarts from 'echarts'
  import "../../assets/js/util"
  import "../../assets/js/type-list"
  import "../../assets/js/data-config/echarts-config/control_nodata"
  import "../../assets/js/data-config/funnel-config/control_nodata"
  import "../../assets/js/data-config/table-config/control_nodata"
  



  const secondsOfDay = 3600 * 1000 * 24; //一天的秒数
  export default {

    data() {
     

      // 根据模型别名获取模型类型 echart 或 table
     

      // 禁用当前级联菜单项 并 返回当前菜单项
    

      // 向configList添加生成统计图表和表格所需的数据格式
     
      return {

        dialogVisible_download: false, //是否显示下载弹窗

        dialogVisible_send: false, //是否显示订阅弹窗

        reportList: [], //数据报表-列表

        id: "74", //当前数据报表ID

        name: "123456", //当前数据报表名称

        configList: [], //当前数据报表的统计模块 {type: "base", model: "overview", name: "概览"}

        setting: {}, //当前数据报表配置信息

        timeButtonGroup: [{

            value: 0,

            name: "今天"

          },

          {

            value: -1,

            name: "昨天"

          },

          {

            value: 7,

            name: "最近七天"

          },

          {

            value: 30,

            name: "最近30天"

          },

        ],

        currentTime: "", //选择哪一天

        timeRange: "", //时间范围

        pickerOptions: {

          shortcuts: [{

              text: '今天',

              onClick(picker) {

                const end = new Date();

                const start = new Date();

                this.currentTime = 0;

                picker.$emit('pick', [start, end]);

              }

            },

            {

              text: '昨天',

              onClick(picker) {

                const end = new Date();

                const start = new Date();

                start.setTime(start.getTime() - secondsOfDay);

                end.setTime(end.getTime() - secondsOfDay);

                this.currentTime = -1;

                picker.$emit('pick', [start, end]);

              }

            },

            {

              text: '最近7天',

              onClick(picker) {

                const end = new Date();

                const start = new Date();

                start.setTime(start.getTime() - secondsOfDay * 7);

                end.setTime(end.getTime() - secondsOfDay);

                this.currentTime = 7;

                picker.$emit('pick', [start, end]);

              }

            },

            {

              text: '最近30天',

              onClick(picker) {

                const end = new Date();

                const start = new Date();

                start.setTime(start.getTime() - secondsOfDay * 30);

                end.setTime(end.getTime() - secondsOfDay);

                this.currentTime = 30;

                picker.$emit('pick', [start, end]);

              }

            }

          ]

        },
        data1: {
          "base": [{
            "name": "平台访问分析",
            "alias": "platform",
            "pages": [{
              "name": "网站概况",
              "alias": "site_overview",
              "pages": [{
                "name": "概况",
                "alias": "overview"
              }, {
                "name": "访客地图",
                "alias": "visit_map"
              }, {
                "name": "受访页面排行",
                "alias": "visit_toppage"
              }, {
                "name": "来源网站排行",
                "alias": "visit_source"
              }]
            }, {
              "name": "趋势分析",
              "alias": "trend_analysis",
              "pages": [{
                "name": "趋势分析（表）",
                "alias": "trend_table"
              }, {
                "name": "趋势分析（图）",
                "alias": "trend_pic"
              }, {
                "name": "访问详情",
                "alias": "trend_all"
              }]
            }, {
              "name": "页面分析",
              "alias": "pages_analysis",
              "pages": [{
                "name": "页面分析",
                "alias": "page"
              }]
            }, {
              "name": "事件分析",
              "alias": "event_analysis",
              "pages": [{
                "name": "事件类型",
                "alias": "event_category"
              }, {
                "name": "事件行为",
                "alias": "event_action"
              }, {
                "name": "事件名称",
                "alias": "event_name"
              }]
            }, {
              "name": "推广分析",
              "alias": "spread_analysis",
              "pages": [{
                "name": "来源分析（图）",
                "alias": "source_pic"
              }, {
                "name": "来源分析（表）",
                "alias": "source_table"
              }, {
                "name": "渠道分析（表）",
                "alias": "channel_all"
              }, {
                "name": "渠道分析（图）",
                "alias": "channel_pic"
              }, {
                "name": "渠道分析（表2）",
                "alias": "channel_detail"
              }]
            }, {
              "name": "漏斗分析",
              "alias": "funnel_analysis",
              "pages": []
            }]
          }, {
            "name": "访客分析",
            "alias": "visitor",
            "pages": [{
              "name": "地域分布",
              "alias": "visitor_area",
              "pages": [{
                "name": "地域分布（图）",
                "alias": "district_pic"
              }, {
                "name": "地域分布（表）",
                "alias": "district_table"
              }]
            }, {
              "name": "系统环境",
              "alias": "visitor_env",
              "pages": [{
                "name": "操作系统类型",
                "alias": "client_os"
              }, {
                "name": "浏览器类型",
                "alias": "browser"
              }, {
                "name": "设备类型",
                "alias": "device"
              }]
            }, {
              "name": "实时访客",
              "alias": "visitor_live",
              "pages": [{
                "name": "实时访客",
                "alias": "trend_latest"
              }]
            }]
          }, {
            "name": "会员分析",
            "alias": "member",
            "pages": [{
              "name": "会员分析",
              "alias": "member_analysis",
              "pages": [{
                "name": "注册会员总数",
                "alias": "member_number"
              }, {
                "name": "基本统计",
                "alias": "member_basic"
              }, {
                "name": "平台来源（图）",
                "alias": "source_platform"
              }, {
                "name": "渠道来源（图）",
                "alias": "source_channel"
              }, {
                "name": "会员注册来源",
                "alias": "source_member"
              }, {
                "name": "性别分布（图）",
                "alias": "member_sex"
              }, {
                "name": "年龄分布（图）",
                "alias": "member_age"
              }, {
                "name": "地域分布（表）",
                "alias": "member_map"
              }, {
                "name": "会员等级分布（图）",
                "alias": "member_rank"
              }, {
                "name": "会员偏好（图）",
                "alias": "member_preferences"
              }]
            }]
          }, {
            "name": "扫码分析",
            "alias": "scan",
            "pages": [{
              "name": "扫码分析",
              "alias": "scancode_analysis",
              "pages": [{
                "name": "扫码总览（图）",
                "alias": "scancode"
              }, {
                "name": "扫码地域统计",
                "alias": "scancode_map"
              }, {
                "name": "批次号统计",
                "alias": "batch"
              }]
            }]
          }, {
            "name": "积分分析",
            "alias": "point",
            "pages": [{
              "name": "积分分析",
              "alias": "point_analysis",
              "pages": [{
                "name": "会员积分获取（图）",
                "alias": "point_get"
              }, {
                "name": "会员积分消耗（图）",
                "alias": "point_spend"
              }, {
                "name": "积分获取消耗情况",
                "alias": "point_statistics"
              }]
            }]
          }, {
            "name": "积分商城分析",
            "alias": "pointmall",
            "pages": [{
              "name": "积分商城分析",
              "alias": "pointmall_analysis",
              "pages": [{
                "name": "概览",
                "alias": "pointmall_statistics"
              }, {
                "name": "积分商城兑换情况",
                "alias": "pointmall_exchange"
              }]
            }]
          }],
          "activitys": {
            "items": [{
              "id": 1,
              "name": "演示活动",
              "stats_siteid": 10
            }, {
              "id": 2,
              "name": "测试",
              "stats_siteid": 0
            }, {
              "id": 3,
              "name": "123",
              "stats_siteid": 13
            }, {
              "id": 4,
              "name": "宋-测试活动",
              "stats_siteid": 49
            }, {
              "id": 5,
              "name": "444",
              "stats_siteid": 0
            }],
            "forms": [{
              "name": "平台访问分析",
              "alias": "platform",
              "pages": [{
                "name": "网站概况",
                "alias": "site_overview",
                "pages": [{
                  "name": "概况",
                  "alias": "overview"
                }, {
                  "name": "访客地图",
                  "alias": "visit_map"
                }, {
                  "name": "受访页面排行",
                  "alias": "visit_toppage"
                }, {
                  "name": "来源网站排行",
                  "alias": "visit_source"
                }]
              }, {
                "name": "趋势分析",
                "alias": "trend_analysis",
                "pages": [{
                  "name": "趋势分析（表）",
                  "alias": "trend_table"
                }, {
                  "name": "趋势分析（图）",
                  "alias": "trend_pic"
                }, {
                  "name": "访问详情",
                  "alias": "trend_all"
                }]
              }, {
                "name": "页面分析",
                "alias": "pages_analysis",
                "pages": [{
                  "name": "页面分析",
                  "alias": "page"
                }]
              }, {
                "name": "事件分析",
                "alias": "event_analysis",
                "pages": [{
                  "name": "事件类型",
                  "alias": "event_category"
                }, {
                  "name": "事件行为",
                  "alias": "event_action"
                }, {
                  "name": "事件名称",
                  "alias": "event_name"
                }]
              }, {
                "name": "推广分析",
                "alias": "spread_analysis",
                "pages": [{
                  "name": "来源分析（图）",
                  "alias": "source_pic"
                }, {
                  "name": "来源分析（表）",
                  "alias": "source_table"
                }, {
                  "name": "渠道分析（表）",
                  "alias": "channel_all"
                }, {
                  "name": "渠道分析（图）",
                  "alias": "channel_pic"
                }, {
                  "name": "渠道分析（表2）",
                  "alias": "channel_detail"
                }]
              }, {
                "name": "漏斗分析",
                "alias": "funnel_analysis",
                "pages": []
              }]
            }, {
              "name": "访客分析",
              "alias": "visitor",
              "pages": [{
                "name": "地域分布",
                "alias": "visitor_area",
                "pages": [{
                  "name": "地域分布（图）",
                  "alias": "district_pic"
                }, {
                  "name": "地域分布（表）",
                  "alias": "district_table"
                }]
              }, {
                "name": "系统环境",
                "alias": "visitor_env",
                "pages": [{
                  "name": "操作系统类型",
                  "alias": "client_os"
                }, {
                  "name": "浏览器类型",
                  "alias": "browser"
                }, {
                  "name": "设备类型",
                  "alias": "device"
                }]
              }, {
                "name": "实时访客",
                "alias": "visitor_live",
                "pages": [{
                  "name": "实时访客",
                  "alias": "trend_latest"
                }]
              }]
            }]
          },
          "customized": {
            "items": [{
              "id": 1,
              "name": "数据报表1",
              "sqls": "select * from fjdlsa_junior"
            }, {
              "id": 15,
              "name": "数据报表2",
              "sqls": "select * from fjdlsa_junior"
            }, {
              "id": 16,
              "name": "数据报表3",
              "sqls": "select * from fjdlsa_junior"
            }, {
              "id": 19,
              "name": "11122233344",
              "sqls": "select * from fjdlsa_junior"
            }, {
              "id": 20,
              "name": "表单名称",
              "sqls": "select * from fjdlsa_junior"
            }, {
              "id": 22,
              "name": "活动表单",
              "sqls": "select id,expand0 as 姓名,expand1 as 手机 from fjdlsa_activity2_form"
            }, {
              "id": 23,
              "name": "312313",
              "sqls": "select阿斯蒂芬"
            }, {
              "id": 24,
              "name": "444555666",
              "sqls": "select"
            }, {
              "id": 27,
              "name": "dddddddd",
              "sqls": "select id,expand0 as 姓名,expand1 as 手机 from fjdlsa_activity2_form"
            }, {
              "id": 28,
              "name": "sss",
              "sqls": "select id,expand0 as 姓名,expand1 as 手机 from fjdlsa_activity2_form"
            }, {
              "id": 29,
              "name": "rrrr",
              "sqls": "select id,expand0 as 姓名,expand1 as 手机 from fjdlsa_activity2_form"
            }, {
              "id": 30,
              "name": "112233",
              "sqls": "select"
            }]
          }
        },
        data2: {
          "total": 22,
          "rows": [{
            "id": 76,
            "name": "再试试表格字段筛选",
            "status": 1,
            "disabled": 0,
            "posttime": "2018-01-03 10:45:54",
            "feeds": []
          }, {
            "id": 75,
            "name": "表单字段筛选测试",
            "status": 1,
            "disabled": 0,
            "posttime": "2018-01-02 18:10:19",
            "feeds": []
          }, {
            "id": 1,
            "name": "报表名称",
            "status": 1,
            "disabled": 0,
            "posttime": "2018-01-02 15:49:40",
            "feeds": [{
              "id": 61,
              "report_id": 1,
              "email": "327506578@qq.com",
              "cycle": "week",
              "time": "10:20",
              "format": 1
            }]
          }, {
            "id": 74,
            "name": "23213",
            "status": 1,
            "disabled": 0,
            "posttime": "2018-01-02 15:15:44",
            "feeds": []
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
            "feeds": []
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
            "posttime": "2017-12-27 15:23:47",
            "feeds": []
          }, {
            "id": 35,
            "name": "基本表单",
            "status": 1,
            "disabled": 0,
            "posttime": "2017-12-19 18:31:14",
            "feeds": [{
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
            }]
          }, {
            "id": 46,
            "name": "基本表单-会员分析",
            "status": 1,
            "disabled": 0,
            "posttime": "2017-12-19 18:17:28",
            "feeds": []
          }, {
            "id": 45,
            "name": "基本表单-访客分析",
            "status": 1,
            "disabled": 0,
            "posttime": "2017-12-19 18:16:18",
            "feeds": []
          }, {
            "id": 44,
            "name": "基本表单-平台访问分析",
            "status": 1,
            "disabled": 0,
            "posttime": "2017-12-19 18:15:21",
            "feeds": [{
              "id": 60,
              "report_id": 44,
              "email": "cuizhipeng@sinreweb.com",
              "cycle": "day",
              "time": "06:00",
              "format": 2
            }]
          }, {
            "id": 34,
            "name": "cuizp",
            "status": 2,
            "disabled": 0,
            "posttime": "2017-12-19 17:55:24",
            "feeds": []
          }, {
            "id": 30,
            "name": "haha（该统计中可复现BUG勿删）",
            "status": 2,
            "disabled": 0,
            "posttime": "2017-12-19 15:30:53",
            "feeds": []
          }, {
            "id": 38,
            "name": "单天和多天1",
            "status": 2,
            "disabled": 0,
            "posttime": "2017-12-19 13:58:46",
            "feeds": [{
              "id": 36,
              "report_id": 38,
              "email": "cuizhipeng@sinreweb.com",
              "cycle": "day",
              "time": "17:00",
              "format": 2
            }]
          }, {
            "id": 21,
            "name": "数据报表测试1",
            "status": 2,
            "disabled": 0,
            "posttime": "2017-12-18 18:37:37",
            "feeds": []
          }, {
            "id": 37,
            "name": "定制表单",
            "status": 2,
            "disabled": 0,
            "posttime": "2017-12-18 16:52:12",
            "feeds": []
          }, {
            "id": 36,
            "name": "活动表单",
            "status": 2,
            "disabled": 0,
            "posttime": "2017-12-18 16:51:40",
            "feeds": [{
              "id": 38,
              "report_id": 36,
              "email": "cuizhipeng@sinreweb.com",
              "cycle": "day",
              "time": "04:00",
              "format": 2
            }]
          }, {
            "id": 33,
            "name": "1111111（有的模块没数据，返回的数",
            "status": 2,
            "disabled": 0,
            "posttime": "2017-12-18 12:00:11",
            "feeds": []
          }, {
            "id": 32,
            "name": "3333341112",
            "status": 2,
            "disabled": 0,
            "posttime": "2017-12-13 18:26:10",
            "feeds": []
          }]
        },
        data3: {
          "data": {
            "id": 76,
            "name": "再试试表格字段筛选",
            "setting": {
              "base": [{
                "label": "point_statistics",
                "fields": ["type_20004", "type_20005", "type_20006", "type_20007", "type_20008", "type_40001",
                  "type_40002", "type_40003", "type_50001", "type_50002", "type_50003", "type_50004",
                  "type_61300", "type_61301", "type_61600", "type_71000"
                ]
              }],
              "activity": [{
                "id": 1,
                "label": "trend_all",
                "siteid": 10,
                "fields": ["jumpOutRate", "avgVisitTime", "avgVisitPage"]
              }, {
                "id": 4,
                "label": "event_category",
                "siteid": 49,
                "fields": ["eventVal", "eventNum"]
              }],
              "customized": [{
                "name": "数据报表1",
                "id": 1,
                "sql": "select * from fjdlsa_junior",
                "fields": ["thumb", "keywords", "description", "url", "islink", "listorder", "status", "username",
                  "inputtime", "updatetime"
                ]
              }]
            },
            "status": 1,
            "disabled": 0,
            "posttime": "2018-01-03 10:45:54"
          }
        },
        data4: 
          {"err":0,"data":{"base":{"point_statistics":{"config":[{"field":"empty","name":"积分类型"},{"field":"type_10001","name":"积分码扫码"},{"field":"type_20001","name":"完善信息"},{"field":"type_20002","name":"签到"},{"field":"type_20003","name":"邀请好友"},{"field":"type_20004","name":"注册"},{"field":"type_20005","name":"被邀请奖励"},{"field":"type_20006","name":"积分清零"},{"field":"type_20007","name":"帐号合并"},{"field":"type_20008","name":"违规扣分"},{"field":"type_40001","name":"积分商城"},{"field":"type_40002","name":"积分返还"},{"field":"type_40003","name":"积分商城获得"},{"field":"type_50001","name":"发帖"},{"field":"type_50002","name":"回复"},{"field":"type_50003","name":"点赞"},{"field":"type_50004","name":"抢楼活动"},{"field":"type_61300","name":"抽奖"},{"field":"type_61301","name":"抽奖消耗"},{"field":"type_61600","name":"生日贺礼"},{"field":"type_71000","name":"事件营销"}],"items":[{"empty":"积分","type_10001":1400,"type_20007":10,"type_40001":-800,"type_40002":1000,"type_20001":0,"type_20002":0,"type_20003":0,"type_20004":0,"type_20005":0,"type_20006":0,"type_20008":0,"type_40003":0,"type_50001":0,"type_50002":0,"type_50003":0,"type_50004":0,"type_61300":0,"type_61301":0,"type_61600":0,"type_71000":0},{"empty":"胜利币","type_20001":601,"type_20007":20,"type_50001":18,"type_50002":20,"type_50003":24,"type_50004":90,"type_10001":0,"type_20002":0,"type_20003":0,"type_20004":0,"type_20005":0,"type_20006":0,"type_20008":0,"type_40001":0,"type_40002":0,"type_40003":0,"type_61300":0,"type_61301":0,"type_61600":0,"type_71000":0},{"empty":"胜利分","type_20002":288,"type_10001":0,"type_20001":0,"type_20003":0,"type_20004":0,"type_20005":0,"type_20006":0,"type_20007":0,"type_20008":0,"type_40001":0,"type_40002":0,"type_40003":0,"type_50001":0,"type_50002":0,"type_50003":0,"type_50004":0,"type_61300":0,"type_61301":0,"type_61600":0,"type_71000":0},{"empty":"拓展积分","type_20003":100,"type_61300":-250,"type_10001":0,"type_20001":0,"type_20002":0,"type_20004":0,"type_20005":0,"type_20006":0,"type_20007":0,"type_20008":0,"type_40001":0,"type_40002":0,"type_40003":0,"type_50001":0,"type_50002":0,"type_50003":0,"type_50004":0,"type_61301":0,"type_61600":0,"type_71000":0}]}},"activity":{"1":{"trend_all":{"items":[{"empty":"2018-01-02","browseNum":32,"visitorNum":19,"newVisitor":15,"newVisitorRate":"78.95%","jumpOutRate":"68%","avgVisitTime":"01:37","avgVisitPage":1.7}]}},"4":{"event_category":{"items":[{"type":"第1题","visitNum":4,"visitorNum":4,"eventNum":5,"eventVal":0,"expandDetail":[{"type":"第1个选项","visitNum":2,"visitorNum":2,"eventNum":3,"eventVal":0},{"type":"第3个选项","visitNum":2,"visitorNum":2,"eventNum":2,"eventVal":0}]},{"type":"第2题","visitNum":4,"visitorNum":4,"eventNum":5,"eventVal":0,"expandDetail":[{"type":"第1个选项","visitNum":3,"visitorNum":3,"eventNum":4,"eventVal":0},{"type":"第2个选项","visitNum":1,"visitorNum":1,"eventNum":1,"eventVal":0}]},{"type":"第3题","visitNum":4,"visitorNum":4,"eventNum":5,"eventVal":0,"expandDetail":[{"type":"第2个选项","visitNum":3,"visitorNum":3,"eventNum":3,"eventVal":0},{"type":"第1个选项","visitNum":1,"visitorNum":1,"eventNum":1,"eventVal":0},{"type":"第3个选项","visitNum":1,"visitorNum":1,"eventNum":1,"eventVal":0}]},{"type":"提交答案","visitNum":4,"visitorNum":4,"eventNum":5,"eventVal":0},{"type":"点击把手开门","visitNum":4,"visitorNum":4,"eventNum":5,"eventVal":0},{"type":"进入答题页","visitNum":4,"visitorNum":4,"eventNum":6,"eventVal":0},{"type":"第4题","visitNum":4,"visitorNum":4,"eventNum":5,"eventVal":0,"expandDetail":[{"type":"第3个选项","visitNum":3,"visitorNum":3,"eventNum":4,"eventVal":0},{"type":"第1个选项","visitNum":1,"visitorNum":1,"eventNum":1,"eventVal":0}]},{"type":"一起5夜狂欢","visitNum":2,"visitorNum":2,"eventNum":3,"eventVal":0},{"type":"继续帮助小姐姐","visitNum":1,"visitorNum":1,"eventNum":1,"eventVal":0},{"type":"秒变VIP","visitNum":1,"visitorNum":1,"eventNum":1,"eventVal":0}]}}},"customized":{"1":[{"id":1,"catid":71,"title":"《变5》观影会，纯甄又双叒红啦","thumb":"","keywords":"变形金刚5","description":"《变5》观影会，纯甄又双叒红啦","url":"","islink":0,"listorder":0,"status":1,"username":"admin","inputtime":1499078702,"updatetime":1499078827}]},"field_filter":{"base":{"point_statistics":["type_20004","type_20005","type_20006","type_20007","type_20008","type_40001","type_40002","type_40003","type_50001","type_50002","type_50003","type_50004","type_61300","type_61301","type_61600","type_71000"]},"activity":{"1":{"trend_all":["jumpOutRate","avgVisitTime","avgVisitPage"]},"4":{"event_category":["eventVal","eventNum"]}},"customized":{"1":["thumb","keywords","description","url","islink","listorder","status","username","inputtime","updatetime"]}}}},
        
        optionsData: {

          //级联菜单

          base: [

          ], //基本表单级联菜单

          activitys: [], //活动表单级联菜单

          customized: [] //定制表单列表

        },

        form: {

          info: {

            report_id: "", //数据报表ID

            cycle: "", //发送周期

            email: "", //邮箱地址

            format: "", //文件类型

            time: "", //发送时间

          },

          down: {

            format: 1, //文件类型

          }

        },

        loading: true, //统计报表是否在加载数据

        dataCache: {}, //数据缓存，缓存数据只针对本次访问

        rules: {

          email: [{

            required: true,

            message: '请输入邮箱地址',

            trigger: 'change'

          }],

          format: [{

            required: true,

            type: "number",

            message: '请选择文件类型',

            trigger: 'change'

          }],

          time: [{

            required: true,

            message: '请选择发送时间',

            trigger: 'change'

          }],

          cycle: [{

            required: true,

            message: '请选择发送周期',

            trigger: 'change'

          }],

        },

        pdfFileName: 'report.pdf', // 下载PDF的文件名

      }

    },

    methods: {
    // aliasToName(alias) {
    //     let name;
    //     (function filter(array) {
    //       array.forEach((item) => {
    //         if (_.isArray(item.pages)) {
    //           filter(item.pages);
    //         } else {
    //           if (item.alias == alias) {
    //             name = item.name;
    //           }
    //         }
    //       });
    //     })(this.optionsData.base);
    //     return name;
    //   },
      getModelType(alias){
        let modelType;
        typeList.forEach((item) => {
          for (var i = 0, len = item.list.length; i < len; i++) {
            if (item.list[i].test(alias)) {
              if (item.type == "echart") {
                modelType = "echart"; //图表
              } else if (item.type == "table") {
                modelType = "table"; //表格
              } else if (item.type == "funnel") {
                modelType = "funnel"; //漏斗
              }
              ////break;
            }
          }
        });
        return modelType ? modelType : "dzbd"; //如果没有匹配的类型，则认为是定制表单
      },
      disabledCascaderItem(array, value) {
        var currentItem;
        (function filter(array, value) {
          array.forEach((item) => {
            if (_.isArray(item.pages)) {
              filter(item.pages, value);
            } else {
              if (item.alias == value) {
                item.disabled = true;
                currentItem = item;
              }
            }
          });
        })(array, value);
        return currentItem;
      },
      addConfigList(type, opt){
        if (type == "base") {
          this.configList.push({
            modelType: this.getModelType(opt.alias), //模型类型 echart table
            type: "base", //模块类型
            idPrefix: "base", //生成div时的id前缀
            alias: opt.alias.replace('$', ''), //模块别名
            name: `基本表单 - ${aliasToName(opt.alias)}`, //模块标题
            data: opt.data, //统计数据
            id:this.id, //当前报表ID，用来生成唯一的key防止图表发生重叠的情况
          })
        } else if (type == "activity") {
          this.configList.push({
            modelType: this.getModelType(opt.currentItem.alias), //模型类型 echart table
            type: "activity", //模块类型
            idPrefix: `activity${opt.currentActivity.id}`, //生成div时的id前缀
            alias: opt.currentItem.alias, //模块别名
            name: `活动表单 - ${opt.currentActivity.name} - ${opt.currentItem.name}`, //模块标题
            data: opt.data, //统计数据
            id: this.id, //当前报表ID，用来生成唯一的key防止图表发生重叠的情况
          })
        } else if (type == "customized") {
          this.configList.push({
            modelType: "table", //模型类型 dzbd(定制表单)
            type: "dzbd", //模块类型
            idPrefix: `dzbd`, //生成div时的id前缀
            alias: opt.currentCustomized.id, //模块别名
            name: `定制表单 - ${opt.currentCustomized.name}`, //模块标题
            data: opt.data, //统计数据
            id: this.id, //当前报表ID，用来生成唯一的key防止图表发生重叠的情况
          })
        }
      },

      show_send() {

        this.dialogVisible_send = true;

      },

      show_dowload() {

        this.dialogVisible_download = true;

      },

      download(formName) {

        if (this.form.down.format == 1) {

          // 如果选择的是CSV

          let timeRange = this.timeRange,

            timeRangeFormat = new Date(timeRange[0]).format("yyyy-MM-dd") + " - " + new Date(timeRange[1]).format(

              "yyyy-MM-dd");

          // $ajax.get(INTERFACE.customized.down, {

          //   params: {

          //     id: this.id,

          //     date: timeRangeFormat,

          //   }

          // }).then((res) => {

          //   if (res.data.err === 0) {

          //     window.open(res.data.file);

          //     this.dialogVisible_download = false;

          //   } else {

          //     alert(res.data.msg)

          //   }

          // });

        } else {

          // 如果选择的是PDF

          let modelBox = document.querySelector('.model-box'),

            pdfSize = [],

            timeRange = this.timeRange;

          this.pdfFileName = this.name + '(' + new Date(timeRange[0]).format("yyyy-MM-dd") + " - " + new Date(timeRange[

            1]).format("yyyy-MM-dd") + ')'

          if (modelBox.clientHeight < 1500) {

            pdfSize = [parseInt(modelBox.clientWidth * 0.7),

              1500

            ];

          } else {

            pdfSize = [parseInt(modelBox.clientWidth * 0.7),

              parseInt(modelBox.clientHeight * 0.7)

            ];

          }

          let jsPdfDoc = new jsPDF('p', 'pt', pdfSize); //实例化jspdf

          let options = {

            pagesplit: false,

          };

          jsPdfDoc.addHTML(modelBox, options, () => {

            jsPdfDoc.save(this.pdfFileName);

            this.dialogVisible_download = false;

          });

        }

      },

      statistics() {

        //自定义时间范围查询

        this.getData();

      },

      getReportSetting() {

        // $ajax.get(INTERFACE.customized.getData, {

        //   params: {

        //     id: this.id

        //   }

        // }).then((res) => {

        //   //初始化统计图表和表格

        //   this.name = res.data.data.name

        //   this.setting = res.data.data.setting

        //   this.getData()

        // })

      },

      getData() {

        // 根据数据报表ID查询对应的统计数据
        
        let timeRange = this.timeRange,

          timeRangeFormat = new Date(timeRange[0]).format("yyyy-MM-dd") + " - " + new Date(timeRange[1]).format(

            "yyyy-MM-dd");

        this.loading = true; //先检测数据是否有缓存，如果有就使用缓存数据，缓存数据只针对本次访问

        if (this.dataCache[this.id][timeRangeFormat]) {

          this.initData(this.dataCache[this.id][timeRangeFormat].data);

          return;

        }
      
        this.initData(this.data4); //格式化数据
      },

      initData(res) {
     
        //将返回的数据进行格式化，然后渲染到图表或表格中

        let setting = this.setting

        this.configList = [] // 该功能已完成，待宋震完善后台，勿删此代码
         
        // 根据配置时的拖拽顺序进行排序渲染

        // const sortableList = ["base-visit_map", "base-overview", "activity1-visit_map", "activity2-visit_map", "dzbd-16", "activity1-overview", "activity2-overview", "dzbd-1"]

        // sortableList.forEach(item => {

        //     const sortableAlias = item.split('-')[1]

        //     if (/base/.test(item)) {

        //         // 基础组件

        //         setting.base.forEach(item2 => {

        //             const alias = item2

        //             if (sortableAlias === alias) {

        //                 //将返回的统计数据，添加到configList中

        //                 const data = res.data.base[alias] ? res.data.base[alias] : ''

        //                 this.addConfigList("base", {alias, data})

        //             }

        //         })

        //     } else if (/activity/.test(item)) {

        //         // 活动组件

        //         console.log(2,item)

        //         const activityID = parseInt(item.split('-')[0].replace('activity', ''))

        //         console.log(2,item,activityID)

        //         setting.activity.forEach(item2 =>{

        //             if(activityID === item2.id) {

        //                 const currentActivity = _.find(this.optionsData.activitys, o => {

        //                     return o.id == item2.id

        //                 })

        //                 const currentItem = this.disabledCascaderItem(currentActivity.pages, item2.label)

        //                 if(sortableAlias === currentItem.alias){

        //                     let data = "",

        //                     activityData = res.data.activity[currentActivity.id];

        //                     if(activityData){

        //                         //将返回的统计数据，添加到configList中

        //                         data = activityData[currentItem.alias] ? activityData[currentItem.alias] : ''

        //                     }

        //                     this.addConfigList("activity", {currentActivity, currentItem, data})

        //                 }

        //             }

        //         })

        //     } else if (/dzbd/.test(item)) {

        //         // 定制表单

        //         setting.customized.forEach(item2 => {

        //             if(parseInt(sortableAlias) === item2.id) {

        //                 try{

        //                     let currentCustomized = _.find(this.optionsData.customized, o => {

        //                         return o.id == item2.id

        //                     })

        //                     //将返回的统计数据，添加到configList中

        //                     let data = res.data.customized[currentCustomized.id] ? res.data.customized[currentCustomized.id] : ''

        //                

        //                 }catch(e){

        //                     this.$notify.error({

        //                       title: '错误',

        //                       message: `ID为${item.id}的定制表单没有找到，请核实是否已经删除了该定制表单`

        //                     })

        //                 }

        //             }

        //         })

        //     }

        // })

        // this.loading = false

        this.setting.base.forEach((item, index) => {

          let alias = item.label; //将返回的统计数据，添加到configList中

          let data = res.data.base[alias] ? res.data.base[alias] : ""

          this.addConfigList("base", {

            alias,

            data

          })

        })

        this.setting.activity.forEach((item, index) => {

          let currentActivity = _.find(this.optionsData.activitys, (o) => {

            return o.id == item.id

          })
          let currentItem = this.disabledCascaderItem(currentActivity.pages, item.label);

          let data = "",

            activityData = res.data.activity[currentActivity.id];

          if (activityData) {

            //将返回的统计数据，添加到configList中

            data = activityData[currentItem.alias] ? activityData[currentItem.alias] : ""

          }

          this.addConfigList("activity", {

            currentActivity,

            currentItem,

            data

          })

        })
        this.setting.customized.forEach((item, index) => {

          try {

            let currentCustomized = $.find(this.optionsData.customized, (o) => {

              return o.id == item.id;

            }); //将返回的统计数据，添加到configList中

            // let data = res.data.customized[currentCustomized.id] ? res.data.customized[currentCustomized.id] : "";

            this.addConfigList("customized", {

              currentCustomized,

              data

            })

          } catch (e) {

            this.$notify.error({

              title: '错误',

              message: `ID为$ {
  
                item.id
  
              }
  
              的定制表单没有找到，请核实是否已经删除了该定制表单`

            })

          }

        })
        this.loading = false

      },

      submitForm(formName) {

        this.$refs[formName].validate((valid) => {

          if (valid) {

            // $ajax.post(INTERFACE.customized.add, this.form).then((res) => {

            //   this.dialogVisible_send = false;

            //   if (res.data.err == 0) {

            //     this.$message.success(res.data.msg)

            //   } else {

            //     this.$message.error(res.data.msg)

            //   }

            // });

          } else {

            return false

          }

        })

      }

    },
    created() {
      this.optionsData.base = this.data1.base;
      this.optionsData.activitys = this.data1.activitys.items.map((item, index) => {
        item.pages = Object.assign({}, this.data1.activitys.forms);
        return item;
      });
      this.optionsData.customized = this.data1.customized.items.map((item, index) => {
        item.alias = item.id;
        return item;
      });

      this.reportList = this.data2.rows.filter((item) => {
        return item.status == 1;
      })
      

    },
     mounted() {
        //设置昨天为默认时间
        this.currentTime = -1;
        this.getData()
    },
    watch: {
      id(newVal, oldVal) {

        //切换数据报表重新抓取数据

        if (!this.dataCache[newVal]) {

          this.dataCache[newVal] = {}

        }

        this.form.info.report_id = newVal
        this.getReportSetting()

      },

      // currentTime(newVal, oldVal) {

      //   //点击按钮设置时间范围

      //   const start = new Date();

      //   const end = new Date();

      //   switch (newVal) {

      //     case 0: //今天

      //       this.timeRange = [start, end];

      //       break;

      //     case -1: //昨天

      //       start.setTime(start.getTime() - secondsOfDay);

      //       end.setTime(end.getTime() - secondsOfDay);

      //       this.timeRange = [start,

      //         end

      //       ];

      //       break;

      //     case 7: //最近7天

      //       start.setTime(start.getTime() - secondsOfDay * 7);

      //       end.setTime(end.getTime() - secondsOfDay);

      //       this.timeRange = [start,

      //         end

      //       ];

      //       break;

      //     case 30: //最近30天

      //       start.setTime(start.getTime() - secondsOfDay * 30);

      //       end.setTime(end.getTime() - secondsOfDay);

      //       this.timeRange = [start,

      //         end

      //       ];

      //       break;

      //   };
       
      //   this.getData(); //重新获取数据
      //   if (oldVal !== "" && !this.dialogVisible_download && !parent.parentthis) {

      //       this.getData(); //重新获取数据

        

      //   }

      // },

      timeRange(newVal, oldVal) {

        //显示下载弹窗时，更改时间范围后重新获取数据

        if (this.dialogVisible_download) {

          this.getData(); //重新获取数据

        } // const taday = new Date().getDate();

        // if(taday == newVal[0].getDate()){

        //     // 今天

        //     console.log('jintian')

        // }else if(taday-1 == newVal[0].getDate()){

        //     // 昨天

        //     console.log('zuotian')

        // }

        // console.log(newVal)

      },

      configList(newVal, oldVal) {

        //构建统计图表和表格

        this.$nextTick(() => {

          this.configList.forEach((item) => {

            let el = document.getElementById(

              `$ {
  
              item.idPrefix
  
            }
  
            -$ {
  
              item.alias
  
            }
  
            `

            ) // 过滤后的表格字段

            let filterFields = [] // 当前表格所有字段

            let allFields = []

            let setting = this.setting

            if (this.getModelType(item.alias) == "echart") {

              let myChart = echarts.init(el)
              echartsControl[item.alias].setData(item.data)
              myChart.setOption(

                echartsControl[item.alias].config)

            } else if (this.getModelType(item.alias) == "funnel") {

              funnelControl.setData(item.data[0])
              el.innerHTML = funnelControl.config.tpl

            } else if (this.getModelType(item.alias) == "table") {

              tableControl[item.alias].setData(item.data)
              $(el).bootstrapTable('destroy')

              $(el).bootstrapTable(

                tableControl[item.alias].config) // 隐藏过滤后的表格字段

              allFields = tableControl[item.alias].config.columns.map(item => {

                return item.field

              })
              setting[item.type].forEach(item2 => {

                if (item2.label === item.alias) {

                  filterFields = item2.fields

                }

              })
              allFields.forEach(field => {

                if (filterFields.indexOf(field) === -1) {

                  $(el).bootstrapTable('hideColumn', field)

                }

              })

            } else if (this.getModelType(item.alias) == "dzbd") {

              // 构建表头和数据

              var dzbdControl = _.cloneDeep(tableControl.dzbd)
              dzbdControl.setData(item.data)
              $(el).bootstrapTable('destroy')
              $(el).bootstrapTable(dzbdControl.config) // 隐藏过滤后的表格字段

              function hideColumn() {

                setting.customized.forEach(item2 => {

                  if (item2.id === item.alias) {

                    filterFields = item2.fields

                  }

                })
                allFields.forEach(field => {

                  if (filterFields.indexOf(field) === -1) {

                    $(el).bootstrapTable('hideColumn', field)

                  }

                })

              }

              let _customized = setting.customized

              for (let i = 0, len = _customized.length; i < len; i++) {

                if (_customized[i].id === item.alias) {

                  for (let key in item.data[0]) {

                    allFields.push(key)

                  }

                  hideColumn()
                  break

                }

              }

            }

          }) //通知父窗口 统计图表渲染完毕

          if (parent.parentthis) {
            
            parent.parentthis.$emit("configListUpdate");

          }

        })

      },

    },

  }

</script>
<style lang="less">
  #app {
    .download,
    .send {
      margin-left: 250px;
    }
  }

  .root-content {
    .report-list {
      display: flex!important;
      overflow-x: auto;
    }
    .subscribe-group {
      position: absolute;
      right: 30px;
      top: 115px;
      z-index: 10;
    }

    .model-box {
      background-color: #fff;
      display: flex;
      flex-flow: column nowrap;
      min-height: ~'calc(100vh - 100px)';
      .model-title {
        text-align: center;
      }

      .time-control-layout {
        padding: 0 10px;
        margin-bottom: 20px;
      }

      .model-list {
        height: 100%;
        margin-bottom: 20px;
        overflow-y: auto;
        .model,
        .model2 {
          display: inline-block;
          margin-bottom: 30px;
          padding: 0 10px;
        }
        .model {
          width: 50%;
        }
        .model2 {
          width: 100%;
        }
      }

      .el-card__header {
        padding: 15px 20px;
      }
      .box-card-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 20px;
        }
      }
      .echart-box {
        width: 100%;
        height: 300px;
      }
      .bootstrap-table {
        .fixed-table-toolbar {
          .dropdown-menu {
            max-height: 150px;
          }
        }
      } // 漏斗
      .funnel-box {
        width: 100%;
        height: 300px;
        overflow-y: auto;
        padding-right: 5px;
        .funnel-title {
          text-align: center;
          h3 {
            font-size: 20px;
          }
        }

        .funnel-item {
          position: relative;
          line-height: 20px;
          margin-bottom: 5px;
          &:nth-child(2) {
            .funnel-percent {
              display: none;
            }
          }
          .funnel-name {
            width: 60%;
            color: #777c7c;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .funnel-bar {
            position: relative;
            width: 80%;
            height: 20px;
            border-radius: 2px;
            background-color: #f5f5f5;

            .funnel-bar-inner {
              height: 100%;
              background-color: #4a90e2;
              border-radius: 2px;
            }

            .funnel-value {
              color: #4a90e2;
              position: absolute;
              right: 0;
              top: -20px;
            }
          }
          .funnel-percent {
            position: absolute;
            top: 0;
            right: 0;
            width: 15%;
            text-align: center;
            color: #fff;
            font-size: 12px;
            font-weight: 700;
            border-radius: 2px;
            &.convert-color-0 {
              background: #f5f5f5;
              &:before {
                background: #f5f5f5;
              }
            }
            &.convert-color-1 {
              background: #e35c47;
              &:before {
                background: #e35c47;
              }
            }
            &.convert-color-2 {
              background: #e36a48;
              &:before {
                background: #e36a48;
              }
            }
            &.convert-color-3 {
              background: #e3924a;
              &:before {
                background: #e3924a;
              }
            }
            &.convert-color-4 {
              background: #e4b14c;
              &:before {
                background: #e4b14c;
              }
            }
            &.convert-color-5 {
              background: #e4c14d;
              &:before {
                background: #e4c14d;
              }
            }
            &.convert-color-6 {
              background: #d7cb53;
              &:before {
                background: #d7cb53;
              }
            }
            &.convert-color-7 {
              background: #c5c24c;
              &:before {
                background: #c5c24c;
              }
            }
            &.convert-color-8 {
              background: #77c34a;
              &:before {
                background: #77c34a;
              }
            }
            &.convert-color-9 {
              background: #a8c34b;
              &:before {
                background: #a8c34b;
              }
            }
            &.convert-color-10 {
              background: #48c362;
              &:before {
                background: #48c362;
              }
            }
            &:before {
              content: "";
              position: absolute;
              width: 8px;
              height: 8px;
              transform: rotate(45deg);
              border-radius: 1px;
              right: 50%;
              top: 16px;
              z-index: 0;
              margin-right: -5px;
            }
          }
        }
      }
    }
  }

  [class^="el-icon-fa"],
  [class*=" el-icon-fa"] {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome!important;
    font-size: inherit!important;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ;

</style>

<style scoped>
  .root-content {
    padding: 16px;
  }

  .report-list label {

    margin: 0;
  }



  .root-content .model-box {

    margin: 16px -8px 0;
  }



  .time-control-layout {

    margin-bottom: 16px !important;
  }



  .model,

  .model2 {

    padding: 0 8px !important;

    margin-bottom: 16px !important;
  }



  .model-title {

    margin-bottom: 16px;
  }

</style>
