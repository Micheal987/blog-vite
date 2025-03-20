/// <reference types="vite/client" />
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    import Vue from 'vue'

    const component: DefineComponent<{}, {}, any> | Vue

    export default component
}

export interface ImportMetaEnv {
    VITE_SERVICE_HOST: string
    APP_ENV: string
}
// declare module '*.vue' {
//     interface ComponentCustomProperties {
//         $translate: (key: string) => string
//     }
// }
import 'vue-router';
declare module 'vue-router' {
    interface RouteMeta {
        isLogin?: boolean
        isAdmin?: boolean
        isVisitor?: boolean
        title?: string

    }
}