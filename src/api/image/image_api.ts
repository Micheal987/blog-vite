import { ApiRequest, type ResponseResult } from '@/api/axios'
export interface ImageType {
    id: number
    path: string
    name: string
}
export const getImageInfoApi = () => {
    return ApiRequest.getRequest<ResponseResult<ImageType[]>>("/image_name", {})
}