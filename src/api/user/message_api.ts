import { ApiRequest, type ListDateType, type ListRequest, type PageParamType, type ResponseResult } from '@/api/axios'

export interface MessageType {
  avatar: string
  count: number
  nickName: string
  userID: number
  userName: string
}

export interface MessageRecordType {
  send_user_id: number
  send_user_nick_name: string
  send_user_avatar: string
  rev_user_id: number
  rev_user_nick_name: string
  rev_user_avatar: string
  content: string
  created_at: string
  message_count: number
}

export interface MessageListType {
  id: number
  created_at: string
  send_user_id: number
  send_user_nick_name: string
  send_user_avatar: string
  rev_user_id: number
  rev_user_nick_name: string
  rev_user_avatar: string
  is_read: boolean
  content: string
  message_count: number
}

export interface SendMessage {
  send_user_id: number
  rev_user_id: number
  content: string

}

export const getMessageListApi = () => {
  return ApiRequest.getRequest<ListRequest<MessageListType>>('message', {})
}
//golang 需要新增接口
export const getMessageUserApi = () => {
  return ApiRequest.getRequest<ListRequest<MessageListType>>('message', {})
}
//golang 需要新增接口
export const getMessageUserListApi = () => {
  return ApiRequest.getRequest<ResponseResult<ListDateType<MessageListType>>>('message_record', {}, {})
}
export const postMessageRecordApi = (user_id: number) => {
  return ApiRequest.postRequest<ResponseResult<ListDateType<MessageListType>>>('message_record', {}, {user_id: user_id})
}
export const getMessageAllApi = (params: PageParamType) => {
  return ApiRequest.getRequest<ResponseResult<ListDateType<MessageListType>>>('message_all', { params: params })
}
export const postSendMessageApi = (params: SendMessage) => {
  return ApiRequest.postRequest<ResponseResult<string>>('message', {}, params)
}