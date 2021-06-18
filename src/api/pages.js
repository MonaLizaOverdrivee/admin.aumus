import helpers from "@/helpers"

export default (axios) => ({
  allPages() {
    return axios.get("pages");
  },
  pagesCount() {
    return axios.get("pages/count");
  },
  changePage(pageId, page) {
    return axios.put(`pages/${pageId}`, page);
  },
  createPage(newPage) {
    return axios.post("pages", newPage);
  },
  // $$$$$$$$$ not use $$$$$$$$$$$
  searchPage({query, start = 0, limit = 10}) {
    const queryParam = encodeURI(helpers.withCapital(query));
    return axios.get(`pages?Title_contains=${queryParam}&_start=${start}&_limit=${limit}`);
  },
});
