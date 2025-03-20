<script lang="ts" setup>
import { type UserBindingEmailType } from '@/api/user/user_api'
import { reactive, ref } from 'vue'
import { postUserBindingEmailApi } from '@/api/user/user_api'
import { Message } from '@arco-design/web-vue'
interface Props {
  visible: boolean
}
const props = defineProps<Props>()
let step = ref(1)
const emits = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()
const formRef = ref()
const defaultForm = {
  email: '',
  code: undefined,
  password: '',
}
let form = reactive<UserBindingEmailType>({
  email: '',
  code: undefined,
  password: '',
})
const close = () => {
  emits('update:visible', false)
  // formRef.value.resetFields(['email', 'code', 'password'])
  formRef.value.clearValidate(['email', 'code', 'password'])
  Object.assign(form, defaultForm)
  step.value = 1
}
const next = async () => {
  let val = await formRef.value.validateField(['email'])
  console.log(val)
  if (val) return
  let res = await postUserBindingEmailApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  step.value += 1
}
const bindingEmail = async () => {
  let val = formRef.value.validateField(['code', 'password'])
  if (val) return
  let res = await postUserBindingEmailApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  emits('update:visible', false)
}
</script>
<template>
  <div>
    <a-modal
      title="绑定邮箱"
      :visible="props.visible"
      body-class="blg_binding_email_modal_body"
      :footer="true"
      @cancel="close">
      <a-steps v-model:current="step">
        <a-step>输入邮箱</a-step>
        <a-step>填写验证码</a-step>
      </a-steps>
      <a-form ref="formRef" :model="form">
        <!-- emial -->
        <a-form-item
          v-if="step == 1"
          field="email"
          label="邮箱"
          :rules="[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '邮箱格式不正确' },
          ]"
          :validate-trigger="['blur']">
          <a-input v-model="form.email" placeholder="邮箱" />
        </a-form-item>
        <!-- code -->
        <a-form-item
          v-if="step == 2"
          field="code"
          label="验证码"
          :rules="[{ required: true, message: '请输入验证码' }]"
          :validate-trigger="['blur']">
          <a-input v-model="form.code" placeholder="验证码" />
        </a-form-item>
        <!-- pwd -->
        <a-form-item
          v-if="step == 2"
          field="password"
          label="登陆密码"
          :rules="[{ required: true, message: '请输入登录密码' }]"
          :validate-trigger="['blur']">
          <a-input type="password" v-model="form.password" placeholder="登录密码" />
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button @click="close">取消</a-button>
        <a-button type="primary" v-if="step == 1" @click="next">下一步</a-button>
        <a-button type="primary" v-if="step == 2" @click="bindingEmail">绑定</a-button>
      </template>
    </a-modal>
  </div>
</template>
<style lang="scss">
.blg_binding_email_modal_body {
  .arco-form {
    margin-top: 10px;
  }
}
</style>
