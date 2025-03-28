<script lang="ts" setup>
import type { ListDateType, PageParamType } from '@/api/axios'
import type { CommentArticleType } from '@/api/comment/comment_api'
import { reactive, ref } from 'vue'
import { IconDelete } from '@arco-design/web-vue/es/icon'
import { getCommentArticleListApi } from '@/api/comment/comment_api'
import Blog_comment from '@/components/common/blog_comment.vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const routes = useRoute()
let articleID = ref<string>(routes.query.id as string)
const articleListData = reactive<ListDateType<CommentArticleType>>({
  list: [],
  count: 0,
})
const articleParams = reactive<PageParamType>({})
const articleList = async () => {
  let res = await getCommentArticleListApi(articleParams)
  articleListData.list = res.data.list
  articleListData.count = res.data.count
}
articleList()
const checkItem = (record: CommentArticleType) => {
  articleID.value = record.id
  router.push({
    query: {
      id: record.id,
    },
  })
}
</script>
<template>
  <div class="comment_list_view">
    <div class="article">
      <div class="head">
        <a-input-search placeholder="搜索文章标题"></a-input-search>
      </div>
      <div class="article_list">
        <div
          :class="{ item: true, active: articleID === item.id }"
          @click="checkItem(item)"
          v-for="item in articleListData.list"
          :key="item.id">
          <div class="title">
            <a-typography-paragraph :ellipsis="{ rows: 2, showTooltip: true }"
              >{{ item.title }}
            </a-typography-paragraph>
          </div>
          <div class="count">{{ item.count }}</div>
          <div class="action">
            <IconDelete />
          </div>
        </div>
        <div class="page">
          <a-pagination simple :total="articleListData.count"></a-pagination>
        </div>
      </div>
    </div>
    <div class="comment" v-if="articleID">
      <Blog_comment :article-id="articleID" />
    </div>
  </div>
</template>
<style lang="scss">
.comment_list_view {
  display: flex;
  padding: 20px;

  > div {
    background-color: var(--color-bg-1);
    height: calc(100vh - 130px);
    border-radius: 10px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .article {
    width: 280px;
    margin-left: 20px;
    padding: 20px;
    position: relative;
    .article_list {
      .item {
        display: flex;
        align-items: center;
        padding: 20px;
        &:hover {
          cursor: pointer;
          background-color: var(--color-fill-1);
        }
      }
    }
    .head {
      margin-bottom: 10px;
    }
    .page {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .comment {
    width: calc(100% - 320px);
    margin-left: 20px;
  }
}
</style>
