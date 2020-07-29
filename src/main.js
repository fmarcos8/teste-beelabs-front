import "core-js/stable";
import Vue from "vue";
import App from "./App";
import router from "./router";
import CoreuiVue from "@coreui/vue";
import { iconsSet as icons } from "./assets/icons/icons.js";
import { ServerTable } from "vue-tables-2";
import VeeValidate from "vee-validate";
import VueSweetAlert2 from "vue-sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';
import store from "./store";
import moment from "moment";

Vue.config.performance = true;

Vue.prototype.moment = moment;

Vue.use(CoreuiVue);

Vue.use(VueSweetAlert2);

Vue.use(VeeValidate, {
  fieldsBagName: "veeFields"
});

Vue.use(
  ServerTable,
  {
    saveState: false,
    skin: "table table-bordered table-striped table-hover",
    sortIcon: {
      base: "glyph-icon",
      up: "simple-icon-arrow-up",
      down: "simple-icon-arrow-down",
      is: "simple-icon-list"
    }
  },
  false,
  "bootstrap4",
  "default"
);

Vue.prototype.$log = console.log.bind(console);

new Vue({
  el: "#app",
  router,
  store,
  icons,
  template: "<App/>",
  components: {
    App
  }
});
