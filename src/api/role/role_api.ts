import type { optionType } from "@/types"
import { ApiRequest, type PageParamType, type ResponseResult } from '@/api/axios'
export const getRoleListApi = (params?: PageParamType) => {
    return ApiRequest.getRequest<ResponseResult<optionType[]>>("role_list", { params: params })
}