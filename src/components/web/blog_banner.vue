<script lang="ts" setup>
import { getMenuDetailPatheApi, type BannerType } from '@/api/menu/menu_api'
import { reactive, watch } from 'vue'
import VueTyped from 'vue3typed/libs/typed/index.vue'
interface BlogBannerType {
  abstract: string | string[]
  banner_time?: number
  banners: string | BannerType[]
  slogan: string
}
interface Props {
  data?: BlogBannerType
}
const props = defineProps<Props>()
const data = reactive<BlogBannerType>({
  slogan: '',
  abstract: [],
  banner_time: 0,
  banners: [],
})
const listInfo = async () => {
  if (props.data) {
    if (typeof props.data.banners === 'string') {
      data.banners = [{ id: 1, path: props.data.banners }]
    }
    data.abstract = props.data.abstract
    data.banner_time = props.data.banner_time
    data.slogan = props.data.slogan
    return
  }
  let key = `menus_${location.pathname}`
  let val = sessionStorage.getItem(key)
  if (val != null) {
    try {
      let jsonData = JSON.parse(val) as BlogBannerType
      data.banners = jsonData.banners
      data.slogan = jsonData.slogan
      data.abstract = jsonData.abstract
      data.banner_time = jsonData.banner_time
      return
    } catch (e) {
      sessionStorage.removeItem(key)
    }
  }
  let res = await getMenuDetailPatheApi(location.pathname)
  Object.assign(data, res.data)
  data.banners = res.data.banners
  data.slogan = res.data.slogan
  data.abstract = res.data.abstract
  data.banner_time = res.data.banner_time
  sessionStorage.setItem(key, JSON.stringify(data))
}
watch(
  () => props.data,
  () => {
    listInfo()
  },
  { immediate: true },
)
</script>
<template>
  <div class="blog_banner">
    <div class="head">
      <div class="slogan">{{ data.slogan }}</div>
      <div class="abstract">
        <template v-if="typeof data.abstract === 'object'">
          <VueTyped :strings="data.abstract" :loop="true" :startDelay="300" :typeSpeed="100" :backSpeed="50">
            <span class="typing"></span>
          </VueTyped>
        </template>
        <template v-else>{{ data.abstract }} </template>
      </div>
    </div>
    <a-carousel auto-play indicator-type="dot" show-arrow="hover">
      <a-carousel-item v-for="image in data.banners">
        <img class="banner_image" src="/image/default_banner.png" />
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
