import axios from "axios";
import pages from "./pages"
import auth from "./auth"

const baseAxios = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
})

export default {
  pages: pages(baseAxios),
  auth: auth(baseAxios)
}