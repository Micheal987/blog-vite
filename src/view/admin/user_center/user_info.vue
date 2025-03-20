<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { UserInfoType, userInfoUpdateType } from '@/api/user/user_api.ts'
import { getUserInfoApi, putUserInfoUpdateApi } from '@/api/user/user_api'
import Blog_title from '@/components/common/blog_title.vue'
import { Message } from '@arco-design/web-vue'
import Blog_update_password from '@/components/common/blog_update_password.vue'
import Blog_binding_email from '@/components/common/blog_binding_email.vue'
import Blog_user_info_preview from '@/components/common/blog_user_info_preview.vue'
import { Random } from 'mockjs'
const form = reactive<UserInfoType>({
  user_name: '',
  id: 0,
  created_at: '',
  nick_name: '',
  avatar: '',
  email: '',
  tel: '',
  addr: '',
  token: '',
  ip: '',
  role: '',
  role_id: 0,
  sign_status: '',
  integral: 0,
  sign: '',
  link: '',
})
const formRef = ref()
const updatePasswordVisible = ref(false)
const bindingEmailVisible = ref(false)
const userInfo = async () => {
  let res = await getUserInfoApi()
  Object.assign(form, res.data)
}
userInfo()
const userInfoUpdate = async () => {
  let val = await formRef.value.validate()
  if (val) return
  let params: userInfoUpdateType = {
    link: form.link,
    nick_name: form.nick_name,
    sign: form.sign,
  }
  let res = await putUserInfoUpdateApi(params)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
}
</script>
<template>
  <div class="user_info_view">
    <div class="left">
      <Blog_title title="用户信息"></Blog_title>
      <a-form ref="formRef" :model="form" :label-col-props="{ span: 4 }" :wrapper-col-props="{ span: 19 }">
        <a-form-item field="user_name" label="用户名称">
          <span>{{ form.user_name }}</span>
        </a-form-item>
        <a-form-item field="avatar" label="用户名称">
          <a-avatar :image-url="form.avatar"></a-avatar>
        </a-form-item>
        <a-form-item
          field="nick_name"
          label="昵称"
          :rules="[{ required: true, message: '请输入昵称' }]"
          :validate-trigger="['blur']"
          @change="userInfoUpdate">
          <a-input v-model="form.nick_name" placeholder="请输入昵称" />
        </a-form-item>
        <a-form-item field="sign" label="我的签名" @change="userInfoUpdate">
          <a-textarea v-model="form.sign" placeholder="我的签名" :auto-size="{ minRows: 3, maxRows: 3 }" />
        </a-form-item>
        <a-form-item field="link" label="我的博客" @change="userInfoUpdate">
          <a-input v-model="form.addr" placeholder="我的博客" :auto-size="{ minRows: 3, maxRows: 3 }" />
        </a-form-item>
        <a-form-item field="email" label="邮箱">
          <span>{{ form.email }}</span>
        </a-form-item>
        <a-form-item field="role" label="当前角色">
          <span>{{ form.role }}</span>
        </a-form-item>
        <a-form-item field="sign_status" label="注册来源">
          <span>{{ form.sign_status }}</span>
        </a-form-item>
        <a-form-item field="integral" label="用户积分">
          <span>{{ form.integral }}</span>
        </a-form-item>
      </a-form>
      <Blog_title title="操作"></Blog_title>
      <Blog_update_password v-model:visible="updatePasswordVisible"></Blog_update_password>
      <Blog_binding_email v-model:visible="bindingEmailVisible"></Blog_binding_email>
      <div class="action_gruop">
        <a-button type="primary" @click="bindingEmailVisible = true">绑定邮箱</a-button>
        <a-button type="primary" @click="updatePasswordVisible = true">修改密码</a-button>
        <a-button type="primary" status="danger">注销退出</a-button>
      </div>
    </div>
    <div class="right">
      <Blog_title title="个人信息预览"></Blog_title>
      <div class="user_info_preview">
        <Blog_user_info_preview
          :data="{
            avatar: form.avatar,
            nickName: form.nick_name,
            sign: form.sign,
            link: form.link,
            look_count: Random.integer(1, 200),
            comment_count: Random.integer(1, 200),
            digg_count: Random.integer(1, 200),
            collects_count: Random.integer(1, 200),
          }" />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.user_info_view {
  display: flex;
  background-color: var(--color-bg-1);
  padding: 20px;
  border-radius: 5px;
  height: calc(100vh - 130px);
  .left {
    width: 40%;
    .arco-form {
      margin-top: 10px;
    }
    .action_gruop {
      margin-top: 10px;
      > button {
        margin-left: 10px;
      }
    }
  }
  .right {
    margin-left: 20px;
    width: calc(60% - 20px);
    .user_info_preview {
      width: 200px;
    }
  }
}
</style>
