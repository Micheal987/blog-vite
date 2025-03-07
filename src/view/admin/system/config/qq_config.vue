<script lang="ts" setup>
import type { QiniuType, QQType } from '@/api/setting/setting_api'
import { reactive, ref } from 'vue'
import Blog_title from '@/components/common/blog_title.vue'
import { getSettingInfoApi, putSettingUpdateApi } from '@/api/setting/setting_api.ts'
import { Message } from '@arco-design/web-vue'
import type { ResponseResult } from '@/api/axios'

const form = reactive<QQType>({
  app_id: "",
  key: "",
  redirect: ""
})
const formRef = ref()
const InfoDataList = async () => {
  let res = await getSettingInfoApi('qq') as ResponseResult<QiniuType>
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
  let res = await putSettingUpdateApi('qq', form)
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
        <a-alert style="margin: 5px 0">七牛云配置</a-alert>
        <Blog_title title="qq配置"></Blog_title>
        <a-form ref="formRef" :model="form" :label-col-props="{ span: 5 }" :wrapper-col-props="{ span: 19 }">
          <a-form-item
            field="app_id"
            label="app_id"
            :rules="[{ required: true, message: '请输入app_id' }]"
            :validate-trigger="['blur']">
            <a-input v-model="form.app_id" placeholder="app_id" />
          </a-form-item>
          <a-form-item
            field="key"
            label="key"
            :rules="[{ required: true, message: '请输入key' }]"
            :validate-trigger="['blur']">
            <a-input v-model="form.key" placeholder="key" />
          </a-form-item>
          <a-form-item
            field="redirect"
            label="redirect"
            :rules="[{ required: true, message: '请输入redirect' }]"
            :validate-trigger="['blur']">
            <a-input v-model="form.redirect" placeholder="redirect" />
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
