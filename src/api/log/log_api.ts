import type { ListDateType, PageParamType, ResponseResult } from '../axios'
import { ApiRequest } from '@/api/axios'

export interface LogRequestType extends PageParamType {
  level?: string //等级 1 2 3 4 debug info warning error
  type?: number //日志的类型   1 登录日志  2 操作日志  3 运行日志
  ip?: string
  userID?: number
  addr?: string
  date?: string
  status?: boolean | ""
  userName?: string
}

export type LogLevel = 'debug' | 'info' | 'warning' | 'error'

export interface LogType {
  readonly id: number
  created_at: string
  updated_at: string
  ip: string
  address: string
  level: LogLevel
  title: string
  content: string
  userID: number
  userName: string
  serviceName: string
  status: boolean
  type: string
  readStatus: boolean
}

export interface RemoveListRequest {
  id_list: number[]
  startTime: string
  endTime: string
  userID: number
  ip: string
}

//log_v2_list
export const getLogList = (params: LogRequestType) => {
  return ApiRequest.getRequest<ResponseResult<ListDateType<LogType>>>('/log_v2_list', { params: params })
}

//log_v2
export const getReadLogListApi = (id: number) => {
  return ApiRequest.getRequest<ResponseResult<string>>('/log_v2', { params: { id: id } })
}
export const removeLogListApi = (params: RemoveListRequest) => {
  return ApiRequest.deleteRequest<ResponseResult<string>>('/log_v2', { params: params })
}