import axios from "axios";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*"
  }
});

http.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      return Promise.reject(error.response.data);
    }
  }
)

export default http;
