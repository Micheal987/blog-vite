<script setup lang="ts">
import { gteMenuList, type Menutype } from '@/api/menu/menu_api'
import Blog_table from '@/components/admin/blog_table.vue'
import type { RecordType } from '@/components/admin/blog_table.vue'
import Menu_create from '@/components/admin/menu_create.vue'
import { ref } from 'vue'
// blog_table父组件 a-table 显示的字段--头部
const columns = [
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
//emit --emit
const edit = (res: RecordType<any>) => {
  console.log(res)
}

//emit --update
const visibleUpdate = (val: boolean) => {
  visible.value = val
}

//删除
const removes = (idList: (string | number)[]) => {
  console.log(idList)
}
</script>
<template>
  <div class="menu_list_view">
    <Menu_create v-model:visible="visible" @update="visibleUpdate"></Menu_create>
    <Blog_table
      :url="gteMenuList as any"
      :columns="columns"
      ref="blogTableRef"
      noCheck
      search-placeholder="搜索菜单名称"
      :defualt-params="{ role: 1 }"
      defualtDel
      nopage
      :limit="10"
      @add="visible = true"
      @edit="edit"
      :actionGroup="actionGroups"
      @remove="removes">
      <template #banners="{ record }: { record: Menutype }">
        <div class="menu_cloumn_image">
          <a-image v-for="item in record.banners" height="50px" :key="item.id" :src="item.path"></a-image>
        </div>
      </template>
    </Blog_table>
  </div>
</template>
<style lang="scss">
.menu_list_view {
  .menu_cloumn_image {
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
