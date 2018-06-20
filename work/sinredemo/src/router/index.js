import Vue from 'vue'
import Router from 'vue-router'

import add_commodity from "../components/send_menu/add_commodity.vue"
import custom_form from "../components/send_menu/custom_form.vue"
import  data_report from  "../components/send_menu/data_report.vue"
import  marketing_strategy from  "../components/send_menu/marketing_strategy.vue"
import  order  from "../components/send_menu/order.vue"
import report_management from "../components/send_menu/report_management.vue" 
import wind_control from "../components/send_menu/wind_control.vue"

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/add_commodity', component:add_commodity  },
    { path: '/data_report', component:data_report  },
    { path: '/custom_form', component:custom_form  },
    { path: '/marketing_strategy', component:marketing_strategy  },
    { path: '/order', component:order  },
    { path: '/report_management', component:report_management  },
    { path: '/wind_control', component:wind_control   },
  ]
})
