import { ApiRequest } from '@/api/axios'
import type { ListRequest, PageParamType, ResponseResult } from "@/api/axios"
export interface promotionType {
    href: string
    id: number
    images: string
    is_show: boolean
    title: string
}
export const getAdvertListApi = (params: PageParamType) => {
    return ApiRequest.getRequest<ResponseResult<ListRequest<promotionType>>>("/advert", {
        params: params, headers: {
            "blog_Referer": location.pathname
        }
    })
}
export interface promotionCreateType {
    href: string
    images: string
    is_show: boolean
    title: string
    id?: number | undefined
}
export const defaultPromotionForm = {
    href: "",
    images: "",
    is_show: false,
    title: ""
}
export const postCreateAdvertApi = (params: promotionCreateType) => {
    return ApiRequest.postRequest<ResponseResult<promotionCreateType>>("/advert", {}, params)
}

export const putUpdateAdvertApi = (id: number, params: promotionCreateType) => {
    return ApiRequest.putRequest<ResponseResult<promotionCreateType>>("/advert/" + id.toString(), {}, params)
}