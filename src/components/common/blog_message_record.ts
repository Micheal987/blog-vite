import { h, createApp, defineComponent, ref } from "vue"
import Blog_message_record_modal from "./blog_message_record_modal.vue"
const visible = ref<undefined | boolean>(undefined)
export const showMessageRecord = (userID: number) => {
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
                return h(Blog_message_record_modal, { visible: this.visible as boolean, userID: userID, onClose: this.onClose })
            }
        })
        const app = createApp(component)
        const div = document.createElement('div')
        app.mount(div)
        document.body.appendChild(div)
    }
    visible.value = true
}