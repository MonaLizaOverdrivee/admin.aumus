export default (axios) => ({
  uploadFile(file) {

    let data = new FormData()
    data.append('image[]', file, file.name)
    return axios.post("upload", data)
  }
})