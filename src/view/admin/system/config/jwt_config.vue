<script lang="ts" setup>
import type { JwtType } from '@/api/setting/setting_api'
import Blog_config from '@/components/admin/blog_config.vue'
import type { ConfigColumnType } from '@/types/setting'

//帮助信息
const helpList = [
  {
    column: 'jwt密钥',
    abs: '用于jwt的加解密,请妥善保管',
    content: '',
  },
  {
    column: '过期时间',
    abs: '单位小时',
    content: ``,
  },
]
//table
const columns: ConfigColumnType<JwtType>[] = [
  {
    label: '签发人',
    field: 'issuer',
    rules: [{ required: true, message: '请输入签发人' }],
    placeholder: '签发人',
    inputType: 'password',
    type: 'string',
  },
  {
    label: '密钥',
    field: 'secret',
    rules: [{ required: true, message: '请输入密钥' }],
    placeholder: '密钥',
    type: 'string',
  },
  {
    label: '过期时间',
    field: 'expires',
    rules: [{ required: true, message: '请输入过期时间' }],
    placeholder: '过期时间',
    type: 'number',
  },
]
const isLaptops1 = isLaptops
</script>
<template>
  <Blog_config
    title="Jwt配置"
    name="jwt"
    :label-span="isLaptops1 ? 5 : 4"
    :wrapper-span="isLaptops1 ? 19 : 20"
    :left-width="isLaptops1 ? 45 : 50"
    :right-width="isLaptops1 ? 60 : 55"
    :column="columns"
    :help-data="helpList">
    <template #alert>
      <a-alert style="margin: 5px 0">jwt配置之后,立即生效,注意保管jwt的密钥</a-alert>
    </template>
  </Blog_config>
</template>
<style lang="scss"></style>
