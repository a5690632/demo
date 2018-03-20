<template>
  <div id="marketing_strategy" v-cloak class="wrapper-content animated fadeInRight">
    <div class="root-content">
      <!-- 首页 -->
      <div class="first" v-if="first">
        <el-button class="addbtn" @click="addEvent" type="primary" icon="plus">增加新的营销策略</el-button>
         <el-input class="search_input" placeholder="请输入报表名称" v-model="search_input" :on-icon-click="handleIconClick">
                <el-button slot="append" icon="search"></el-button>
            </el-input>

        </el-input>

        </el-row>
        <div class="flex" style="margin-top:16px">
          <div v-for="(item,index) in lists" class="clearfix " style="margin-right:16px;min-width:300px;width:30%">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="line-height: 36px;">{{item.title}}</span>
                <i class="el-icon-edit" @click="editEvent(item.id)" title="编辑事件营销策略" style="float:right;margin-left:20px;font-size:20px;cursor:pointer;"></i>
                <el-switch style="float: right;" v-model="item.status" :on-value="1" :off-value="0" @change="editStatus(item.id,item.status,index)"></el-switch>
              </div>
              <div class="indextext">
                <div class="text">
                  <p style="cursor:pointer;" @click="setSmsmodule(item.schedule_id, item.id)">短信：{{item.sms_title}}</p>
                  <p style="cursor:pointer;" @click="setWechatmodule(item.schedule_id, item.id)">微信：{{item.wechat_title}}</p>
                  <p style="cursor:pointer;" @click="setPmmodule(item.schedule_id, item.id)">站内信：{{item.pm_title}}</p>
                  <p style="cursor:pointer;" @click="setEmailmodule(item.schedule_id, item.id)">邮件：{{item.email_title}}</p>
                </div>
                <div class="indexbtn">
                  <el-button @click="sendFenxi(item.id)" title="发送分析">
                    <i class="fa fa-th-list"></i>
                  </el-button>
                  <el-button @click="sendDetail(item.id)" title="发送详情">
                    <i class="fa fa-list-alt"></i>
                  </el-button>
                  <el-button icon="delete" @click="delEvent(item.id, index)" title="删除"></el-button>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </div>
      <!-- 编辑修改页 -->
      <div class="second" v-if="second && smsModule">
        <el-row>
          <el-col :span="20">
            <el-breadcrumb separator="/" style="font-size: 18px;margin-bottom:25px">
              <i class="el-icon-arrow-left prev" @click="prev" style="float: left;margin-right: 10px "></i>
              <el-breadcrumb-item>
                <span @click="prev">事件营销</span>
              </el-breadcrumb-item>
              <el-breadcrumb-item>创建编辑事件营销策略</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </el-row>
        <el-row style="margin-bottom:16px;margin-left:30px">
          <el-col :span="14">
            <el-steps :space="400" :active="active" :align-center="true">
              <span @click="currentcof(1,'form')" class="cursor">
                <el-step title="策略设定" name="1" icon="setting"></el-step>
              </span>
              <span @click="currentcof(2,'form')" class="cursor">
                <el-step title="营销策略" name="2" icon="document"></el-step>
              </span>
              <span @click="currentcof(3,'form')" class="cursor">
                <el-step title="发送配置" name="3" icon="upload"></el-step>
              </span>
            </el-steps>
          </el-col>
        </el-row>
        <el-form :model="form" :rules="rules" ref="form" label-position="top" style="padding-left:30px">
          <!-- 策略设定 -->
          <div v-if="active==1">
            <el-form-item label="策略名称：" prop="title">
              <el-input class="celue " v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="DIY策略:" style="margin-top:16px"></el-form-item>

            <div class="title">
              <el-form-item label="触发事件:" style="padding-left:16px">
                <el-form-item label="用户行为触发类:" style="padding-left:16px">
                  <el-radio-group v-model="form.schedule_id" @change="getSchfields">
                    <el-radio-button label="1">注册</el-radio-button>
                    <el-radio-button label="2">完善资料</el-radio-button>
                    <el-radio-button label="3">积分兑换</el-radio-button>
                    <el-radio-button label="4">会员等级升级</el-radio-button>
                    <el-radio-button label="5">积分变动</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="系统触发类:" style="padding-left:16px">
                  <el-radio-group v-model="form.schedule_id">
                    <el-radio-button label="6">会员生日</el-radio-button>
                    <el-radio-button label="7">积分过期</el-radio-button>
                    <el-radio-button label="8">积分清零</el-radio-button>
                    <el-radio-button label="9">商品发货</el-radio-button>
                    <el-radio-button label="10">商品到期</el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-form-item>
            </div>
            <el-form-item label="基本条件："></el-form-item>
            <el-form-item label="">
              <el-select v-model="form.screen_id" placeholder="会员筛选" filterable class="celue ">
                <el-option v-for="item in listOption" :label="item.name" :value="item.id"></el-option>
              </el-select>
              <el-button @click="dialogFormVisible = true">创建新的筛选</el-button>
            </el-form-item>
          </div>
          <!-- 营销策略 -->
          <div v-if="active==2">
            <el-col :span="3">
              <el-checkbox-group v-model="type">
                <el-checkbox label="1">送礼物</el-checkbox>
                <el-checkbox label="2">送积分</el-checkbox>
                <el-checkbox label="3">优惠券</el-checkbox>
              </el-checkbox-group>
            </el-col>
            <el-col :span="20" class="minheight">
              <a class="text cursor" @click="next('form')" v-show="type==''"  >跳过，直接发通知</a>
              <div v-if="type.indexOf('1') !== -1">
                <el-form-item label="礼物配置："></el-form-item>
                <el-row v-for="(item,index) in form.gift" :gutter="16" style="margin-bottom:20px;">
                  <el-col :span="5">
                    <el-form-item label=" " style="margin-top:8px">
                      <el-select v-model="item.goods_id" @change="getLwtStock(item.goods_id)" filterable>
                        <el-option v-for="item in lwpzOptions" :key="item.id" :label="item.name" :value="item.id" :disabled="item.disabled"></el-option>
                        <!-- form.gift[index].prizeList -->
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="库存：" :prop="'gift.' + index + '.stock'" :rules="rules.stock">
                      <el-input v-model="item.stock"></el-input>
                      <!--  @change="validateLwtStock(item.stock,index)" -->
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <div class="block">
                      <el-form-item :prop="'gift.' + index + '.invalidtime'" :rules="rules.invalidtime" required label="有效期：">
                        <el-date-picker v-model="item.invalidtime" type="date" placeholder="选择日期" @change="dateChange(index)" :picker-options="pickerOptions0"
                          :editable="false">
                        </el-date-picker>
                      </el-form-item>
                    </div>
                  </el-col>
                  <i class="el-icon-plus" @click="addlw" style="margin-top:38px"></i>
                  <i class="el-icon-minus" v-if="index>=1" @click="minlw(index)"></i>
                </el-row>
              </div>
              <div v-if="type.indexOf('2') !== -1">
                <el-form-item label="积分奖励配置："></el-form-item>
                <el-row v-for="(item,index) in form.point" :gutter="16" style="margin-bottom:20px;">
                  <el-col :span="5">
                    <el-form-item label=" " style="margin-top:8px">
                      <el-select v-model="item.point_type" filterable>
                        <el-option v-for="item in scoreOptions" :key="item.value" :label="item.name" :value="item.value" :disabled="item.disabled"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="奖励分数：" :prop="'point.' + index + '.amount'" :rules="rules.amount">
                      <el-input v-model="item.amount"></el-input>
                    </el-form-item>
                  </el-col>
                  <i class="el-icon-plus" @click="addjf" style="margin-top:38px"></i>
                  <i class="el-icon-minus" v-if="index>=1" @click="minjf(index)"></i>
                </el-row>
              </div>
              <div v-if="type.indexOf('3') !== -1">
                <el-form-item label="优惠券配置："></el-form-item>
                <el-row v-for="(item,index) in form.coupon" :gutter="16" style="margin-bottom:20px;">
                  <el-col :span="5">
                    <el-form-item label=" " style="margin-top:8px">
                      <el-select v-model="item.goods_id" @change="getYhjtStock(item.goods_id)" filterable>
                        <el-option v-for="item in couponOptions" :key="item.id" :label="item.name" :value="item.id" :disabled="item.disabled"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="库存：" :prop="'coupon.' + index + '.stock'" :rules="rules.stock">
                      <el-input v-model="item.stock"></el-input>
                      <!-- @change="validateYhjtStock(item.stock,index)" -->
                    </el-form-item>
                  </el-col>
                  <i class="el-icon-plus" @click="addyhj" style="margin-top:38px"></i>
                  <i class="el-icon-minus" v-if="index>=1" @click="minyhj(index)"></i>
                </el-row>
              </div>
            </el-col>
          </div>
          <div v-if="active==3">
            <el-col :span="3">
              <div @click="dxclick(1)">
                <el-card class="box-card cursor" v-model="form.dx" :class="[form.dx==1?'active':'']">
                  <div class="text">短信</div>
                </el-card>
              </div>
              <div @click="dxclick(2)">
                <el-card class="box-card cursor" v-model="form.dx" :class="[form.dx==2?'active':'']">
                  <div class="text">微信</div>
                </el-card>
              </div>
              <div @click="dxclick(3)" style="display:none">
                <el-card class="box-card cursor" v-model="form.dx" :class="[form.dx==3?'active':'']">
                  <div class="text">邮箱</div>
                </el-card>
              </div>
              <div @click="dxclick(4)">
                <el-card class="box-card cursor" v-model="form.dx" :class="[form.dx==4?'active':'']">
                  <div class="text">站内信</div>
                </el-card>
              </div>
            </el-col>
            <el-col :span="20" class="minheight">
              <div v-if="form.dx==1">
                <el-form-item label="短信平台"></el-form-item>
                <el-col :span="4">
                  开启：
                  <el-switch v-model="form.status1" :on-value="1" :off-value="0"></el-switch>
                  <ul>
                    <li v-for="fields in fieldsList" class="fieldlist">
                      <span class="title"> {{fields.name}}：</span> {{fields.field}}
                    </li>
                  </ul>
                </el-col>
                <el-col :span="18">
                  <div v-if="form.status1==1">
                    <el-form-item label="通知发送时间：" label-width="120px">
                      事件发生
                      <el-select v-model="form.type" filterable>
                        <el-option v-for="sends in sendTimes" :label="sends.name" :value="sends.type"></el-option>
                      </el-select>
                      <el-input class="celue" v-model="form.day" v-if="form.type=='before' || form.type=='after'">
                        <template slot="append">天</template>
                      </el-input>
                      <el-time-picker v-show="form.type!='now'" :picker-options="{format: 'HH:mm:ss'}" v-model="form.date1" @change="dateChange1"
                        placeholder="任意时间点" :editable="false">
                      </el-time-picker> 发送
                      <div style="color:red;">
                        <i class="el-icon-information"></i>&nbsp;&nbsp;请根据事件触发条件合理选择发送事件，否则将可能导致意想不到的问题。
                      </div>
                    </el-form-item>
                    <el-form-item label="模板选择：" label-width="120px">
                      <el-autocomplete class="inline-input celue" v-model="tpl_lib_title" :fetch-suggestions="querySearch" placeholder="请输入内容"
                        :props="{label: 'title', value: 'title'}"></el-autocomplete>
                    </el-form-item>
                    <el-form-item label="签名设置：" label-width="120px">
                      <el-input class="celue" v-model="form.sign" :value="form.sign" :disabled="form.tpl_lib_disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="短信内容：" label-width="120px">
                      <el-input type="textarea" class="celue" v-model="form.content" :disabled="form.tpl_lib_disabled" @change="getNum" :autosize="{ minRows: 3}"></el-input>
                    </el-form-item>
                    <p>文字每65个字算1条短信,当前输入
                      <span style="color:red;font-size:14px;">{{dx_num}}</span>个字, 短信内容已带签名 ,算
                      <span style="color:red;font-size:14px;">{{dx_strip}}</span>条短信</p>
                    <el-form-item label="备注：" label-width="120px">
                      <el-input type="textarea" class="celue" v-model="form.scene" :disabled="form.tpl_lib_disabled" :autosize="{ minRows: 3}"></el-input>
                    </el-form-item>
                    <div class="btn">
                      <el-button @click="submitSms" v-show="!form.tpl_lib_disabled" type="primary">提交审核</el-button>
                    </div>
                  </div>
                </el-col>
              </div>
              <div v-if="form.dx==2">
                <el-form-item label="微信通知"></el-form-item>
                <el-col :span="4">
                  开启：
                  <el-switch v-model="form.status2" :on-value="1" :off-value="0"></el-switch>
                  <ul>
                    <li v-for="fields in fieldsList" class="fieldlist">
                      <span class="title"> {{fields.name}}：</span> {{fields.field}}
                    </li>
                  </ul>
                </el-col>
                <el-col :span="18">
                  <div v-if="form.status2==1">
                    <el-form-item label="通知发送时间：" label-width="125px">
                      事件发生
                      <el-select v-model="form.type2" filterable>
                        <el-option v-for="sends in sendTimes" :label="sends.name" :value="sends.type"></el-option>
                      </el-select>
                      <el-input class="celue" v-model="form.day2" v-if="form.type2=='before' || form.type2=='after'">
                        <template slot="append">天</template>
                      </el-input>
                      <el-time-picker v-show="form.type2!='now'" v-model="form.date2" @change="dateChange2" placeholder="任意时间点" :editable="false">
                      </el-time-picker> 发送
                      <div style="color:red;">
                        <i class="el-icon-information"></i>&nbsp;&nbsp;请根据事件触发条件合理选择发送事件，否则将可能导致意想不到的问题。
                      </div>
                    </el-form-item>
                    <el-row :gutter="16">
                      <el-col :span="8">
                        <el-form-item label="模板名称：" label-width="125px">
                          <el-select v-model="form.wechat_template_id" @change="getWechatChild" filterable class="celue">
                            <el-option v-for="item in wechatLists" :label="item.title" :value="item.wechat_template_id"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-button @click="createTpl" style="margin-top:28px">创建新的模板</el-button>
                      </el-col>
                    </el-row>
                    <!-- <el-form-item label="模板id：" label-width="125px">
                                            <span>{{form.wechat_template_id}}</span>
                                        </el-form-item> -->
                    <el-form-item label="自定义模板标题：" label-width="125px">
                      <el-autocomplete class="inline-input celue" v-model="tpl_title" :fetch-suggestions="querySearch2" placeholder="请输入内容" :props="{label: 'title', value: 'title'}"></el-autocomplete>
                    </el-form-item>
                    <el-form-item label="行业：" label-width="125px">
                      <span>{{form.primary_industry}}-{{form.deputy_industry}}</span>
                    </el-form-item>

                    <el-form-item label="详细内容：">
                      <el-input type="textarea" class="celue" v-model="form.first" :disabled="form.tpl_lib_disabled2" placeholder="请输入通知说明" :autosize="{ minRows: 3}"></el-input>
                    </el-form-item>
                    <div style="margin-bottom: 5px" v-for="item in getNoticeTplLists">
                      <span style="display: inline-block;min-width: 100px;font-weight: 700;" v-if="item.isform==0">{{item.name}}</span>
                      <el-input class="celue" style="max-width:100px;" v-model="tplData[item.name]" :disabled="form.tpl_lib_disabled2" v-if="item.isform == 1"></el-input> ：
                      <el-input class="celue" v-model="tplData[item.field]" :disabled="form.tpl_lib_disabled2"></el-input>
                    </div>
                    <el-form-item>
                      <el-input type="textarea" class="celue" v-model="form.remark" :disabled="form.tpl_lib_disabled2" placeholder="请输入通知提醒" :autosize="{ minRows: 3}"></el-input>
                    </el-form-item>

                    <el-form-item label="跳转URL：" label-width="120px">
                      <el-input class="celue" v-model="form.url" :disabled="form.tpl_lib_disabled2"></el-input>
                    </el-form-item>
                    <div class="btn">
                      <el-button type="primary" @click="addChild" v-show="!form.tpl_lib_disabled2">保存模板</el-button>
                    </div>
                  </div>
                </el-col>
              </div>
              <div v-if="form.dx==3">
                <el-form-item label="邮件通知"></el-form-item>
                <el-col :span="4">
                  开启：
                  <el-switch v-model="form.status" :on-value="1" :off-value="0"></el-switch>
                  <ul>
                    <li v-for="fields in fieldsList" class="fieldlist">
                      <span class="title"> {{fields.name}}：</span> {{fields.field}}
                    </li>
                  </ul>
                </el-col>
                <el-col :span="18">
                  <div v-if="form.status1">
                    <el-form-item label="通知发送时间：" label-width="125px">
                      事件发生
                      <el-select v-model="form.region" placeholder="活动区域" filterable class="celue">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                      <el-time-picker v-model="form.date1" placeholder="任意时间点" :editable="false" class="celue">
                      </el-time-picker> 发送
                      <div style="color:red;">
                        <i class="el-icon-information"></i>&nbsp;&nbsp;请根据事件触发条件合理选择发送事件，否则将可能导致意想不到的问题。
                      </div>
                    </el-form-item>
                    <el-form-item label="邮件主题：" label-width="125px">
                      <el-input class="celue" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="邮件内容：" label-width="125px">
                      <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 3}" class="celue"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </div>
              <div v-if="form.dx==4">
                <el-form-item label="站内信通知"></el-form-item>
                <el-col :span="4">
                  开启：
                  <el-switch v-model="form.status3" :on-value="1" :off-value="0"></el-switch>
                  <ul>
                    <li v-for="fields in fieldsList" class="fieldlist">
                      <span class="title"> {{fields.name}}：</span> {{fields.field}}
                    </li>
                  </ul>
                </el-col>
                <el-col :span="18">
                  <div v-if="form.status3==1">
                    <el-form-item label="通知发送时间：" label-width="120px">
                      事件发生
                      <el-select v-model="form.type3" filterable>
                        <el-option v-for="sends in sendTimes" :label="sends.name" :value="sends.type"></el-option>
                      </el-select>
                      <el-input class="celue" v-model="form.day3" v-if="form.type3=='before' || form.type3=='after'">
                        <template slot="append">天</template>
                      </el-input>
                      <el-time-picker v-show="form.type3!='now'" :picker-options="{format: 'HH:mm:ss'}" v-model="form.date3" @change="dateChange3"
                        placeholder="任意时间点" :editable="false">
                      </el-time-picker> 发送
                      <div style="color:red;">
                        <i class="el-icon-information"></i>&nbsp;&nbsp;请根据事件触发条件合理选择发送事件，否则将可能导致意想不到的问题。
                      </div>
                    </el-form-item>
                    <el-form-item label="站内信标题：" label-width="125px">
                      <el-input class="celue" v-model="form.pm_title"></el-input>
                    </el-form-item>
                    <el-form-item label="站内信内容：" label-width="125px">
                      <el-input type="textarea" class="celue" v-model="form.tpl_content" :autosize="{ minRows: 3}"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </div>
            </el-col>
          </div>
        </el-form>
        <div class="btn">
          <el-button v-if="active!=1" @click="prev">上一步</el-button>
          <el-button v-if="active!=3" @click="next('form')">下一步</el-button>
          <el-button type="primary" @click="onSubmit('form')">保存</el-button>
        </div>
      </div>
      <!-- 创建新的筛选 -->
      <el-dialog :visible.sync="dialogFormVisible" :close-on-click-modal="false" @close="getScreen">
        <iframe id="myframe" frameborder="0" src="/member/admin.screen/add.html"></iframe>
      </el-dialog>
      <!-- 创建新的模板 -->
      <el-dialog :visible.sync="createNewTpl" :close-on-click-modal="false">
        <iframe id="myframe" frameborder="0" src="/pages/event/lib.html"></iframe>
      </el-dialog>
      <!-- 发送分析 发送统计和发送详情合并的-->
      <div v-show="third" class="sendDetailPage">
        <!-- 发送统计 -->
        <el-breadcrumb separator="/" style="margin-bottom:25px">
          <i class="el-icon-arrow-left prev" @click="prev" style="float: left;margin-right: 10px "></i>
          <el-breadcrumb-item>
            <span @click="prev">事件营销</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <span @click="prevDetail">发送分析</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item v-show="send_detail">发送详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form ref="filter" :inline="true" :model="form">
          <el-form-item label="" style="margin-right:16px">
            <el-select v-model="filter.type" placeholder="请选择营销渠道" @change="detailSearch" filterable>
              <el-option label="全部渠道" value=""></el-option>
              <el-option v-for="item in sendType" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-date-picker v-model="filter.timecopy" type="daterange" placeholder="选择日期" @change="dateRangeChange" :picker-options="pickerOptions1">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="" v-show="send_detail">
            <el-input v-model="filter.title" placeholder="请输入标题">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="detailSearch">
              <i class="fa fa-search"></i>
            </el-button>
          </el-form-item>
        </el-form>
        <div v-show="detail">
          <div class="tablelist">
            <el-table :data="sendAnalysisList">
              <el-table-column prop="posttime" label="日期">
              </el-table-column>
              <el-table-column prop="type" label="营销渠道">
              </el-table-column>
              <el-table-column prop="title" label="标题">
              </el-table-column>
              <el-table-column prop="send_nums" label="发送量">
              </el-table-column>
              <el-table-column prop="ok_nums" label="成功量">
              </el-table-column>
              <el-table-column label="操作">
                <template scope="scope">
                  <el-button @click="detailClick(scope.row.event_id, scope.row.type, scope.row.posttime)" type="text" size="small">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 发送详情 -->
        <div v-show="send_detail">
          <div class="tablelist">
            <el-table :data="sendDetailList">
              <el-table-column prop="posttime" label="日期">
              </el-table-column>
              <el-table-column prop="type" label="营销渠道">
              </el-table-column>
              <el-table-column prop="nickname" label="会员昵称">
              </el-table-column>
              <el-table-column prop="uid" label="会员ID">
              </el-table-column>
              <el-table-column prop="title" label="标题">
              </el-table-column>
              <el-table-column prop="message" label="模板内容">
              </el-table-column>
              <el-table-column label="状态">
                <template scope="scope">
                  {{scope.row.status == 1 ? '成功' : '失败'}}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 页码 -->
        <el-row style="margin-top:16px">
          <el-col :span="12">
            显示第 {{(page1-1) * pagesize + 1}} 到第 {{Math.min(page1 * pagesize)}} 条记录，总共 {{number}} 条记录 每页显示
            <el-select v-model="pagesize">
              <el-option v-for="item in size_list" :key="item.value" :value="item.value" :label="item.value"></el-option>
            </el-select>
            条记录
          </el-col>
          <el-col :span="12" style="text-align: right;">
            <el-pagination :page-size="pagesize" layout="prev, pager, next, jumper" :current-page="1" :total="1"></el-pagination>
          </el-col>
        </el-row>
      </div>
      <!-- 列表页编辑短信 -->
      <el-dialog :visible.sync="smsModule" v-if="isdialog==1">
        <el-form label-width="120px" label-position="top">
          <el-form-item label="短信平台"></el-form-item>
          <el-col :span="6">
            开启：
            <el-switch v-model="form.status1" :on-value="1" :off-value="0"></el-switch>
            <ul>
              <li v-for="fields in fieldsList" class="fieldlist">
                <span class="title"> {{fields.name}}：</span> {{fields.field}}
              </li>
            </ul>
          </el-col>
          <el-col :span="18">
            <div v-if="form.status1==1">
              <el-form-item label="通知发送时间：">
                事件发生
                <el-select v-model="form.type" filterable>
                  <el-option v-for="sends in sendTimes" :label="sends.name" :value="sends.type"></el-option>
                </el-select>
                <el-input v-model="form.day" v-if="form.type=='before' || form.type=='after'">
                  <template slot="append">天</template>
                </el-input>
                <el-time-picker v-show="form.type!='now'" :picker-options="{format: 'HH:mm:ss'}" v-model="form.date1" @change="dateChange1"
                  placeholder="任意时间点" :editable="false">
                </el-time-picker> 发送
                <div style="color:red;">
                  <i class="el-icon-information"></i>&nbsp;&nbsp;请根据事件触发条件合理选择发送事件，否则将可能导致意想不到的问题。
                </div>
              </el-form-item>
              <el-form-item label="模板选择：">
                <el-autocomplete class="inline-input celue" v-model="tpl_lib_title" :fetch-suggestions="querySearch" placeholder="请输入内容"
                  :props="{label: 'title', value: 'title'}"></el-autocomplete>
              </el-form-item>
              <el-form-item label="签名设置：">
                <el-input class="celue" v-model="form.sign" :value="form.sign" :disabled="form.tpl_lib_disabled"></el-input>
              </el-form-item>
              <el-form-item label="短信内容：">
                <el-input type="textarea" class="celue" v-model="form.content" :disabled="form.tpl_lib_disabled" @change="getNum" :autosize="{ minRows: 3}"></el-input>
                <p>文字每65个字算1条短信,当前输入
                  <span style="color:red;font-size:14px;">{{dx_num}}</span>个字, 短信内容已带签名 ,算
                  <span style="color:red;font-size:14px;">{{dx_strip}}</span>条短信</p>
              </el-form-item>
              <el-form-item label="备注：">
                <el-input type="textarea" class="celue" v-model="form.scene" :disabled="form.tpl_lib_disabled" :autosize="{ minRows: 3}"></el-input>
              </el-form-item>
              <div class="btn">
                <el-button @click="submitSms" v-show="!form.tpl_lib_disabled">提交审核</el-button>
              </div>
            </div>
            <div class="btn">
              <el-button @click="editSms" type="primary">保存</el-button>
            </div>
          </el-col>
        </el-form>
      </el-dialog>
      <!-- 列表页编辑微信 -->
      <el-dialog :visible.sync="smsModule" v-if="isdialog==2">
        <el-form label-width="125px" label-position="top">
          <el-form-item label="微信通知"></el-form-item>
          <el-row>
            <el-col :span="6">
              开启：
              <el-switch v-model="form.status2" :on-value="1" :off-value="0"></el-switch>
              <ul>
                <li v-for="fields in fieldsList" class="fieldlist">
                  <span class="title">{{fields.name}}：</span> {{fields.field}}
                </li>
              </ul>
            </el-col>
            <el-col :span="18">
              <div v-if="form.status2==1">
                <el-form-item label="通知发送时间：">
                  事件发生
                  <el-select v-model="form.type2" filterable>
                    <el-option v-for="sends in sendTimes" :label="sends.name" :value="sends.type"></el-option>
                  </el-select>
                  <el-input class="celue" v-model="form.day2" v-if="form.type2=='before' || form.type2=='after'">
                    <template slot="append">天</template>
                  </el-input>
                  <el-time-picker v-show="form.type2!='now'" v-model="form.date2" @change="dateChange2" placeholder="任意时间点" :editable="false">
                  </el-time-picker> 发送
                  <div style="color:red;">
                    <i class="el-icon-information"></i>&nbsp;&nbsp;请根据事件触发条件合理选择发送事件，否则将可能导致意想不到的问题。
                  </div>
                </el-form-item>
                <el-row :gutter="16">
                  <el-col :span="8">
                    <el-form-item label="模板名称：">
                      <el-select v-model="form.wechat_template_id" @change="getWechatChild" filterable>
                        <el-option v-for="item in wechatLists" :label="item.title" :value="item.wechat_template_id"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-button @click="createTpl" style="margin-top:28px">创建新的模板</el-button>
                  </el-col>
                </el-row>
                <!-- <el-form-item label="模板id：">
                                    <span>{{form.wechat_template_id}}</span>
                  </el-form-item> -->
                <el-form-item label="自定义模板标题：">
                  <el-autocomplete class="inline-input celue" v-model="tpl_title" :fetch-suggestions="querySearch2" placeholder="请输入内容" :props="{label: 'title', value: 'title'}"></el-autocomplete>
                </el-form-item>
                <el-form-item label="行业：">
                  <span>{{form.primary_industry}}-{{form.deputy_industry}}</span>
                </el-form-item>
                <el-form-item label="详细内容：">
                  <el-input type="textarea" class="celue" style="margin-bottom: 5px" v-model="form.first" :disabled="form.tpl_lib_disabled2"
                    placeholder="请输入通知说明" :autosize="{ minRows: 3}"></el-input>
                  <div style="margin-bottom: 5px" v-for="item in getNoticeTplLists">
                    <span style="display: inline-block;min-width: 100px;font-weight: 700;" v-if="item.isform==0">{{item.name}}</span>
                    <el-input class="celue" style="max-width:100px;" v-model="tplData[item.name]" :disabled="form.tpl_lib_disabled2" v-if="item.isform == 1"></el-input> ：
                    <el-input class="celue" v-model="tplData[item.field]" :disabled="form.tpl_lib_disabled2"></el-input>
                  </div>
                  <el-input type="textarea" class="celue" v-model="form.remark" :disabled="form.tpl_lib_disabled2" placeholder="请输入通知提醒" :autosize="{ minRows: 3}"></el-input>
                </el-form-item>
                <el-form-item label="跳转URL：">
                  <el-input class="celue" v-model="form.url" :disabled="form.tpl_lib_disabled2"></el-input>
                </el-form-item>
                <div class="btn">
                  <el-button type="primary" @click="addChild" v-show="!form.tpl_lib_disabled2">保存模板</el-button>
                </div>
              </div>
              <el-button @click="editWechat" type="primary">保存</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
      <!-- 列表页编辑站内信 -->
      <el-dialog :visible.sync="smsModule" v-if="isdialog==4">
        <el-form label-width="125px" label-position="top">
          <el-form-item label="站内信通知"></el-form-item>
          <el-col :span="6">
            开启：
            <el-switch v-model="form.status3" :on-value="1" :off-value="0"></el-switch>
            <ul>
              <li v-for="fields in fieldsList" class="fieldlist">
                <span class="title"> {{fields.name}}：</span> {{fields.field}}
              </li>
            </ul>
          </el-col>
          <el-col :span="18">
            <div v-if="form.status3==1">
              <el-form-item label="通知发送时间：">
                事件发生
                <el-select v-model="form.type3" filterable>
                  <el-option v-for="sends in sendTimes" :label="sends.name" :value="sends.type"></el-option>
                </el-select>
                <el-input v-model="form.day3" v-if="form.type3=='before' || form.type3=='after'">
                  <template slot="append">天</template>
                </el-input>
                <el-time-picker v-show="form.type3!='now'" :picker-options="{format: 'HH:mm:ss'}" v-model="form.date3" @change="dateChange3"
                  placeholder="任意时间点" :editable="false">
                </el-time-picker> 发送
                <div style="color:red;">
                  <i class="el-icon-information"></i>&nbsp;&nbsp;请根据事件触发条件合理选择发送事件，否则将可能导致意想不到的问题。
                </div>
              </el-form-item>
              <el-form-item label="站内信标题：">
                <el-input class="celue" v-model="form.pm_title"></el-input>
              </el-form-item>
              <el-form-item label="站内信内容：">
                <el-input type="textarea" class="celue" v-model="form.tpl_content" :autosize="{ minRows: 3}"></el-input>
              </el-form-item>
            </div>
            <div class="btn" style="margin-left: 220px">
              <el-button @click="editPm" type="primary">保存</el-button>
            </div>
          </el-col>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    name: "marketing_strategy",
    data() {
      return {
        stock: '', //库存
        detail: false, //发送分析页是否显示
        send_detail: false, //发送详情页是否显示
        dialogFormVisible: false, //创建新的筛选
        smsModule: false, //首页点击标题显示隐藏模板
        id: '', //事件id
        isdialog: 0, //控制短信微信站内信切换
        tpl_lib_title: '', //短信模板选择title
        isEdit: false, //是否是在修改事件
        tpl_title: '', //微信模板选择title
        dx_num: 0, //短信输入字数
        dx_strip: 0, //短信条数
        first: true, //是否显示首页
        second: false, //新增编辑页
        third: false, //发送详情页
        active: 1, //步骤条
        type: [], //礼物配置type
        createNewTpl: false,
        form: {
          key: '', //查询列表
          status1: 0, //短信配置是否开启
          status2: 0, //微信配置是否开启
          status3: 0, //站内信配置是否开启
          search: '', //首页查询
          schedule_id: '', //策略id
          title: '', //策略名称
          screen_id: '', //会员筛选id
          tpl_dx_id: '', //短信模板选择id
          tpl_lib_disabled: false, //短信模板选择是否禁用
          tpl_lib_disabled2: false, //微信模板选择是否禁用
          sign: '', //短信模板签名
          content: '', //短信模板短信内容
          scene: '', //短信模板备注
          wechat_template_id: '', //微信模板id
          wechatChild_id: '', //微信子模板id
          tpl_child_id: '', //模板id
          tpl_id: '', //微信子模板id
          tpl_child_title: '', //微信子模板title
          field: '', //微信通知消息模板
          url: '', //微信通知消息模板url
          primary_industry: '', //主行业
          deputy_industry: '', //副行业
          first: '', //通知说明
          remark: '', //通知提醒
          gift: [{
            goods_id: '', //礼物配置
            stock: '', //库存
            invalidtime: '', //有效期
          }],
          point: [{
            point_type: '', //积分类型
            amount: '' //奖励分数
          }],
          coupon: [{
            goods_id: '', //优惠券id
            stock: '' //库存
          }],
          type: '', //短信通知发送时间类型
          day: '', //短信通知发送天数
          date1: '', //短信通知发送时间
          type2: '', //微信通知发送时间类型
          day2: '', //微信通知发送天数
          date2: '', //微信通知发送时间
          type3: '', //站内信通知发送时间类型
          day3: '', //站内信通知发送天数
          date3: '', //站内信通知发送时间
          pm_title: '', //站内信标题
          tpl_content: '', //站内信内容
          time1: '', //格式化短信通知发送时间
          time2: '', //格式化微信通知发送时间
          time3: '', //格式化站内信通知发送时间
          dx: 1, //1短信2微信3站内信
        },
        //invalidtimeNum: '',
        //invalidtimeFF: '',
        lists: [{

          "id": 2,
          "title": "策略b",
          "status": 1,
          "schedule_id": 3,
          "sms_title": "暂未开启",
          "wechat_title": null,
          "pm_title": "标题2"
        }, {
          "id": 159,
          "title": "333",
          "status": 1,
          "schedule_id": 7,
          "sms_title": "暂未开启",
          "wechat_title": "暂未开启",
          "pm_title": "暂未开启"
        }, {
          "id": 220,
          "title": "策略104",
          "status": 1,
          "schedule_id": 1,
          "sms_title": "是是是",
          "wechat_title": "积分兑换成功通知子模板",
          "pm_title": "暂未开启"
        }, {
          "id": 222,
          "title": "策略105",
          "status": 1,
          "schedule_id": 5,
          "sms_title": "测试",
          "wechat_title": "积分兑换成功通知子模板",
          "pm_title": "暂未开启"
        }, {
          "id": 223,
          "title": "新策略",
          "status": 1,
          "schedule_id": 7,
          "sms_title": "新策略3",
          "wechat_title": "积分兑换成功通知子模板",
          "pm_title": "暂未开启"
        }, {
          "id": 226,
          "title": "策略201",
          "status": 1,
          "schedule_id": 1,
          "sms_title": "是是是",
          "wechat_title": "积分兑换成功通知",
          "pm_title": "站内信1"
        }, {
          "id": 241,
          "title": "4444444",
          "status": 1,
          "schedule_id": 2,
          "sms_title": "生日祝福短信",
          "wechat_title": "积分兑换成功通知子模板",
          "pm_title": "111"
        }, {
          "id": 242,
          "title": "商品发货",
          "status": 1,
          "schedule_id": 9,
          "sms_title": "暂未开启",
          "wechat_title": "aaaaaaaa",
          "pm_title": "暂未开启"

        }], //首页事件列表
        pagesize: 20,
        number: 0,
        page1: 1,
        lwpzOptions: [], //获取礼物配置
        scoreOptions: [], //获取积分奖励配置
        couponOptions: [], //获取优惠券配置
        listOption: [], //筛选列表
        fieldsList: [], //可绑定列表
        smsOptions: [], //短信配置
        wechatLists: [], //微信主模板列表
        wechatChildLists: [], //微信子模板列表
        getNoticeTplLists: [{
            "name": "productType",
            "isform": 1,
            "field": "name"
          }, {
            "name": "兑换积分",
            "isform": 0,
            "field": "points"
          }, {
            "name": "兑换时间",
            "isform": 0,
            "field": "date"
          }

        ], //微信消息模板
        tplData: {}, //消息通知input
        editList: [], //编辑返回信息
        checkRadio: false,
        //leng: '',
        sendTimes: [{
            "name": '前',
            "type": 'before'
          }, {
            "name": '后',
            "type": 'after'
          },
          {
            "name": '立即',
            "type": 'now'
          },
          {
            "name": '当天',
            "type": 'today'
          }
        ],
        size_list: [{
            value: 20
          },

          {
            value: 30
          },
          {
            value: 40
          },
          {
            value: 50
          }
        ],
        rules: {
          title: [{
            required: true,
            message: '请输入策略名称',
            trigger: 'blur'
          }],
          stock: [{
            required: true,
            message: '请输入库存',
            trigger: 'blur'
          }],
          invalidtime: [{
            required: true,
            message: '请选择有效日期',
            trigger: 'change'
          }],
          amount: [{
            required: true,
            message: '请输入奖励积分',
            trigger: 'blur'
          }],
        },
        //有效期限制
        pickerOptions0: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        pickerOptions1: {
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
        // 发送分析发送类型
        sendType: [],
        // 发送分析数据
        sendAnalysisList: [{
          id: 13,
          event_id: 2,
          type: "短信",
          send_nums: 33,
          ok_nums: 0,
          posttime: "2017-09-04",
          title: "策略b"
        }, ],
        // 发送详情数据
        sendDetailList: [],
        // 统计表格的页码
        page: {
          pageNumber: 1,
          pageSize: 10,
          total: 10
        },
        // 统计表格的搜索
        filter: {
          id: '',
          type: '',
          time: '',
          timecopy: '',
          title: '',
          nickname: '',
          canSearch: false
        },
        current_id: 0, //当前查看分析的id
      }
    },

    watch: {　
      //短信模板
      tpl_lib_title: function () {
        var self = this;
        //if (!self.isEdit) {
        var flag = false;
        for (var i = 0; i < self.smsOptions.length; i++) {
          var smsObj = self.smsOptions[i];
          if (self.tpl_lib_title == smsObj.title) {
            self.form.tpl_dx_id = smsObj.id;
            self.form.sign = smsObj.sign;
            self.form.content = smsObj.content;
            self.form.scene = smsObj.scene;
            flag = true;
          }
        }
        if (flag) {
          self.form.tpl_lib_disabled = true;
        } else {
          self.form.tpl_lib_disabled = false;
          // self.form.sign = "";
          // self.form.content = "";
          // self.dx_num = 0;
          // self.dx_strip = 0;
          // self.form.scene = "";

        }
        //}
      },
      //微信模板
      tpl_title: function () {
        var self = this;
        //if (!self.isEdit) {
        var flag = false;
        self.wechatChildLists.map(function (item, index) {
          if (item.title == self.tpl_title) {
            self.form.tpl_id = item.id;
            self.form.url = item.url;
            self.tplData = {};

            for (var i in item.value) {
              self.tplData[i] = item.value[i];

              if (i == "first") {
                self.form.first = item.value[i];
              } else if (i == "remark") {
                self.form.remark = item.value[i];
              }
            }

            flag = true;
          }
        })

        if (flag) {
          self.form.tpl_lib_disabled2 = true;
        } else {
          self.form.tpl_lib_disabled2 = false;
          self.form.url = "";
          self.form.first = "";
          self.form.remark = "";
          self.tplData = {};
        }
        //}
      },
      active: function () {
        // var self = this;
        // if (self.active == 3) {
        //   $ajax.get(INTERFACE.events.getSchedulefields, {
        //     params: {
        //       schedule_id: self.form.schedule_id
        //     }
        //   }).then(function (res) {
        //     self.fieldsList = res.data.data;
        //   })
        //   $ajax.get(INTERFACE.events.getSmsmould, {
        //     params: {
        //       type: 60,
        //       schedule_id: self.form.schedule_id
        //     }
        //   }).then(function (res) {
        //     self.smsOptions = res.data.data;
        //   })
        // }
      },
      "form.gift": {
        //礼物配置奖品去重
        handler: function (newVal, oldVal) {
          var self = this;
          self.lwpzOptions.map(function (item, index2) {
            item.disabled = false;
          });

          self.form.gift.map(function (item, index2) {
            self.lwpzOptions.map(function (item2, index2) {
              if (item.goods_id == item2.id) {
                item2.disabled = true;
              }
            })
          })
        },
        deep: true
      },
      "form.point": {
        //积分奖励配置奖品去重
        handler: function (newVal, oldVal) {
          var self = this;
          self.scoreOptions.map(function (item, index2) {
            item.disabled = false;
          });

          self.form.point.map(function (item, index2) {
            self.scoreOptions.map(function (item2, index2) {
              if (item.point_type == item2.value) {
                item2.disabled = true;
              }
            })
          })
        },
        deep: true
      },
      "form.coupon": {
        //优惠券配置奖品去重
        handler: function (newVal, oldVal) {
          var self = this;
          self.couponOptions.map(function (item, index2) {
            item.disabled = false;
          });

          self.form.coupon.map(function (item, index2) {
            self.couponOptions.map(function (item2, index2) {
              if (item.goods_id == item2.id) {
                item2.disabled = true;
              }
            })
          })
        },
        deep: true
      },
    },
    methods: {
      //检测礼物配置库存
      getLwtStock: function (id) {
        if (!this.isEdit) {
          for (var i = 0; i < this.lwpzOptions.length; i++) {
            if (this.lwpzOptions[i].id == id) {
              this.stock = this.lwpzOptions[i].stock;
              //this.lwpzOptions[i].disabled = true;
            }
          }

        }
      },
      validateLwtStock: function (val, index) {
        if (!this.isEdit) {
          val = parseInt(val);
          if ((val - this.stock) > 0) {
            this.$message.error('库存不足,请在' + this.stock + '内取值');
            this.form.gift[index].stock = '';
          }
        }
      },
      //检测优惠券配置库存
      getYhjtStock: function (id) {
        if (!this.isEdit) {
          for (var i = 0; i < this.couponOptions.length; i++) {
            if (this.couponOptions[i].id == id) {
              this.stock = this.couponOptions[i].stock;
            }
          }
        }
      },
      validateYhjtStock: function (val, index) {
        if (!this.isEdit) {
          val = parseInt(val);
          if ((val - this.stock) > 0) {
            this.$message.error('库存不足,请在' + this.stock + '内取值');
            this.form.gift[index].stock = '';
          }
        }
      },
      //事件启用状态
      editStatus: function (id, status, index) {
        var self = this;
        var data = {
          id: id,
          status: status
        }
        // $ajax.post(INTERFACE.events.editStatus, data)
        //   .then(function (res) {
        //     if (res.data.err == 0) {

        //     } else {
        //       self.$message.error(res.data.msg);
        //       self.lists[index].status = !status;
        //     }
        //   })
      },
      //创建新的筛选
      getScreen: function () {
        var self = this;
        // $ajax.get(INTERFACE.events.getScreen).then(function (res) {
        //   self.listOption = res.data.data;

        //   //添加一个默认筛选条件
        //   self.listOption.splice(0, 0, {
        //     id: 0,
        //     name: "不使用筛选条件"
        //   });
        //   if (self.form.screen_id == '') {
        //     self.form.screen_id = self.listOption[0].id;
        //   }
        // });
      },
      getSchfields: function () {
        this.checkRadio = true;
      },
      //检测输入字数
      getNum: function () {
        this.dx_num = this.form.content.length;
        this.dx_strip = Math.ceil(this.dx_num / 65);
      },
      //获取微信子模板 
      getWechatChild: function () {
        var self = this;
        var wechatListsobj = self.wechatLists;
        for (var i = 0; i < wechatListsobj.length; i++) {
          if (self.form.wechat_template_id == wechatListsobj[i].wechat_template_id) {
            self.form.tpl_child_id = wechatListsobj[i].id;
            self.form.tpl_child_title = wechatListsobj[i].title;
            self.form.primary_industry = wechatListsobj[i].primary_industry;
            self.form.deputy_industry = wechatListsobj[i].deputy_industry;
          }
        }

        // axios.all([
        //   $ajax.get(INTERFACE.events.wechatChildList, {
        //     params: {
        //       wechat_template_id: self.form.wechat_template_id
        //     }
        //   }),
        //   $ajax.get(INTERFACE.events.getNoticeTpl, {
        //     params: {
        //       id: self.form.tpl_child_id
        //     }
        //   })
        // ]).then(axios.spread(function (res1, res2) {
        //   self.wechatChildLists = res1.data.data;
        //   self.tpl_title = '';

        //   self.getNoticeTplLists = res2.data.data;
        //   self.getNoticeTplLists.map(function (item, index) {
        //     if (item.isform == 0) {
        //       self.tplData[item.field] = "";
        //     } else if (item.isform == 1) {
        //       self.tplData[item.name] = "";
        //       self.tplData[item.field] = "";
        //     }
        //   })
        // }));
      },
      handleSelect: function (item) {
        console.log(item);
      },
      querySearch: function (queryString, cb) {
        var smsOptions = this.smsOptions
        cb(smsOptions);
      },
      querySearch2: function (queryString, cb) {
        var wechatChildLists = this.wechatChildLists
        cb(wechatChildLists);
      },
      handleIconClick: function () {

      },
      createTpl: function () {
        //创建新的模板
        this.createNewTpl = true;
      },
      //查询
      search: function () {
        var self = this;
        // $ajax.get(INTERFACE.events.lists, {
        //   params: {
        //     key: self.form.key
        //   }
        // }).then(function (res) {
        //   self.lists = res.data.data;
        // });
      },
      //添加
      addEvent: function () {
        this.first = false;
        this.second = true;
        this.smsModule = true;
        this.active = 1;
        this.isdialog = 0;
        this.isEdit = false;
        this.form.title = "";
        this.form.schedule_id = "";
        this.form.screen_id = "";
        this.type = [];
        this.form.gift = [{
          goods_id: '', //礼物配置
          stock: '', //库存
          invalidtime: '', //有效期
        }];
        this.form.point = [{
          "point_type": '',
          "amount": ''
        }];
        this.form.coupon = [{
          "goods_id": '',
          "stock": ''
        }];
        this.form.status1 = 0;
        this.tpl_lib_title = "";
        this.form.type = "";
        this.form.day = "";
        this.form.date1 = "";
        this.form.content = "";
        this.form.scene = "";
        this.form.sign = "";
        //站内信
        this.form.status3 = 0;
        this.form.pm_title = "";
        this.form.tpl_content = "";
        this.form.type3 = "";
        this.form.day3 = "";
        this.form.date3 = "";
        //微信                        
        this.form.status2 = 0;
        this.form.type2 = "";
        this.form.day2 = "";
        this.form.date2 = "";
        this.form.wechat_template_id = "";
        this.tpl_title = "";
        this.tpl_title = "";
        this.form.primary_industry = "";
        this.form.deputy_industry = "";
        var self = this;
        self.id = false;
      },
      //编辑
      editEvent: function (id) {
        this.first = false;
        this.second = true;
        this.id = id;
        var self = this;
        self.smsModule = true;
        self.active = 1;
        self.isdialog = 0;
        self.isEdit = true;
        // $ajax.get(INTERFACE.events.editEvent, {
        //   params: {
        //     id: id
        //   }
        // }).then(function (res) {
        //   self.editList = res.data.data;
        //   self.form.title = res.data.data.title;
        //   self.form.schedule_id = res.data.data.schedule_id;
        //   self.form.screen_id = res.data.data.screen_id;
        //   self.type = res.data.data.gift_setting.type;
        //   if (self.type) {
        //     self.type = self.type.split(",")
        //   } else {
        //     self.type = [];
        //   }
        //   if (self.editList.gift_setting) {
        //     self.form.gift = self.editList.gift_setting.gift; //礼物配置
        //     self.form.point = self.editList.gift_setting.point; //积分
        //     self.form.coupon = self.editList.gift_setting.coupon; //优惠券
        //   }

        //   for (var i = 0; i < self.form.gift.length; i++) {
        //     var giftGoodsId = self.form.gift[i].goods_id;
        //     var giftStock = self.form.gift[i].stock;
        //     for (var k = 0; k < self.lwpzOptions.length; k++) {
        //       if (giftGoodsId == self.lwpzOptions[k].id) {
        //         self.form.gift[i].goods_id = self.lwpzOptions[k].id;
        //       }
        //     }
        //     for (var j in self.editList.bind_goods) {
        //       if (giftGoodsId == j) {
        //         giftStock = _.toString(self.editList.bind_goods[j].stock);
        //       }
        //     }
        //     self.form.gift[i].stock = giftStock;
        //   }

        //   for (var i = 0; i < self.form.coupon.length; i++) {
        //     var giftGoodsId = self.form.coupon[i].goods_id;
        //     var giftStock = self.form.coupon[i].stock;
        //     for (var j = 0; j < self.couponOptions.length; j++) {
        //       if (self.form.coupon[i].goods_id == self.couponOptions[j].id) {
        //         self.form.coupon[i].goods_id = self.couponOptions[j].id;
        //       }
        //     }
        //     for (var j in self.editList.bind_goods) {
        //       if (giftGoodsId == j) {
        //         giftStock = _.toString(self.editList.bind_goods[j].stock);
        //       }
        //     }
        //     self.form.coupon[i].stock = giftStock;
        //   }
        //   var pattern = new RegExp("^[0-9]{4}-[0-9]{2}-[0-9]{2}");
        //   $ajax.get(INTERFACE.events.getSmsmould, {
        //     params: {
        //       type: 60,
        //       schedule_id: self.form.schedule_id
        //     }
        //   }).then(function (res) {
        //     self.smsOptions = res.data.data;
        //     //短信
        //     self.form.status1 = self.editList.sms_setting.status;
        //     var tpl_id = parseInt(self.editList.sms_setting.tpl_id);
        //     for (var i = 0; i < self.smsOptions.length; i++) {
        //       if (self.smsOptions[i].id == tpl_id) {
        //         self.tpl_lib_title = self.smsOptions[i].title;
        //       } else {
        //         self.tpl_lib_title = '';
        //       }
        //     }
        //     if (self.smsOptions.length == 0) {
        //       self.tpl_lib_title = '';
        //     }
        //     self.form.content = self.editList.sms_setting.tpl_content;
        //     self.dx_num = parseInt(self.form.content.length);
        //     self.dx_strip = Math.ceil(self.dx_num / 65);
        //     self.form.scene = self.editList.sms_setting.tpl_remark;
        //     self.form.sign = self.editList.sms_setting.tpl_sign;
        //     self.form.type = self.editList.sms_setting.send_time.type;
        //     self.form.day = self.editList.sms_setting.send_time.day;
        //     //var date = "2017-08-19 " + self.editList.sms_setting.send_time.time;
        //     var date = self.editList.sms_setting.send_time.time;
        //     //console.log("date=" + date);
        //     if (!pattern.test(date)) {
        //       date = "2017-08-19 " + date;
        //     }
        //     self.form.date1 = new Date(date);
        //     self.form.tpl_dx_id = self.editList.sms_setting.tpl_id;
        //   })


        //   //站内信
        //   self.form.status3 = self.editList.pm_setting.status;
        //   self.form.pm_title = self.editList.pm_setting.pm_title;
        //   self.form.tpl_content = self.editList.pm_setting.pm_content;
        //   self.form.type3 = self.editList.pm_setting.send_time.type;
        //   self.form.day3 = self.editList.pm_setting.send_time.day;
        //   //var date3 = "2017-08-19 " + self.editList.pm_setting.send_time.time;
        //   var date3 = self.editList.pm_setting.send_time.time;
        //   if (!pattern.test(date3)) {
        //     date3 = "2017-08-19 " + date3;
        //   }
        //   self.form.date3 = new Date(date3);


        //   //微信                        
        //   self.form.status2 = self.editList.wechat_setting.status;
        //   self.form.type2 = self.editList.wechat_setting.send_time.type;
        //   self.form.day2 = self.editList.wechat_setting.send_time.day;
        //   //var date2 = "2017-08-19 " + self.editList.wechat_setting.send_time.time;
        //   var date2 = self.editList.wechat_setting.send_time.time;
        //   //console.log("date2=" + date2);
        //   if (!pattern.test(date2)) {
        //     date2 = "2017-08-19 " + date2;
        //   }
        //   //console.log("second date2=" + date2);
        //   self.form.date2 = new Date(date2);
        //   self.form.tpl_child_id = self.editList.wechat_setting.tpl_lib_id;
        //   for (var i = 0; i < self.wechatLists.length; i++) {
        //     if (self.wechatLists[i].id == self.editList.wechat_setting.tpl_lib_id) {
        //       // if (self.form.wechat_template_id == '') {
        //       // self.form.wechat_template_id = self.wechatLists[i].wechat_template_id
        //       // } else {
        //       self.form.wechat_template_id = self.wechatLists[i].wechat_template_id
        //       // }
        //     }
        //   }

        //   if (self.editList.wechat_setting.tpl_lib_id) {
        //     axios.all([
        //       $ajax.get(INTERFACE.events.wechatChildList, {
        //         params: {
        //           wechat_template_id: self.form.wechat_template_id
        //         }
        //       }),
        //       $ajax.get(INTERFACE.events.getNoticeTpl, {
        //         params: {
        //           id: self.editList.wechat_setting.tpl_lib_id
        //         }
        //       })
        //     ]).then(axios.spread(function (res1, res2) {
        //       var tpl_id = self.editList.wechat_setting.tpl_id;
        //       self.wechatChildLists = res1.data.data; //微信子模板列表
        //       self.wechatChildLists.map(function (item, index) {
        //         if (item.id == tpl_id) {
        //           self.tpl_title = ""; //防止不同的事件，设置相同的模板名，无法触发watch
        //           self.$nextTick(function () {
        //             self.tpl_title = item.title
        //             self.form.primary_industry = item.primary_industry
        //             self.form.deputy_industry = item.deputy_industry
        //           });
        //         }
        //       });

        //       self.getNoticeTplLists = res2.data.data;
        //       self.getNoticeTplLists.map(function (item, index) {
        //         if (item.isform == 0) {
        //           self.tplData[item.field] = "";
        //         } else if (item.isform == 1) {
        //           self.tplData[item.name] = "";
        //           self.tplData[item.field] = "";
        //         }
        //       })
        //     }));
        //   }
        // });
      },
      //列表页单独设置短信模板
      setSmsmodule: function (scheduleid, id) {
        var self = this;
        self.smsModule = true;
        self.isdialog = 1;
        self.isEdit = true;

        self.id = id;
        // $ajax.get(INTERFACE.events.getSchedulefields, {
        //   params: {
        //     schedule_id: scheduleid
        //   }
        // }).then(function (res) {
        //   self.fieldsList = res.data.data;
        // })
        var data = {
          id: id
        }
        // $ajax.post(INTERFACE.events.editEvent, data)
        // .then(function (res) {
        //   self.editList = res.data.data;
        //   self.form.schedule_id = res.data.data.schedule_id;
        //   var pattern = new RegExp("^[0-9]{4}-[0-9]{2}-[0-9]{2}");
        //   $ajax.get(INTERFACE.events.getSmsmould, {
        //     params: {
        //       type: 60,
        //       schedule_id: self.form.schedule_id
        //     }
        //   }).then(function (res) {
        //     self.smsOptions = res.data.data;
        //     //短信
        //     self.form.status1 = self.editList.sms_setting.status;
        //     var tpl_id = parseInt(self.editList.sms_setting.tpl_id);
        //     for (var i = 0; i < self.smsOptions.length; i++) {
        //       if (self.smsOptions[i].id == tpl_id) {
        //         self.tpl_lib_title = self.smsOptions[i].title;
        //       } else {
        //         self.tpl_lib_title = '';
        //       }
        //     }
        //     if (self.smsOptions.length == 0) {
        //       self.tpl_lib_title = '';
        //     }
        //     self.form.content = self.editList.sms_setting.tpl_content;
        //     self.dx_num = parseInt(self.form.content.length);
        //     self.dx_strip = Math.ceil(self.dx_num / 65);
        //     self.form.scene = self.editList.sms_setting.tpl_remark;
        //     self.form.sign = self.editList.sms_setting.tpl_sign;
        //     self.form.type = self.editList.sms_setting.send_time.type;
        //     self.form.day = self.editList.sms_setting.send_time.day;
        //     //var date = "2017-08-19 " + self.editList.sms_setting.send_time.time;
        //     var date = self.editList.sms_setting.send_time.time;
        //     //console.log("date=" + date);
        //     if (!pattern.test(date)) {
        //       date = "2017-08-19 " + date;
        //     }
        //     self.form.date1 = new Date(date);
        //     self.form.tpl_dx_id = self.editList.sms_setting.tpl_id;
        //   })
        // })
      },
      //列表页单独设置微信模板
      setWechatmodule: function (screenid, id) {
        var self = this;
        self.smsModule = true;
        self.isdialog = 2;
        self.isEdit = true;


        // $ajax.get(INTERFACE.events.getSchedulefields, {
        //   params: {
        //     schedule_id: screenid
        //   }
        // }).then(function (res) {
        //   self.fieldsList = res.data.data;
        // });

        // $ajax.post(INTERFACE.events.editEvent, {
        //   id: self.id
        // })
        // .then(function (res) {
        //   self.editList = res.data.data;

        //   //微信                        
        //   self.form.status2 = self.editList.wechat_setting.status;
        //   self.form.type2 = self.editList.wechat_setting.send_time.type;
        //   self.form.day2 = self.editList.wechat_setting.send_time.day;
        //   self.form.schedule_id = res.data.data.schedule_id;
        //   var date2 = "2017-08-19 " + self.editList.wechat_setting.send_time.time;
        //   self.form.date2 = new Date(date2);

        //   self.wechatLists.map(function (item, index) {
        //     if (item.id == self.editList.wechat_setting.tpl_lib_id) {
        //       self.form.wechat_template_id = item.wechat_template_id
        //     }
        //   });

        //   axios.all([
        //     $ajax.get(INTERFACE.events.wechatChildList, {
        //       params: {
        //         wechat_template_id: self.form.wechat_template_id
        //       }
        //     }),
        //     $ajax.get(INTERFACE.events.getNoticeTpl, {
        //       params: {
        //         id: self.editList.wechat_setting.tpl_lib_id
        //       }
        //     })
        //   ]).then(axios.spread(function (res1, res2) {
        //     var tpl_id = self.editList.wechat_setting.tpl_id;
        //     self.wechatChildLists = res1.data.data; //微信子模板列表
        //     self.wechatChildLists.map(function (item, index) {
        //       if (item.id == tpl_id) {
        //         self.tpl_title = ""; //防止不同的事件，设置相同的模板名，无法触发watch
        //         self.$nextTick(function () {
        //           self.tpl_title = item.title
        //           self.form.primary_industry = item.primary_industry
        //           self.form.deputy_industry = item.deputy_industry
        //         });
        //       }
        //     });

        //     self.getNoticeTplLists = res2.data.data;
        //     self.getNoticeTplLists.map(function (item, index) {
        //       if (item.isform == 0) {
        //         self.tplData[item.field] = "";
        //       } else if (item.isform == 1) {
        //         self.tplData[item.name] = "";
        //         self.tplData[item.field] = "";
        //       }
        //     })
        //   }));
        // })
      },
      //列表页单独设置站内信
      setPmmodule: function (screenid, id) {
        var self = this;
        self.smsModule = true;
        self.isdialog = 4;
        self.isEdit = true;
        self.id = id;
        // $ajax.get(INTERFACE.events.getSchedulefields, {
        //   params: {
        //     schedule_id: screenid
        //   }
        // }).then(function (res) {
        //   self.fieldsList = res.data.data;
        // })
        // var data = {
        //   id: id
        // }
        // $ajax.post(INTERFACE.events.editEvent, data)
        //   .then(function (res) {
        //     self.editList = res.data.data;
        //     //站内信
        //     self.form.status3 = self.editList.pm_setting.status;
        //     self.form.pm_title = self.editList.pm_setting.pm_title;
        //     self.form.tpl_content = self.editList.pm_setting.pm_content;
        //     self.form.type3 = self.editList.pm_setting.send_time.type;
        //     self.form.day3 = self.editList.pm_setting.send_time.day;
        //     var date3 = "2017-08-19 " + self.editList.pm_setting.send_time.time;
        //     self.form.date3 = new Date(date3);
        //   })
      },
      sendFenxi: function (id) {
        //查看发送分析
        var self = this;
        self.current_id = id;
        // self.sendAnalysisList = [];
        self.page = {
          pageNumber: 1,
          pageSize: 10,
          total: 10
        }
        self.filter = {
          id: id,
          type: '',
          time: '',
          timecopy: '',
          title: '',
          nickname: ''
        }
        self.first = false;
        self.third = true;
        self.send_detail = false;
        self.detail = true;
        // if (self.sendType.length == 0) {
        //   $ajax.get(INTERFACE.events.getSendType)
        //     .then(function (res) {
        //       self.sendType = res.data.data;
        //     })
        // }
        // $ajax.get(INTERFACE.events.sendAnalysis, {
        //     params: {
        //       pageNumber: self.page.pageNumber,
        //       pageSize: self.page.pageSize,
        //       event_id: self.filter.id,
        //       type: self.filter.type,
        //       date: self.filter.time
        //     }
        //   })
        //   .then(function (res) {
        //     self.sendAnalysisList = res.data.data;
        //     self.page.total = res.data.total;
        //   })
      },
      sendDetail: function (id, type, posttime) {
        //查看发送详情
        var self = this;
        !type && (type = '');
        !posttime && (posttime = '');
        self.current_id = id;
        self.sendDetailList = [];
        self.page = {
          pageNumber: 1,
          pageSize: 10,
          total: 10
        }
        self.filter = {
          id: id,
          type: type,
          time: posttime,
          timecopy: posttime,
          title: '',
          nickname: '',
          canSearch: false
        }
        self.first = false;
        self.third = true;
        self.detail = false;
        self.send_detail = true;
        // if (self.sendType.length == 0) {
        //   $ajax.get(INTERFACE.events.getSendType)
        //     .then(function (res) {
        //       self.sendType = res.data.data;
        //     })
        // }
        // $ajax.get(INTERFACE.events.sendDetail, {
        //     params: {
        //       pageNumber: self.page.pageNumber,
        //       pageSize: self.page.pageSize,
        //       event_id: self.filter.id,
        //       type: self.filter.type,
        //       date: self.filter.time,
        //       title: self.filter.title,
        //       nickname: self.filter.nickname
        //     }
        //   })
        //   .then(function (res) {
        //     self.sendDetailList = res.data.data;
        //     self.page.total = res.data.total;
        //     self.filter.canSearch = true;
        //   })
      },
      //删除事件
      delEvent: function (id, index) {
        var self = this;
        self.id = id;
        self.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          var data = {
            id: id
          }
          // $ajax.post(INTERFACE.events.delEvent, data)
          //   .then(function (res) {
          //     if (res.data.err == 0) {
          //       self.$message({
          //         message: '删除成功！',
          //         type: 'success'
          //       });
          //       self.lists.splice(index, 1);
          //     } else {
          //       self.$message.error(res.data.msg);
          //     }
          //   })
        });
      },
      /**
       * 第二步配置“营销策略”
       * 三种奖品类型的增加、删除
       */
      addlw: function () {
        var gift = {
          goods_id: "",
          stock: "",
          invalidtime: ""
        };
        this.form.gift.push(gift);
      },
      minlw: function (index) {
        var self = this;
        this.lwpzOptions.map(function (item) {
          if (item.id == self.form.gift[index].goods_id) {
            item.disabled = false;
          }
        })
        this.form.gift.splice(index, 1);
      },
      addjf: function () {
        var point = {
          "point_type": "",
          "amount": ""
        };
        this.form.point.push(point);
      },
      minjf: function (index) {
        this.form.point.splice(index, 1);
      },
      addyhj: function () {
        var coupon = {
          "goods_id": "",
          "stock": ""
        };
        this.form.coupon.push(coupon);
      },
      minyhj: function (index) {
        this.form.coupon.splice(index, 1);
      },

      //上一步
      prev: function () {
        if (this.active > 1) {
          this.active--;
        } else if (this.active == 1) {
          this.third = false;
          this.second = false;
          this.first = true;
        }
      },
      // 详情返回列表
      prevDetail: function () {
        this.sendFenxi(this.current_id);
      },
      //下一步
      next: function (formName) {
        var self = this;
        this.$refs[formName].validate(function (valid) {
          if (valid == true) {
            if (self.active++ > 2) {
              self.active = 0;
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      currentcof: function (id, formName) {
        var self = this;
        if (id >= 1) {
          this.$refs[formName].validate(function (valid) {
            if (valid == true) {
              self.active = id;
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
        self.active = id;
      },
      dxclick: function (id) {
        this.form.dx = id;
      },
      // 日期格式化
      dateChange: function (index) {
        for (var i = 0; i < this.form.gift.length; i++) {
          var date = new Date(this.form.gift[index].invalidtime);
          Y = date.getFullYear(),
            m = date.getMonth() + 1,
            d = date.getDate()
          if (m < 10) {
            m = '0' + m;
          }
          if (d < 10) {
            d = '0' + d;
          }
          var t = Y + '-' + m + '-' + d;
          this.form.gift[index].invalidtime = t;
        }
      },
      //时间格式化
      dateChange1: function (val) {
        if (val) {
          this.form.time1 = val;
        }
      },
      dateChange2: function (val) {
        if (val) {
          this.form.time2 = val;
        }
      },
      dateChange3: function (val) {
        if (val) {
          this.form.time3 = val;
        }
      },
      //新建的短信提交审核
      submitSms: function () {
        var self = this;
        var obj = {
          "title": this.tpl_lib_title,
          "sign": this.form.sign,
          "content": this.form.content,
          "schedule_id": this.form.schedule_id,
          "type": 60
        }
        var data = {
          info: obj
        }
        // $ajax.post(INTERFACE.events.addSms, data)
        //   .then(function (res) {
        //     if (res.data.err == 0) {
        //       self.$message({
        //         message: '提交成功！',
        //         type: 'success'
        //       });
        //       self.form.tpl_dx_id = res.data.id;
        //     } else {
        //       self.$message.error(res.data.msg);
        //     }
        //   })
      },
      //修改短信设置
      editSms: function () {
        var obj = {
          "type": 1,
          "setting": {
            "status": this.form.status1,
            "send_time": {
              "type": this.form.type,
              "day": this.form.day,
              "time": this.form.time1
            },
            "tpl_id": this.form.tpl_dx_id,
            "tpl_sign": this.form.sign,
            "tpl_content": this.form.content,
            "tpl_remark": this.form.scene
          }
        }
        var index = 0;
        for (var i = 0; i < this.lists.length; i++) {
          if (this.lists[i].id == this.id) {
            index = i;
          }
        }
        var data = {
          id: this.id,
          info: obj
        }
        var self = this;
        // $ajax.post(INTERFACE.events.editSms, data)
        //   .then(function (res) {
        //     if (res.data.err == 0) {
        //       self.$message({
        //         message: '修改成功！',
        //         type: 'success'
        //       });
        //       self.isEdit = false;
        //       self.isdialog = 0;
        //       self.smsModule = false;
        //       if (data.info.setting.status == 1) {
        //         self.lists[index].sms_title = self.tpl_lib_title;
        //       } else {
        //         self.lists[index].sms_title = "暂未开启";
        //       }
        //     } else {
        //       self.$message.error(res.data.msg);
        //       self.isdialog = 0;
        //     }
        //   });
      },
      //微信添加子模板
      addChild: function () {
        this.tplData.first = this.form.first;
        this.tplData.remark = this.form.remark;
        var obj = {
          "title": this.tpl_title,
          "wechat_template_id": this.form.wechat_template_id,
          "value": this.tplData,
          "schedule_id": this.form.schedule_id,
          "url": this.form.url,
        }
        var data = {
          info: obj
        }
        var title = this.tpl_title;
        var self = this;
        // $ajax.post(INTERFACE.events.addChildList, data)
        //   .then(function (res) {
        //     if (res.data.err == 0) {
        //       self.$message({
        //         message: '保存成功！',
        //         type: 'success'
        //       });
        //       self.form.tpl_id = res.data.id;

        //       $ajax.get(INTERFACE.events.wechatChildList, {
        //         params: {
        //           wechat_template_id: self.form.wechat_template_id
        //         }
        //       }).then(function (res) {
        //         self.wechatChildLists = res.data.data;
        //         self.tpl_title = title;
        //       })
        //     } else {
        //       self.$message.error(res.data.msg);
        //     }
        //   })
      },
      //修改微信设置
      editWechat: function () {
        var obj = {
          "type": 2,
          "setting": {
            "status": this.form.status2,
            "send_time": {
              "type": this.form.type2,
              "day": this.form.day2,
              "time": this.form.time2
            },
            "tpl_lib_id": this.form.tpl_child_id,
            "tpl_id": this.form.tpl_id
          }
        }
        var index = 0;
        for (var i = 0; i < this.lists.length; i++) {
          if (this.lists[i].id == this.id) {
            index = i;
          }
        }
        var data = {
          id: this.id,
          info: obj
        }
        var self = this;
        // $ajax.post(INTERFACE.events.editWechat, data)
        //   .then(function (res) {
        //     if (res.data.err == 0) {
        //       self.$message({
        //         message: '保存成功！',
        //         type: 'success'
        //       });
        //       self.isdialog = 0;
        //       self.second = false;
        //       self.form.wechat_template_id = "";
        //       if (data.info.setting.status == 1) {
        //         self.lists[index].wechat_title = self.tpl_title;
        //       } else {
        //         self.lists[index].wechat_title = "暂未开启";
        //       }
        //     } else {
        //       self.$message.error(res.data.msg);
        //       self.isdialog = 0;
        //     }
        //   })
      },
      //修改站内信设置
      editPm: function () {
        var obj = {
          "type": 3,
          "setting": {
            "status": this.form.status3,
            "send_time": {
              "type": this.form.type3,
              "day": this.form.day3,
              "time": this.form.time3
            },
            "pm_title": this.form.pm_title,
            "pm_content": this.form.tpl_content
          }
        }
        var index = 0;
        for (var i = 0; i < this.lists.length; i++) {
          if (this.lists[i].id == this.id) {
            index = i;
          }
        }
        var data = {
          id: this.id,
          info: obj
        }
        var self = this;
        // $ajax.post(INTERFACE.events.editPm, data)
        //   .then(function (res) {
        //     if (res.data.err == 0) {
        //       self.$message({
        //         message: '修改成功！',
        //         type: 'success'
        //       });
        //       self.isEdit = false;
        //       self.isdialog = 0;
        //       self.smsModule = false;
        //       if (data.info.setting.status == 1) {
        //         self.lists[index].pm_title = obj.setting.pm_title;
        //       } else {
        //         self.lists[index].pm_title = "暂未开启";
        //       }
        //     } else {
        //       self.$message.error(res.data.msg);
        //       self.isdialog = 0;
        //     }
        //   })
      },
      //保存
      onSubmit: function (formName) {
        var cltype;
        if (this.type.length > 0) {
          cltype = this.type.join(',');
        } else {
          cltype = ''
        }
        var obj = {
          "schedule": {
            "title": this.form.title,
            "schedule_id": this.form.schedule_id,
            "screen_id": this.form.screen_id
          },
          "gift": {
            "gift_setting": {
              "type": cltype,
              "gift": this.form.gift,
              "point": this.form.point,
              "coupon": this.form.coupon
            }
          },
          "notice": [{
            "type": 1,
            "setting": {
              "status": this.form.status1,
              "send_time": {
                "type": this.form.type,
                "day": this.form.day,
                "time": this.form.time1
              },
              "tpl_id": this.form.tpl_dx_id,
              "tpl_sign": this.form.sign,
              "tpl_content": this.form.content,
              "tpl_remark": this.form.scene
            }
          }, {
            "type": 2,
            "setting": {
              "status": this.form.status2,
              "send_time": {
                "type": this.form.type2,
                "day": this.form.day2,
                "time": this.form.time2
              },
              "tpl_lib_id": this.form.tpl_child_id,
              "tpl_id": this.form.tpl_id
            }
          }, {
            "type": 3,
            "setting": {
              "status": this.form.status3,
              "send_time": {
                "type": this.form.type3,
                "day": this.form.day3,
                "time": this.form.time3
              },
              "pm_title": this.form.pm_title,
              "pm_content": this.form.tpl_content
            }
          }]
        }
        var self = this;
        var data = {};
        if (self.id) {
          data = {
            id: self.id,
            info: obj
          }
        } else {
          data = {
            info: obj
          }
        }
        this.$refs[formName].validate(function (valid) {
          if (valid == true) {
            // $ajax.post(INTERFACE.events.save, data)
            //   .then(function (res) {
            //     if (res.data.err == 0) {
            //       self.$message({
            //         message: '保存成功！',
            //         type: 'success'
            //       });
            //       self.id = res.data.id;
            //       var object = {};
            //       if (data.id) {
            //         object.id = self.id;
            //         object.title = obj.schedule.title;
            //         object.status = 0;
            //         object.schedule_id = obj.schedule.schedule_id;
            //         object.sms_title = self.tpl_lib_title;
            //         object.wechat_title = self.tpl_title;
            //         object.pm_title = obj.notice[2].setting.pm_title;
            //         var temp;
            //         for (var i = 0; i < self.lists.length; i++) {
            //           temp = self.lists[i];
            //           if (temp.id == self.id) {
            //             self.lists[i] = object;
            //           }
            //         }
            //       } else {
            //         object.id = res.data.id;
            //         object.title = obj.schedule.title;
            //         object.status = 0;
            //         object.schedule_id = obj.schedule.schedule_id;
            //         object.sms_title = self.tpl_lib_title;
            //         object.wechat_title = self.tpl_title;
            //         object.pm_title = obj.notice[2].setting.pm_title;
            //         self.lists.push(object);
            //       }
            //     }
            //   })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      handleSizeChange(val) {
        /* 切换每页显示的条数 */
        this.page.pageSize = val;
        this.page.pageNumber = 1;
        this.detailSearch('page');
      },
      handleCurrentChange(val) {
        /* 翻页 */
        this.page.pageNumber = val;
        this.detailSearch('page');
      },
      dateRangeChange: function (value) {
        /* 时间控件 */
        var self = this;
        Vue.nextTick(function () {
          self.filter.time = value;
          self.detailSearch();
        })
      },
      detailSearch: function (type) {
        /* 发送分析、详情的搜索 */
        var self = this;
        if (!self.filter.canSearch) return;

        if (type != 'page') {
          self.page = {
            pageNumber: 1,
            pageSize: 10,
            total: 10
          }
        }
        if (this.detail) {
          // $ajax.get(INTERFACE.events.sendAnalysis, {
          //     params: {
          //       pageNumber: self.page.pageNumber,
          //       pageSize: self.page.pageSize,
          //       event_id: self.filter.id,
          //       type: self.filter.type,
          //       date: self.filter.time
          //     }
          //   })
          //   .then(function (res) {
          //     self.sendAnalysisList = res.data.data;
          //     self.page.total = res.data.total;
          //   })
        } else {
          // $ajax.get(INTERFACE.events.sendDetail, {
          //     params: {
          //       pageNumber: self.page.pageNumber,
          //       pageSize: self.page.pageSize,
          //       event_id: self.filter.id,
          //       type: self.filter.type,
          //       date: self.filter.time,
          //       title: self.filter.title,
          //       nickname: self.filter.nickname
          //     }
          //   })
          //   .then(function (res) {
          //     self.sendDetailList = res.data.data;
          //     self.page.total = res.data.total;
          //   })
        }
      },
      detailClick: function (id, type, posttime) {
        /* 发送分析表格里的详情按钮 */
        type = (type == '短信' ? 1 : (type == '微信' ? 2 : 3));
        this.sendDetail(id, type, posttime + ' - ' + posttime);
      }
    },

  }

</script>

<style scoped>
  #marketing_strategy {
    padding: 16px
  }
 


  

  .flex {
    display: flex;
    flex-wrap: wrap;
  }


  .el-card {
    margin-top: 16px
  }

  .el-icon-arrow-left:hover {
    color: #20a0ff
  }

  .prev::before {
    cursor: pointer;
  }

  .indexbtn {
    float: right;
  }

  .indexbtn .el-button {
    display: block;
    margin: 5px;
  }

  .indextext .text {
    float: left;
  }

  .active {
    background: #20a0ff;
    color: #fff;
  }

  .el-dialog--tiny {
    width: 80%;
  }

  .sendDetailPage .el-form-item {
    margin-bottom: 22px;
  }

  .fieldlist {
    list-style: none;
    margin: 10px 0 0 -40px;
    font-size: 14px;
  }

  .el-dialog__wrapper iframe {
    width: 100%;
    height: 400px;
  }

  .el-breadcrumb__item {
    font-size: 18px;
  }

  .el-form-item {
    margin-bottom: 5px;
  }

  .celue {
    width: 500px;
  }


  .el-col-3 .el-checkbox {
    display: block;
    margin-top: 40px;
  }

  .el-col-3 .el-checkbox+.el-checkbox {
    margin-left: 0;
  }

  .title {
    font-size: 14px;
    color: #48576a;
    margin-bottom: 5px;
  }



  .next {
    margin: 100px;
  }

  .btn {
    width: 40%;
    margin: 40px auto;
  }

  .el-radio-button:first-child .el-radio-button__inner,
  .el-radio-button:last-child .el-radio-button__inner {
    border-radius: 0;
  }

  .el-form-item__error {
    position: static;
  }





  .el-dialog__wrapper {
    background: rgba(0, 0, 0, .5);
  }



  .v-modal {
    background: transparent;
    z-index: -1 !important;
  }

  .el-row .el-icon-plus,
  .el-row .el-icon-minus {
    margin: 10px;
    font-size: 18px;
  }

  .minheight {
    min-height: 200px;
    padding-left: 40px;
  }

  .minheight a {
    line-height: 200px;
    font-size: 20px;
    margin-left: 20px;
  }


  .el-card__body {
    text-align: center;
    padding: 30px;
  }



  .nextcard {
    width: 35%;
    line-height: 140px;
  }

  .el-card__body p {
    text-align: left !important;
  }

  .search_input {
    float: right;
    width: 300px;
  }
  .cursor{
    cursor: pointer;
  }
</style>
