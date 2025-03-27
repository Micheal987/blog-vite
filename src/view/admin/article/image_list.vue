<script lang="ts" setup>
import Blog_table from '@/components/admin/blog_table.vue'
import { getImageListApi, type ImageListData, type ImagesUploadType } from '@/api/image/image_api.ts'

import { h, ref } from 'vue'
import type { actionOptionType } from '@/components/admin/blog_table.vue'
import { Message, Tag, type FileItem } from '@arco-design/web-vue'
import { useStoreConfig } from '@/store'
import type { ResponseResult } from '@/api/axios'
const store = useStoreConfig()
// blog_table父组件 a-table 显示的字段--头部
const columns = [
  { title: '文件名称', dataIndex: 'name' },
  {
    title: '上传文件类型',
    dataIndex: 'image_type',
    render: (data: any) => {
      if (data == undefined || null) return
      const record = data.record as ImageListData
      let color = 'red'
      if (record.image_type == '本地') {
        color = 'blue'
      }
      return h(
        Tag,
        { color: color },
        {
          default: () => {
            record.image_type
          },
        },
      )
    },
  },
  { title: '文件路径', slotName: 'path' },
  { title: '上传时间', dataIndex: 'created_at' },
  { title: '操作', slotName: 'action' },
]
const fileList = ref<FileItem[]>([])
//操作组
const actionGroups = ref<actionOptionType[]>([
  {
    label: '批量拉黑',
    callback: async (idList: (string | number)[]): Promise<boolean> => {
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
const imagesUploadSuccessEvent = (fileItem: FileItem) => {
  const response = fileItem.response as ResponseResult<ImagesUploadType[]>
  if (response.data.length > 0) {
    //is_success 处理 为false的值
    response.data.forEach((item) => {
      if (!item.is_success) {
        Message.error(item.msg)
        return
      }
      Message.success(item.msg)
    })
  }
}
//
const beforeOpen = () => {
  fileList.value = []
}
</script>
<template>
  <div class="image_list_view">
    <a-modal title="图片上传" v-model:visible="visible" @before-open="beforeOpen" @ok="createOk">
      <a-upload
        list-type="picture-card"
        :headers="{ token: store.userInfo.token }"
        action="/api/images"
        v-model:file-list="fileList"
        multiple
        name="images"
        class="image_upload"
        @success="imagesUploadSuccessEvent"
        image-preview></a-upload>
    </a-modal>
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
      <template #path="{ record }: { record: ImageListData }">
        <a-image :src="'http://127.0.0.1:8000/' + record.path" height="50px"></a-image>
      </template>
      <template #action_left="{ record }: { record: ImageListData }">
        <a :href="record.path" :download="record.name" style="margin-right: 10px">
          <a-button type="primary">下载</a-button>
        </a>
      </template>
    </Blog_table>
  </div>
</template>
<style lang="scss">
.image_upload {
  .arco-upload-list-picture {
    width: inherit;
  }
}
</style>
