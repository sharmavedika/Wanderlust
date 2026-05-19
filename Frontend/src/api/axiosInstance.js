import axios from "axios";
// axiosInstance.js
const token = import.meta.env.VITE_MAP_TOKEN;
const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
});

export default axiosInstance;