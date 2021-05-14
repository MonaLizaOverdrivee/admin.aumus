import api from "@/api"

export default {
  namespaced: true,
  state() {
    return {
      count: null,
      users: []
    }
  },
  getters: {
    users: ({ users }) => users,
    usersCount: ({ count }) => count
  },
  mutations: {
    SET_USERS(state, payload) {
      state.users = payload
    },
    SET_USERS_COUNT(state, count) {
      state.count = count
    }
  },
  actions: {
    async loadUsers({ commit }) {
      try {
        const { data } = await api.users.getAllUsers()
        commit("SET_USERS", data)
      } catch (error) {
        console.log(error)
      }
    },
    async loadUsersCount({ commit }) {
      try {
        const { data } = await api.users.usersCount()
        commit("SET_USERS_COUNT", data)
      } catch (error) {
        console.log(error)
      }
    }
  }
}