import type { ServerOptions } from "vite"
const serverConfig = (url: string): ServerOptions => {
    const Serverurl = url
    const wsServerurl = url.replace("http", "ws")
    const server: ServerOptions = {
        host: '0.0.0.0',
        port: 80,
        proxy: {
            '/api': {
                target: Serverurl,
                rewrite: (path) => path.replace(/^\/api/, ''),
                changeOrigin: true,
            },
            '/uploads': {
                target: Serverurl,
                rewrite: (path) => path.replace(/^\/uploads/, ''),
                changeOrigin: true,
            },
            '/ws': {
                target: wsServerurl,
                changeOrigin: true,
                ws: true,
                rewrite: (path) => path.replace(/^\/ws/, ''),
            },
        },
    }
    return server
}
export {
    serverConfig
}