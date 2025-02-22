import { ApiRequest } from "../axios/index"
interface loginType {
    user_name: string
    password: string
}
export const postLoginEmail = (params: loginType) => {
    return ApiRequest.postRequest<loginType>("/user_login", {}, params)
}