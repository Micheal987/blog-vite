<script lang="ts" setup>
import Blog_message_record from './blog_message_record.vue'
import { Modal } from '@arco-design/web-vue'
interface Props {
  visible: boolean
  userID: number
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
</script>
<template>
  <div>
    <Modal
      title="聊天"
      width="40%"
      :visible="props.visible"
      body-class="blog_message_record_modal_body"
      :footer="false"
      @cancel="close">
      <Blog_message_record :userID="props.userID" />
    </Modal>
  </div>
</template>
<style lang="scss">
.blog_message_record_modal_body {
  padding: 0;
}
</style>
