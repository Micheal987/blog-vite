<script lang="ts" setup>
import { IconClose } from '@arco-design/web-vue/es/icon'
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { tabsType } from '@/types'
const route = useRoute()
const router = useRouter()

const tabList = ref<tabsType[]>([{ name: 'home', title: '首页' }])
const clickTab = (item: tabsType) => {
  router.push({
    name: item.name,
  })
}
const isName = (name: string): boolean => {
  let count = tabList.value.filter((item) => {
    return item.name === name
  })
  if (count.length > 0) {
    return true
  }
  return false
}
//持久化
const persistence = () => {
  localStorage.setItem('tablist', JSON.stringify(tabList.value))
}
//持久化
//取出本地缓存
const loadTab = () => {
  let value = localStorage.getItem('tablist')
  if (value == null) {
    return
  }
  let tabs = []
  try {
    tabs = JSON.parse(value)
  } catch (err) {
    return
  }
  tabList.value = tabs
}
//持久化
loadTab()
watch(
  () => tabList.value.length,
  () => {
    persistence()
  },
)
//计算最大宽度
let slidesPerView = ref(2)
onMounted(() => {
  //总宽度
  let widthCount = (document.querySelector('.mySwiper') as Element)?.clientWidth
  //实际宽度
  let actualWidth = (document.querySelector('swiper-wrapper') as Element)?.scrollWidth
  if (widthCount < actualWidth) {
    return
  }
  let allMySwiper = document.querySelectorAll('.swiper-wrapper .swiper-slide') //总个数
  let sum = 0 //计算什么时候大于实际宽度
  let count = 0 //swiper 的总个数
  for (const slider of allMySwiper) {
    sum += slider.clientWidth
    if (sum > widthCount) {
      break
    }
    count++
  }
  slidesPerView.value = count
})
//关闭单个的
const closeTab = (item: tabsType) => {
  //首页不能关闭
  if (item.name == 'home') {
    return
  }
  let index = tabList.value.findIndex((tab) => item.name == tab.name)
  //删除
  tabList.value.splice(index, 1)
  //等于当前路由返回上一级的路由
  if (route.name == item.name) {
    let beforeIndex = index - 1
    let beforeItem = tabList.value[beforeIndex]
    clickTab(beforeItem)
  }
}
//关闭全部
const closetabAll = () => {
  tabList.value = [{ name: 'home', title: '首页' }]
  router.push({ name: 'home' })
}
watch(
  () => route.name,
  () => {
    if (!isName(route.name as string)) {
      //表示路由不存在,将当前路由push上去
      tabList.value.push({
        name: route.name as string,
        title: route.meta.title as string,
      })
    }
  },
  { immediate: true },
)
</script>
<template>
  <div class="blog_tabs">
    <swiper :slides-per-view="slidesPerView" class="mySwiper">
      <swiper-slide v-for="item in tabList" :key="item.name">
        <span
          :class="{ blog_tab: true, active: route.name === item.name }"
          @click="clickTab(item)"
          @click.middle="closeTab(item)">
          {{ item.title }}
          <IconClose v-if="item.name !== 'home'" @click.stop="closeTab(item)"></IconClose>
        </span>
      </swiper-slide>
    </swiper>
    <span class="blog_tab_all"
      >全部关闭
      <IconClose @click="closetabAll"></IconClose>
    </span>
  </div>
</template>
<style lang="scss">
.blog_tabs {
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--bg);
  .mySwiper {
    width: calc(100% - 94px);
    overflow: hidden;
    white-space: nowrap;
    height: 100%;
    display: flex;
    align-items: center;
    .swiper-wrapper {
      display: flex;
      justify-content: start;
      width: 100%;

      .swiper-slide {
        width: auto !important;
      }
    }
  }
  .blog_tab {
    line-height: 25px;
    margin: 0 5px;
    border-radius: 5px;
    border: 1px solid var(--bg);
    padding: 5px 10px;
    cursor: pointer;
    position: relative;

    &.active {
      background-color: var(--active);
      color: white;
      border: none;

      svg:hover {
        background-color: rgb(var(--arcoblue-2));
      }
    }

    svg {
      font-size: 16px;
      border-radius: 10px;

      &:hover {
        background-color: var(--bg);
      }
    }
  }

  .blog_tab_all {
    line-height: 25px;
    border-radius: 5px;
    border: 1px solid var(--bg);
    padding: 5px 10px;
    cursor: pointer;
    position: absolute;
    right: 20px;
  }
}
</style>
