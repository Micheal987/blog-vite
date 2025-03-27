<script setup lang="ts">
import {
  getArticleCategory,
  getArticleListApi,
  type ArticleparamType,
  type ArticleType,
} from '@/api/article/article_api'
import type { ListDateType } from '@/api/axios'
import { getTagOptionsApi } from '@/api/tags/tag_api'
import Blog_nav from '@/components/web/blog_nav.vue'
import type { optionType } from '@/types'
import { dateFormat } from '@/utils/date'
import { reactive, ref } from 'vue'
import { IconClockCircle, IconEye } from '@arco-design/web-vue/es/icon'
import Blog_footer from '@/components/web/blog_footer.vue'
import { useStoreConfig } from '@/store'
const store = useStoreConfig()
type Sort =
  | 'look_count desc'
  | 'created_at desc'
  | 'comment_count desc'
  | 'collects_count desc'
  | 'digg_count desc'
  | ''
  | string
const params = reactive<ArticleparamType & { sort: Sort }>({
  sort: '',
  tags: '',
  category: '',
  limit: 8,
})
const sortOption = [
  { label: '综合排序', value: '' },
  { label: '最多浏览', value: 'look_count desc' },
  { label: '最新发布', value: 'created_at desc' },
  { label: '最多点赞', value: 'digg_count desc' },
  { label: '最多评论', value: 'comment_count desc' },
  { label: '最多收藏', value: 'collects_count desc' },
]
const categoryOptions = ref<optionType[]>([])
const tagOptions = ref<optionType[]>([])
const data = reactive<ListDateType<ArticleType>>({
  list: [],
  count: 0,
})
const checkKey = (key: 'tags' | 'sort' | 'category', record: optionType) => {
  params[key] = record.value as string
  listInfo()
}
const categoryOptionList = async () => {
  let res = await getArticleCategory()
  categoryOptions.value = [{ label: '默认全部分类', value: '' }, ...res.data]
}
const tagOptionList = async () => {
  let res = await getTagOptionsApi()
  tagOptions.value = [{ label: '默认全部标签', value: '' }, ...res.data]
}
tagOptionList()
categoryOptionList()
const listInfo = async () => {
  let res = await getArticleListApi(params)
  data.list = res.data.list
  data.count = res.data.count
}
listInfo()
</script>
<template>
  <div class="search_view">
    <Blog_nav no-scroll></Blog_nav>
    <main>
      <div class="continer">
        <div class="head">
          <div class="slogan">{{ store.siteInfo.slogan }}|搜索</div>
          <a-input class="search_ipt" v-model="params.key" @keydown.enter="listInfo" placeholder="搜索"></a-input>
          <a-button type="primary" @click="listInfo">搜索</a-button>
        </div>
        <div class="action">
          <div class="item">
            <span
              @click="checkKey('sort', item)"
              :class="{ active: params.sort == item.value }"
              v-for="item in sortOption">
              {{ item.label }}</span
            >
          </div>
          <div class="item">
            <span
              @click="checkKey('category', item)"
              :class="{ active: params.category == item.value }"
              v-for="item in categoryOptions">
              {{ item.label }}</span
            >
          </div>
          <div class="item">
            <span
              @click="checkKey('tags', item)"
              :class="{ active: params.tags == item.value }"
              v-for="item in tagOptions">
              {{ item.label }}</span
            >
          </div>
        </div>
        <div class="source">
          <template v-if="data.list.length">
            <div class="article_list">
              <div class="item" v-for="item in data.list">
                <div class="top">
                  <img :src="item.banner_url" alt="" />
                </div>
                <div class="bottom">
                  <div class="title">
                    <RouterLink :to="{ name: 'article', params: { id: item.ID } }" v-html="item.title"></RouterLink>
                  </div>
                  <div class="abstract">
                    <a-typography-paragraph
                      :ellipsis="{
                        rows: 2,
                        CSS: true,
                      }"
                      >{{ item.abstract }}</a-typography-paragraph
                    >
                  </div>
                  <div class="date">
                    <span v-if="params.sort === 'digg_count desc'">
                      <i class="fa fa-thumbs-o-up"></i>
                      {{ item.digg_count }}
                    </span>
                    <span v-else-if="params.sort === 'comment_count desc'">
                      <i class="fa fa-comments"></i>
                      {{ item.comment_count }}
                    </span>
                    <span v-else-if="params.sort === 'collects_count desc'">
                      <i class="fa fa-star-o"></i>
                      {{ item.collects_count }}
                    </span>
                    <span v-else>
                      <IconEye></IconEye>
                      {{ item.look_count }}
                    </span>
                    <span><IconClockCircle></IconClockCircle>{{ dateFormat(item.created_at) }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="page">
              <a-pagination
                show-total
                v-model:current="params.page"
                :total="data.count"
                @change="listInfo"></a-pagination>
            </div>
          </template>
          <a-empty v-else class="empty"></a-empty>
        </div>
      </div>
    </main>
    <Blog_footer></Blog_footer>
  </div>
</template>
<style lang="scss">
.search_view {
  min-height: 100vh;
  main {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 80px;
    color: var(--color-text-2);
    .continer {
      width: var(--containter_width);
      .head {
        display: flex;
        justify-content: center;
        align-items: center;
        .slogan {
          font-size: 18px;
        }
        .search_ipt {
          width: 400px;
          margin: 0 20px;
        }
      }
      .action {
        margin-top: 40px;
        .item {
          margin-bottom: 25px;
          span {
            margin-right: 20px;
            padding: 5px 10px;
            border-radius: 10px;
            cursor: pointer;
            &.active {
              background-color: var(--active);
              color: white;
            }
          }
        }
      }
      .source {
        margin-top: 20px;
        margin-bottom: 20px;
        min-height: calc(100vh - 500px);
        .article_list {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px 30px;
          .item {
            width: 100%;
            border-radius: 5px;
            overflow: hidden;
            color: var(--color-text-2);
            .top {
              height: 120px;
              width: 100%;
              img {
                width: 100%;
                height: 100px;
                object-fit: cover;
              }
            }
            .bottom {
              padding: 20px;
              background-color: var(--color-fill-1);
              .title {
                font-size: 16px;
                font-weight: 600px;
                em {
                  color: rgb(230, 107, 107);
                }
              }
              .abstract {
                margin: 10px 0;
                .arco-typography {
                  margin-bottom: 0;
                  color: var(--color-text-2);
                }
              }
              .date {
                display: flex;
                justify-content: space-between;
              }
              a {
                color: var(--color-text-1);
                text-decoration: none;
              }
            }
          }
        }
        .page {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .empty {
          width: 100%;
          min-height: calc(100vh - 500px);
          background-color: var(--color-bg-1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
