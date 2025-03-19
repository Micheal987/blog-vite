<script lang="ts" setup>
import Blog_message_record from './blog_message_record.vue'
interface Props {
  visible: boolean
  userID: number
}
const props = defineProps<Props>()
const emits = defineEmits<{
  (e: 'update:visible', value: boolean): boolean
}>()
const close = () => {
  emits('update:visible', false)
}
</script>
<template>
  <div>
    <a-modal
      title="聊天"
      width="40%"
      :visible="props.visible"
      body-class="blog_message_record_modal_body"
      :footer="false"
      @cancel="close">
      <Blog_message_record :userID="props.userID" />
    </a-modal>
  </div>
</template>
<style lang="scss">
.blog_message_record_modal_body {
  padding: 0;
}
</style>
