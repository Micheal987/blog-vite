import type { ListDateType, PageParamType, ResponseResult } from "@/api/axios"
import { ApiRequest } from "@/api/axios"
export interface CommentArticleType {
    title: string
    id: string
    count: number
}
export const getcommentArticleListApi = (params: PageParamType) => {
    return ApiRequest.getRequest<ResponseResult<ListDateType<CommentArticleType>>>('/comment', { params })
}
export interface commentUserType {
    id: 1,
    created_at: string
    nick_name: string
    user_name: string
    avatar: string
    email: string
    tel: string
    addr: string
    link: string
    sign: string
    integral: number
    ip: string
    role: string
    sign_status: string
}
export interface CommentType {
    id: number
    created_at: string
    sub_comments: CommentType[]
    comment_model: null | any
    parent_comment_id: null | number
    content: string
    digg_count: number
    comment_count: number
    article_id: string
    user: commentUserType
    user_id: number
    apply_comment: string // 人为加的
    apply_show: boolean //是否显示回复的组件
}
export const getCommentListApi = (id: string) => {
    return ApiRequest.getRequest<ResponseResult<ListDateType<CommentType>>>('comment_list', { params: { article_id: id } })
}
export const DeleteCommentApi = (id: number) => {
    return ApiRequest.deleteRequest<ResponseResult<string>>(`/comment/${id}`, {})
}
export interface CommentAddType {
    article_id: string
    comment: string
    parent_id?: number
}
export const postCommentCreateApi = (data: CommentAddType) => {
    return ApiRequest.postRequest<ResponseResult<string>>('/comment', {}, data)
}
export const postCommentDigg = (id: string) => {
    return ApiRequest.postRequest<ResponseResult<string>>(`/digg/article/${id}`, {})
}