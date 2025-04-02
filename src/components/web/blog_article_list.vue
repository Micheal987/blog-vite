<script lang="ts" setup>
import Blog_article_item from '../common/blog_article_item.vue'
import { getArticleListApi } from '@/api/article/article_api'
import type { ArticleDataType, ArticleparamType } from '@/api/article/article_api'
import type { ListDateType } from '@/api/axios'
import { reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const data = reactive<ListDateType<ArticleDataType>>({
  list: [],
  count: 0,
})
let params = reactive<ArticleparamType>({})
const listInfo = async (p?: ArticleparamType) => {
  if (p) {
    Object.assign(params, p)
  }
  let res = await getArticleListApi(params)
  data.list = res.data.list
  data.count = res.data.count
}
listInfo()
defineExpose({
  listInfo,
})
watch(
  () => route.query,
  () => {
    if (route.query.date != '') {
      params.date = route.query.date as string
    }
    listInfo()
  },
  { deep: true },
)
</script>
<template>
  <div class="blog_article_list">
    <div class="source">
      <Blog_article_item v-for="item in data.list" :data="item as any" />
    </div>
    <div class="page">
      <a-pagination v-model:current="params.page" @change="listInfo(params)" :total="data.count" show-total />
    </div>
  </div>
</template>
<style lang="scss">
.blog_article_list {
  .blog_article_item {
    background-color: var(--color-bg-1);
    height: 250px;
    margin-bottom: 20px;
    &:first-child {
      margin-top: 20px;
      border-radius: 0 0 5px 5px;
    }
    .info {
      .title {
        font-size: 20px;
      }
      .abstract {
        margin-top: 10px;
        height: 4rem;
      }
    }
  }
  .page {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
