import { requestToDatabase } from "../../axios/request";

export default {
  namespaced: true,
  state() {
    return {
      pagesCount: null,
      pages: [],
      editablePage: {},
    };
  },
  getters: {
    pagesCount: ({ pagesCount }) => pagesCount,
    pages: ({ pages }) => pages,
    editablePage: ({ editablePage }) => editablePage,
  },
  mutations: {
    SET_PAGES_COUNT(state, payload) {
      state.pagesCount = payload;
    },
    SET_PAGES_LIST(state, pages) {
      state.pages = pages;
    },
    SET_EDITABLE_PAGE(state, page) {
      state.editablePage = page;
    },
  },
  actions: {
    async loadPagesCount({ commit }) {
      const { data } = await requestToDatabase.get("pages/count");
      commit("SET_PAGES_COUNT", data);
    },
    async loadPages({ commit }) {
      const { data } = await requestToDatabase.get("pages");
      commit("SET_PAGES_LIST", data);
    },
  },
};
