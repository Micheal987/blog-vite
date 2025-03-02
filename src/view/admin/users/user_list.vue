<script lang="ts" setup>
import Blog_table from '@/components/admin/blog_table.vue'
import { getUserList, type UserInfoType } from '@/api/user/user_api'
import type { RecordType } from '@/components/admin/blog_table.vue'
import { ref } from 'vue'
import type { actionOptionType, filterOptionType } from '@/components/admin/blog_table.vue'
import { getRoleList } from '@/api/role/role_api'
const columns = [
  { title: '用户名称', dataIndex: 'user_name' },
  { title: '用户昵称', dataIndex: 'nick_name' },
  { title: '用户头像', slotName: 'avatar' },
  { title: '用户邮箱', dataIndex: 'email' },
  { title: 'ip', dataIndex: 'ip' },
  { title: '地址', dataIndex: 'addr' },
  { title: '积分', dataIndex: 'integral' },
  { title: '权限', dataIndex: 'role' },
  { title: '注册来源', dataIndex: 'sign_status' },
  { title: '创建时间', slotName: 'created_at' },
  { title: '操作', slotName: 'action' },
]

const filterGroup = ref<filterOptionType[]>([
  {
    label: '角色过滤',
    value: 0,
    column: 'role',
    source: getRoleList,
  },
])
const add = () => {
  console.log('log')
}
const edit = (res: RecordType<UserInfoType>) => {
  console.log(res)
}
const removes = (res: any) => {
  console.log(res)
}
const actionGroups = ref<actionOptionType[]>([
  {
    label: '批量拉黑',
    callback: async (idList: (string | number)[]): Promise<boolean> => {
      console.log(idList)
      return true
    },
  },
])
</script>
<template>
  <div>
    <Blog_table
      :url="getUserList"
      :columns="columns"
      search-placeholder="搜索用户名称和昵称"
      :defualt-params="{ role: 1 }"
      defualtDel
      :filter-group="filterGroup"
      :limit="10"
      @add="add"
      @edit="edit"
      :actionGroup="actionGroups"
      @remove="removes">
      <template #avatar="{ record }">
        <a-avatar :imageUrl="record.avatar"></a-avatar>
      </template>
      <template #action_middle="record">
        <a-button>点我{{ record.record.id }}</a-button>
      </template>
    </Blog_table>
  </div>
</template>
<style lang="scss"></style>
