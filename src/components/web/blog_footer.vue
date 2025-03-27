<script lang="ts" setup>
import { dateFormat } from '@/utils/date'
import { useStoreConfig } from '@/store'
import { onUnmounted, ref } from 'vue'
const store = useStoreConfig()
let timer: number | undefined = undefined
let countDown = ref('')
const countDownFunc = () => {
  let date = store.siteInfo.created_at
  let oldTime = new Date(date).getTime()
  let nowTime = new Date().getTime()
  let _day = (nowTime - oldTime) / 1000 / (60 * 60 * 24)
  let day = ~~_day
  let hour = ~~((_day - day) * 24)
  let minute = ~~((_day - day - hour / 24) * 24 * 60)
  let second = ~~((_day - day - hour / 24 - minute / 24 / 60) * 24 * 60 * 60)
  countDown.value = `${day}天${hour}小时${minute}分${second}秒`
}
const dateNow = () => {
  countDownFunc()
  timer = setInterval(countDownFunc as TimerHandler, 1000)
}
dateNow()
onUnmounted(() => {
  clearInterval(timer)
})
</script>
<template>
  <div class="blog_footer">
    <div class="blog_footer_container">
      <div class="left">
        <div class="version">
          <span>Version</span>
          <span>{{ store.siteInfo.version }}</span>
        </div>
        <div class="date">
          <span class="create_site_date">{{ dateFormat(store.siteInfo.created_at) }}</span>
          <span class="site_runing_date">网站已运行:{{ countDown }}</span>
        </div>
        <div class="beian">
          <img src="/image/icon/beian.png" alt="" />
          <a href="" target="_blank">备案号:{{ store.siteInfo.bei_an }}</a>
        </div>
      </div>
      <div class="right">
        <a :href="store.siteInfo.github_url" target="_blank">
          <img src="/image/icon/github.png" alt="" />
        </a>
        <a :href="store.siteInfo.gitee_url" target="_blank">
          <img src="/image/icon/gitee.png" alt="" />
        </a>
        <a :href="store.siteInfo.bilibili_url" target="_blank">
          <img src="/image/icon/bilibili.png" alt="" />
        </a>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.blog_footer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-bg-1);
  padding: 40px 0;
  color: var(--color-text-2);
  .blog_footer_container {
    width: var(--containter_width);
    display: flex;
    .left {
      width: 60%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .version {
        margin-bottom: 20px;
        span {
          padding: 4px 10px;
          background-color: var(--color-fill-2);
        }
        span:nth-child(1) {
          background-color: var(--active);
          padding: 10px 10px;
          color: white;
          border-radius: 5px;
        }
        span:nth-child(2) {
          padding: 10px 10px 10px 20px;
          border-radius: 5px;
        }
      }
      .date {
        margin: 10px 0;
        .site_runing_date {
          margin-left: 10px;
        }
      }
      .beian {
        display: flex;
        align-items: center;
        img {
          width: 30px;
          height: 30px;
          border-radius: 10px;
        }
        a {
          text-decoration: none;
          color: var(--color-text-2);
          margin-left: 5px;
        }
      }
    }
    .right {
      width: 40%;
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        margin-right: 40px;
        img {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
}
</style>
