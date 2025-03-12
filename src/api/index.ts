import type { optionType } from "@/types"
import { ApiRequest, type PageParamType, type ResponseResult } from '@/api/axios'

//删除
export const defaultDeleteApi = <T>(url: string, ids: T[]) => {
    return ApiRequest.deleteRequest<ResponseResult<string>>(url, {
        data: {
            id_list: ids
        }
    })
}
export const defaultOptionApi = (url: string, params?: PageParamType) => {
    return ApiRequest.getRequest<ResponseResult<optionType[]>>(url, { params })
}