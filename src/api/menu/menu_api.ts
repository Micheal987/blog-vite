import { ApiRequest, type ListRequest, type PageParamType, type ResponseResult } from "../axios/index"
export interface BannerType {
    id: number
    path: string
}
export interface MenuType {
    id: number
    created_at: string
    title: string
    path: string
    slogan: string
    abstract: string[]
    abstract_time: number
    banner_time: number
    sort: number
    banners: BannerType[]
}
export const gteMenuList = (params: PageParamType) => {
    return ApiRequest.getRequest<ResponseResult<ListRequest<MenuType>>>("/menus", { params: params })
}
export interface ImageSortType {
    image_id: number
    sort: number
}
export interface MenuCreateRequest {
    title: string
    path: string
    slogan: string
    abstract: string[]
    abstract_time: number
    banner_time: number
    sort: number
    image_sort_list: ImageSortType[]
}
export const postMenuCreate = (params: MenuCreateRequest) => {
    return ApiRequest.postRequest<ResponseResult<MenuCreateRequest>>("/menus", {}, params)
}