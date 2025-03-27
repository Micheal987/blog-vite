import { ApiRequest, type ListDateType, type ListRequest, type PageParamType, type ResponseResult } from '@/api/axios'

export interface MessageParams extends PageParamType {
  nick_name?: string
}
export interface MessageType {
  avatar: string
  count: number
  nick_name: string
  user_id: number
  user_name: string
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
  isMe: boolean
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
  return ApiRequest.getRequest<ListRequest<MessageListType>>('/message', {})
}
//golang 需要新增接口
export const getMessageUserApi = (params: MessageParams) => {
  return ApiRequest.getRequest<ListRequest<MessageType>>('/message_user', {
    params: params,
  })
}
//golang 需要新增接口
export const postMessageRecordApi = (id: number) => {
  return ApiRequest.postRequest<ResponseResult<ListDateType<MessageRecordType>>>('/message_record', {}, {
    user_id: id,
  })
}
interface UserInfo extends PageParamType {
  user_id: number
}
export const getMessageUserInfoApi = (params: UserInfo) => {
  return ApiRequest.getRequest<ResponseResult<ListDateType<MessageType>>>('/message_user_info', { params: params })
}
export const getMessageAllApi = (params: PageParamType) => {
  return ApiRequest.getRequest<ResponseResult<ListDateType<MessageListType>>>('/message_all', { params: params })
}
export const postSendMessageApi = (params: SendMessage) => {
  return ApiRequest.postRequest<ResponseResult<string>>('/api/message', {}, params)
}
export const postUserListByMeApi = () => {
  return ApiRequest.postRequest<ResponseResult<ListDateType<MessageType>>>('', {})
}
export const postUserListMeRecordApi = (userId: number) => {
  return ApiRequest.postRequest<ResponseResult<ListDateType<MessageRecordType>>>('', { params: userId })
}
export interface MessagePublish {
  conent: string,
  rev_user_id: number
}
export const postMessageUserPublishApi = (data: MessagePublish) => {
  return ApiRequest.postRequest<ResponseResult<ListDateType<MessageListType[]>>>('/message/user', {}, data)
}