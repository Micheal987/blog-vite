import { AxiosRequest } from "./axios"

const ApiRequest = new AxiosRequest({
    baseURL: "/api",
    timeout: 9999,
    headers: {},
    params: {}
})
export { ApiRequest }