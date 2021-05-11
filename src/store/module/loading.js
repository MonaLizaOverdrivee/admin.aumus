export default {
  namespaced: true,
  state() {
    return {
      loadingButton: false,
    };
  },
  getters: {
    loadingButton: ({ loadingButton }) => loadingButton,
  },
  mutations: {
    TOGGLE_LOADING_BUTTON(state, bool) {
      state.loadingButton = bool;
    },
  },
};
