import { ApiRequest } from '@/api/axios'
import type { ResponseResult, PageParamType, ListDateType } from '@/api/axios'
interface loginType {
    user_name: string
    password: string
}
export const postLoginEmailApi = (params: loginType) => {
    return ApiRequest.postRequest<ResponseResult<string>>("/user_login", {}, params)
}
export const postLogOutApi = () => {
    return ApiRequest.postRequest<ResponseResult<string>>("/user_logout", {})
}
export const getLoginQQApi = () => {
    return ApiRequest.getRequest<ResponseResult<string>>("/qq_login_path", {})
}

export const postLoginQQApi = (code: string) => {
    return ApiRequest.postRequest<ResponseResult<string>>("/qq_login", { params: code })
}
//
export interface UserInfoType {
    id: number
    created_at: string
    nick_name: string
    user_name: string
    avatar: string
    email: string
    tel: string
    addr: string
    token: string
    ip: string
    role: string
    role_id: number
    sign_status: string,
    integral: number // 积分
    sign: string // slogan
    link: string // 跳转链接
}
//用户信息
export const getUserInfoApi = () => {
    return ApiRequest.getRequest<ResponseResult<UserInfoType>>("/user", {})
}
//用户列表
export const getUserListApi = (params?: PageParamType) => {
    return ApiRequest.getRequest<ResponseResult<ListDateType<UserInfoType>>>("/user_list", { params: params })
}
//删除
export const deleteUserIdsApi = <T>(ids: T[]) => {
    return ApiRequest.deleteRequest<ResponseResult<string>>("/user_remove", {
        data: {
            id_list: ids
        }
    })
}
//创建
export interface CreateUserRequest {
    nick_name: string
    user_name: string
    password: string
    role: number
}
export const postCreateUserApi = (params: CreateUserRequest) => {
    return ApiRequest.postRequest<ResponseResult<CreateUserRequest>>("user_create", {}, params)
}
export interface UpdateUserRequest {
    nick_name: string
    user_id: number | string
    role: number
}
export const putUpdateUserApi = (params: UpdateUserRequest) => {
    return ApiRequest.pustRequest<ResponseResult<UpdateUserRequest>>("user_role", {}, params)
}