<script lang="ts" setup>
import { getMenuDetailPatheApi, type MenuType } from '@/api/menu/menu_api'
import { reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import VueTyped from 'vue3typed/libs/typed/index.vue'
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
