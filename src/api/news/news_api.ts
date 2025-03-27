import { ApiRequest, type ResponseResult } from "@/api/axios"
export interface NewsType {
    index: number
    title: string | number
    hotValue: string
    link: string
}
export interface NewsQuequest {
    id: string
    size: number
}
export const postNewsListApi = (data: NewsQuequest) => {
    return ApiRequest.postRequest<ResponseResult<NewsType[]>>('/news', {}, data)
}