<script lang="ts" setup>
import { IconLock, IconUser } from '@arco-design/web-vue/es/icon'
import { reactive, ref } from 'vue'
import '@/assets/font.css'
import { postLoginEmail } from '@/api/user/user_api'
import { Message } from '@arco-design/web-vue'
import { useStoreConfig } from '@/store'
const store = useStoreConfig()
const form = reactive({
  user_name: '',
  password: '',
})
const formRef = ref()
const emits = defineEmits<{
  offEject: [value: boolean]
}>()
const loginEmails = async () => {
  let val = await formRef.value.validate()
  if (val) {
    return
  }
  const res = await postLoginEmail(form)
  store.setToken(res.data as unknown as string)
  if (res.data != null) {
    Message.success(res.msg)
    emits('offEject', false)
  }
}
const clearFormRef = () => {
  formRef.value.resetFields(Object.keys(form)), formRef.value.clearValidate(Object.keys(form))
}
defineExpose({
  clearFormRef,
})
</script>
<template>
  <div>
    <a-form
      class="blog_login_form"
      ref="formRef"
      :model="form"
      :label-col-props="{ span: 0 }"
      :wrapper-col-props="{ span: 24 }">
      <div class="title">用户登录</div>
      <a-form-item
        field="user_name"
        label="用户名称"
        :rules="[{ required: true, message: '用户名称错误' }]"
        :validate-trigger="['blur']">
        <a-input v-model="form.user_name" placeholder="请输入用户名称">
          <template #prefix><IconUser></IconUser></template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        label="用户密码"
        :rules="[{ required: true, message: '密码称错误' }]"
        :validate-trigger="['blur']">
        <a-input v-model="form.password" placeholder="请输入密码">
          <template #prefix><IconLock></IconLock></template>
        </a-input>
      </a-form-item>
      <a-button type="primary" status="success" @click="loginEmails">登录</a-button>
      <div class="other_login">
        <div class="label">第三方登录</div>
        <div class="icon">
          <a href="">
            <img src="/image/icon/qq.png" alt="" />
          </a>
        </div>
      </div>
    </a-form>
  </div>
</template>
<style lang="scss">
.blog_login_form {
  .title {
    font-family: BlexMonoNerd;
    font-size: 24px;
    font-weight: 800;
    text-align: center;
    color: var(--active);
    margin-bottom: 20px;
  }
  .other_login {
    padding: 10px 0;
    .label {
      display: flex;
      white-space: nowrap;
      align-items: center;
      text-align: center;
      &::before {
        display: inline-flex;
        width: 50%;
        height: 1px;
        content: '';
        background-color: var(--color-text-4);
      }
      &::after {
        display: inline-flex;
        width: 50%;
        height: 1px;
        content: '';
        background-color: var(--color-text-4);
      }
    }
    .icon {
      display: flex;
      justify-content: center;
      padding: 10px 0;
      > a {
        margin-right: 10px;
        &:last-child {
          margin-right: 0;
        }
      }
      img {
        width: 40px;
        height: 60px;
      }
    }
  }
}
</style>
