<script lang="ts" setup>
import { postCreateUserApi } from '@/api/user/user_api'
import type { CreateUserRequest } from '@/api/user/user_api'
import { roleOption } from '@/global/role'
import { Message } from '@arco-design/web-vue'
import { reactive, ref } from 'vue'
const props = defineProps<{
  visible: boolean
}>()
const emits = defineEmits<{
  (e:'update',visible: boolean):void
  (e:'ok',value:boolean):void
}>()
const form = reactive<CreateUserRequest & { re_password: string }>({
  user_name: '',
  nick_name: '',
  password: '',
  role: 2,
  re_password: '',
})
const formRef = ref()
const clearField = { user_name: '', nick_name: '', password: '', role: 2, re_password: '' }

const validatePassword = (value: string | undefined, callback: (error?: string) => void): void => {
  if (value != form.password) {
    return callback('二次密码不一致')
  }
}
const createUser = async () => {
  let val = await formRef.value.validate()
  if (val) return false
  let res = await postCreateUserApi(form)
  Message.success(res.msg)
  console.log(res)
  if (res.code != 0) {
    Message.error(res.msg)
    return
  }
  Object.assign(form, clearField)

  emits('update', false)
  emits('ok', false)
  return true
}
const cancel = () => {
  emits('update', false)
}
</script>
<template>
  <div>
    <a-modal title="创建用户" :visible="props.visible" @cancel="cancel" v-on:before-ok="createUser">
      <a-form ref="formRef" :model="form">
        <div class="title">用户登录</div>
        <a-form-item
          field="user_name"
          label="用户名称"
          :rules="[{ required: true, message: '用户名称错误' }]"
          :validate-trigger="['blur']">
          <a-input v-model="form.user_name" placeholder="请输入用户名称"> </a-input>
        </a-form-item>
        <a-form-item
          field="nick_name"
          label="昵称"
          :rules="[{ required: true, message: '昵称错误' }]"
          :validate-trigger="['blur']">
          <a-input v-model="form.nick_name" placeholder="请输入用户名称"> </a-input>
        </a-form-item>
        <a-form-item
          field="password"
          label="密码"
          :rules="[{ required: true, message: '密码错误' }]"
          :validate-trigger="['blur']">
          <a-input-password v-model="form.password" placeholder="请输入密码" autocomplete="off" />
        </a-form-item>
        <a-form-item
          field="password"
          label="确认密码"
          :rules="[{ required: true, message: '确认密码错误' }, { validator: validatePassword }]"
          :validate-trigger="['blur']">
          <a-input-password v-model="form.re_password" placeholder="请再输入密码" autocomplete="off" />
        </a-form-item>
        <a-form-item field="nick_name" label="权限">
          <a-select :options="roleOption" placeholder="选择角色"></a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<style lang="scss"></style>
