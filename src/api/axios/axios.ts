import axios, { type AxiosRequestConfig } from "axios"
import { useStoreConfig } from "@/store"
import { Message } from "@arco-design/web-vue";
class AxiosRequest {
    private instance
    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config)
        this.interceptors()
    }
    public request<T>(config: AxiosRequestConfig): Promise<T> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.instance.request<T>(config)
                resolve(response.data)
            } catch (error) {
                reject(error)
            }
        })
    }
    public getRequest<T>(url: string, config: AxiosRequestConfig): Promise<T> {
        return new Promise((resolve, reject) => {
            this.instance.get<T>(url, config).
                then((response) => {
                    resolve(response.data)
                }).catch((err) => {
                    reject(err)
                })
        })
    }
    public postRequest<T>(url: string, config: AxiosRequestConfig, data?: any,): Promise<T> {
        return new Promise((resolve, reject) => {
            this.instance.post<T>(url, data, config).
                then((response) => {
                    resolve(response.data)
                }).catch((err) => {
                    reject(err)
                })
        })
    }
    public putRequest<T>(url: string, config: AxiosRequestConfig, data?: any,): Promise<T> {
        return new Promise((resolve, reject) => {
            this.instance.put<T>(url, data, config).
                then((response) => {
                    resolve(response.data)
                }).catch((err) => {
                    reject(err)
                })
        })
    }
    public deleteRequest<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return new Promise((resolve, reject) => {
            this.instance.delete<T>(url, config).
                then((response) => {
                    resolve(response.data)
                }).catch((err) => {
                    reject(err)
                })
        })
    }
    private interceptors() {
        this.interceptorsRequest()
        this.interceptorsResponse()
    }
    private interceptorsRequest() {
        // 添加请求拦截器
        this.instance.interceptors.request.use(
            (config) => {
                // 在发送请求之前做些什么
                const store = useStoreConfig()
                config.headers["token"] = store.userInfo.token
                return config;
            },
            (error) => {
                // 对请求错误做些什么
                return Promise.reject(error);
            });

    }
    private interceptorsResponse() {
        // 添加响应拦截器
        this.instance.interceptors.response.use(
            (response) => {
                // 2xx 范围内的状态码都会触发该函数。
                // 对响应数据做点什么
                if (response.status != 200) {
                    Message.error(response.statusText)
                    return Promise.reject(response.statusText)
                }
                return response
            },
            (error) => {
                // 超出 2xx 范围的状态码都会触发该函数。
                // 对响应错误做点什么
                if (error.status !== 200) {
                    // 失败的
                    Message.error(error.response.data.msg)
                }
                return Promise.reject(error);
            });

    }
}
export {
    AxiosRequest
}