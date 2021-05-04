import { createStore } from "vuex";
import pages from "./module/pages";
import loading from "./module/loading";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    pages,
    loading,
  },
});
