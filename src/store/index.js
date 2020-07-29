import Vue from "vue";
import Vuex from "vuex";

import app from "./modules/app";
import students from "./modules/students";
import courses from "./modules/courses";
import registrations from "./modules/registrations";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    students,
    courses,
    registrations
  }
});
