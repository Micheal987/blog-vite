import { ApiRequest, type ListRequest, type PageParamType, type ResponseResult } from "../axios"

export interface MessageType {
    avatar: string
    count: number
    nickName: string
    userID: number
    userName: string
}
export interface MessageRecordType {
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
    return ApiRequest.getRequest<ListRequest<MessageListType>>("messages", {})
}
export const getMessageRecordApi = (user_id: number) => {
    return ApiRequest.postRequest<ResponseResult<ListRequest<MessageListType>>>("messages_record", {}, user_id)
}
export const getMessageAllApi = (params: PageParamType) => {
    return ApiRequest.getRequest<ResponseResult<ListRequest<MessageListType>>>("messages_all", { params: params })
}
export const postSendMessageApi = (params: SendMessage) => {
    return ApiRequest.postRequest<ResponseResult<string>>("messages", {}, params)
}