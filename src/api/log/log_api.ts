import type { ListRequest, PageParamType, ResponseResult } from "../axios";
import { ApiRequest } from "../axios/index"
export interface LogRequestType extends PageParamType {
}
export type level = "debug" | "info" | "warning" | "error"
export interface LogList {
    id: number
    createdAt: string
    ip: string
    address: string
    level: level
    content: string
    user_id: number
}

export const getLogList = (params: LogRequestType) => {
    return ApiRequest.getRequest<ResponseResult<ListRequest<LogList>>>("log", { params: params })
}

export const deleteLogListApi = (params: LogRequestType) => {
    return ApiRequest.deleteRequest<ResponseResult<ListRequest<LogList[]>>>("log", { params: params })
}