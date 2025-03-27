<script setup lang="ts">
import Blog_nav from '@/components/web/blog_nav.vue'
import Blog_banner from '@/components/web/blog_banner.vue'
import Blog_footer from '@/components/web/blog_footer.vue'
import { computed, reactive, ref } from 'vue'
import { postNewsListApi, type NewsQuequest, type NewsType } from '@/api/news/news_api'
interface NewsAsideType {
  id: string
  name: string
  font: string
}
const newList = ref<NewsType[]>([])
const newsAside: NewsAsideType[] = [
  {
    id: 'KqndgxeLl9',
    name: '微博',
    font: '/image/icon/weibo.png',
  },
  {
    id: 'mproPpoq6O',
    name: '知乎',
    font: '/image/icon/zhihu.png',
  },
  {
    id: 'Jb0vmloB1G',
    name: '微信',
    font: '/image/icon/weixin.png',
  },
]
const params = reactive<NewsQuequest>({
  id: 'KqndgxeLl9',
  size: 50,
})
const checkAside = (item: NewsAsideType) => {
  params.id = item.id
  listInfo()
}
const activeName = computed(() => {
  return newsAside.find((item) => params.id == item.id)?.name
})
const activeFont = computed(() => {
  return newsAside.find((item) => params.id == item.id)?.font
})

const listInfo = async () => {
  let res = await postNewsListApi(params)
  newList.value = res.data
}
listInfo()
</script>
<template>
  <div class="news_view">
    <Blog_nav no-scroll></Blog_nav>
    <Blog_banner></Blog_banner>
    <main>
      <div class="container">
        <div class="new_detail">
          <aside>
            <div
              :class="{ item: true, active: params.id === item.id }"
              @click="checkAside(item)"
              v-for="item in newsAside">
              <img :src="item.font" alt="" />
              <span class="name">{{ item.name }}</span>
            </div>
          </aside>
          <div class="content">
            <div class="head">
              <img :src="activeFont" alt="" />
              <span>{{ activeName }} - 热搜榜</span>
            </div>
            <div class="body">
              <div class="item" v-for="item in newList">
                <span class="index">{{ item.index }}</span>
                <span class="title">
                  <a :href="item.link" target="_blank">
                    {{ item.title }}
                  </a>
                </span>
                <span class="hot_val">{{ item.hotValue }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="link">
          <a href="http://" target="_blank" rel="noopener noreferrer">灵感来源于Itab</a>
        </div>
      </div>
    </main>
    <Blog_footer></Blog_footer>
  </div>
</template>
<style lang="scss">
.news_view {
  main {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    .container {
      width: var(--containter_width);
      display: flex;
      flex-direction: column;
      align-items: center;
      .new_detail {
        width: 100%;
        padding: 20px;
        background-color: var(--color-bg-1);
        border-radius: 5px;
        margin-bottom: 20px;
        display: flex;
        aside {
          width: 240px;
          border-right: 1px solid var(--bg);
          padding: 20px 0;
          .item {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 40px;
            color: var(--color-text-2);
            cursor: pointer;
            transition: all 0.3s;
            &:hover {
              background-color: var(--active);
              color: white;
            }
            &.active {
              background-color: var(--active);
              color: white;
            }
            img {
              width: 30px;
              height: 30px;
              border-radius: 5px;
            }
            span {
              margin-left: 10px;
            }
          }
        }
        .content {
          width: calc(100% - 240px);
          .head {
            display: flex;
            align-items: center;
            height: 60px;
            border-bottom: 1px solid var(--bg);
            padding: 0 20px;
            img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }
            span {
              font-size: 18px;
              margin-left: 10px;
            }
          }
          .body {
            padding: 20px;
            .item {
              display: flex;
              justify-content: space-between;
              color: var(--color-text-2);
              margin-bottom: 20px;
              align-items: center;
              .index {
                background-color: var(--color-fill-2);
                width: 20px;
                height: 20px;
                border-radius: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                &:nth-child(1) {
                  color: red;
                }
                &:nth-child(2) {
                  color: blueviolet;
                }
                &:nth-child(3) {
                  color: green;
                }
              }
              .title {
                width: 90%;
                a {
                  color: var(--color-text-2);
                }
              }
              .hot_bval {
                white-space: nowrap;
              }
            }
          }
        }
      }
    }
  }
}
</style>
