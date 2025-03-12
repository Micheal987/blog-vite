<script lang="ts" setup>
import type { QQType } from '@/api/setting/setting_api'
import Blog_config from '@/components/admin/blog_config.vue'
import type { ConfigColumnType } from '@/types/setting'
//帮助信息
const helpList = [
  {
    column: 'app_id appKey',
    abs: '去申请qq互联并且创建网站应用',
    content: `注册开发者→创建应用→通过审核并获取接口权限-参考链接:<a-link
    href="https://connect.qq.com/"
    target="_blank">https://connect.qq.com
    </a-link>`,
  },
  {
    column: '回调地址',
    abs: 'qq登录成功之后的回调地址',
    content: ``,
  },
]
const columns: ConfigColumnType<QQType>[] = [
  {
    label: 'AppID',
    field: 'app_id',
    rules: [{ required: true, message: '请输入key' }],
    placeholder: 'Appid',
    inputType: 'password',
    type: 'string',
  },
  {
    label: 'key',
    field: 'key',
    rules: [{ required: true, message: '请输入key' }],
    placeholder: 'key',
    type: 'string',
  },
  {
    label: 'redirect',
    field: 'redirect',
    rules: [{ required: true, message: '请输入redirect' }],
    placeholder: 'redirect',
    type: 'string',
  },
]
</script>
<template>
  <Blog_config
    title="qq配置"
    name="qq"
    :label-span="4"
    :wrapper-span="20"
    :left-width="45"
    :right-width="55"
    :column="columns"
    :help-data="helpList">
    <template #alert>
      <a-alert style="margin: 5px 0">qq互联配置了之后,点qq才能授权登录</a-alert>
    </template>
  </Blog_config>
</template>
<style lang="scss"></style>
