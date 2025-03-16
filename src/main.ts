import { createApp } from 'vue'
import App from './App.vue'
import "@/assets/base.css"
import "@/assets/theme.css"
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { router } from "./router"
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import "font-awesome/css/font-awesome.min.css"
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app.use(pinia)
app.use(ArcoVue)
app.use(router)
app.mount('#app')
