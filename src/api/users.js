export default (axios) => ({
  createUser() {
    return axios.post()
  },
  markAuthTime() {
    return axios.put()
  },
  getUsers() {
    return axios.get()
  },
  changeDataUsers() {
    return axios.put()
  },
  deleteUser() {
    return axios.delete()
  }
})