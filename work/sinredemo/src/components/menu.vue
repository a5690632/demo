<template>
  <div id="menu_sinre" class="clearfix">
    <div :class="['layout_left',show_text ? 'show_text':'']">
      <div class="logo">
        <img src="../assets/img/logo2.png">
        <span class="name t">演示站点</span>
      </div>
      <div class="menu">
        <ul>
          <li v-for="(items,index) in routes" class="menu" @click="check(items.value,index)">
            <a href="javascript:;" style='text-decoration:none;' :class="['el-tooltip', items.active? 'active': '']">
                <i :class="items.class"></i>
                {{items.name}}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div :class="['layout_right',show_text ? 'show_text':'']">
      <div class="header">
        <div :class="['menu_switch', show_text ? 'active': '']" @click="menuSwitch">
          <img src="../assets/img/menu.png" alt="">
        </div>
        <el-select v-model="value" placeholder="请选择" style="margin-left: 66px;">
          <el-option v-for="items in selectList" :key="items.label" :label="items.label" :value="items.label">
          </el-option>
        </el-select>
        <div class="pull-right system">欢迎您，
            <span class="el-dropdown-link">
              admin
              <i class="down down-icon" style="display: inline-block; width: 5px; height: 5px; border: 5px solid transparent; border-top-color: #666; position: relative; top: 3px;"></i>
            </span>
          <img src="../assets/img/user_face.png">
        </div>
      </div>
       <div class="sub_menu">
          <el-tree :data="subMenuList" ref="subMenuList" :highlight-current="true" :default-expand-all="true"
            node-key="url" @node-click="menuActive"></el-tree>
        </div>
        <div class="cotnent_main">
            <div  class="cont">
                <router-view></router-view>
            </div>
            
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "menu_sinre",

  data() {
    return {
      routes: [
        {
          name: "首页",
          value: "index",
          class: "fa fa-home",
          active: true
        },

        {
          name: "用户",
          value: "user",
          active: false,
          class: "fa fa-user"
        },

        {
          active: false,
          name: "营销",
          value: "user",
          class: "fa fa-user"
        },

        {
          active: false,
          name: "用户",
          value: "marketing",
          class: "fa fa-bullhorn"
        },

        {
          active: false,
          name: "积分",
          value: "integral",
          class: "fa fa-rouble"
        },
        {
          active: false,
          name: "商城",
          value: "mall",
          class: "fa fa-bank"
        },
        {
          active: false,
          name: "数据",
          value: "data",
          class: "fa fa-bar-chart"
        },
        {
          active: false,
          name: "物码",
          value: "code",
          class: "fa fa-ticket"
        },
        {
          active: false,
          name: "系统",
          value: "system",
          class: "fa fa-gears"
        },
        {
          active: false,
          name: "微信",
          value: "wechat",
          class: "fa fa-wechat"
        },
        {
          active: false,
          name: "内容",
          value: "conteet",
          class: "fa fa-th-list"
        },
        {
          active: false,
          name: "销售",
          value: "sales",
          class: "fa fa-shopping-cart"
        }
      ],
      value: "",
      selectList: [
        {
          label: "演示站点"
        }
      ],
      subMenuList: [
        {
          label: "demo",
          children: [
            {
              label: "报表管理",
              value: "report_management"
            },
            {
              label: "增加新的商品",
              value: "add_commodity"
            },
            {
              label: "风控管理",
              value: "wind_control"
            },
            // {
            //   value: "data_report",
            //   label: "数据报表"
            // },
            {
              value: "marketing_strategy",
              label: "营销策略"
            },
            // {
            //   value: "order",
            //   label: "全部订单"
            // },
            {
              value: "custom_form",
              label: "增加新的定制表单"
            }
          ]
        }
      ]
    };
  },
  computed: {
    show_text() {
      return this.$store.state.show_text;
    }
  },
  methods: {
    menuSwitch() {
      this.$store.commit("status");
    },
    check(val, index) {
      this.routes.forEach(e => {
        e.active = false;
      });
      this.routes[index].active = true;
    },
    menuActive(val) {
     this.$router.push({ path: val.value});
    }
  },
  mounted(){
    this.$axios.get("/api/json").then((res)=>{
        console.log(res.data)
    })
  }
};
</script>
<style >
#menu_sinre {
  height: 100%;
}
.cont{
  height:100% ;
  overflow:auto
}
 #marketing_strategy .el-radio-group .el-radio-button {
    margin-right: 20px;

   
  }

 #marketing_strategy .el-radio-button .el-radio-button__inner {
      border-radius: 4px;
      border-left: 1px solid #bfcbd9;
  }
</style>
