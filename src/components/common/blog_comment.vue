<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { getCommentListApi, postCommentCreateApi } from '@/api/comment/comment_api'
import type { CommentType, CommentAddType } from '@/api/comment/comment_api'
import type { ListDateType } from '@/api/axios'
import { Message } from '@arco-design/web-vue'
import { useStoreConfig } from '@/store'
import Blog_comment_list from './blog_comment_list.vue'
const store = useStoreConfig()
interface Props {
  articleId: string
}
const props = defineProps<Props>()
const articleDate = reactive<ListDateType<CommentType>>({
  list: [],
  count: 0,
})
const addCommentForm = reactive<CommentAddType>({
  article_id: '',
  comment: '',
  parent_id: undefined,
})
const articleList = async () => {
  if (!store.isLogin) {
    Message.error('请登录')
    return
  }
  if (addCommentForm.article_id == '') {
    Message.error('请选择文章')
    return
  }
  let res = await getCommentListApi(props.articleId)
  let data = res.data
  articleDate.list = data.list
  articleDate.count = data.count
}
const createComment = async () => {
  let res = await postCommentCreateApi(addCommentForm)
  if (res.code) Message.error(res.msg)
  Message.success(res.msg)
  addCommentForm.comment = ''
  articleList()
}

watch(
  () => props.articleId,
  () => {
    if (props.articleId) {
      addCommentForm.article_id = props.articleId
      articleList()
    }
  },
  { immediate: true },
)
const textareaRef = ref()
const focus = () => {
  textareaRef.value.focus()
}
defineExpose({
  focus,
})
</script>
<template>
  <div class="blog_comment_list_components">
    <div class="add_comment">
      <a-textarea
        ref="textareaRef"
        placeholder="输入评论内容"
        @keyup.enter.ctrl="createComment"
        v-model="addCommentForm.comment"
        :auto-size="{ maxRows: 6, minRows: 6 }"></a-textarea>
      <a-button type="primary" @click="createComment">发布评论</a-button>
    </div>
    <Blog_comment_list :data="articleDate.list" @list="articleList" />
  </div>
</template>
<style lang="scss">
.blog_comment_list_components {
  background-color: var(--color-bg-1);
  border-radius: 5px;
  width: 100%;
  padding: 20px;
  .add_comment {
    position: relative;
    button {
      position: absolute;
      bottom: 10px;
      right: 15px;
    }
  }
  .action {
    cursor: pointer;
  }
  .apply_commen {
    display: flex;
    button {
      margin-left: 10px;
    }
  }
}
</style>
