<script lang="ts" setup>
import type { EmailType } from '@/api/setting/setting_api'
import Blog_config from '@/components/admin/blog_config.vue'
import type { ConfigColumnType } from '@/types/setting'
//帮助信息
const helpList = [
  {
    column: '绑定邮箱域名和邮箱端口',
    abs: '绑定邮箱域名和邮箱端口',
    content: `参考链接:<a-link
    href="https://service.mail.qq.com/detail?search=SMTP"
    target="_blank">https://service.mail.qq.com/detail?search=SMTP
    </a-link>`,
  },
  {
    column: '授权码',
    abs: '登录的授权码不一定是你邮箱的密码',
    content: `<img src="http://127.0.0.1:8000/api/uploads/file/qqemail.png" alt="" />`,
  },
  {
    column: '发送人邮件名称',
    abs: '发给用户邮件上显示的名称',
    content: ``,
  },
  {
    column: '是否启用SLL传输',
    abs: '',
    content: '启用SLL之后,对应的端口号可能要做出对应的调整',
  },
]
//填写字段
const columns: ConfigColumnType<EmailType>[] = [
  {
    label: '邮箱域名',
    field: 'host',
    rules: [{ required: true, message: '请输入邮箱域名' }],
    placeholder: '邮箱域名',
    type: 'string',
  },
  {
    label: '邮箱端口',
    field: 'port',
    rules: [{ required: true, message: '请输入邮箱端口' }],
    placeholder: 'key',
    type: 'number',
  },
  {
    label: '发信邮箱',
    field: 'user',
    rules: [{ required: true, message: '请输入发信邮箱' }],
    placeholder: '发信邮箱',
    type: 'string',
  },
  {
    label: '密码',
    field: 'password',
    rules: [{ required: true, message: '请输入密码' }],
    placeholder: '密码',
    inputType: 'password',
    type: 'string',
  },
  {
    label: '发信名称',
    field: 'default_from_email',
    rules: [{ required: true, message: '请输入发信名称' }],
    placeholder: '发信名称',
    type: 'string',
  },
  {
    label: 'sll',
    field: 'use_ssl',
    type: 'boolean',
  },
  {
    label: 'tls',
    field: 'use_ssl',
    type: 'boolean',
  },
]
</script>
<template>
  <Blog_config
    title="邮箱配置"
    name="email"
    :label-span="4"
    :wrapper-span="20"
    :left-width="40"
    :right-width="60"
    :column="columns"
    :help-data="helpList">
    <template #alert>
      <a-alert style="margin: 5px 0">邮箱配置之后,将验证码通知发送到你的邮箱内,注意检查</a-alert>
    </template>
  </Blog_config>
</template>
<style lang="scss"></style>
