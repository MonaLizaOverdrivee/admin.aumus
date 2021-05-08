import api from "@/api"
import isEqual from "lodash/isEqual"
import cloneDeep  from "lodash/cloneDeep"

export default {
  namespaced: true,
  state() {
    return {
      pagesCount: null,
      pages: [],
      editablePage: {},
      startEditablePage: {}
    };
  },
  getters: {
    pagesCount: ({ pagesCount }) => pagesCount,
    pages: ({ pages }) => pages,
    editablePage: ({ editablePage }) => editablePage,
    qntElements: ({ editablePage }) => editablePage.PageData.length,
    compare: ({ editablePage,  startEditablePage}) => isEqual(editablePage,  startEditablePage)
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
    SET_PAGE_DATA_ELEMENT_BETWEEN(state, element) {
      state.editablePage.PageData.splice(element.i, 0, element.data);
    },
    DELETE_ELEMENT(state, index) {
      state.editablePage.PageData.splice(index, 1)
    },
    SET_EDITABLE_PAGE(state, page) {
      state.editablePage = page;
      state.startEditablePage = cloneDeep(page)
    },
    SET_PAGE_DATA_EDIT_ELEMENT(state, payload) {
      state.editablePage.PageData[payload.i] = payload.element
    },
    CHANGE_VISIBLE_ELEMENT(state, index) {
      state.editablePage.PageData[index].visible = !state.editablePage.PageData[index].visible
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
        const { data: loginData } = await api.auth.logIn('art', 'Q123456e')
        console.log(loginData)
        commit("SET_PAGES_LIST", data);
      } catch (error) {
        console.log(error.response)
      }
     
    },
    async saveEditablePage({ state, commit }) {
      try {
        commit("loading/TOGGLE_LOADING_BUTTON", true, { root: true })
        const { data } = await api.pages.changePage(state.editablePage.id, state.editablePage);
        console.log(data)
        commit('SET_EDITABLE_PAGE', data)
        commit("loading/TOGGLE_LOADING_BUTTON", false, { root: true })
      } catch (error) {
        commit("loading/TOGGLE_LOADING_BUTTON", false, { root: true })
        console.log(error)
        return Promise.reject(error.response)
      }
    },
    async saveNewPage({ state, commit }) {
      try {
        commit("loading/TOGGLE_LOADING_BUTTON", true, { root: true })
        const { data } = await api.pages.createPage(state.editablePage);
        commit('SET_EDITABLE_PAGE', data)
        commit("loading/TOGGLE_LOADING_BUTTON", false, { root: true })
        
      } catch (error) {
        commit("loading/TOGGLE_LOADING_BUTTON", false, { root: true })
        return Promise.reject(error.response)
      }
    },
  },
};
