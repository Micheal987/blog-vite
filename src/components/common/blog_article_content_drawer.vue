<script setup lang="ts">
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { reactive, ref, watch } from 'vue'
import { onUploadImg } from '@/api/image/image_api.ts'
import { useStoreConfig } from '@/store'
import type { ArticleUpdateType } from '@/api/article/article_api.ts'
import { getArticleApi, putArticleUpdateApi } from '@/api/article/article_api.ts'
import { Message } from '@arco-design/web-vue'
import Blog_article_update from '@/components/common/blog_article_update.vue'

const text = ref(' Editor')
const store = useStoreConfig()
const updateVisible = ref<boolean>(false)
//props
interface Props {
  visible: boolean
  id?: string
}
const props = defineProps<Props>()
//emit
const emits = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'ok'): void
}>()
//date
const data = reactive<ArticleUpdateType>({
  title: '',
  content: '',
  category: '',
})
//onUploadImg

//createArticle
const createArticle = async () => {
  if (data.title === '') {
    Message.warning('文章的标题不能为空')
    return false
  }
  if ((data.content as string) === '') {
    Message.warning('文章的内容不能为空')
    return false
  }
  let res = await putArticleUpdateApi(data)
  if (res.code) {
    Message.error(res.msg)
    return false
  }
  Message.success(res.msg)
  emits('update:visible', false)
  //除了分类和标签不清除,其他都清除
  //一个小时内保存信息
  data.content = ''
  emits('ok')
}
//获取
const obtain = async () => {
  const res = await getArticleApi(props.id as string)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  data.content = res.data
  data.id = props.id
}

const openmodal = () => {
  updateVisible.value = true
}
function okHandler(record: ArticleUpdateType) {
  Object.assign(data, record)
}
//watch id
watch(
  () => props.id,
  () => {
    if (props.id) {
      obtain()
    }
  },
  { immediate: true },
)
</script>
<template>
  <div class="blog_article_drawer">
    <Blog_article_update v-model:visible="updateVisible" @ok="okHandler" type="add" :data="data"></Blog_article_update>
    <a-drawer
      class="blog_article_drawer_inner"
      width="86%"
      :visible="props.visible"
      title="编辑正文"
      :on-before-ok="createArticle"
      @cancel="emits('update:visible', false)">
      <template #title> Title </template>
      <div>
        <MdEditor v-model="text" :on-upload-img="onUploadImg" :theme="store.themeString()" />
      </div>
      <template #footer>
        <a-button @click="emits('update:visible', false)">取消</a-button>
        <a-button type="primary" status="success" @click="openmodal">完善信息</a-button>
        <a-button type="primary" @click="createArticle">确定</a-button>
      </template>
    </a-drawer>
  </div>
</template>

<style lang="scss">
.blog_article_drawer_inner {
  .md-editor {
    height: calc(100vh - 170px);
  }
}
</style>
