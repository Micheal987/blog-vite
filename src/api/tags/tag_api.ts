import { ApiRequest, type PageParamType, type ResponseResult } from "@/api/axios"
import type { optionType } from "@/types"
import { cacheRequest } from "@/api"
export const getTagOptionsApi1 = (params?: PageParamType) => {
    return ApiRequest.getRequest<ResponseResult<optionType[]>>('/tag_name', { params: params })
}
export const getTagOptionsApi:
    (params?: PageParamType) => Promise<ResponseResult<optionType[]>> = cacheRequest((params?: PageParamType) =>
        ApiRequest.getRequest<ResponseResult<optionType[]>>('/tag_name', { params: params }))