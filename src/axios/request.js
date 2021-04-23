import axios from "axios";

const requestToDatabase = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
});

export { requestToDatabase };
