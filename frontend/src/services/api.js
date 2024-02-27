import axios from "axios";
import Cookies from "js-cookie";

const baseURL = 'http://localhost:8000/api/';

const apiInstance = axios.create({
  baseURL,
});

apiInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('auth_token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { apiInstance };