import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { parseToken } from "@/utils/parseToken"
import { Message } from "@arco-design/web-vue";
import { postLogOutApi, getUserInfoApi } from "@/api/user/user_api"
import type { Themes } from "md-editor-v3"
import { getSiteInfoApi, type SiteInfoType } from "@/api/setting/setting_api";
export interface userStoreInfoType {
  user_name: string
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
    let theme = ref<boolean>(true);//主题
    let userInfo: userStoreInfoType = {
      user_name: "",
      nick_name: "",
      user_id: 0,
      role: 0,
      token: "",
      avatar: "",
      exp: 0
    }
    let siteInfo = reactive<SiteInfoType>({
      created_at: "2024-12-19",
      bei_an: "xxxx",
      title: "",
      qq_image: "",
      version: 8.1,
      email: "1411797501@qq.com",
      wechat_image: "",
      name: "伟",
      job: "go和rust后端开发",
      addr: "广东广州",
      slogan: "我不知道",
      slogan_en: "FengFeng",
      web: "XXX",
      bilibili_url: "https://space.bilibili.com/151431628?spm_id_from=333.1007.0.0",
      gitee_url: "https://gitee.com/fengweizhujin",
      github_url: "https://github.com/"
    })
    const themeString = (): Themes => {
      return theme.value ? "light" : "dark"
    }
    const setTheme = (str?: string) => {
      if (str != undefined) {
        theme.value
      } else {
        theme.value = !theme.value
      }
      document.documentElement.style.colorScheme = themeString()//滚动条颜色
      document.body.setAttribute('arco-theme', themeString()) //主题颜色
      //本地缓存持久化
      localStorage.setItem("theme", JSON.stringify(theme.value))
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
    const setToken = async (token: string) => {
      userInfo.token = token
      let info = parseToken(token) //解析token
      const res = await getUserInfoApi()
      let data = res.data
      userInfo = {
        user_name: data.user_name,
        nick_name: data.nick_name,
        user_id: info.user_id,
        role: info.role,
        token: token,
        avatar: data.avatar,
        exp: info.exp
      }
      localStorage.setItem("userInfo", JSON.stringify(userInfo))
      loadToken()
    }
    // 加载token
    const loadToken = () => {
      let val = localStorage.getItem("userInfo")
      if (val === null) return
      try {
        userInfo.token = JSON.parse(val)
      } catch (e) {
        //错误
        clearUserInfo()
        return;
      }
      // 判断token是不是过期了
      let exp = userInfo.exp * 10000
      let nowTime = new Date().getTime()
      if (exp - nowTime <= 0) {
        // 过期
        Message.warning("登录已过期")
        //清除token
        clearUserInfo()
        return;
      }
    }
    //注销
    const logOut = async () => {
      await postLogOutApi()
      //清掉token
      clearUserInfo()
    }
    //清除token
    const clearUserInfo = () => {
      userInfo = {
        user_name: "",
        nick_name: "",
        user_id: 0,
        role: 0,
        token: "",
        avatar: "image/user1.jpg",
        exp: 0
      }
      localStorage.removeItem("userInfo")
    }
    const loadSiteInfo = async () => {
      let val = sessionStorage.getItem('siteInfo')
      if (val != null) {
        try {
          siteInfo = JSON.parse(val)
          return
        } catch (e) {
          sessionStorage.removeItem('siteInfo')
        }
      }
      let res = await getSiteInfoApi()
      siteInfo = res.data
      sessionStorage.setItem('siteInfo', JSON.stringify(siteInfo))
    }
    const isLogin = (): boolean => {
      return userInfo.role !== 0
    }
    const isAdmin = (): boolean => {
      return userInfo.role === 1
    }
    const isGeneral = (): boolean => {
      return userInfo.role === 2
    }
    const isVisitor = (): boolean => {
      return userInfo.role === 3
    }
    return { collapsed, siteInfo, setCollapsed, theme, setTheme, loadTheme, userInfo, setToken, loadToken, logOut, isLogin, isAdmin, isVisitor, themeString, isGeneral, loadSiteInfo };
  }
);
