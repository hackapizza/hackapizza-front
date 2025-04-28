import axios from "axios";
import { error } from "console";

const api = axios.create({
    baseURL: process.env.API_BASE_URL,
});


api.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        if(token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    error => Promise.reject(error)
);


export { api };