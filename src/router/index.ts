import { createRouter, createWebHashHistory } from "vue-router"
import { routes } from "./routes"
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})
export { router }
router.beforeEach(async (to, form, next) => {
    const meta = to.meta
    if (!meta.isLogin) {
    }
})