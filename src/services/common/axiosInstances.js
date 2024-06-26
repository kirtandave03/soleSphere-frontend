import axios from "axios";
import { BASE_URL } from "../../envVariables";

export const jsonAxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "auth-token": localStorage.getItem("auth-token"),
  },
});

export const formDataAxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    "auth-token": localStorage.getItem("auth-token"),
  },
});

export default { jsonAxiosInstance, formDataAxiosInstance };

jsonAxiosInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("auth-token");
    if (authToken) {
      config.headers["auth-token"] = authToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
