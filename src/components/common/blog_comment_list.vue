<script lang="ts" setup>
import { postCommentCreateApi, DeleteCommentApi, postCommentDigg } from '@/api/comment/comment_api'
import type { CommentAddType, CommentType } from '@/api/comment/comment_api'
import { dateTimeFormat } from '@/utils/date'
import { Message } from '@arco-design/web-vue'
import { useStoreConfig } from '@/store'
import { IconMessage, IconDelete } from '@arco-design/web-vue/es/icon'
import { nextTick, ref } from 'vue'
import { showMessageRecord } from './blog_message_record'
const store = useStoreConfig()
interface Props {
  data: CommentType[]
}
const props = defineProps<Props>()
const emits = defineEmits<{
  (e: 'list'): void
}>()
const saveID = ref()
const applyShow = (record: CommentType) => {
  record.apply_show = !record.apply_show
  if (!record.apply_show) {
    saveID.value = 0
    return
  }
  nextTick(() => {
    let dom = document.querySelector(`comment_apply_ipt_${record.id.toString()} input`) as HTMLInputElement
    dom.focus()
  })
}
const applyComment = async (record: CommentType) => {
  if (!store.isLogin) {
    Message.error('请登录')
    return
  }
  if (record.content.trim() == '') {
    Message.error('请输入文章内容')
    return
  }
  let data: CommentAddType = {
    article_id: record.article_id,
    comment: record.apply_comment,
    parent_id: record.id,
  }
  let res = await postCommentCreateApi(data)
  if (res.code) Message.error(res.msg)
  Message.success(res.msg)
  saveID.value = record.id
  record.apply_comment = ''
  emits('list')
}
const DiggCount = async (record: CommentType) => {
  let res = await postCommentDigg(record.article_id)
  if (res.code) Message.error(res.msg)
  Message.success(res.msg)
  record.digg_count++
}
const deleteComment = async (record: CommentType) => {
  let res = await DeleteCommentApi(record.id)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  emits('list')
}
const avatarClick = (item: CommentType) => {
  console.log(item.user_id)
}
</script>
<template>
  <div>
    <a-comment
      :author="item.user.nick_name"
      :content="item.content"
      :datetime="dateTimeFormat(item.created_at)"
      v-for="item in props.data">
      <template #actions>
        <span class="action" @click="DiggCount(item)"> <IconMessage /> digg {{ item.digg_count }}</span>
        <span class="action" @click="applyShow(item)"> <IconMessage /> 回复 </span>
        <a-popconfirm
          v-if="store.isAdmin() || store.userInfo.user_id === item.user_id"
          content="是否确认删除这条评论?"
          @ok="deleteComment(item)">
          <span class="action"> <IconDelete /> 删除 </span>
        </a-popconfirm>
      </template>
      <template #avatar" @click="avatarClick(item)">
        <a-avatar>
          <img alt="avatar" :src="item.user.avatar" />
        </a-avatar>
      </template>
      <a-comment #content :avatar="store.userInfo.avatar" v-if="item.apply_show || item.id === saveID">
        <div class="apply_commen">
          <a-input
            :class="'comment_apply_ipt_' + item.id"
            :placeholder="'回复' + item.user.nick_name"
            v-model="item.apply_comment"
            @keyup.enter="applyShow(item)"></a-input>
          <a-button type="primary" @click="applyComment(item)">回复</a-button>
        </div>
      </a-comment>
      <Blog_comment_list :data="item.sub_comments" @list="emits('list')"></Blog_comment_list>
    </a-comment>
  </div>
</template>
<style lang="scss"></style>
