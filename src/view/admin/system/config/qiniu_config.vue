<script lang="ts" setup>
import type { ConfigColumnType } from '@/types/setting'
import Blog_config from '@/components/admin/blog_config.vue'
import type { QiniuType } from '@/api/setting/setting_api'

//帮助信息
const helpList = [
  {
    column: 'Access Key 和 Secret Key',
    abs: '获取或者找到你的Access Key和Secret Key,可以先登录进入你的帐号,点击“个人面板”,面板中点击“密锁管理”',
    content: `<img src="http://127.0.0.1:8000/api/uploads/file/key1.png" alt="" />`,
  },
  {
    column: '桶信息',
    abs: '登录之后前往控制台，找到资源管理-存储空间-新建存储空间即空间的名称',
    content: `<img src="http://127.0.0.1:8000/api/uploads/file/key2.png" alt="" />`,
  },
  {
    column: '域名',
    abs: '七牛云的对象存储域名后面一定要加/',
    content: ``,
  },
  {
    column: '地区',
    abs: '选择离你最近的区域并填写地区的代码',
    content: `<img src="http://127.0.0.1:8000/api/uploads/file/key3.png" alt="" />`,
  },
  {
    column: '图片前缀',
    abs: '图片上传保存目录的前缀',
    content: ``,
  },
  {
    column: '是否启用SLL传输',
    abs: '',
    content: '启用SLL之后,对应的端口号可能要做出对应的调整',
  },
]
const columns: ConfigColumnType<QiniuType>[] = [
  {
    label: 'access_key',
    field: 'access_key',
    rules: [{ required: true, message: '请输入access_key' }],
    placeholder: 'secret_key',
    inputType: 'password',
    type: 'string',
  },
  {
    label: 'secret_key',
    field: 'secret_key',
    rules: [{ required: true, message: '请输入secret_key' }],
    placeholder: 'secret_key',
    inputType: 'password',
    type: 'string',
  },
  {
    label: '桶信息',
    field: 'bucket',
    rules: [{ required: true, message: '请输入桶信息' }],
    placeholder: '桶信息',
    type: 'string',
  },
  {
    label: '域名',
    field: 'cdn',
    rules: [{ required: true, message: '请输入域名' }],
    placeholder: '域名',
    type: 'string',
  },
  {
    label: '地区zone',
    field: 'zone',
    rules: [{ required: true, message: '请输入发地区zone' }],
    placeholder: '地区zone',
    type: 'string',
  },
  {
    label: '图片前缀地址',
    field: 'prefix',
    rules: [{ required: true, message: '请输入图片前缀地址' }],
    placeholder: '图片前缀地址',
    type: 'string',
  },
  {
    label: '上传文件大小',
    field: 'size',
    placeholder: '上传文件大小',
    type: 'number',
  },
  {
    label: '是否启用',
    field: 'enable',
    type: 'boolean',
  },
]
</script>
<template>
  <Blog_config
    title="七牛云配置"
    name="qiniu"
    :label-span="4"
    :wrapper-span="20"
    :left-width="50"
    :right-width="50"
    :cloumn="columns"
    :help-data="helpList">
    <template #alert>
      <a-alert style="margin: 5px 0">启用七牛云配置之后,图片上传将上传至七牛云上</a-alert>
    </template>
  </Blog_config>
</template>
<style lang="scss"></style>
