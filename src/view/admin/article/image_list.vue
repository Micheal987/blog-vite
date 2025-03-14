<script lang="ts" setup>
import Blog_table from '@/components/admin/blog_table.vue'
import { getImageListApi, type ImageListData } from '@/api/image/image_api.ts'

import { ref } from 'vue'
import type { actionOptionType } from '@/components/admin/blog_table.vue'


// blog_table父组件 a-table 显示的字段--头部
const columns = [
  { title: '文件名称', dataIndex: 'name' },
  { title: '上传文件类型', dataIndex: 'image_type' },
  { title: '文件路径', slotName: 'path' },
  { title: '上传时间', dataIndex: 'created_at' },
  { title: '操作', slotName: 'action' },
]


//操作组
const actionGroups = ref<actionOptionType[]>([
  {
    label: '批量拉黑',
    callback: async (idList: (string | number)[]): Promise<boolean> => {
      console.log(idList)
      return true
    },
  },
])

const visible = ref(false) //modal开关
const blogTableRef = ref() //父组件 ref

//emits 调用父组的infoList
const createOk = () => {
  blogTableRef.value.infoList()
}
//emit--update事件
const visibleUpdate = (val: boolean) => {
  visible.value = val
}


//删除
//emit 传idList的
const removes = (idList: number[]) => {
  console.log('数组id', idList)
  //删除操作
}
</script>
<template>
  <div>

    <Blog_table
      :url="getImageListApi"
      :columns="columns"
      ref="blogTableRef"
      search-placeholder="搜索图片名称"
      :default-params="{ role: 1 }"
      default-del
      :limit="10"
      @add="visibleUpdate"
      no-edit
      :actionGroup="actionGroups"
      @remove="removes">
      <template #path="{record}:{record:ImageListData}">
        <a-image :src="'http://127.0.0.1:8000/'+ record.path" height="50px"></a-image>
      </template>
    </Blog_table>
  </div>
</template>
<style lang="scss"></style>
