<script lang="ts" setup>
import { putUserUpdatePasswordApi, type UserUpdatePasswordType } from '@/api/user/user_api'
import { Message } from '@arco-design/web-vue'
import { reactive, ref } from 'vue'
import { useStoreConfig } from '@/store'
import { useRouter } from 'vue-router'
interface Props {
  visible: boolean
}
const props = defineProps<Props>()
const emits = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()
const router = useRouter()
const store = useStoreConfig()
const formRef = ref()
let form = reactive<UserUpdatePasswordType>({
  old_pwd: '',
  new_pwd: '',
  re_pwd: '',
})
const close = () => {
  emits('update:visible', false)
}
const rePasswordValidator = (value: string | undefined, callback: (error?: string) => void): void => {
  if (value != form.new_pwd) {
    return callback('二次密码不一致')
  }
}
const updatePwd = async () => {
  let val = await formRef.value.validate()
  if (val) return false
  let res = await putUserUpdatePasswordApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  emits('update:visible', false)
  store.logOut()
  router.push({
    name: 'login',
  })
}
</script>
<template>
  <div>
    <a-modal title="修改密码" :visible="props.visible" :footer="false" @cancel="close" :on-before-ok="updatePwd">
      <a-form ref="formRef" :model="form">
        <a-form-item
          field="old_pwd"
          label="旧密码"
          :rules="[{ required: true, message: '请输入旧密码' }]"
          :validate-trigger="['blur']">
          <a-input type="password" v-model="form.old_pwd" placeholder="请输入旧密码" />
        </a-form-item>
        <a-form-item
          field="new_pwd"
          label="新密码"
          :rules="[{ required: true, message: '请输入新密码' }]"
          :validate-trigger="['blur']">
          <a-input type="password" v-model="form.new_pwd" placeholder="请输入新密码" />
        </a-form-item>
        <a-form-item
          field="re_pwd"
          label="重复密码"
          :rules="[{ required: true, message: '二次密码不一致请重新输入' }, { validator: rePasswordValidator }]"
          :validate-trigger="['blur']">
          <a-input type="password" v-model="form.re_pwd" placeholder="重复密码" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<style lang="scss"></style>
