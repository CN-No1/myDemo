import { Message } from "element-ui";
import axios, { AxiosError } from "axios";

const vm = this as any;

const token = localStorage.getItem("access_token");
const apiSuccess = (response: any) => {
    const { code, message, msg } = response.data;
    if (code !== 0 && code !== 200) {
        Message({
            type: "error",
            message: message ? message : msg,
        });
    }
    return response.data;
};
const apiFail = (error: AxiosError) => {
    Message({
        type: "error",
        message: error.code ? error.code : "",
    });
    const response = error.response as any;
    if (response.status === 403) {
        localStorage.clear();
        // vm.$router.push("")
        // window.location.href = window.location.origin + "/sign";
        // window.location.reload();
    }
    return Promise.reject(error);
};

class BaseAPI {
    protected instance = axios.create({
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        withCredentials: true,
    });

    protected qs: any = require("querystring");

    constructor() {
        this.instance.interceptors.response.use(apiSuccess, apiFail);
        this.instance.defaults.withCredentials = true;
    }
}

export default BaseAPI;
