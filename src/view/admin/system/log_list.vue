<script setup lang="ts">
import { getLogList } from '@/api/log/log_api'
import Blog_table from '@/components/admin/blog_table.vue'
import type { RecordType } from '@/components/admin/blog_table.vue'
import { reactive, ref } from 'vue'

const cloumnDict = {
  1: [
    { title: 'id', dataIndex: 'id' },
    { title: 'ip', dataIndex: 'ip' },
    { title: '地址', dataIndex: 'address' },
    { title: '登录记录', dataIndex: 'content' },
    { title: '等级', dataIndex: 'level' },
    {
      title: '状态',
      dataIndex: 'content',
    },
    { title: '用户名', dataIndex: 'user_name' },
    { title: '密码', slotName: 'password' },
    { title: '日志时间', dataIndex: 'createdAt' },
    { title: '操作', slotName: 'action' },
  ],
  2: [
    { title: 'id', dataIndex: 'id' },
    { title: 'ip', dataIndex: 'ip' },
    { title: '地址', dataIndex: 'address' },
    { title: '等级', dataIndex: 'level' },
    {
      title: '状态',
      dataIndex: 'content',
    },
    { title: '用户名', dataIndex: 'user_name' },
    { title: '日志时间', dataIndex: 'createdAt' },
    { title: '操作', slotName: 'action' },
  ],
  3: [
    { title: 'id', dataIndex: 'id' },
    { title: 'ip', dataIndex: 'ip' },
    { title: '地址', dataIndex: 'address' },
    { title: '等级', dataIndex: 'level' },
    {
      title: '状态',
      dataIndex: 'content',
    },
    { title: '服务', dataIndex: 'user_name' },
    { title: '日志时间', dataIndex: 'createdAt' },
    { title: '操作', slotName: 'action' },
  ],
}
// blog_table父组件 a-table 显示的字段--头部
const params = reactive({
  level: undefined,
  type: 2,
  ip: undefined,
  userID: undefined,
  addr: undefined,
  date: undefined,
  status: undefined,
  userName: undefined,
})
//使用parmas 判断
const columns = ref(cloumnDict[2])
const statusOptions = [
  { label: '成功', value: true },
  { label: '失败', value: false },
]
const visible = ref(false) //modal 开关
//ref
const blogTableRef = ref()
//
const infoList = () => {
  if (params.status == undefined) {
    params.status == ''
  }
  blogTableRef.value.infoList(params)
}
const add = () => {
  // Object.assign(recordData, defaultPromotionForm)
  // recordData.id = undefined
  visible.value = true
}
//emit --emit
const edit = (record: RecordType<any>) => {
  // Object.assign(recordData, record)
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
  <div class="log_list_view">
    <Blog_table
      :url="getLogList as any"
      :columns="columns"
      ref="blogTableRef"
      search-placeholder="搜索日志名称"
      defualtDel
      :limit="10"
      @add="add"
      @edit="edit"
      no-edit
      no-check
      @remove="removes">
      <template #action_other_search>
        <div class="search_user">
          <a-input
            v-model="params.userName"
            placeholder="搜索用户"
            @change="infoList"
            @keyup.enter="infoList"></a-input>
        </div>
        <div class="search_addr">
          <a-input v-model="params.addr" placeholder="搜索地址" @change="infoList" @keyup.enter="infoList"></a-input>
        </div>
        <div class="search_status">
          <a-select
            v-model="params.status"
            style="width: 200px"
            :options="statusOptions"
            placeholder="状态过滤"
            allow-clear
            @change="infoList"></a-select>
        </div>
        <div class="search_date">
          <a-date-picker v-model="params.date" style="width: 200px" />
        </div>
      </template>
    </Blog_table>
  </div>
</template>
<style lang="scss">
.log_list_view {
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
