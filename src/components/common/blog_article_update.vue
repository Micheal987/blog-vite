<script lang="ts" setup>
import { type ArticleDataType, type ArticleUpdateType } from '@/api/article/article_api'
import { reactive, ref, watch, computed } from 'vue'
import { getArticleCategory, getArticleTagsApi, putArticleUpdateApi } from '@/api/article/article_api'
import type { optionType } from '@/types'
import { getImageInfoApi, type ImageType } from '@/api/image/image_api'
import { Message } from '@arco-design/web-vue'
import Blog_article_item from './blog_article_item.vue'
import { Random } from 'mockjs'

interface Props {
  visible: boolean
  data: ArticleUpdateType
  title?: string
  type?: 'add' | 'update'
}

const props = defineProps<Props>()
const { title = '更新文章信息', type = 'update' } = props
const emits = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'ok', value: ArticleUpdateType & ArticleDataType): void
}>()

const form = reactive<ArticleUpdateType & ArticleDataType>({
  title: '',
  abstract: '',
  content: '',
  category: '',
  source: '',
  link: '',
  banner_id: 0,
  tags: [],
  id: '',
  look_count: 0,
  comment_count: 0,
  digg_count: 0,
  collects_count: 0,
  created_at: new Date().toDateString(),
})
let categoryList: optionType[] = []
let TagList: string[] = []
const articleCategoryList = async () => {
  let res = await getArticleCategory()
  categoryList = res.data
}
const articleTagList = async () => {
  let res = await getArticleTagsApi()
  TagList = res.data
  console.log(TagList)
}
articleCategoryList()
articleTagList()
let imageList = ref<ImageType[]>([])
const imageInfo = async () => {
  const res = await getImageInfoApi()
  imageList.value = res.data
}
imageInfo()
watch(
  () => props.data,
  () => {
    Object.assign(form, props.data)
  },
  { deep: true, immediate: true },
)
const formRef = ref()
const onHandler = async () => {
  let v = await formRef.value.validate()
  if (v) return
  if (type === 'update') {
    let res = await putArticleUpdateApi(form)
    if (res.code) {
      Message.error(res.msg)
      return
    }
    Message.success(res.msg)
    emits('update:visible', false)
    emits('ok', form)
  }
  if (type == 'add') {
    emits('update:visible', false)
    emits('ok', form)
  }
}
const bannerChange = (val: number) => {
  const image = imageList.value.find((item) => {
    return item.id === val
  })
  form.banner_url = image?.path
}
const coverSrc = (value: number) => {
  return computed((): string => {
    return (
      imageList.value.find((item) => {
        return item.id === value
      }) as ImageType
    ).path
  })
}
const randomCover = () => {
  const image: ImageType = Random.pick(imageList.value)
  form.banner_id = image.id
  form.banner_url = image.path
}
const cancel = () => {
  console.log('取消')
  emits('update:visible', false)
}
</script>
<template>
  <div>
    <a-modal
      :title="title"
      width="30%"
      modal-class="blog_article_modal_body"
      :visible="props.visible"
      @cancel="cancel"
      v-on:before-ok="onHandler">
      <a-form ref="formRef" :model="form">
        <!-- 文章标题  required-->
        <a-form-item
          field="title"
          label="广告标题"
          :rules="[{ required: true, message: '文章标题不能为空' }]"
          :validate-trigger="['blur']">
          <a-input v-model="form.title" placeholder="请输入文章标题"></a-input>
        </a-form-item>
        <!-- 文件简介 -->
        <a-form-item field="abstract" label="文件简介" :validate-trigger="['blur']">
          <a-textarea
            v-model="form.abstract"
            placeholder="请输入文章简介"
            :auto-size="{ minRows: 4, maxRows: 10 }"></a-textarea>
        </a-form-item>
        <!-- 文章的分类 -->
        <a-form-item field="abstract" label="文件分类" :validate-trigger="['blur']">
          <a-select allow-create v-model="form.category" :options="categoryList"></a-select>
        </a-form-item>
        <!-- 文章的标签 -->
        <a-form-item field="tags" label="文件标签" :validate-trigger="['blur']">
          <a-select v-model="form.tags" allow-create multiple :options="categoryList"></a-select>
        </a-form-item>
        <!-- 选择banners图 -->
        <a-form-item field="image_sort_list" label="文章封面" :validate-trigger="['blur']">
          <a-select
            v-model="form.banner_id"
            @change="bannerChange(form.banner_id as number)"
            placeholder="选择文章封面"
            allow-clear>
            <a-button type="outline" style="margin-left: 10px" @click="randomCover">随机图片</a-button>
            <a-option v-for="item in imageList" :key="item.id" :value="item.id">
              <div class="banners_image_div">
                <img height="40px" :src="'http://127.0.0.1:8000/' + item.path" alt="" />
                <span>{{ item.name }}</span>
              </div>
            </a-option>
            <!-- bug -->
            <!-- <template #label="{ data }">
              {{ coverSrc(data.value).value }}
              <img :src="coverSrc(data.value).value" style="height: 30px; border-radius: 5px" alt="" />
              <span style="margin-left: 10px">{{ data.label }}</span>
            </template> -->
          </a-select>
        </a-form-item>
        <a-form-item field="link" label="原文地址" :validate-trigger="['blur']">
          <a-input v-model="form.link" placeholder="原文地址" :auto-size="{ minRows: 4, maxRows: 10 }"></a-input>
        </a-form-item>
        <a-form-item field="source" label="文章来源" :validate-trigger="['blur']">
          <a-input v-model="form.source" placeholder="文章来源" :auto-size="{ minRows: 4, maxRows: 10 }"></a-input>
        </a-form-item>
        <!-- 文章内容 required -->
        <a-form-item
          field="content"
          label="文章内容"
          :rules="[{ required: true, message: '请输入文章内容' }]"
          :validate-trigger="['blur']">
          <a-textarea
            v-model="form.content"
            placeholder="请输入文章内容"
            :auto-size="{ minRows: 10, maxRows: 15 }"></a-textarea>
        </a-form-item>
        <a-form-item
          field="source"
          v-if="form.title && form.banner_url && form.category"
          label="文章的预览"
          :validate-trigger="['blur']"
          content-class="preview_body">
          <Blog_article_item :data="form" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<style lang="scss">
.banners_image_div {
  display: flex;
  align-items: center;
  padding: 0 10px;

  img {
    height: 40px;
    border-radius: 10px;
    margin-right: 5px;
  }
}

.preview_body {
  max-width: inherit;
}

.blog_article_modal_body .arco-modal-body {
  overflow: hidden;
}
</style>
