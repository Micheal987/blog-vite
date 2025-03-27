<script setup lang="ts">
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { reactive, ref } from 'vue'
import { uploadImageApi } from '@/api/image/image_api.ts'
import type { ResponseResult } from '@/api/axios'
import { useStoreConfig } from '@/store'
import Blog_article_update from '@/components/common/blog_article_update.vue'
import type { ArticleUpdateType } from '@/api/article/article_api.ts'
import { postArticleCreateApi } from '@/api/article/article_api.ts'
import { Message } from '@arco-design/web-vue'

const store = useStoreConfig()
const updateVisible = ref<boolean>(false)

interface Props {
  visible: boolean
}

const props = defineProps<Props>()
const emits = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'ok'): void
}>()
//data
const data = reactive<ArticleUpdateType>({
  title: '',
  content: '',
  category: '',
})
//图片请求
async function onUploadImg(files: Array<File>, callback: (urls: Array<string>) => void): Promise<void> {
  let resList: ResponseResult<string>[] = []

  try {
    resList = await Promise.all(files.map((file) => uploadImageApi(file)))
  } catch (e) {
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

interface ArticleSaveStoreType {
  category: string
  tags: string[]
  date: Date
}
// emit--ok
const okHandler = (record: ArticleUpdateType) => {
  console.log(record)
  Object.assign(data, record)
}
//接口请求
const createArticle = async () => {
  if (data.title === '') {
    Message.warning('文章的标题不能为空')
    return false
  }
  if ((data.content as string) === '') {
    Message.warning('文章的内容不能为空')
    return false
  }
  let res = await postArticleCreateApi(data)
  if (res.code) {
    Message.error(res.msg)
    return false
  }
  Message.success(res.msg)
  emits('update:visible', false)
  //除了分类和标签不清除,其他都清除
  //一个小时内保存信息
  data.title = ''
  data.content = ''
  data.abstract = ''
  data.banner_id = undefined
  const saveStore: ArticleSaveStoreType = {
    category: data.category,
    tags: data.tags ? data.tags : [],
    date: new Date(),
  }
  //存sessionStorage
  sessionStorage.setItem('saveStore', JSON.stringify(saveStore))
  emits('ok')
}
//获取标签
const obtain = () => {
  let item = sessionStorage.getItem('saveStore')
  if (item == null) return
  try {
    const obj: ArticleSaveStoreType = JSON.parse(item)
    data.category = obj.category
    data.tags = obj.tags
  } catch (e) {
    return
  }
}
obtain()
</script>
<template>
  <div class="blog_article_drawer">
    <Blog_article_update
      title="文章信息"
      v-model:visible="updateVisible"
      type="add"
      @ok="okHandler"
      :data="data"></Blog_article_update>
    <a-drawer
      class="blog_article_drawer_inner"
      width="86%"
      :visible="props.visible"
      title="发布文章"
      @cancel="emits('update:visible', false)">
      <template #title> Title </template>
      <div>
        <MdEditor v-model="data.content" :on-upload-img="onUploadImg" :theme="store.themeString()" />
      </div>
      <template #footer>
        <a-button @click="emits('update:visible', false)">取消</a-button>
        <a-button type="primary" status="success" @click="updateVisible = true">完善信息</a-button>
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
