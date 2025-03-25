import { ApiRequest, type ListDateType, type PageParamType, type ResponseResult } from '@/api/axios'
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
export const gteMenuListApi = (params: PageParamType) => {
    return ApiRequest.getRequest<ResponseResult<ListDateType<MenuType>>>("/menu", { params: params })
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
export const postMenuCreateApi = (params: MenuCreateRequest) => {
    return ApiRequest.postRequest<ResponseResult<MenuCreateRequest>>("/menu", {}, params)
}
export const putMenuUpdateApi = (id: number, params: MenuCreateRequest) => {
    return ApiRequest.putRequest<ResponseResult<MenuCreateRequest>>("/menu/" + id.toString(), {}, params)
}
export const defaultMenuFrom = {
    title: '',
    path: '',
    slogan: '',
    abstract: [],
    abstract_time: 1,
    banner_time: 1,
    sort: 1,
    image_sort_list: [],
    abstractString: '',
    imageIdList: [],
}
export interface MenuNameType {
    id: number
    title: string
    path: string
}
export const getMenuNameApi = () => {
    return ApiRequest.getRequest<ResponseResult<MenuNameType[]>>('/menu_name', {})
}
export const getMenuDetailPatheApi = (path: string) => {
    return ApiRequest.getRequest<ResponseResult<MenuType>>('/menu_path', { params: { path: path } })
}