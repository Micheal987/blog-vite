<script setup lang="ts">
import Blog_card from '@/components/common/blog_card.vue'
import Blog_banner from '@/components/web/blog_banner.vue'
import Blog_footer from '@/components/web/blog_footer.vue'
import Blog_nav from '@/components/web/blog_nav.vue'
import Blog_new from '@/components/web/blog_new.vue'
import Blog_promotion from '@/components/web/blog_promotion.vue'
import Blog_user_card from '@/components/web/blog_user_card.vue'
import { IconDoubleRight } from '@arco-design/web-vue/es/icon'
import Blog_fedd_back from '@/components/web/blog_feed_back.vue'
import Article_calendar from '@/components/charts/article_calendar.vue'
import Blog_article_list from '@/components/web/blog_article_list.vue'
import { ref } from 'vue'
import Blog_tags from '@/components/web/blog_tags.vue'
const blogArticleList = ref()
let key = ref('')
const search = () => {
  blogArticleList.value.listInfo({ key: key.value })
}
</script>
<template>
  <div class="index_view">
    <Blog_nav></Blog_nav>
    <Blog_banner></Blog_banner>
    <main>
      <div class="container">
        <div class="left">
          <Blog_card title="今日热搜">
            <template #head-right>
              <RouterLink :to="{ name: 'news' }"
                >更多
                <IconDoubleRight />
              </RouterLink>
            </template>
            <Blog_new />
          </Blog_card>
          <Blog_card title="文章日历">
            <Article_calendar></Article_calendar>
          </Blog_card>
          <Blog_card title="文章列表" class="article_card">
            <template #head-right>
              <a-input-search v-model="key" @search="search" @keydown.enter="search" placeholder="搜索"></a-input-search
            ></template>
            <Blog_article_list ref="blogArticleList" />
          </Blog_card>
        </div>
        <div class="right">
          <Blog_card title="独家推广">
            <Blog_promotion />
          </Blog_card>
          <Blog_card title="标签">
            <Blog_tags />
          </Blog_card>
          <Blog_card title="个人名片">
            <Blog_user_card />
          </Blog_card>
          <Blog_card title="意见反馈">
            <Blog_fedd_back />
          </Blog_card>
        </div>
      </div>
    </main>
    <Blog_footer />
  </div>
</template>
<style lang="scss">
.index_view {
  height: 200vh;
  main {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--bg);
    .container {
      width: var(--containter_width);
      padding: 5px;
      display: flex;
      justify-content: space-between;
      > .left {
        width: calc(100% - 400px);
        .article_card {
          background: none;
          .head {
            background-color: var(--color-bg-1);
          }
        }
      }
      > .right {
        width: 380px;
      }
      .blog_card {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
