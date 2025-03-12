<script setup lang="ts">
import { gteMenuListApi, type BannerType, type MenuCreateRequest, type MenuType } from '@/api/menu/menu_api'
import Blog_table from '@/components/admin/blog_table.vue'
import type { RecordType } from '@/components/admin/blog_table.vue'
import Menu_create from '@/components/admin/menu_create.vue'
import { reactive, ref } from 'vue'
import { defaultMenuFrom } from '@/api/menu/menu_api'
// blog_table父组件 a-table 显示的字段--头部
const columns = [
  { title: '序号', dataIndex: 'sort' },
  { title: '菜单标题', dataIndex: 'title' },
  { title: '路径', dataIndex: 'path' },
  { title: 'slogan', dataIndex: 'slogan' },
  { title: '简介', dataIndex: 'abstract' },
  { title: 'slogan切换时间', dataIndex: 'banner_time' },
  { title: '简介切换时间', dataIndex: 'abstract_time' },
  { title: 'banners', slotName: 'banners' },
  { title: '更新时间', dataIndex: 'created_at' },
  { title: '操作', slotName: 'action' },
]
const visible = ref(false) //modal 开关
//ref
const blogTableRef = ref()
//操作组
const actionGroups = ref([
  {
    label: '批量拉黑',
    callback: async (idList: (string | number)[]): Promise<boolean> => {
      console.log(idList)
      return true
    },
  },
])
//record
const recordData = reactive<MenuCreateRequest & { banners: BannerType[]; id?: number }>({
  title: '',
  path: '',
  slogan: '',
  abstract: [],
  abstract_time: 1,
  banner_time: 1,
  sort: 1,
  image_sort_list: [],
  banners: [],
})
const add = () => {
  Object.assign(recordData, defaultMenuFrom)
  recordData.banners = []
  recordData.id = undefined
  visible.value = true
}
//emit --emit
const edit = (record: RecordType<any>) => {
  Object.assign(recordData, record)
  visible.value = true
}

//emit --update
const visibleUpdate = (val: boolean) => {
  visible.value = val
}

//删除
const removes = (idList: (string | number)[]) => {
  console.log('del', idList)
}
</script>
<template>
  <div class="menu_list_view">
    <Menu_create
      v-model:visible="visible"
      @update="visibleUpdate"
      @ok="blogTableRef.infoList()"
      :record="recordData"></Menu_create>
    <Blog_table
      :url="gteMenuListApi as any"
      :columns="columns"
      ref="blogTableRef"
      noCheck
      search-placeholder="搜索菜单名称"
      :default-params="{ role: 1 }"
      default-del
      no-page
      :limit="10"
      @add="add"
      @edit="edit"
      :actionGroup="actionGroups"
      @remove="removes">
      <template #banners="{ record }: { record: MenuType }">
        <div class="menu_column_image">
          <a-image v-for="item in record.banners" height="50px" :key="item.id" :src="item.path"></a-image>
        </div>
      </template>
    </Blog_table>
  </div>
</template>
<style lang="scss">
.menu_list_view {
  .menu_column_image {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    row-gap: 5px;
    .arco-image-img {
      border-radius: 5px;
    }
  }
}
</style>
