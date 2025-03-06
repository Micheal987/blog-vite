import { ApiRequest } from "../axios/index"
import type { ListRequest, PageParamType, ResponseResult } from "../axios"
export interface promotionType {
    href: string
    id: number
    images: string
    is_show: boolean
    title: string
}
export const getAdvertListApi = (parmas: PageParamType) => {
    return ApiRequest.getRequest<ResponseResult<ListRequest<promotionType>>>("/adverts", {
        params: parmas, headers: {
            "blog_Referer": location.pathname
        }
    })
}
export interface promotionCreateType {
    href: string
    images: string
    is_show: boolean
    title: string
    id?: number|undefined
}
export const defaultPromotionForm = {
    href: "",
    images: "",
    is_show: false,
    title: ""
}
export const postCreateAdvertApi = (params: promotionCreateType) => {
    return ApiRequest.postRequest<ResponseResult<promotionCreateType>>("/adverts", {}, params)
}

export const putUpdateAdvertApi = (id: number, params: promotionCreateType) => {
    return ApiRequest.pustRequest<ResponseResult<promotionCreateType>>("/adverts/" + id.toString(), {}, params)
}