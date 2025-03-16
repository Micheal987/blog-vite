<script lang="ts" setup>
import Blog_table from '@/components/admin/blog_table.vue'

import { reactive, ref } from 'vue'
import type { filterOptionType } from '@/components/admin/blog_table.vue'
import {
  getArticleListApi,
  type ArticleType,
  getArticleCategory,
  type ArticleUpdateType,
} from '@/api/article/article_api'
import Mock from 'mockjs'
import { getTagOptionsApi } from '@/api/tags/tag_api'
import Blog_article_update from '@/components/common/blog_article_update.vue'
import Blog_article_drawer from '@/components/common/blog_article_drawer.vue'
import Blog_article_content_drawer from '@/components/common/blog_article_content_drawer.vue'
// blog_table父组件 a-table 显示的字段--头部
const columns = [
  { title: '标题', slotName: 'title' },
  { title: '文章的封面', slotName: 'banner_url' },
  { title: '文章分类', dataIndex: 'category' },
  { title: '作者', dataIndex: 'user_nick_name' },
  { title: '文章数据', slotName: 'data' },
  { title: '标签', slotName: 'tags' },
  { title: '发布时间', dataIndex: 'created_at' },
  { title: '操作', slotName: 'action' },
]

//
const filterGroup: filterOptionType[] = [
  {
    label: '文章分类',
    column: 'category',
    source: getArticleCategory,
  },
  {
    label: '文章标签',
    column: 'tag',
    source: getTagOptionsApi,
  },
]
const recordData = reactive<ArticleUpdateType>({
  title: '',
  abstract: '',
  content: '',
  category: '',
  source: '',
  link: '',
  banner_id: 0,
  tags: [],
  id: '',
})

const blogTableRef = ref() //父组件 ref
const updateVisible = ref(false)
const createVisible = ref(false)
const articleConentenVisible = ref(false)
const articleUpdateId = ref<string | undefined>(undefined)
const editArticleCoenten = (record: ArticleType) => {
  articleConentenVisible.value = true
  articleUpdateId.value = record.ID
}
//emits 调用父组的infoList
const infoList = () => {
  blogTableRef.value.infoList()
}
//
const editRecordData = (record: ArticleType) => {
  updateVisible.value = true
  console.log('编辑', record)
  recordData.title = record.title
  recordData.abstract = record.abstract
  recordData.content = record.content
  recordData.category = record.category
  recordData.source = record.source
  recordData.link = record.link
  recordData.banner_id = record.banner_id
  recordData.tags = record.tags
  recordData.id = record.ID
  recordData.banner_url = record.banner_url
}
//emit--update事件
const visibleUpdate = (val: boolean) => {
  console.log('quxiao1')
  updateVisible.value = val
}

//删除
//emit 传idList的
const removes = (idList: number[]) => {
  console.log('数组id', idList)
  //删除操作
}
const colorList = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray',
]
const visiblefun = (val: boolean) => {
  createVisible.value = val
}
</script>
<template>
  <div class="article_list_view">
    <Blog_article_update
      v-model:visible="updateVisible"
      @update:visible="visibleUpdate"
      @ok="infoList"
      :data="recordData"></Blog_article_update>
    <Blog_article_drawer v-model:visible="createVisible" @ok="infoList"></Blog_article_drawer>
    <Blog_article_content_drawer
      v-model:visible="articleConentenVisible"
      :id="articleUpdateId as string"></Blog_article_content_drawer>
    <Blog_table
      :url="getArticleListApi"
      :columns="columns as any"
      ref="blogTableRef"
      search-placeholder="搜索文章名称"
      :filter-group="filterGroup"
      default-del
      :limit="10"
      @edit="editRecordData"
      @add="visiblefun"
      @remove="removes">
      <template #banner_url="{ record }: { record: ArticleType }">
        <a-image :src="record.banner_url" height="50px"></a-image>
      </template>
      <template #data="{ record }: { record: ArticleType }">
        <div class="article_data_col">
          <span>
            <i class="fa fa-eye"></i>
            <span>{{ record.look_count }}</span>
          </span>
          <span>
            <i class="fa fa-comment-o"></i>
            <span>{{ record.comment_count }}</span>
          </span>
          <span>
            <i class="fa fa-star"></i>
            <span>{{ record.collects_count }}</span>
          </span>
          <span>
            <i class="fa fa-thumbs-o-up"></i>
            <span>{{ record.digg_count }}</span>
          </span>
        </div>
      </template>
      <template #tags="{ record }: { record: ArticleType }">
        <div class="article_tags_col">
          <a-tag v-for="item in record.tags" :color="colorList[Mock.Random.integer(0, 12)]">{{ item }}</a-tag>
        </div>
      </template>
      <template #title="{ record }: { record: ArticleType }">
        <div class="article_title" v-html="record.title"></div>
      </template>
      <template #action_middle="{ record }: { record: ArticleType }">
        <a-button type="outline" @click="editArticleCoenten(record)">编辑正文</a-button>
      </template>
    </Blog_table>
  </div>
</template>
<style lang="scss">
@mixin marginRight($width) {
  margin-right: $width;
  &:last-child {
    margin-right: 0;
  }
}

.article_list_view {
  .article_data_col {
    > span {
      cursor: pointer;
      color: var(color-text-2);
      @include marginRight(10px);

      i {
        margin-right: 10px;
      }
    }
  }

  .article_tags_col {
    .arco-tag {
      @include marginRight(5px);
    }
  }

  .article_title {
    strong {
      color: red;
    }
  }
}
</style>
