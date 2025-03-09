import { ApiRequest, type ResponseResult } from "../axios/index"
export interface SiteInfoType {
    created_at: string
    bei_an: string
    title: string
    qq_image: string
    version: number
    email: string
    wechat_image: string
    name: string
    job: string
    addr: string
    slogan: string
    slogan_en: string
    web: string
    bilibili_url: string
    gitee_url: string
    github_url: string
}
export const getSiteInfoApi = () => {
    return ApiRequest.getRequest<ResponseResult<SiteInfoType>>("/setting/site", {})
}
export const putSiteInfoUpdateApi = (data: SiteInfoType) => {
    return ApiRequest.pustRequest<ResponseResult<string>>('setting/site', {}, data)
}
export interface EmailType {
    host: string
    port: number
    user: string
    password: string
    default_from_email: string
    use_ssl: boolean
    user_tls: boolean
}
export interface QQType {
    app_id: string
    key: string
    redirect: string
}
export interface JwtType {
    secret: string
    expires: number
    issuer: string
}
export interface QiniuType {
    enable: boolean
    access_key: string
    secret_key: string
    bucket: string
    cdn: string
    zone: string
    prefix: string
    size: number
    record_dir: string
}
export type SettingNameType = 'qq' | 'qiniu' | 'setting' | 'email' | 'jwt' | 'site'
export type SettingType = EmailType | QQType | JwtType | QiniuType | SiteInfoType
export const getSettingInfoApi = <T extends SettingType>(name: SettingNameType) => {
    return ApiRequest.getRequest<ResponseResult<T>>('/setting/' + name, {})
}
export const putSettingUpdateApi = <T extends SettingType>(name: SettingNameType, data: T) => {
    return ApiRequest.pustRequest<ResponseResult<string>>('/setting/' + name, {}, data)
}
export interface HelpDataType {
    column: string
    abs: string
    content: string
}