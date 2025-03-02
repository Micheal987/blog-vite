import type { optionType } from "@/types"
import { ApiRequest, type PageParamType, type ResponseResult } from "../axios/index"
export const getRoleList = (params?: PageParamType) => {
    return ApiRequest.getRequest<ResponseResult<optionType[]>>("role_list", { params })
}