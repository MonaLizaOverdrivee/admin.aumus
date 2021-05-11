export default {
  namespaced: true,
  state() {
    return {
      notification: {
        severity: "",
        summary: "",
        detail: "",
      },
    };
  },
  getters: {
    notification: ({ notification }) => notification,
  },
  mutations: {
    SET_NOTIFY(state, payload) {
      state.notification.severity = payload.severity;
      state.notification.summary = payload.summary;
      state.notification.detail = payload.detail;
    },
  },
};
