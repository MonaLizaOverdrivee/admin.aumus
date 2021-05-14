export default (axios) => ({
  createUser() {
    return axios.post()
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
  changeDataUsers() {
    return axios.put()
  },
  deleteUser() {
    return axios.delete()
  }
})