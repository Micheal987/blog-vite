<script lang="ts" setup>
import Blog_table from '@/components/admin/blog_table.vue'
import { getUserList, putUpdateUser, type UpdateUserRequest, type UserInfoType } from '@/api/user/user_api'
import type { RecordType } from '@/components/admin/blog_table.vue'
import { reactive, ref } from 'vue'
import type { actionOptionType, filterOptionType } from '@/components/admin/blog_table.vue'
import { getRoleList } from '@/api/role/role_api'
import User_create from '@/components/admin/user_create.vue'
import { Message } from '@arco-design/web-vue'
import { roleOption } from '@/global/role'
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
const visible = ref(false)

const blogTableRef = ref()
const createOk = () => {
  blogTableRef.value.getlist()
}
const visibleUpdate = (val: boolean) => {
  console.log(val)
  visible.value = val
}
const updateFrom = reactive<UpdateUserRequest>({
  nick_name: '',
  user_id: 0,
  role: 2,
})
const formRef = ref()
const updatevisible = ref(false)
const edit = async (res: RecordType<UserInfoType>) => {
  updateFrom.nick_name = res.nick_name
  updateFrom.user_id = res.id
  updateFrom.user_id = res.role_id
  updatevisible.value = true
}
const updateUserOk = async () => {
  let val = await formRef.value.validate()
  if (val) return false
  // let res = await putUpdateUser(updateFrom)
  // Message.success(res.msg)
  // if (res.code != 0) {
  //   Message.error(res.msg)
  //   return
  // }
  return true
}
</script>
<template>
  <div>
    <a-modal title="编辑用户" v-model:visible="updatevisible" v-on:before-ok="updateUserOk">
      <a-form ref="formRef" :model="updateFrom">
        <a-form-item
          field="nick_name"
          label="昵称"
          :rules="[{ required: true, message: '请输入昵称' }]"
          :validate-trigger="['blur']">
          <a-input v-model="updateFrom.nick_name as string" placeholder="输入昵称" />
        </a-form-item>
        <a-form-item field="role" label="权限">
          <a-select :options="roleOption" v-model="updateFrom.role" placeholder="选择角色"></a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <User_create v-model:visible="visible" @update="visibleUpdate" @ok="createOk"></User_create>
    <Blog_table
      :url="getUserList"
      :columns="columns"
      ref="blogTableRef"
      search-placeholder="搜索用户名称和昵称"
      :defualt-params="{ role: 1 }"
      defualtDel
      :filter-group="filterGroup"
      :limit="10"
      @add="visible = true"
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
