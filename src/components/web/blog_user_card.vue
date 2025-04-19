<script lang="ts" setup>
import { getSiteInfoApi } from '@/api/setting/setting_api'
import { useStoreConfig } from '@/store'
const store = useStoreConfig()
hd()
async function hd() {
  let res = await getSiteInfoApi()
  console.log(res)
  //siteInfo = res.data
}
</script>
<template>
  <div class="blog_user_card">
    <div class="title">
      <i class="fa fa-quote-left"></i>
      <i class="fa fa-quote-right"></i>
      -全新一代博客-
    </div>
    <div class="info">
      <div class="item">
        <span>NAME</span>
        <span>{{ store.siteInfo.name }}</span>
      </div>
      <div class="item">
        <span>JOB</span>
        <span>{{ store.siteInfo.job }}</span>
      </div>
      <div class="item">
        <span>ADDR</span>
        <span>{{ store.siteInfo.addr }}</span>
      </div>
      <div class="item">
        <span>WEB</span>
        <span
          ><a :href="store.siteInfo.web" target="_blank">{{ store.siteInfo.web }}</a></span
        >
      </div>
    </div>
    <div class="image">
      <div class="qq">
        <a-image :src="store.siteInfo.wechat_image"></a-image>
        <span>微信</span>
      </div>
      <div class="wechat">
        <a-image :src="store.siteInfo.qq_image"></a-image>
        <span>qq</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.blog_user_card {
  color: var(--color-text-2);
  padding: 20px;
  .title {
    background-color: var(--color-fill-2);
    border-radius: 5px;
    margin-bottom: 20px;
    text-align: center;
    color: var(--color-text-1);
    padding: 40px 0;
    position: relative;
    i {
      color: var(--color-text-4);
    }
    i:nth-child(1) {
      position: absolute;
      top: 10px;
      left: 10px;
    }
    i:nth-child(2) {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
  }
  .info {
    .item {
      margin-bottom: 10px;
      padding-left: 5px;
      > span:nth-child(1) {
        margin-right: 5px;
        color: var(--color-text-1);
        font-weight: 600;
      }
    }
  }
  .image {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 80px;
        height: 80px;
        object-fit: contain;
      }
      span {
        margin-top: 5px;
      }
    }
  }
}
</style>
