<script lang="ts" setup>
import { IconLock, IconUser } from '@arco-design/web-vue/es/icon'
import { reactive, ref } from 'vue'
import '@/assets/font.css'
import { getLoginQQApi, postLoginEmailApi } from '@/api/user/user_api'
import { Message } from '@arco-design/web-vue'
import { useStoreConfig } from '@/store'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useStoreConfig()
const form = reactive({
  user_name: '',
  password: '',
})
const formRef = ref()
const props = defineProps<{
  qqRedirectPath?: string
}>()
const emits = defineEmits<{
  offEject: [value: boolean]
}>()
const loginEmails = async () => {
  let val = await formRef.value.validate()
  if (val) return
  const res = await postLoginEmailApi(form)
 await store.setToken(res.data)
  if (res.data != null) {
    Message.success(res.msg)
    emits('offEject', false)
  }
}
//ref
const clearFormRef = () => {
  formRef.value.resetFields(Object.keys(form))
  formRef.value.clearValidate(Object.keys(form))
}
//暴露的方法
defineExpose({
  clearFormRef,
})
//
const loginQQ = async () => {
  const res = await getLoginQQApi()
  if (res.code) {
    Message.warning(res.msg)
    return
  }
  if (res.data == '') {
    Message.error('未配置qq登录')
    return
  }
  //默认
  let path = route.path
  if (props.qqRedirectPath) {
    //存在就赋值
    path = props.qqRedirectPath
  }
  //存储点击的当前路径
  localStorage.setItem('redirectPath', path)
  //当前窗口跳转
  window.open(res.data, '_self')
}
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
          <template #prefix>
            <IconUser></IconUser>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        label="用户密码"
        :rules="[{ required: true, message: '密码称错误' }]"
        :validate-trigger="['blur']">
        <a-input-password
          v-model="form.password"
          placeholder="请输入密码"
          :defaultVisibility="true"
          autocomplete="off"
          allow-clear>
          <template #prefix>
            <IconLock></IconLock>
          </template>
        </a-input-password>
      </a-form-item>
      <a-button type="primary" status="success" @click="loginEmails">登录</a-button>
      <div class="other_login">
        <div class="label">第三方登录</div>
        <div class="icon">
          <a href="javascript:void(0)" @click="loginQQ">
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
    font-family: BlexMonoNerd,serif;
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
