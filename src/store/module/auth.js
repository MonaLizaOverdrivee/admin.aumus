import api from "@/api"
import { updatePermissions } from "@/utils/permissions"
// import { AbilityBuilder } from '@casl/ability';

export default {
  namespaced: true,
  state() {
    return {
      token: "",
      user: {
        fullName: "",
        mail: "",
        role: "admin",
        access: {
          pages: {
            3: "editor",
            2: "contentManager",
          },
          modules: ['/pages'],
        },
      },
    };
  },
  getters: {
    userAccess: ({ user }) => user.access,
    role: ({ user }) => user.role.type,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    SET_USER(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))

    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const { data } = await api.auth.logIn(email, password)
        // console.log(data)
        //{role: data.user.role.type, modules: data.user.access.modules}
        commit("SET_TOKEN", data.jwt)
        commit("SET_USER", data.user)
        updatePermissions({role: data.user.role.type, modules: data.user.access.modules})

      } catch (error) {
        console.log(error)
        return Promise.reject()
      }
    }
  }
};
