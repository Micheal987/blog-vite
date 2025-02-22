/// <reference types="vite/client" />
export interface ImportMetaEnv {
    VITE_SERVICE_HOST: string
    APP_ENV: string
}
declare module '*.vue' {
    interface ComponentCustomProperties {
        $translate: (key: string) => string
    }
}