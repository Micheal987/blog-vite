import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime) // 使用插件
dayjs.locale("zh-cn")//使用中文语言包
export const dateTimeFormat = (date: string) => {
    return dayjs(date).format("YYYY-MM-DD HH:mm:ss")
}
export const dateFormat = (date: string) => {
    return dayjs(date).format("YYYY-MM-DD")
}
//相对现在的当前时间
export const relativeCurrentTime = (date: string) => {
    return dayjs(date).fromNow()
}