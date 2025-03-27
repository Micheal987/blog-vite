import type { ListRequest, PageParamType, ResponseResult } from '../axios'
import { ApiRequest } from '@/api/axios'

export interface LogRequestType extends PageParamType {
  level?: string //等级 1 2 3 4 debug info warning error
  type?: string //日志的类型   1 登录日志  2 操作日志  3 运行日志
  ip?: string
  userID?: number
  addr?: string
  date?: string
  status?: boolean | undefined
  userName?: string
}

export type level = 'debug' | 'info' | 'warning' | 'error'

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
  return ApiRequest.getRequest<ResponseResult<ListRequest<LogList>>>('/log', { params: params })
}

export const deleteLogListApi = (params: LogRequestType) => {
  return ApiRequest.deleteRequest<ResponseResult<ListRequest<LogList[]>>>('/log', { params: params })
}