import { defineStore } from "pinia";
import { ref } from "vue";
export const usestoreConfig = defineStore(
  "storeConfig",
  () => {
    const someState = ref("hello pinia");
    const theme = ref(true);
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
      // localStorage.setItem("theme", JSON.stringify(theme))
    };
    const loadTheme = () => {
      let val = themeString()
      //本地缓存持久化
      // let value = localStorage.getItem("theme")
      // try {
      //   theme.value = JSON.parse(value as string)
      //   setTheme(theme.value ? "light" : "dark")
      // } catch (err) {
      //   return
      // }
      setTheme(val)
    }
    return { someState, theme, setTheme, loadTheme };
  },
  {
    persist: true,
  }
);
