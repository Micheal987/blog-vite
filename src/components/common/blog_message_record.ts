import { h, createApp, defineComponent, ref } from "vue"
import Blog_message_record_modal from "./blog_message_record_modal.vue"
const visible = ref<undefined | boolean>(undefined)
const nickNameRef = ref("")
const userIDRef = ref(0)
const messageRecordRef = ref()
export const showMessageRecord = (userID: number, nickNanme: string) => {
    if (visible.value === undefined) {
        const component = defineComponent({
            setup() {
                const onClose = () => {
                    visible.value = false
                }
                return {
                    visible,
                    onClose,
                    nickNameRef,
                    userIDRef,
                }
            },
            render() {
                return h(Blog_message_record_modal, {
                    visible: this.visible as boolean,
                    userID: this.userIDRef,
                    nickNanme: this.nickNameRef,
                    ref: messageRecordRef,
                    onClose: this.onClose
                })
            }
        })
        const app = createApp(component)
        const div = document.createElement('div')
        app.mount(div)
        document.body.appendChild(div)
    }
    if (userID === userIDRef.value) {
        messageRecordRef.value.dateInfo()
    }
    visible.value = true
    nickNameRef.value = nickNanme
    userIDRef.value = userID
}