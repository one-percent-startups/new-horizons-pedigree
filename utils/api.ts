/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-extra-boolean-cast */
import axios from "axios";
export const app_api = axios.create({
    timeout: 60000,
    baseURL: "https://clinic-uat-api.enpointe.io/api",
});

app_api.interceptors.request.use((config) => {
    if (!!localStorage.getItem("newhorizon_user")) {
        const localStorageItem = localStorage.getItem("newhorizon_user") ?? "";
        const Token_key = JSON.parse(localStorageItem)?.token ?? "";
        const token = Token_key;
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

app_api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default app_api;
