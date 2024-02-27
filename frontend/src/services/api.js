import axios from "axios";
import Cookies from "js-cookie";

const getAuthHeaders = () => {
  const token = Cookies.get('auth_token');
  return {
    Authorization: `Token ${token}`,
  };
};

const baseURL = 'http://localhost:8000/api/';

const apiInstance = axios.create({
  baseURL,
  headers: getAuthHeaders(),
});

export { apiInstance };
  