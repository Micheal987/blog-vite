import { ApiRequest, type ListDateType, type PageParamType, type ResponseResult } from '@/api/axios'
import { cacheRequest } from "@/api"
import { Message } from '@arco-design/web-vue'
export interface ImageType {
  id: number
  path: string
  name: string
}

export const getImageInfoApi1 = () => {
  return ApiRequest.getRequest<ResponseResult<ImageType[]>>('/image_name', {})
}

export const getImageInfoApi:
  () => Promise<ResponseResult<ImageType[]>> = cacheRequest(() =>
    ApiRequest.getRequest<ResponseResult<ImageType[]>>('/image_name', {}))

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
    return ApiRequest.postRequest('/api/image', { headers: { 'Content-Type': 'multipart/form-data' } }, form)
      .then((res: any) => resolve(res)).catch(err => reject(err))
    // useAxios.post('/api/images', form, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // }).then((res: any) => resolve(res)).catch(err => reject(err))
  })
}
export const onUploadImg = async (files: Array<File>, callback: (urls: Array<string>) => void): Promise<void> => {
  let resList: ResponseResult<string>[] = []

  try {
    resList = await Promise.all(files.map((file) => uploadImageApi(file)))
  } catch (e) {
    return
  }

  const urlList: string[] = []
  resList.forEach((res) => {
    if (res.code) {
      Message.error(res.msg)
      return
    }
    urlList.push(res.data)
  })
  callback(urlList)
}