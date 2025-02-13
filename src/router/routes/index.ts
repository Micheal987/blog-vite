import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {path:"/",name:"home",component:()=>import("@/view/index.vue")}
]
export{routes}