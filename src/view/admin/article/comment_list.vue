<script lang="ts" setup>
import type { ListDateType } from '@/api/axios'
import type { CommentArticleType } from '@/api/comment/comment_api'
import { reactive, ref } from 'vue'
import { IconDelete } from '@arco-design/web-vue/es/icon'

let active = ref<string>('')
const articleListData = reactive<ListDateType<CommentArticleType>>({
  list: [],
  count: 0,
})

const checkItem = (record: CommentArticleType) => {
  active.value = record.id
}
</script>
<template>
  <div class="comment_list_view">
    <div class="article">
      <div class="article_list">
        <div
          :class="{ item: true, active: active === item.id }"
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
      </div>
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
  }
  .blog_message_record_component {
    width: calc(100% - 320px);
    margin-left: 20px;
  }
}
</style>
