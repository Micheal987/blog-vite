<script lang="ts" setup>
import { ref } from 'vue'
import Login_form from './login_form.vue'

const props = defineProps<{
  visible: boolean
}>()
const emits = defineEmits<{
  (e: 'update', value: boolean): void
}>()
const loginForm = ref()
const close = () => {
  emits('update', false)
  loginForm.value.clearFormRef()
}

interface historyState {
  back: string
}

const back = (window.history.state as historyState).back
</script>
<template>
  <div>
    <a-modal width="400px" class="blog_login_modal" :visible="props.visible" :footer="false" @cancel="close">
      <Login_form ref="loginForm" @offEject="close" :qq-redirect-path="back" />
    </a-modal>
  </div>
</template>
<style lang="scss">
.blog_login_modal {
  .arco-modal-header {
    display: none;
  }
}
</style>
