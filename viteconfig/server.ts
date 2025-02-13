import type { ServerOptions } from "vite"
const serverConfig: ServerOptions = {
    host: `0.0.0.0`,
    port: 5001,
    proxy: {
        '/blog': {
            target: 'http://127.0.0.1:8000/api/',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
    },
}
export {
    serverConfig
}