<script lang="ts" setup>
import type { CahtGroupConfigType } from '@/api/chat/caht_api'
import { getSettingInfoApi, putSettingUpdateApi } from '@/api/setting/setting_api'
import { Message } from '@arco-design/web-vue'
import { reactive, ref } from 'vue'
import Blog_title from '../common/blog_title.vue'
let isShow = ref(false)
const form = reactive<CahtGroupConfigType>({
  is_anonymous: true,
  is_show_time: true,
  default_limit: 50,
  content_length: 100,
  welcome_title: '欢迎来到feng的聊天室',
  is_online_people: true,
  is_send_image: false,
  is_send_file: false,
  is_md: false,
})
const configList = async () => {
  let res = await getSettingInfoApi<CahtGroupConfigType>('chat_group')
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(form, res.data)
  isShow.value = true
}
configList()
const configUpdate = async () => {
  let res = await putSettingUpdateApi('chat_group', form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
}
</script>
<template>
  <div class="chat_group_config_view">
    <Blog_title title="群聊配置"> </Blog_title>
    <a-form :model="form" style="margin-top: 20px" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }">
      <a-form-item label="匿名群聊">
        <a-switch v-model="form.is_anonymous" />
        <template #extra>
          <div>开启匿名群聊</div>
        </template>
      </a-form-item>
      <a-form-item label="显示时间">
        <a-switch v-model="form.is_show_time"></a-switch>
        <template #extra>
          <div>显示聊天时间</div>
        </template>
      </a-form-item>
      <a-form-item label="初始条数">
        <a-input-number v-model="form.default_limit"></a-input-number>
        <template #extra>
          <div>显示聊天的条数</div>
        </template>
      </a-form-item>
      <a-form-item label="欢迎语">
        <a-input v-model="form.welcome_title" placeholder="欢迎语配置">
          <template #extra>
            <div>配置欢迎语</div>
          </template>
        </a-input></a-form-item
      >
      <a-form-item label="显示人数">
        <a-switch v-model="form.is_online_people"></a-switch>
        <template #extra>
          <div>显示在线人数</div>
        </template>
      </a-form-item>
      <a-form-item label="可发图片">
        <a-switch v-model="form.is_send_image"></a-switch>
        <template #extra>
          <div>未实现的功能</div>
        </template>
      </a-form-item>
      <a-form-item label="可发文件">
        <a-switch v-model="form.is_send_file"></a-switch>
        <template #extra>
          <div>未实现的功能</div>
        </template>
      </a-form-item>
      <a-form-item label="可发md文件">
        <a-switch v-model="form.is_md"></a-switch>
        <template #extra>
          <div>未实现的功能</div>
        </template>
      </a-form-item>
      <a-form-item label="文本最大长度">
        <a-input-number placeholder="输入文本长度" v-model="form.content_length"></a-input-number>
        <template #extra>
          <div>未实现的功能</div>
        </template>
      </a-form-item>
    </a-form>
    <a-button type="primary" @click="configUpdate">更新配置</a-button>
  </div>
</template>
