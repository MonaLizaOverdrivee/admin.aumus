export default (axios) => ({
  createUser(user) {
    return axios.post("users", user)
  },
  markAuthTime() {
    return axios.put()
  },
  getAllUsers() {
    return axios.get("users")
  },
  usersCount() {
    return axios.get("users/count")
  },
  changeDataUsers(user) {
    return axios.put(`users/${user.id}`, user)
  },
  deleteUser() {
    return axios.delete()
  },
  getUserRole() {
    return axios.get("users-permissions/roles")
  }
})