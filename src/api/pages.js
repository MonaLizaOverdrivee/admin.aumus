export default axios => ({
  allPages() {
    return axios.get("pages")
  },
  allAccessPage() {
    return axios.get(`pages`)
  },
  pagesCount() {
    return axios.get("pages/count")
  },
  changePage(pageId, page) {
    return axios.put(`pages/${pageId}`, page)
  },
  createPage(newPage) {
    return axios.post("pages", newPage)
  },
  addEditors(users, pageId) {
    return axios.put(`pages/${pageId}`, {
      editors: users,
    })
  }
}) 