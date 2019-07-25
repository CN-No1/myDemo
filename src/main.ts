import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUi from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import { Component } from "vue-property-decorator";

Vue.config.productionTip = false;
Vue.use(ElementUi);

Component.registerHooks([
  "beforeRouteEnter",
  "beforeRouteLeave",
  "beforeRouteUpdate",
]);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
