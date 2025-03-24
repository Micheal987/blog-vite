import { ApiRequest, type ResponseResult } from "@/api/axios"
export interface LoginDateType {
    date_list: string[]
    login_date: number[]
    sing_date: number[]
}
export interface LoginDateRequest {
    date: number
}
export const getDateLoginApi = (params: LoginDateRequest) => {
    return ApiRequest.getRequest<ResponseResult<LoginDateType>>('/login_data', { params })
}
export interface StatisticsType {
    user_count: number
    article_count: number
    message_count: number
    chat_group_count: number
    now_login_count: number
    now_sing_count: number
    flow_count: number //流量
}
export const getStatisticApi = () => {
    return ApiRequest.getRequest<ResponseResult<StatisticsType>>('/login_data_sum', {})
}