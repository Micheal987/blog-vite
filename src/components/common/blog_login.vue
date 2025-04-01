<script lang="ts" setup>
import { ref } from 'vue'
import Login_form from './login_form.vue'
import { Modal } from '@arco-design/web-vue'
const props = defineProps<{
  visible: boolean
}>()
const emits = defineEmits<{
  (e: 'update', value: boolean): void
  (e: 'close', value: boolean): void
}>()
const loginForm = ref()
const close = () => {
  emits('update', false)
  emits('close', false)
  loginForm.value.clearFormRef()
}

interface historyState {
  back: string
}

const back = (window.history.state as historyState).back
</script>
<template>
  <div>
    <Modal width="400px" class="blog_login_modal" :visible="props.visible" :footer="false" @cancel="close">
      <Login_form ref="loginForm" @offEject="close" :qq-redirect-path="back" />
    </Modal>
  </div>
</template>
<style lang="scss">
.blog_login_modal {
  .arco-modal-header {
    display: none;
  }
}
</style>
