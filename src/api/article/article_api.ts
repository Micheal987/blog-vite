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
    is_collect?: boolean
    is_digg?: boolean,
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
export interface ArticleparamType extends PageParamType {
    date?: string
    tags?: string
    category?: string
}
export const getArticleListApi = (params: ArticleparamType) => {
    return ApiRequest.getRequest<ResponseResult<ListDateType<ArticleType>>>('/article_list', { params: params })
}
// Promise<ResponseResult<optionType[]>>
export const getArticleCategory1 = (params?: PageParamType) => {
    return ApiRequest.getRequest<ResponseResult<optionType[]>>('/article_category', { params: params })
}
export const getArticleCategory: (params?: PageParamType) => Promise<ResponseResult<optionType[]>> = cacheRequest((params?: PageParamType) => ApiRequest.getRequest<ResponseResult<optionType[]>>('/article_category', { params: params }))
export interface ArticleUpdateType {
    title: string
    abstract?: string
    content?: string
    category: string
    source?: string
    link?: string
    banner_id?: number
    banner_url?: string
    tags?: string[]
    ID?: string
}
export const putArticleUpdateApi = (params: ArticleUpdateType) => {
    return ApiRequest.putRequest<ResponseResult<string>>('/article_update', {}, params)
}
export const postArticleCreateApi = (params: ArticleUpdateType) => {
    return ApiRequest.postRequest<ResponseResult<string>>('/article_create', {}, params)
}

export const getArticleTagsApi: (params?: PageParamType) => Promise<ResponseResult<string[]>> = cacheRequest((params?: PageParamType) => ApiRequest.getRequest<ResponseResult<string[]>>('/article_tags', { params: params }))
export const getArticleTagsApi1 = (params?: PageParamType) => {
    return ApiRequest.getRequest<ResponseResult<string[]>>('/article_tags', { params: params })
}
export const getArticleApi = (id: string) => {
    return ApiRequest.getRequest<ResponseResult<string>>(`/article/content/${id}`, {})
}
export const getArticleCollectApi = (params?: PageParamType) => {
    return ApiRequest.getRequest<ResponseResult<ListDateType<ArticleType>>>('/article/collects/list', { params: params })
}
export interface ArticleCalendarType {
    data: string
    count: number

}
export const getArticleCalendarApi = () => {
    return ApiRequest.getRequest<ResponseResult<ArticleCalendarType[]>>('/article_calendar', {})
}
export const getArticleDetailApi = (id: string) => {
    return ApiRequest.getRequest<ResponseResult<ArticleType>>(`/article_detail/${id}`, {})
}
export const psotArticleDiggApi = (id: string) => {
    return ApiRequest.postRequest<ResponseResult<string>>(`/digg/article/${id}`, {})
}
export const psotArticleColleApi = (ID: string) => {
    return ApiRequest.postRequest<ResponseResult<string>>(`/article/collects`, { params: { ID } },)
}
export interface ArticleSearchType {
    id: string
    title: string
    key: string
    slug: string
    body: string
}
export const getArticleSearchApi = (params?: PageParamType) => {
    return ApiRequest.getRequest<ResponseResult<ListDateType<ArticleSearchType>>>("/article/text", { params })
}