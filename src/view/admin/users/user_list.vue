<script lang="ts" setup>
import Blog_table from '@/components/admin/blog_table.vue'
import { getUserListApi, putUpdateUserApi, type UpdateUserRequest, type UserInfoType } from '@/api/user/user_api'
import type { RecordType } from '@/components/admin/blog_table.vue'
import { reactive, ref } from 'vue'
import type { actionOptionType, filterOptionType } from '@/components/admin/blog_table.vue'
import { getRoleListApi } from '@/api/role/role_api'
import User_create from '@/components/admin/user_create.vue'
import { Message } from '@arco-design/web-vue'
import { roleOption } from '@/global/role'

// blog_table父组件 a-table 显示的字段--头部
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

//过滤组
const filterGroup = ref<filterOptionType[]>([
  {
    label: '角色过滤',
    value: 0,
    column: 'role',
    source: getRoleListApi,
  },
])
//更新
const updateFrom = reactive<UpdateUserRequest>({
  nick_name: '',
  user_id: 0,
  role: 2,
})

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
const formRef = ref() //表单的ref
const updateVisible = ref(false) //updateVisible 编辑的modal
//emits 的edit
const edit = (res: RecordType<UserInfoType>) => {
  //赋值 父组件传过来的tab值
  updateFrom.nick_name = res.nick_name
  updateFrom.user_id = res.id
  updateFrom.role = res.role_id
  updateVisible.value = true //关闭modal
}
//modal
//v-on:before-ok 点击确定后触发 更新api
const updateUserOk = async () => {
  let val = await formRef.value.validate() //表单验证ref的validate
  if (val) return false //有值代表校验不通过
  let res = await putUpdateUserApi(updateFrom) //api
  Message.success(res.msg)
  if (res.code != 200) {
    Message.error(res.msg)
    return
  }
  return true //关闭modal
}
//删除
//emit 传idList的
const removes = (idList:number[]) => {
  console.log("数组id",idList)
  //删除操作
}
</script>
<template>
  <div>
    <a-modal title="编辑用户" v-model:visible="updateVisible" v-on:before-ok="updateUserOk">
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
      :url="getUserListApi"
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
