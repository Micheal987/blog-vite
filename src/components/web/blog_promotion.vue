<script lang="ts" setup>
import { reactive } from 'vue'
import { getAdvertListApi, type promotionType } from '@/api/promotion/promotion_api'
let data = reactive<promotionType[]>([])
const promotionInfo = async () => {
  let res = await getAdvertListApi()
  data = res.data.list
}
promotionInfo()
</script>
<template>
  <div class="blog_promotion">
    <a-carousel>
      <a-carousel-item auto-play indicator-type="dot" show-arrow="hover" v-for="item in data">
        {{ 'xxx' + item.images }}
        <a :href="item.href" target="_blank" class="link">
          <img :src="item.images" :alt="item.title" />
        </a>
      </a-carousel-item>
    </a-carousel>
  </div>
</template>
<style lang="scss">
.blog_promotion {
  height: 200px;
  .arco-carousel {
    height: 100%;
    .link {
      width: 100%;
      height: 100%;
      display: block;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
