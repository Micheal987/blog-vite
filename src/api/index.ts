import type { optionType } from "@/types"
import { ApiRequest, type PageParamType, type ResponseResult } from '@/api/axios'

//删除
export const defaultDeleteApi = <T>(url: string, ids: T[]) => {
    return ApiRequest.deleteRequest<ResponseResult<string>>(url, {
        data: {
            id_list: ids
        }
    })
}
export const defaultOptionApi = (url: string, params?: PageParamType) => {
    return ApiRequest.getRequest<ResponseResult<optionType[]>>(url, { params })
}
export const cacheRequest = <T>(func: () => Promise<T>): () => Promise<T> => {
    let lastRequestTime: number = 0 //存上次请求的时间戳
    let cacheData: T | null = null //上传缓存的数据
    let currentRequest: Promise<T> | null = null
    return (): Promise<T> => {
        let currtenTime = Date.now()
        let timeDiff = currtenTime - lastRequestTime
        if (timeDiff < 1000 && cacheData) {
            return Promise.resolve(cacheData)
        }
        //没有缓存数据,或者时间超过1秒,那就海新的请求
        if (!currentRequest) {
            currentRequest = func().then((res: T) => {
                lastRequestTime = currtenTime
                cacheData = res
                currentRequest = null
                return res
            })
        }
        return currentRequest
    }

}