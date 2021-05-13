import axios from "axios";
import pages from "./pages";
import auth from "./auth";

const baseAxios = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
});

// const authAxios = axios.create({
//   baseURL
// })

export default {
  pages: pages(baseAxios),
  auth: auth(baseAxios),
};

baseAxios.interceptors.request.use(function(config) {
  if(config.url === "auth/local") {
    return config
  } else {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
  }
  return config
})