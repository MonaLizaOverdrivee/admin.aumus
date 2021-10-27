export default (axios) => ({
  uploadFile(file) {
    const data = new FormData()
    data.append('files', file, 'news.jpg')
    return axios.post("upload", data)
  }
})