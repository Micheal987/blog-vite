<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import Blog_message_record from './blog_message_record.vue'
import { Modal } from '@arco-design/web-vue'
interface Props {
  visible: boolean
  userID: number
  nickNanme: string
}
const props = defineProps<Props>()
const emits = defineEmits<{
  (e: 'update:visible', value: boolean): boolean
  (e: 'close', value: boolean): boolean
}>()
const close = () => {
  emits('update:visible', false)
  emits('close', false)
}
const messageRecordRef = ref()
const dateInfo = () => {
  nextTick(() => {
    messageRecordRef.value.infoRecordData()
  })
}
defineExpose({
  dateInfo,
})
</script>
<template>
  <div>
    <Modal
      :title="`与 ${props.nickNanme} 的聊天`"
      width="40%"
      :visible="props.visible"
      body-class="blog_message_record_modal_body"
      :footer="false"
      @cancel="close">
      <Blog_message_record ref="messageRecordRef" :userID="props.userID" />
    </Modal>
  </div>
</template>
<style lang="scss">
.blog_message_record_modal_body {
  padding: 0;
}
</style>
