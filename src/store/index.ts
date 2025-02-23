import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { parseToken } from "@/utils/parseToken"
import { Message } from "@arco-design/web-vue";
import { postLogOut } from "@/api/user/user_api"
export interface UserInfoType {
  nick_name: string
  user_id: number
  role: number
  token: string
  avatar: string
  exp: number
}
export const useStoreConfig = defineStore(
  "storeConfig",
  () => {
    const collapsed = ref(false); //折叠
    const theme = ref(true);//主题
    let userInfo = reactive<UserInfoType>({
      nick_name: "",
      user_id: 0,
      role: 0,
      token: "",
      avatar: "",
      exp: 0
    })
    const themeString = (): string => {
      return theme.value ? "light" : "dark"
    }
    const setTheme = (str?: string) => {
      if (str != undefined) {
        theme
      } else {
        theme.value = !theme.value
      }
      document.documentElement.style.colorScheme = themeString()//滚动条颜色
      document.body.setAttribute('arco-theme', themeString()) //主题颜色
      //本地缓存持久化
      localStorage.setItem("theme", JSON.stringify(theme))
    };
    const loadTheme = () => {
      let val = themeString()
      //本地缓存持久化
      let value = localStorage.getItem("theme")
      try {
        theme.value = JSON.parse(value as string)
        setTheme(theme.value ? "light" : "dark")
      } catch (err) {
        return
      }
      setTheme(val)
    }
    const setCollapsed = (collapse: boolean) => {
      collapsed.value = collapse
    }
    const setToken = (token: string) => {
      userInfo.token = token
      let info = parseToken(token)
      Object.assign(userInfo, info)
      localStorage.setItem("userInfo", JSON.stringify(userInfo))
    }
    // 加载token
    const loadToken = () => {
      let val = localStorage.getItem("userInfo")
      if (val === null) {
        return
      }
      try {
        userInfo = JSON.parse(val)
      } catch (e) {

        return;
      }
      // 判断token是不是过期了
      let exp = Number(userInfo.exp) * 1000
      let nowTime = new Date().getTime()
      if (exp - nowTime <= 0) {
        // 过期
        Message.warning("登录已过期")
        return;
      }
    }
    //注销
    const logOut = async () => {
      await postLogOut()
      userInfo = reactive<UserInfoType>({
        nick_name: "",
        user_id: 0,
        role: 0,
        token: "",
        avatar: "",
        exp: 0
      })
    }
    const isLogin = (): boolean => {
      return userInfo.role !== 0
    }
    const isAdmin = (): boolean => {
      return userInfo.role !== 1
    }
    const isVisitor = (): boolean => {
      return userInfo.role !== 3
    }
    return { collapsed, setCollapsed, theme, setTheme, loadTheme, userInfo, setToken, loadToken, logOut };
  },
  // {
  //   persist: true,//持久化插件
  // }
);
