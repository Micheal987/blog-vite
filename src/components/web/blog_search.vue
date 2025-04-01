<script lang="ts" setup>
import { nextTick, reactive, ref } from 'vue'
import { IconSearch } from '@arco-design/web-vue/es/icon'
import type { ListDateType, PageParamType } from '@/api/axios'
import { getArticleSearchApi, type ArticleSearchType } from '@/api/article/article_api'
const visible = ref(false)
const searchRef = ref()
const searchFcous = () => {
  visible.value = true
  nextTick(() => {
    searchRef.value.focus()
  })
}
const params = reactive<PageParamType>({})
let data = reactive<ListDateType<ArticleSearchType>>({
  list: [],
  count: 0,
})
const searchList = async () => {
  let res = await getArticleSearchApi(params)
  data.list = res.data.list
  data.count = res.data.count
}
const goTo = (item: ArticleSearchType) => {
  window.open(`#/article/${item.slug}`, '_blank')
}
</script>
<template>
  <a-modal title="全文搜索" width="40%" :footer="false" v-model:visible="visible" body-class="blog_search_body">
    <div class="head">
      <a-input-search
        v-model="params.key"
        @search="searchList"
        @keydown.enter="searchList"
        ref="searchRef"
        placeholder="全文搜索内容"
        search-button></a-input-search>
    </div>
    <template v-if="data.list.length">
      <div class="body">
        <div class="item" @click="goTo(item)" v-for="item in data.list">
          <div class="title" v-html="item.title"></div>
          <div class="content" v-html="item.body"></div>
        </div>
      </div>
      <div class="footer">共搜索结果{{ data.count }}条</div>
    </template>
  </a-modal>
  <div class="blog_search">
    <IconSearch @click="searchFcous"></IconSearch>
  </div>
</template>
<style lang="scss">
.blog_search_body {
  padding: 0;
  .head {
    padding: 20px;
  }
  .body {
    max-height: 50vh;
    overflow-y: auto;
    color: var(--color-text-2);
    .item {
      padding: 10px 20px;
      cursor: pointer;
      &:hover {
        background-color: var(--color-fill-2);
      }
      .title {
        color: var(--color-text-1);
        margin-bottom: 5px;
        em {
          color: var(--height_color);
          font-size: 26px;
          font-weight: 600;
        }
      }
    }
  }
  .footer {
    text-align: center;
    padding: 10px 0;
    color: var(--color-text-2);
  }
}
</style>
