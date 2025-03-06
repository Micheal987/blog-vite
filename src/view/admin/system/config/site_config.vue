<script lang="ts" setup>
import type { SiteInfoType } from '@/api/setting/setting_api'
import Blog_title from '@/components/common/blog_title.vue'
import Blog_upload_image from '@/components/common/blog_upload_image.vue'
import { reactive, ref } from 'vue'
import { getSiteInfoApi, putSiteInfoUpdateApi } from '@/api/setting/setting_api'
import { Message } from '@arco-design/web-vue'
const siteForm = reactive<SiteInfoType>({
  created_at: '',
  bei_an: '',
  title: '',
  qq_image: '',
  version: 0,
  email: '',
  wechat_image: '',
  name: '',
  job: '',
  addr: '',
  slogan: '',
  slogan_en: '',
  web: '',
  bilibili_url: '',
  gitee_url: '',
  github_url: '',
})
const formRef = ref()
const InfoDataList = async () => {
  let res = await getSiteInfoApi()
  Object.assign(siteForm, res.data)
}
InfoDataList()
const siteInfoUpdate = async () => {
  let val = await formRef.value.validate()
  if (val) return
  let res = await putSiteInfoUpdateApi(siteForm)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
}
</script>
<template>
  <div class="site_config">
    <div class="left">
      <div class="site_info">
        <Blog_title title="站点信息"></Blog_title>
        <a-form ref="formRef" :model="siteForm" :label-col-props="{ span: 4 }" :wrapper-col-props="{ span: 19 }">
          <a-form-item
            field="title"
            label="网站标题"
            :rules="[{ required: true, message: '请输入网站标题' }]"
            :validate-trigger="['blur']">
            <a-input v-model="siteForm.title" placeholder="网站标题" />
          </a-form-item>
          <a-form-item
            field="sloagn"
            label="sloagn"
            :rules="[{ required: true, message: '请输入sloagn' }]"
            :validate-trigger="['blur']">
            <a-input v-model="siteForm.slogan" placeholder="sloagn" />
          </a-form-item>
          <a-form-item
            field="sloagn_en"
            label="英文sloagn"
            :rules="[{ required: true, message: '请输入英文sloagn' }]"
            :validate-trigger="['blur']">
            <a-input v-model="siteForm.slogan_en" placeholder="英文sloagn" />
          </a-form-item>
          <a-form-item field="bei_an" label="备案信息" :validate-trigger="['blur']">
            <a-input v-model="siteForm.bei_an" placeholder="备案信息" />
          </a-form-item>
          <a-form-item field="version" label="网站版本" :validate-trigger="['blur']">
            <a-input-number v-model="siteForm.version" placeholder="网站版本" />
          </a-form-item>
          <a-form-item field="creatd_at" label="建站日期" :validate-trigger="['blur']">
            <a-input v-model="siteForm.created_at" placeholder="建站日期" />
          </a-form-item>
          <a-form-item field="qq_image" label="qq二维码" :validate-trigger="['blur']">
            <Blog_upload_image v-model="siteForm.qq_image" placeholder="qq二维码" :model-val="siteForm.qq_image" />
          </a-form-item>
          <a-form-item field="wechat_image" label="WeCaht二维码" :validate-trigger="['blur']">
            <Blog_upload_image
              v-model="siteForm.wechat_image"
              :model-val="siteForm.wechat_image"
              placeholder="WeCaht二维码" />
          </a-form-item>
        </a-form>
      </div>
      <div class="site_config_update">
        <a-button type="primary" @click="siteInfoUpdate">更新</a-button>
      </div>
    </div>
    <div class="right">
      <div class="user_info">
        <Blog_title title="用户信息">
          <a-form ref="formRef" :model="siteForm" :label-col-props="{ span: 3 }" :wrapper-col-props="{ span: 20 }">
            <a-form-item field="name" label="昵称" :validate-trigger="['blur']">
              <a-input v-model="siteForm.name" placeholder="昵称" />
            </a-form-item>
            <a-form-item field="job" label="工作" :validate-trigger="['blur']">
              <a-input v-model="siteForm.job" placeholder="工作" />
            </a-form-item>
            <a-form-item field="addr" label="地址" :validate-trigger="['blur']">
              <a-input v-model="siteForm.addr" placeholder="地址" />
            </a-form-item>
            <a-form-item field="email" label="Email" :validate-trigger="['blur']">
              <a-input v-model="siteForm.email" placeholder="Email" />
            </a-form-item>
          </a-form>
        </Blog_title>
      </div>
      <div class="user_link">
        <Blog_title title="链接信息">
          <a-form ref="formRef" :model="siteForm" :label-col-props="{ span: 3 }" :wrapper-col-props="{ span: 20 }">
            <a-form-item field="bilibili_url" label="哗哩哗哩" :validate-trigger="['blur']">
              <a-input v-model="siteForm.bilibili_url" placeholder="哗哩哗哩" />
            </a-form-item>
            <a-form-item field="gitee" label="Gitee" :validate-trigger="['blur']">
              <a-input v-model="siteForm.gitee_url" placeholder="gitee" />
            </a-form-item>
            <a-form-item field="github_url" label="Github" :validate-trigger="['blur']">
              <a-input v-model="siteForm.github_url" placeholder="Github" />
            </a-form-item>
          </a-form>
        </Blog_title>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.site_config {
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
