import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./vuex/store";

Vue.config.productionTip = true;

import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
