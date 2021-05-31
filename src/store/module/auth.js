import api from "@/api";
import { updatePermissions } from "@/utils/permissions";
// import { AbilityBuilder } from '@casl/ability';

export default {
  namespaced: true,
  state() {
    return {
      token: "",
      user: {
        blocked: false,
        confirmed: true,
        created_at: "2021-05-13T08:53:05.845Z",
        email: "santospele@mail.ru",
        firstName: "Артём",
        id: 2,
        lastName: "Науменко",
        last_auth: null,
        provider: "local",
        role: { id: 4, name: "Admin", description: "admin", type: "admin" },
        updated_at: "2021-05-13T08:53:05.857Z",
        username: "art_2",
        access: {
          pages: {
            3: "editor",
            2: "contentManager",
          },
          modules: ["/pages"],
        },
      },
    };
  },
  getters: {
    userAccess: ({ user }) => user.access,
    role: ({ user }) => user.role.type,
    fullName: ({ user }) => user.firstName + ' ' + user.lastName
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const { data } = await api.auth.logIn(email, password);
        commit("SET_TOKEN", data.jwt);
        commit("SET_USER", data.user);
        updatePermissions(data.user);
      } catch ({ response }) {
        commit(
          "notification/SET_NOTIFY",
          {
            severity: "error",
            summary: "Ошибка!",
            detail: response.status + " " + response.statusText + " Ошибка авторизации",
          },
          { root: true }
        );
        return Promise.reject();
      }
    },
    logOut({ commit }) {
      commit("SET_TOKEN", "");
      commit("SET_USER", {});
      localStorage.clear();
    },
    // dont use
    autoLogin({ commit }) {
      try {
        const token = localStorage.getItem('token')
        const user = JSON.parse(localStorage.getItem('user'))

        if(!token || !user) throw new Error("Ошибка авторизации, нет данных о пользователе")

        commit("SET_TOKEN", token)
        commit("SET_USER", user)
        console.log(user)
        updatePermissions(user);
      } catch {
        return Promise.reject()
      }
    },
  },
};
