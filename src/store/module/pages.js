import { requestToDatabase } from "../../axios/request";

export default {
  namespaced: true,
  state() {
    return {
      pagesCount: null,
      pages: [],
      editablePage: {},
      currentElementData: null,
    };
  },
  getters: {
    pagesCount: ({ pagesCount }) => pagesCount,
    pages: ({ pages }) => pages,
    editablePage: ({ editablePage }) => editablePage,
    editablePageDataOrder: ({ editablePage }) => editablePage.PageData.length,
  },
  mutations: {
    SET_PAGES_COUNT(state, payload) {
      state.pagesCount = payload;
    },
    SET_PAGES_LIST(state, pages) {
      state.pages = pages;
    },
    SET_DATA_ELEMENT(state, data) {
      state.currentElementData = data;
    },
    SET_PAGE_DATA_ELEMENT(state, element) {
      state.editablePage.PageData.push({
        ...element,
        order: state.editablePage.PageData.length,
        data: state.currentElementData,
      });
      state.currentElementData = null;
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
    async saveEditablePage({ state }) {
      const data = await requestToDatabase.put(
        `pages/${state.editablePage.id}`,
        state.editablePage
      );
      console.log(data);
    },
    async saveNewPage({ state }) {
      requestToDatabase.post("pages", state.editablePage);
    },
  },
};
