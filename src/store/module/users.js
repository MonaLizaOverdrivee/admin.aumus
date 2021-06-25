import api from "@/api";
// import isEqual from "lodash/isEqual";
// import cloneDeep from "lodash/cloneDeep";

export default {
  namespaced: true,
  state() {
    return {
      startStateEditableUser: {},
      currentEditableUser: {},
      count: null,
      users: [],
      roles: {},
    };
  },
  getters: {
    users: ({ users }) => users,
    usersCount: ({ count }) => count,
    usersRole: ({ roles }) => roles,
    // compare
  },
  mutations: {
    SET_USERS(state, payload) {
      state.users = payload;
    },
    SET_USERS_COUNT(state, count) {
      state.count = count;
    },
    CHANGE_USER(state, payload) {
      const i = state.users.findIndex((itm) => (itm.id = payload.id));
      state.users[i] = payload;
    },
    SET_USERS_ROLE(state, payload) {
      state.roles = payload;
    },
    ADD_NEW_USER(state, user) {
      state.users.push(user);
    },
  },
  actions: {
    async loadUsers({ commit }) {
      try {
        const { data } = await api.users.getAllUsers();
        commit("SET_USERS", data);
      } catch (error) {
        console.log(error);
      }
    },
    async loadUsersCount({ commit }) {
      try {
        const { data } = await api.users.usersCount();
        commit("SET_USERS_COUNT", data);
      } catch (error) {
        console.log(error);
      }
    },
    async changeData({ commit }, user) {
      try {
        commit("loading/TOGGLE_LOADING_BUTTON", true, { root: true });
        const { data } = await api.users.changeDataUsers(user);
        commit("CHANGE_USER", data);
        commit("loading/TOGGLE_LOADING_BUTTON", true, { root: true });
      } catch ({ response }) {
        commit("loading/TOGGLE_LOADING_BUTTON", true, { root: true });
        commit(
          "notification/SET_NOTIFY",
          {
            severity: "error",
            summary: "Ошибка!",
            detail: response.status + " " + response.statusText,
          },
          { root: true }
        );
      }
    },
    async create({ commit }, user) {
      try {
        const { data } = await api.users.createUser(user);
        commit("ADD_NEW_USER", data);
      } catch ({ response }) {
        console.log(response)
        commit(
          "notification/SET_NOTIFY",
          {
            severity: "error",
            summary: "Ошибка!",
            detail: response.status + " " + response.statusText,
          },
          { root: true }
        );
      }
    },
    async loadUsersRole({ commit }) {
      const { data } = await api.users.getUserRole();
      const list = data.roles.reduce((acc, itm) => {
        acc[itm.type] = {
          id: itm.id,
          type: itm.type,
          discription: itm.description,
          name: itm.name,
        };
        return acc;
      }, {});
      commit("SET_USERS_ROLE", list);
    },
  },
};
