<script lang="ts" setup>
import { getArticleDetailApi, type ArticleType } from '@/api/article/article_api'
import Blog_comment from '@/components/common/blog_comment.vue'
import Blog_user_info_preview from '@/components/common/blog_user_info_preview.vue'
import Blog_banner from '@/components/web/blog_banner.vue'
import Blog_footer from '@/components/web/blog_footer.vue'
import Blog_nav from '@/components/web/blog_nav.vue'
import { useStoreConfig } from '@/store'
import { dateFormat } from '@/utils/date'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
import { articleTagcolorList } from '@/global'
const store = useStoreConfig()
const route = useRoute()
const id = route.params.id
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
})
const listInfo = async () => {
  let res = await getArticleDetailApi(id as string)
  Object.assign(data, res.data)
}
listInfo()
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
</script>
<template>
  <div class="article_views">
    <Blog_nav></Blog_nav>
    <Blog_banner :data="banners"></Blog_banner>
    <main>
      <div class="containter">
        <div class="article_containter">
          <div class="head">
            <div class="title">{{ data.title }}</div>
            <div class="date">发布的时间:{{ dateFormat(data.created_at) }}</div>
            <div class="tag">
              <a-tag :color="articleTagcolorList[index]" v-for="(item, index) in data.tags">{{ item }}</a-tag>
            </div>
          </div>
          <article>
            {{ data.content }}
            <MdPreview v-model="data.content" :theme="store.themeString()"></MdPreview>
          </article>
          <div class="next_pre">
            <div class="pre">上一篇: <a href="">xxx</a></div>
            <div class="next">下一篇: <a href="">xxx</a></div>
          </div>
          <Blog_comment :article-id="id as string"></Blog_comment>
        </div>
        <aside>
          <Blog_user_info_preview :data="userInfo"></Blog_user_info_preview>
          <div class="blog_article_dict"></div>
          <div class="blog_article_action"></div>
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
      }
    }
  }
}
</style>
