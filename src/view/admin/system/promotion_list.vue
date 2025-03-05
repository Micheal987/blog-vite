<script setup lang="ts">
import { defaultPromotionForm, getAdvertListApi } from '@/api/promotion/promotion_api'
import Blog_table from '@/components/admin/blog_table.vue'
import type { RecordType } from '@/components/admin/blog_table.vue'
import { reactive, ref } from 'vue'
import type { promotionCreateType, promotionType } from '@/api/promotion/promotion_api'
import Promotion_create from '@/components/admin/promotion_create.vue'
// blog_table父组件 a-table 显示的字段--头部
const columns = [
  { title: '广告id', dataIndex: 'id' },
  { title: '广告标题', dataIndex: 'title' },
  { title: '图片', slotName: 'images' },
  { title: '链接', slotName: 'href' },
  { title: '是否显示', slotName: 'is_show' },
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
const recordData = reactive<promotionType>({
  href: '',
  images: '',
  is_show: false,
  title: '',
  id: 0,
})
const add = () => {
  Object.assign(recordData, defaultPromotionForm)
  recordData.id = undefined as any
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
  console.log(idList)
}
</script>
<template>
  <div class="menu_list_view">
    <Promotion_create
      v-model:visible="visible"
      @ok="blogTableRef.infoList()"
      @update="visibleUpdate"
      :record="recordData"></Promotion_create>
    <Blog_table
      :url="getAdvertListApi as any"
      :columns="columns"
      ref="blogTableRef"
      search-placeholder="搜索广告名称"
      :defualt-params="{ role: 1 }"
      defualtDel
      :limit="10"
      @add="add"
      @edit="edit"
      :actionGroup="actionGroups"
      @remove="removes">
      <template #images="{ record }: { record: promotionType }">
        <div class="menu_cloumn_image">
          <a-image height="50px" :src="record.images"></a-image>
        </div>
      </template>
      <template #href="{ record }: { record: promotionType }">
        <div class="menu_cloumn_image">
          <a-link :href="record.href" target="_blank">{{ record.href }}</a-link>
        </div>
      </template>
      <template #is_show="{ record }: { record: promotionType }">
        <a-tag color="arcoblue" v-if="record.is_show">显示</a-tag>
        <a-tag color="arcoblue" v-else>不显示</a-tag>
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
