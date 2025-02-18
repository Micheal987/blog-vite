import { createApp } from 'vue'
import  App from './App.vue'
import "@/assets/base.css"
import { createPinia } from 'pinia'
import {router} from "./router"
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(ArcoVue)
app.use(router)
app.mount('#app')
