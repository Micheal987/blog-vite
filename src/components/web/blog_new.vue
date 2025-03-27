<script lang="ts" setup>
import { postNewsListApi, type NewsType } from '@/api/news/news_api'
import { reactive } from 'vue'

let data = reactive<NewsType>({
  index: 1,
  title: 'FEWEi博客系统发布了',
  hotValue: '118.5万',
  link: 'https://s.weibo.com/weibo?q=傅云夕女儿 亲生',
})
const listInfo = async () => {
  let res = await postNewsListApi({
    id: 'KqndgxeLl9',
    size: 1,
  })
  if (res.code) {
    return
  }
  Object.assign(data, res.data[0])
}
listInfo()
</script>
<template>
  <div class="blog_news">
    <span class="index">{{ data.index }}</span>
    <a class="title" :href="data.link" target="_blank">{{ data.title }}</a>
    <span class="hot">{{ data.hotValue }}</span>
  </div>
</template>
<style lang="scss">
.blog_news {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  .title {
    width: 80%;
    color: var(--active);
    text-decoration: none;
  }
}
</style>
