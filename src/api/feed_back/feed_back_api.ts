import { ApiRequest, type ListDateType, type PageParamType, type ResponseResult } from "@/api/axios"
export interface FeedBackCreateType {
    email: string
    content: string
}export interface FeedBackType {
    id?: number
    content: string
    created_at: string
    email: string
}
export const postFeedBackCreateApi = (data: FeedBackCreateType) => {
    return ApiRequest.postRequest<ResponseResult<string>>('feedback', {}, data)
}
export const getFeedBackListApi = (params?: PageParamType) => {
    return ApiRequest.getRequest<ResponseResult<ListDateType<FeedBackType>>>('feedback_list', { params })
}