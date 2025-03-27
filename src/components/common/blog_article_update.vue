<script lang="ts" setup>
import { type ArticleDataType, type ArticleUpdateType } from '@/api/article/article_api'
import { reactive, ref, watch, computed } from 'vue'
import { getArticleCategory, getArticleTagsApi, putArticleUpdateApi } from '@/api/article/article_api'
import type { optionType } from '@/types'
import { getImageInfoApi, type ImageType } from '@/api/image/image_api'
import { Message } from '@arco-design/web-vue'
import Blog_article_item from './blog_article_item.vue'
import { Random } from 'mockjs'
//props
interface Props {
  visible: boolean
  data: ArticleUpdateType
  title?: string
  type?: 'add' | 'update'
}
//props
const props = defineProps<Props>()
const { title = '文章更新', type = 'update' } = props
const emits = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'ok', value: any): void
}>()

//分类标签变量
let categoryList = ref<optionType[]>([])
let TagList = ref<string[]>([])
//articleCategoryList
const articleCategoryList = async () => {
  let res = await getArticleCategory()
  categoryList.value = res.data
}
articleCategoryList()
//articleTagList 标签
const articleTagList = async () => {
  let res = await getArticleTagsApi()
  TagList.value = res.data
}
articleTagList()
//图片列表获取
let imageIdList = ref<ImageType[]>([])
const imageInfo = async () => {
  const res = await getImageInfoApi()
  imageIdList.value = res.data
}
imageInfo()

//bannerChange
const bannerChange = (val: number) => {
  //find对应id的信息
  //可以用filter写
  const image = imageIdList.value.find((item) => {
    return item.id === val
  })
  form.banner_url = image?.path
}
//form提交的内容
const form = reactive<ArticleUpdateType & ArticleDataType>({
  title: '',
  abstract: '',
  content: '',
  category: '',
  source: '',
  link: '',
  banner_id: 0,
  tags: [],
  ID: '',
  look_count: 0,
  comment_count: 0,
  digg_count: 0,
  collects_count: 0,
  created_at: new Date().toDateString(),
})

//watch
watch(
  () => props.data,
  () => {
    Object.assign(form, props.data)
  },
  { deep: true, immediate: true },
)
const formRef = ref() //表单验证

const coverSrc = (value: number) => {
  if (value == undefined) return
  return computed((): string => {
    let img = imageIdList.value.find((item) => item.id === value)?.path
    if (img == undefined) return ''
    return img
  })
}
//随机图片
const randomCover = () => {
  const image: ImageType = Random.pick(imageIdList.value)
  form.banner_id = image.id
  form.banner_url = image.path
}
//表单事件
const onHandler = async () => {
  let v = await formRef.value.validate()
  if (v) return //校验不通过
  // 更新
  if (type === 'update') {
    let res = await putArticleUpdateApi(form)
    if (res.code) {
      Message.error(res.msg)
      return
    }
    Message.success(res.msg)
    emits('update:visible', false)
    emits('ok', null)
  }
  //添加
  if (type == 'add') {
    emits('update:visible', false)
    emits('ok', form)
  }
}

//关闭
const cancel = () => {
  emits('update:visible', false)
}
</script>
<template>
  <div>
    <!-- modal-->
    <a-modal
      :title="title"
      width="30%"
      modal-class="blog_article_modal_body"
      :visible="props.visible"
      @cancel="cancel"
      v-on:before-ok="onHandler">
      <!-- form -->
      <a-form ref="formRef" :model="form">
        <!-- 文章标题  required-->
        <a-form-item
          field="title"
          label="文章标题"
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
        <a-form-item field="tags" label="文章的标签" :validate-trigger="['blur']">
          <a-select v-model="form.tags" allow-create multiple :options="categoryList"></a-select>
        </a-form-item>
        <!-- 选择banners图 -->
        <a-form-item field="image_sort_list" label="文章封面" :validate-trigger="['blur']">
          <a-select
            v-model="form.banner_id"
            @change="bannerChange(form.banner_id as number)"
            placeholder="选择文章封面"
            allow-clear>
            <a-option v-for="item in imageIdList" :key="item.id" :value="item.id">
              <div class="banners_image_div">
                <img height="30px" :src="item.path" alt="" />
                <span>{{ item.name }}</span>
              </div>
            </a-option>
            <template #label="{ data }">
              <!-- 请求问题 -->
              <img :src="coverSrc(data.value)?.value" style="height: 40px; border-radius: 5px" alt="" />
              <span style="margin-left: 10px">{{ data.label }}</span>
            </template>
          </a-select>
          <a-button type="outline" style="margin-left: 10px" @click="randomCover">随机图片</a-button>
        </a-form-item>
        <!-- 原文地址 -->
        <a-form-item field="link" label="原文地址" :validate-trigger="['blur']">
          <a-input v-model="form.link" placeholder="原文地址" :auto-size="{ minRows: 4, maxRows: 10 }"></a-input>
        </a-form-item>
        <!-- 文章来源 -->
        <a-form-item field="source" label="文章来源" :validate-trigger="['blur']">
          <a-input v-model="form.source" placeholder="文章来源" :auto-size="{ minRows: 4, maxRows: 10 }"></a-input>
        </a-form-item>
        <!-- 文章的预览 -->
        <a-form-item
          field="source"
          v-if="form.title && form.banner_url && form.category"
          label="文章预览"
          :validate-trigger="['blur']"
          content-class="preview_body">
          <Blog_article_item :data="form" preview />
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
