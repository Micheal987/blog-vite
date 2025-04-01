import { h, createApp, defineComponent, ref } from "vue"
import Blog_login from "./blog_login.vue"
const visible = ref<undefined | boolean>(undefined)
export const showLogin = () => {
    if (visible.value === undefined) {
        const component = defineComponent({
            setup() {
                const onClose = () => {
                    visible.value = false
                }
                return {
                    visible,
                    onClose
                }
            },
            render() {
                return h(Blog_login, { visible: this.visible as boolean, onClose: this.onClose })
            }
        })
        const app = createApp(component)
        const div = document.createElement('div')
        app.mount(div)
        document.body.appendChild(div)
    }
    visible.value = true
}