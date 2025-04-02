<script lang="ts" setup>
import {
  getArticleDetailApi,
  psotArticleColleApi,
  psotArticleDiggApi,
  type ArticleType,
} from '@/api/article/article_api'
import Blog_comment from '@/components/common/blog_comment.vue'
import Blog_user_info_preview from '@/components/common/blog_user_info_preview.vue'
import Blog_banner from '@/components/web/blog_banner.vue'
import Blog_footer from '@/components/web/blog_footer.vue'
import Blog_nav from '@/components/web/blog_nav.vue'
import { useStoreConfig } from '@/store'
import { dateFormat } from '@/utils/date'
import { onUnmounted, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { MdPreview, MdCatalog } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
import { articleTagcolorList } from '@/global'
import Blog_title from '@/components/common/blog_title.vue'
import { IconThumbUpFill, IconStarFill, IconDoubleUp, IconMessage } from '@arco-design/web-vue/es/icon'
import { Message } from '@arco-design/web-vue'
import { showLogin } from '@/components/common/blog_login'
const store = useStoreConfig()
const route = useRoute()
let isFixed = ref(false)
let top = ref(977 - 70)
const isShowMd = ref(false)
const scrollElement = document.documentElement
let id = ref(route.params.id as string)
let data = reactive<ArticleType>({
  ID: '',
  created_at: '',
  updated_at: '',
  title: '',
  keyword: '',
  abstract: '',
  content: '',
  look_count: 0,
  comment_count: 0,
  digg_count: 0,
  collects_count: 0,
  user_id: 0,
  user_nick_name: '',
  user_avatar: '',
  category: '',
  source: '',
  link: '',
  banner_id: 0,
  banner_url: '',
  tags: [],
  is_collect: false,
  is_digg: false,
})
const listInfo = async () => {
  isShowMd.value = false
  let res = await getArticleDetailApi(id.value)
  Object.assign(data, res.data)
  isShowMd.value = true
}
const userInfo = {
  avatar: data.user_avatar,
  nickName: data.user_nick_name,
  sign: '欢迎来的我的主页',
  link: 'xxxx',
  look_count: data.look_count,
  comment_count: data.comment_count,
  digg_count: data.digg_count,
  collects_count: data.collects_count,
}
const banners = {
  abstract: data.abstract,
  banners: data.banner_url,
  slogan: data.title,
}
const scroll = () => {
  if ((document.documentElement.scrollTop as number) >= top.value) {
    isFixed.value = true
  } else {
    isFixed.value = false
  }
}
onMounted(() => {
  let hash = route.hash
  if (hash !== '') {
    let dom = document.querySelector(hash)
    if (dom) {
      setTimeout(() => {
        let top = dom.getBoundingClientRect().top
        document.documentElement.scrollTo({
          top: top - 60,
          behavior: 'smooth',
        })
      }, 200)
    }
  }
})
window.addEventListener('scroll', scroll)
onUnmounted(() => {
  window.removeEventListener('scroll', scroll)
})
const goTop = () => {
  document.documentElement.scrollTo({
    top: 700 - 60,
    behavior: 'smooth',
  })
}
const blogCommentRef = ref()
const goComment = () => {
  let box = document.querySelector('.add_comment') as HTMLElement
  if (!box) return
  let top = box.offsetHeight
  document.documentElement.scrollTo({
    top: top - 60,
    behavior: 'smooth',
  })
  setTimeout(() => {
    blogCommentRef.value.focus()
  }, 500)
}
//点赞最简单
const articleDigg = async () => {
  let res = await psotArticleDiggApi(id.value)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  data.digg_count++
  data.is_digg = true
  setTimeout(() => {
    data.is_digg = false
  }, 2000)
}
//收藏
const articleCollect = async () => {
  if (!store.isLogin()) {
    Message.warning('请登录')
    showLogin()
    return
  }
  let res = await psotArticleColleApi(id.value)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  data.is_collect = !data.is_collect
  if (!data.is_collect) {
    data.collects_count--
  } else {
    data.collects_count++
  }
  Message.success(res.msg)
}
watch(
  () => route.params,
  () => {
    id.value = route.params.id as string
    listInfo()
  },
  { immediate: true, deep: true },
)
</script>
<template>
  <div class="article_views">
    <Blog_nav></Blog_nav>
    <Blog_banner :data="banners"></Blog_banner>
    <main>
      <div class="containter">
        <div class="article_containter">
          <div class="head">
            <div class="title" :id="data.title">{{ data.title }}</div>
            <div class="date">发布的时间:{{ dateFormat(data.created_at) }}</div>
            <div class="tag">
              <a-tag :color="articleTagcolorList[index]" v-for="(item, index) in data.tags">{{ item }}</a-tag>
            </div>
          </div>
          <article>
            {{ data.content }}
            <MdPreview :editor-id="id" v-model="data.content" :theme="store.themeString()"></MdPreview>
          </article>
          <div class="next_pre">
            <div class="pre">上一篇: <a href="">xxx</a></div>
            <div class="next">下一篇: <a href="">xxx</a></div>
          </div>
          <Blog_comment ref="blogCommentRef" :article-id="id as string"></Blog_comment>
        </div>
        <aside>
          <Blog_user_info_preview :data="userInfo" class="blog_user_info_preview"></Blog_user_info_preview>
          <div :class="{ article_actionts: true, isFixed: isFixed }">
            <Blog_title title="文章目录" class="blog_article_dict">
              <MdCatalog
                v-if="isShowMd"
                :scroll-element="scrollElement"
                :theme="store.themeString()"
                :offset-top="80"
                :scroll-element-offset-top="80"
                :editor-id="id"></MdCatalog>
            </Blog_title>
          </div>
          <div class="blog_article_action">
            <IconThumbUpFill :class="{ active: data.is_digg }" @click="articleDigg"></IconThumbUpFill>
            <IconStarFill :class="{ active: data.is_collect }" @click="articleCollect"></IconStarFill>
            <IconDoubleUp @click="goTop"></IconDoubleUp>
            <IconMessage @click="goComment"></IconMessage>
          </div>
        </aside>
      </div>
    </main>
    <Blog_footer />
  </div>
</template>
<style lang="scss">
.article_views {
  main {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: var(--bg);
    padding-top: 20px;
    padding-bottom: 20px;
    .containter {
      display: flex;
      justify-content: space-between;
      width: var(--containter_width);
      .article_containter {
        width: calc(100% - 320px);
        .head {
          border-radius: 5px 5px 0 0;
          margin-bottom: 1px;
          background-color: var(--color-bg-1);
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          .title {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 20px;
          }
          .date {
            margin-bottom: 10px;
            color: var(--color-text-2);
          }
          .tag {
            .arco-tag {
              margin-right: 10px;
              &:last-child {
                margin-right: 0;
              }
            }
          }
        }
        .next_pre {
          background-color: var(--color-bg-1);
          border-radius: 0 0 5px 5px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px;
          margin-top: 1px;
          margin-bottom: 20px;
          a {
            text-decoration: none;
          }
        }
      }
      aside {
        width: 300px;
        .blog_user_info_preview {
          margin-bottom: 20px;
        }
        .blog_article_dict {
          margin-top: 20px;
          .body {
            max-height: calc(100vh - 400px);
            overflow: auto;
          }
        }
        .article_actionts {
          margin-top: 20px;
          position: relative;
          &.isFixed {
            position: fixed;
            top: 80px;
            width: 300px;
          }
        }
        .blog_article_action {
          margin-top: 20px;
          background-color: var(--color-bg-1);
          border-radius: 10px;
          height: 50px;
          display: flex;
          align-items: center;
          > svg {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            color: var(--color-text-1);
            cursor: pointer;

            &:hover {
              color: var(--active);
            }

            &.active {
              color: var(--active);
            }
          }
        }
      }
    }
  }
}
</style>
