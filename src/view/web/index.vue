<script setup lang="ts">
import Blog_card from '@/components/common/blog_card.vue'
import Blog_banner from '@/components/web/blog_banner.vue'
import Blog_footer from '@/components/web/blog_footer.vue'
import Blog_nav from '@/components/web/blog_nav.vue'
import { IconDoubleRight } from '@arco-design/web-vue/es/icon'
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
          </Blog_card>
          <Blog_card title="文章日历"></Blog_card>
          <Blog_card title="文章列表">
            <template #head-right> <a-input-search placeholder="搜索"></a-input-search></template>
          </Blog_card>
        </div>
        <div class="right">
          <Blog_card title="独家推广"></Blog_card>
          <Blog_card title="标签"></Blog_card>
          <Blog_card title="个人名片"></Blog_card>
          <Blog_card title="意见反馈"></Blog_card>
        </div>
      </div>
    </main>
    <Blog_footer />
  </div>
</template>
<style lang="scss">
.index_view {
  background-color: #302f2f;
  height: 200vh;
  main {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .container {
      width: var(--containter_width);
      display: flex;
      justify-content: space-between;
      > .left {
        width: calc(100% - 400px);
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
