<script lang="ts" setup>
import type { QiniuType } from '@/api/setting/setting_api'
import { reactive, ref } from 'vue'
import Blog_title from '@/components/common/blog_title.vue'
import { getSettingInfoApi, putSettingUpdateApi } from '@/api/setting/setting_api.ts'
import { Message } from '@arco-design/web-vue'
import type { ResponseResult } from '@/api/axios'

const form = reactive<QiniuType>({
  enable: false,
  access_key: '',
  secret_key: '',
  bucket: '',
  cdn: '',
  zone: '',
  prefix: '',
  size: 2,
  record_dir: '',
})
const formRef = ref()
const InfoDataList = async () => {
  let res = await getSettingInfoApi('qiniu') as ResponseResult<QiniuType>
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
  let res = await putSettingUpdateApi('qiniu', form)
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
        <Blog_title title="qiniu"></Blog_title>
        <a-form ref="formRef" :model="form" :label-col-props="{ span: 5 }" :wrapper-col-props="{ span: 19 }">
          <a-form-item
            field="access_key"
            label="access_key"
            :rules="[{ required: true, message: '请输入access_key' }]"
            :validate-trigger="['blur']">
            <a-input v-model="form.access_key" placeholder="access_key" />
          </a-form-item>
          <a-form-item
            field="secret_key"
            label="secret_key"
            :rules="[{ required: true, message: '请输入secret_key' }]"
            :validate-trigger="['blur']">
            <a-input v-model="form.secret_key" placeholder="secret_key" />
          </a-form-item>
          <a-form-item
            field="bucket"
            label="bucket"
            :rules="[{ required: true, message: '请输入bucket' }]"
            :validate-trigger="['blur']">
            <a-input v-model="form.bucket" placeholder="bucket" />
          </a-form-item>
          <a-form-item
            field="cdn"
            label="cdn"
            :rules="[{ required: true, message: '请输入cdn' }]"
            :validate-trigger="['blur']">
            <a-input-password v-model="form.cdn" placeholder="cdn" />
          </a-form-item>
          <a-form-item
            field="zone"
            label="地区zone"
            :rules="[{ required: true, message: '请输入发地区zone' }]"
            :validate-trigger="['blur']">
            <a-input v-model="form.zone" placeholder="地区zone" />
          </a-form-item>
          <a-form-item
            field="prefix"
            label="prefix"
            :rules="[{ required: true, message: '请输入prefix' }]"
            :validate-trigger="['blur']">
            <a-input v-model="form.zone" placeholder="prefix" />
          </a-form-item>
          <a-form-item
            field="size"
            label="上传文件大小"
            :validate-trigger="['blur']">
            <a-input-number v-model="form.size" placeholder="上传文件大小" />
          </a-form-item>
          <a-form-item
            field="record_dir"
            label="上传目录"
            :rules="[{ required: true, message: '请输上传目录' }]"
            :validate-trigger="['blur']">
            <a-input v-model="form.record_dir" placeholder="上传目录" />
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
