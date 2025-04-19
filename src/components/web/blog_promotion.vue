<script lang="ts" setup>
import { ref } from 'vue'
import { getAdvertListApi, type promotionType } from '@/api/promotion/promotion_api'
let data = ref<promotionType[]>([])
const promotionInfo = async () => {
  let res = await getAdvertListApi()
  data.value = res.data.list
  console.log(data.value[0])
}
promotionInfo()
</script>
<template>
  <div class="blog_promotion">
    <a-carousel>
      <a-carousel-item auto-play indicator-type="dot" show-arrow="hover" v-for="item in data">
        <a :href="item.href" target="_blank" class="link">
          <img src="http://114.66.57.40:8080/uploads/file/default_banner.png" :alt="item.title" />
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
