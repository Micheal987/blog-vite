import { ApiRequest, type ListDateType, type PageParamType, type ResponseResult } from "@/api/axios"

export interface CahtGruopType {
    id?: number
    created_at: string
    nickname: string
    avatar: string
    msg_type: number
    content: string
    ip?: string
    addr?: string
    is_group?: boolean
    isMe: boolean
}
export const getCahtgroupListApi = (params: PageParamType) => {
    return ApiRequest.getRequest<ResponseResult<ListDateType<CahtGruopType>>>('/chat_list', { params })
}
export const deleteChatApi = (id_list: number[]) => {
    return ApiRequest.deleteRequest<ResponseResult<string>>('/chat', { data: { id_list } },)
}
export interface CahtGroupConfigType {

    is_anonymous: boolean
    is_show_time: boolean
    default_limit: number
    content_length: number
    welcome_title: string
    is_online_people: boolean
    is_send_image: boolean
    is_send_file: boolean
    is_md: boolean
}
export interface CahtMessageType {
    nickname: string
    avatar: string
    msg_type: number
    content: string
    online_count: number
    created_at: string
}