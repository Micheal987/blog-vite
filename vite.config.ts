import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { aliaConfig } from "./viteconfig/alias"
import { serverConfig } from "./viteconfig/server"
import type { ImportMetaEnv } from "./src/vite-env"
export default defineConfig(({ mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有
  // `VITE_` 前缀。
  const env: Record<keyof ImportMetaEnv, string> = loadEnv(mode, process.cwd())
  return {
    // vite 配置
    plugins: [vue()],
    resolve: {
      alias: aliaConfig
    },
    server: serverConfig(env.VITE_SERVICE_HOST),
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  }
})