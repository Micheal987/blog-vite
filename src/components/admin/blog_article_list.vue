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
import type { PageParamType } from '@/api/axios'
import { articleTagcolorList } from '@/global/index'
//props
interface Props {
  isUser?: boolean
}
const props = defineProps<Props>()
const { isUser = false } = props

//params
//判断是否是我发布的
const params = reactive<PageParamType & { is_user: boolean }>({
  is_user: isUser,
})
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

//filter操作组
//文章分类
//文章标签
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

//recordData
const recordData = reactive<ArticleUpdateType>({
  title: '',
  abstract: '',
  content: '',
  category: '',
  source: '',
  link: '',
  banner_id: 0,
  tags: [],
  ID: '',
})

const blogTableRef = ref() //父组件 ref
const updateVisible = ref(false) //更新 Blog_article_update的modal
const createVisible = ref(false) //编辑页面 的modal
const articleConentenVisible = ref(false) // 编辑正文的
const articleUpdateId = ref<string | undefined>(undefined) //文章id

//编辑正文
const editArticleCoenten = (record: ArticleType) => {
  articleConentenVisible.value = true
  articleUpdateId.value = record.ID
}
//emits 调用父组的infoList
const infoList = () => {
  blogTableRef.value.infoList()
}
//emits--edit
const editRecordData = (record: ArticleType) => {
  updateVisible.value = true
  recordData.title = record.title
  recordData.abstract = record.abstract
  recordData.content = record.content
  recordData.category = record.category
  recordData.source = record.source
  recordData.link = record.link
  recordData.banner_id = record.banner_id
  recordData.tags = record.tags
  recordData.ID = record.ID
  recordData.banner_url = record.banner_url
}
//emit--update事件
const visibleUpdate = (val: boolean) => {
  updateVisible.value = val
}

//删除
//emit 传idList的
const removes = (idList: number[]) => {
  console.log(idList)
  //删除操作
}

//emit-add
const add = (val: boolean) => {
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
    <!-- Blog_table -->
    <Blog_table
      :url="getArticleListApi"
      :columns="columns as any"
      label-name="发布文章"
      ref="blogTableRef"
      search-placeholder="搜索文章名称"
      no-confirm
      :filter-group="filterGroup"
      default-del
      :limit="10"
      :default-params="params"
      @edit="editRecordData"
      @add="add"
      @remove="removes">
      <template #banner_url="{ record }: { record: ArticleType }">
        <a-image :src="record.banner_url" height="50px"></a-image>
      </template>
      <!-- data图标 -->
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
      <!-- tags -->
      <template #tags="{ record }: { record: ArticleType }">
        <div class="article_tags_col">
          <a-tag v-for="item in record.tags" :color="articleTagcolorList[Mock.Random.integer(0, 12)]">{{ item }}</a-tag>
        </div>
      </template>
      <!-- title -->
      <template #title="{ record }: { record: ArticleType }">
        <div class="article_title" v-html="record.title"></div>
      </template>
      <!-- action_middle -->
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
    em {
      color: red;
    }
  }
}
</style>
