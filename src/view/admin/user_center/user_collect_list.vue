<script lang="ts" setup>
import Blog_table from '@/components/admin/blog_table.vue'
import { reactive, ref } from 'vue'
import type { filterOptionType } from '@/components/admin/blog_table.vue'
import { getArticleCollectApi, type ArticleType, getArticleCategory } from '@/api/article/article_api'
import Mock from 'mockjs'
import { getTagOptionsApi } from '@/api/tags/tag_api'
import type { PageParamType } from '@/api/axios'
//props
interface Props {
  isUser?: boolean
}
const props = defineProps<Props>()
const { isUser = false } = props

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
  { title: '更新时间', dataIndex: 'created_at' },
  { title: '操作', slotName: 'action' },
]

//filter操作组
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

const blogTableRef = ref() //父组件 ref

//删除
//emit 传idList的
const removes = (idList: number[]) => {
  console.log('数组id', idList)
  //删除操作
}
//颜色
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
</script>
<template>
  <div class="article_list_view">
    <Blog_table
      :url="getArticleCollectApi"
      :columns="columns as any"
      label-name="发布文章"
      ref="blogTableRef"
      search-placeholder="搜索文章名称"
      no-confirm
      :filter-group="filterGroup"
      no-add
      no-edit
      default-del
      :limit="10"
      :default-params="params"
      @remove="removes">
      <template #banner_url="{ record }: { record: ArticleType }">
        <a-image :src="'http://127.0.0.1:8000/' + record.banner_url" height="50px"></a-image>
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
          <a-tag v-for="item in record.tags" :color="colorList[Mock.Random.integer(0, 12)]">{{ item }}</a-tag>
        </div>
      </template>
      <!-- title -->
      <template #title="{ record }: { record: ArticleType }">
        <div class="article_title" v-html="record.title"></div>
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
