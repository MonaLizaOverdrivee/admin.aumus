import api from "@/api";
import isEqual from "lodash/isEqual";
import cloneDeep from "lodash/cloneDeep";

export default {
  namespaced: true,
  state() {
    return {
      pagesCount: null,
      pages: [],
      editablePage: {},
      startEditablePage: {},
    };
  },
  getters: {
    pagesCount: ({ pagesCount }) => pagesCount,
    pages: ({ pages }) => pages,
    editablePage: ({ editablePage }) => editablePage,
    qntElements: ({ editablePage }) => editablePage.elements.length,
    compare: ({ editablePage, startEditablePage }) => isEqual(editablePage, startEditablePage),
    pagesSummary: ({ pages }) => pages.map(({ Title, id }) => ({ id, Title })),
  },
  mutations: {
    SET_PAGES_COUNT(state, payload) {
      state.pagesCount = payload;
    },
    SET_PAGES_LIST(state, pages) {
      state.pages = pages;
    },
    SET_PAGE_DATA_ELEMENT(state, { index, element }) {
      state.editablePage.elements.splice(index, 0, element);
    },
    DELETE_ELEMENT(state, index) {
      state.editablePage.elements.splice(index, 1);
    },
    SET_EDITABLE_PAGE(state, page) {
      state.editablePage = page;
      state.startEditablePage = cloneDeep(page);
    },
    SET_PAGE_DATA_EDIT_ELEMENT(state, { index, element }) {
      state.editablePage.elements[index] = element;
    },
    CHANGE_VISIBLE_ELEMENT(state, index) {
      state.editablePage.elements[index].visible = !state.editablePage.elements[index].visible;
    },
    CHANGE_ORDER_ELEMENT(state, { old_index, new_index }) {
      state.editablePage.elements.splice(new_index, 0, state.editablePage.elements.splice(old_index, 1)[0])
    }
  },
  actions: {
    async loadPagesCount({ commit }) {
      const { data } = await api.pages.pagesCount();
      commit("SET_PAGES_COUNT", data);
    },
    async loadPages({ commit }) {
      try {
        const { data } = await api.pages.allPages();
        // const { data: loginData } = await api.auth.logIn("art", "Q123456e");
        // console.log(loginData);
        commit("SET_PAGES_LIST", data);
        console.log(data);
      } catch ({ response }) {
        console.log(response);
        commit(
          "notification/SET_NOTIFY",
          {
            severity: "error",
            summary: "????????????!",
            detail: response.status + " " + response.statusText + " ???? ?????????????? ?????????????????? ????????????????",
          },
          { root: true }
        );
      }
    },
    async loadSearchPage({ commit }, query) {
      try {
        const { data } = await api.pages.searchPage(query);
        commit("SET_PAGES_LIST", data);
        console.log(data);
      } catch ({ response }) {
        commit(
          "notification/SET_NOTIFY",
          {
            severity: "error",
            summary: "????????????!",
            detail: response.status + " " + response.statusText,
          },
          { root: true }
        );
      }
    },
    async saveEditablePage({ state, commit }) {
      try {
        commit("loading/TOGGLE_LOADING_BUTTON", true, { root: true });
        const { data } = await api.pages.changePage(state.editablePage.id, state.editablePage);
        console.log(data);
        commit("SET_EDITABLE_PAGE", data);
        commit(
          "notification/SET_NOTIFY",
          {
            severity: "success",
            summary: "??????????????!",
            detail: "???????????????? ??????????????????",
          },
          { root: true }
        );
      } catch ({ response }) {
        commit(
          "notification/SET_NOTIFY",
          {
            severity: "error",
            summary: "????????????!",
            detail: response.status + " " + response.statusText,
          },
          { root: true }
        );
      } finally {
        commit("loading/TOGGLE_LOADING_BUTTON", false, { root: true });
      }
    },
    async saveNewPage({ state, commit }) {
      try {
        commit("loading/TOGGLE_LOADING_BUTTON", true, { root: true });
        const { data } = await api.pages.createPage(state.editablePage);
        commit("SET_EDITABLE_PAGE", data);
        commit(
          "notification/SET_NOTIFY",
          {
            severity: "success",
            summary: "??????????????!",
            detail: "???????????????? ??????????????????",
          },
          { root: true }
        );
      } catch ({ response }) {
        commit(
          "notification/SET_NOTIFY",
          {
            severity: "error",
            summary: "????????????!",
            detail: response.status + " " + response.statusText,
          },
          { root: true }
        );
      } finally {
        commit("loading/TOGGLE_LOADING_BUTTON", false, { root: true });
      }
    },
  },
};
