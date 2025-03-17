import { ApiRequest } from "@/api/axios"
import type { ListDateType, PageParamType, ResponseResult } from "@/api/axios"
import type { optionType } from "@/types"
import { cacheRequest } from "@/api"
export interface ArticleType {
    ID: string
    created_at: string
    updated_at: string
    title: string
    keyword: string
    abstract: string
    content: string
    look_count: number
    comment_count: number
    digg_count: number
    collects_count: number
    user_id: number
    user_nick_name: string
    user_avatar: string
    category: string
    source: string
    link: string
    banner_id: number
    banner_url: string
    tags: string[]
}
export interface ArticleItemType {
    ID: string
    created_at?: string
    updated_at?: string
    title: string
    keyword?: string
    abstract?: string
    content?: string
    look_count?: number
    comment_count?: number
    digg_count?: number
    collects_count?: number
    user_id?: number
    user_nick_name?: string
    user_avatar?: string
    category: string
    source?: string
    link?: string
    banner_id?: number
    banner_url?: string
    tags: string[]
}
export interface ArticleDataType {
    look_count: number
    comment_count: number
    digg_count: number
    collects_count: number
    created_at: string
}
export interface ArticleRequest extends PageParamType {
    tags: string
}
export const getArticleListApi = (params: PageParamType) => {
    return ApiRequest.getRequest<ResponseResult<ListDateType<ArticleType[]>>>('/article_list', { params: params })
}
// Promise<ResponseResult<optionType[]>>
export const getArticleCategory = (params?: PageParamType) => {
    return ApiRequest.getRequest<ResponseResult<optionType[]>>('/article_category', { params: params })
}
export interface ArticleUpdateType {
    title: string
    abstract?: string
    content: string
    category: string
    source?: string
    link?: string
    banner_id?: number
    banner_url?: string
    tags?: string[]
    id?: string
}
export const putArticleUpdateApi = (params: ArticleUpdateType) => {
    return ApiRequest.putRequest<ResponseResult<string>>('/article_update', {}, params)
}
export const postArticleCreateApi = (params: ArticleUpdateType) => {
    return ApiRequest.postRequest<ResponseResult<string>>('/article_update', {}, params)
}

export const getArticleTagsApi: (params?: PageParamType) => Promise<ResponseResult<string[]>> = cacheRequest((params?: PageParamType) => ApiRequest.getRequest<ResponseResult<string[]>>('/article_tags', { params: params }))
export const getArticleTagsApi1 = (params?: PageParamType) => {
    return ApiRequest.getRequest<ResponseResult<string[]>>('/article_tags', { params: params })
}
export const getArticleApi = (id: string) => {
    return ApiRequest.getRequest<ResponseResult<string>>('/article_detail/' + id, {})
}