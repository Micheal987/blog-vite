/// <reference types="vite/client" />
declare module '*.vue' {
    interface ComponentCustomProperties {
        $translate: (key: string) => string
    }
}