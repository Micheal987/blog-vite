import { createRouter, createWebHashHistory } from "vue-router"
import { routes } from "./routes"
import { useStoreConfig } from "@/store"
import { Message } from "@arco-design/web-vue"
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})
router.beforeEach(async (to, form) => {
    const store = useStoreConfig()
    const meta = to.meta
    if (meta.isLogin && !store.isLogin()) {
        //需要登录但是我没登陆
        Message.warning("需要登录")
        router.push({ name: form.name })
        return
    }
    //游客 //只能访问游客的权限菜单
    //admin //可以访问游客和普通用户的菜单
    //普通用户//只能访问游客的权限菜单
    if (store.userInfo.role == 2 && (!meta.isAdmin || !meta.isVisitor)) {
        Message.warning("权限不足")
        router.push({ name: form.name })
        return
    }
    if (meta.isVisitor && !store.isVisitor() == false) {
        Message.warning("权限不足")
        router.push({ name: form.name })
        return
    }
})
export { router }
