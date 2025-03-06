<script lang="ts" setup>
import type { EmailType } from '@/api/setting/setting_api'
import { reactive, ref } from 'vue'
import Blog_title from '@/components/common/blog_title.vue'

const form = reactive<EmailType>({
  host: '',
  port: 0,
  user: '',
  password: '',
  default_from_email: '',
  use_ssl: true,
  user_tls: false,
})
const formRef = ref()
const InfoDataList = async () => {}
InfoDataList()
const emailInfoUpdate = async () => {
  let val = await formRef.value.validate()
  if (val) return
  // let res = await putSiteInfoUpdateApi(siteForm)
  // if (res.code) {
  //   Message.error(res.msg)
  //   return
  // }
  // Message.success(res.msg)
}
</script>
<template>
  <div class="email_config">
    <div class="left">
      <div class="site_info">
        <a-alert style="margin: 5px 0">配置邮箱信息后,系统将通知-通知到你的邮箱-不配置则不通知</a-alert>
        <Blog_title title="邮箱配置"></Blog_title>
        <a-form ref="formRef" :model="form" :label-col-props="{ span: 4 }" :wrapper-col-props="{ span: 20 }">
          <a-form-item
            field="host"
            label="邮箱域名"
            :rules="[{ required: true, message: '请输入邮箱域名' }]"
            :validate-trigger="['blur']">
            <a-input v-model="form.host" placeholder="邮箱" />
          </a-form-item>
          <a-form-item
            field="port"
            label="邮箱端口"
            :rules="[{ required: true, message: '请输入邮箱端口' }]"
            :validate-trigger="['blur']">
            <a-input-number v-model="form.port" placeholder="邮箱端口" />
          </a-form-item>
          <a-form-item
            field="user"
            label="发信邮箱"
            :rules="[{ required: true, message: '请输入发信邮箱' }]"
            :validate-trigger="['blur']">
            <a-input v-model="form.user" placeholder="发信邮箱" />
          </a-form-item>
          <a-form-item
            field="password"
            label="密码"
            :rules="[{ required: true, message: '请输入密码' }]"
            :validate-trigger="['blur']">
            <a-input-password v-model="form.password" placeholder="密码" />
          </a-form-item>
          <a-form-item
            field="default_from_email"
            label="发信名称"
            :rules="[{ required: true, message: '请输入发信名称' }]"
            :validate-trigger="['blur']">
            <a-input v-model="form.default_from_email" placeholder="发信名称" />
          </a-form-item>
          <a-form-item field="sll" label="sll" :validate-trigger="['blur']">
            <a-switch v-model="form.use_ssl" />
          </a-form-item>
          <a-form-item field="tls" label="tls" :validate-trigger="['blur']">
            <a-switch v-model="form.user_tls" />
          </a-form-item>
        </a-form>
      </div>
      <div class="site_config_update">
        <a-button type="primary" @click="emailInfoUpdate">更新</a-button>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>
<style lang="scss">
.email_config {
  display: flex;
  .left {
    width: 50%;
    .site_info {
    }
    .site_config_update {
      margin-top: 20px;
    }
  }
  .arco-form {
    margin-top: 20px;
  }
  .right {
    width: 50%;
  }
}
</style>
