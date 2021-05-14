import { createStore } from "vuex";
import pages from "./module/pages";
import loading from "./module/loading";
import auth from "./module/auth";
import notification from "./module/notification";
import users from "./module/users"

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    pages,
    loading,
    auth,
    notification,
    users
  },
});
