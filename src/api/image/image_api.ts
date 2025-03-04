import { ApiRequest, type ResponseResult } from "../axios/index"
export interface ImageType {
    id: number
    path: string
    name: string
}
export const getImageInfo = () => {
    return ApiRequest.getRequest<ResponseResult<ImageType[]>>("/image_name", {})
}