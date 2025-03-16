<script setup lang="ts">
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { reactive, ref, watch } from 'vue'
import { uploadImageApi } from '@/api/image/image_api.ts'
import type { ResponseResult } from '@/api/axios'
import { useStoreConfig } from '@/store'
import type { ArticleUpdateType } from '@/api/article/article_api.ts'
import { getArticleApi, putArticleUpdateApi } from '@/api/article/article_api.ts'
import { Message } from '@arco-design/web-vue'
import Blog_article_update from '@/components/common/blog_article_update.vue'

const text = ref('# Hello Editor')
const store = useStoreConfig()
const updateVisible = ref<boolean>(false)

interface Props {
  visible: boolean
  id?: string
}

const props = defineProps<Props>()
const { id = '' } = props
const emits = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'ok'): void
}>()
const data = reactive<ArticleUpdateType>({
  title: '',
  content: '',
  category: '',
})

const onUploadImg = async (files: Array<File>, callback: (urls: Array<string>) => void): Promise<void> => {
  let resList: ResponseResult<string>[] = []

  try {
    resList = await Promise.all(files.map((file) => uploadImageApi(file)))
  } catch (e) {
    // Message.error(e.message)
    return
  }

  const urlList: string[] = []
  resList.forEach((res) => {
    if (res.code) {
      Message.error(res.msg)
      return
    }
    urlList.push(res.data)
  })
  callback(urlList)
}

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
const obtain = async () => {
  console.log('id', id)
  const res = await getArticleApi(props.id as string)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  data.content = res.data
  data.id = props.id
}
watch(
  () => props.id,
  () => {
    if (props.id) {
      obtain()
    }
  },
  { immediate: true },
)
const openmodal = () => {
  console.log('出发')
  updateVisible.value = true
}
function okHandler(record: ArticleUpdateType) {
  Object.assign(data, record)
}
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
