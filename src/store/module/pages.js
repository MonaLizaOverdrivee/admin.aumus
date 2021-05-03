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
    qntElements: ({ editablePage }) => editablePage.PageData.length
  },
  mutations: {
    SET_PAGES_COUNT(state, payload) {
      state.pagesCount = payload;
    },
    SET_PAGES_LIST(state, pages) {
      state.pages = pages;
    },
    SET_PAGE_DATA_ELEMENT(state, element) {
      state.editablePage.PageData.push(element);
    },
    DELETE_ELEMENT(state, index) {
      state.editablePage.PageData.splice(index, 1)
      console.log(index)
      console.log(state.editablePage.PageData)
    },
    SET_EDITABLE_PAGE(state, page) {
      state.editablePage = page;
    },
    SET_PAGE_DATA_EDIT_ELEMENT(state, payload) {
      state.editablePage.PageData[payload.i] = payload.element
      console.log(payload)
    }
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
