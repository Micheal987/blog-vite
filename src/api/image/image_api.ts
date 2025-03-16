import { ApiRequest, type ListDateType, type PageParamType, type ResponseResult } from '@/api/axios'
import { cacheRequest } from "@/api"
export interface ImageType {
  id: number
  path: string
  name: string
}

export const getImageInfoApi = () => {
  return ApiRequest.getRequest<ResponseResult<ImageType[]>>('/image_name', {})
}

export const getImageInfoApi1:
  () => Promise<ResponseResult<ImageType[]>> = cacheRequest(() =>
    ApiRequest.getRequest<ResponseResult<ImageType[]>>('/tag_name', {}))

type image_type = '本地' | '七牛云'
export interface ImageListData {
  id: number
  created_at: string
  path: string
  hash: string
  name: string
  image_type: image_type
}

export const getImageListApi = (params: PageParamType) => {
  return ApiRequest.getRequest<ResponseResult<ListDateType<ImageListData>>>('/images', { params: params })
}

export interface ImagesUploadType {
  file_name: string
  is_success: boolean
  msg: string
}

export const uploadImageApi = (file: File): Promise<ResponseResult<string>> => {
  return new Promise((resolve, reject) => {
    const form = new FormData()
    form.set('image', file)
    ApiRequest.postRequest('/api/images', { headers: { 'Content-Type': 'multipart/form-data' } }, form)
      .then((res: any) => resolve(res)).catch(err => reject(err))
    // useAxios.post('/api/images', form, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // }).then((res: any) => resolve(res)).catch(err => reject(err))
  })
}