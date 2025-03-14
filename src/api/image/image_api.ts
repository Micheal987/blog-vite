import { ApiRequest, type ListDateType, type PageParamType, type ResponseResult } from '@/api/axios'

export interface ImageType {
  id: number
  path: string
  name: string
}

export const getImageInfoApi = () => {
  return ApiRequest.getRequest<ResponseResult<ImageType[]>>('/image_name', {})
}

export interface ImageListData {
  id: number
  created_at: string
  path: string
  hash: string
  name: string
  image_type: string
}

export const getImageListApi = (params: PageParamType) => {
  return ApiRequest.getRequest<ResponseResult<ListDateType<ImageListData>>>('/images', { params: params })
}