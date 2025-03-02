import { ApiRequest } from "../axios/index"
import type { ResponseResult, PageParamType, ListDateType } from "../axios/index"
interface loginType {
    user_name: string
    password: string
}
export const postLoginEmail = (params: loginType) => {
    return ApiRequest.postRequest<ResponseResult<loginType>>("/user_login", {}, params)
}
export const postLogOut = () => {
    return ApiRequest.postRequest<ResponseResult<string>>("/user_logout", {})
}
export const getLoginQQ = () => {
    return ApiRequest.getRequest<ResponseResult<string>>("/qq_login_path", {})
}

export const PostLoginQQ = (code: string) => {
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
export const gettUserInfo = () => {
    return ApiRequest.getRequest<ResponseResult<UserInfoType>>("/user", {})
}
//用户列表
export const getUserList = (params?: PageParamType) => {
    return ApiRequest.getRequest<ResponseResult<ListDateType<UserInfoType>>>("/user_list", { params: params })
}
//删除
export const deleteUserIds = <T>(ids: T[]) => {
    return ApiRequest.deleteRequest<ResponseResult<string>>("/user_remove", {
        data: {
            id_list: ids
        }
    })
}