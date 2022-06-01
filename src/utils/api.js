import axios from "axios";
import Cookies from 'js-cookie'
import { API_URL } from "../config";
import { getToken } from "./session";


axios.defaults.withCredentials = true;


const axiosInstance = axios.create({
    baseURL: API_URL,
    // timeout: 5000,
    responseType: 'application/json',
    responseEncoding: 'utf8',
        headers: {
        'X-CSRFTOKEN': Cookies.get('csrftoken'),
    },
});

axiosInstance.interceptors.request.use(config => {
    const token = getToken();

    if (token) {
        config.headers.common['Authorization'] = `Token ${token}`;
    }

    return config;
});

export default axiosInstance;