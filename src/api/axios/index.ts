import { AxiosRequest } from "./axios"
export interface ResponseResult<T> {
    code: number
    msg: string
    data: T
}
export interface ListDateType<T> {
    list: T[]
    count: number
}
export interface ListRequest<T> {
    code: number
    msg: string
    data: {
        count: number,
        list: T[]
    }
}
export interface PageParamType {
    page?: number
    limit?: number
    key?: string
    sort?: string
}
const ApiRequest = new AxiosRequest({
    baseURL: "/api",
})
export { ApiRequest }