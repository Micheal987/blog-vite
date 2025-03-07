<script lang="ts" setup>
import type { EmailType } from '@/api/setting/setting_api'
import { reactive, ref } from 'vue'
import Blog_title from '@/components/common/blog_title.vue'
import { getSettingInfoApi, putSettingUpdateApi } from '@/api/setting/setting_api.ts'
import { Message } from '@arco-design/web-vue'
import type { ResponseResult } from '@/api/axios'

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
const InfoDataList = async () => {
  let res = await getSettingInfoApi('email') as ResponseResult<EmailType>
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(form, res.data)
}
InfoDataList()
const emailInfoUpdate = async () => {
  let val = await formRef.value.validate()
  if (val) return
  let res = await putSettingUpdateApi('email', form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
}
</script>
<template>
  <div class="email_config">
    <div class="left">
      <div class="site_info">
        <a-alert style="margin: 5px 0">配置邮箱信息后,系统将通知-通知到你的邮箱-不配置则不通知</a-alert>
        <Blog_title title="邮箱配置"></Blog_title>
        <a-form ref="formRef" :model="form" :label-col-props="{ span: 5 }" :wrapper-col-props="{ span: 19 }">
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
    <div class="right">
      <div class="blog_helper">
        <Blog_title title="帮助信息" />
        <div class="col">
          <div class="title">
            <p>绑定邮箱域名和邮箱端口</p>
            <span>每个邮件的fmtp域名和端口都不一样,请仔细检查</span>
          </div>
          <div class="content">
            参考链接
            <a-link>HHH</a-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.email_config {
  display: flex;

  .left {
    width: 30%;

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
    width: 70%;
    margin-top: 10px;
    margin-left: 20px;

    .blog_helper {

    }
  }
}
</style>
