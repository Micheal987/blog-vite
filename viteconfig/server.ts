import type { ServerOptions } from "vite"
const serverConfig = (host: string): ServerOptions => {
    const server: ServerOptions = {
        host: `0.0.0.0`,
        port: 5001,
        proxy: {
            '/api': {
                target: host,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
            '/uploads': {
                target: host,
                changeOrigin: true,
            },
        },
    }
    return server
}
export {
    serverConfig
}