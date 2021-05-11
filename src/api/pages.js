export default axios => ({
  allPages() {
    return axios.get("pages")
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
  // $$$$$$$$$ not use $$$$$$$$$$$
  searchPage(query) {
    const queryParam = encodeURI(query)
    return axios.get(`pages?Title_contains=${queryParam}`)
  }
}) 