<script lang="ts" setup>
import { getMenuDetailPatheApi, type MenuType } from '@/api/menu/menu_api'
import { reactive, ref, unref, watch } from 'vue'
import { useRoute } from 'vue-router'
import VueTyped from 'vue3typed/libs/typed/index.vue'
import { Typewriter } from 'vue-element-plus-x'
import type { TypewriterInstance } from 'vue-element-plus-x/types/components/Typewriter/types'

const route = useRoute()
const data = reactive<MenuType>({
  id: 0,
  created_at: '',
  title: '',
  path: '',
  slogan: '',
  abstract: [],
  abstract_time: 0,
  banner_time: 0,
  sort: 0,
  banners: [],
})
let currentPath = route.path
const listInfo = async () => {
  let key = `menus_${currentPath}`
  let val = sessionStorage.getItem(key)
  if (val != null) {
    try {
      let jsonData = JSON.parse(val)
      Object.assign(data, jsonData)
      return
    } catch (e) {
      sessionStorage.removeItem(key)
    }
  }
  let res = await getMenuDetailPatheApi(currentPath)
  console.log('res', res.data)
  Object.assign(data, res.data)
  sessionStorage.setItem(key, JSON.stringify(data))
}
listInfo()
// 开始打字的监听方法
const isTypingValue = ref(false)
const progressValue = ref(0)
const typerRef = ref()
function onStart(instance: TypewriterInstance) {
  console.log('开始打字：组件 ref 实例', unref(instance))
  isTypingValue.value = true
}
// 打字中，进度监听方法
function onWriting(instance: TypewriterInstance) {
  const progress: number = instance.progress.value
  // 避免打印打多次 onWriting 事件 😂
  if (progress > 90 && progress < 100) {
    // 可以直接获取打字进度，可以根据打字进度，设置更炫酷的样式
    // console.log('Writing', `${progress}%`)
    console.log('打字中 isTyping:', instance.isTyping.value, 'progress:', progress)
  }

  if (~~progress === 80) {
    console.log('打字中 progress 为 80% 时候的内容', instance.renderedContent.value)
  }
  isTypingValue.value = true
  progressValue.value = ~~progress // 通过运算符~~取整 💩
}
// 监听打字结束事件
function onFinish(instance: TypewriterInstance) {
  isTypingValue.value = false
  console.log('打字结束 isTyping', instance.isTyping.value, 'progress:', instance.progress.value)
}
// 组件实例方法，控制 暂停打字
function onInterrupt() {
  typerRef.value.restart()
  isTypingValue.value = false
}
function onDestroy() {
  typerRef.value.destroy()
  isTypingValue.value = false
  progressValue.value = 0
}
watch(
  () => currentPath,
  () => {
    listInfo()
  },
  { immediate: true },
)
</script>
<template>
  <div class="blog_banner">
    <div class="head">
      {{ data.abstract }}
      <div class="slogan">{{ data.slogan }}</div>
      <div class="abstract">
        <button @click="onInterrupt">1</button>
        <button @click="onDestroy">2</button>
        <Typewriter
          ref="typerRef"
          :content="data.abstract[0]"
          :typing="{ suffix: '💩', interval: 40 }"
          :is-markdown="true"
          restart
          @start="onStart"
          @writing="onWriting"
          @finish="onFinish" />
        <VueTyped :strings="data.abstract" :loop="true" :startDelay="300" :typeSpeed="100" :backSpeed="50">
          <span class="typing"></span>
        </VueTyped>
      </div>
    </div>
    <a-carousel :auto-play="{ interval: data.banner_time * 1000 }" indicator-type="dot" show-arrow="hover">
      <a-carousel-item v-for="image in data.banners">
        {{ image.path }}
        <img class="banner_image" :src="'http://127.0.0.1:8000/uploads/file/螢幕擷取畫面 2024-12-08 134903.png'" />
      </a-carousel-item>
    </a-carousel>
  </div>
</template>
<style lang="scss">
.blog_banner {
  width: 100%;
  height: 700px;
  position: relative;
  .head {
    position: absolute;
    left: 50%;
    top: 50%;
    color: white;
    transform: translate(-50%, -50%);
    z-index: 2;
    .slogan {
      font-size: 30px;
      text-align: center;
    }
    .abstract {
      font-size: 20px;
      margin-top: 10px;
      text-align: center;
    }
  }
  .arco-carousel {
    height: 100%;
    .banner_image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
