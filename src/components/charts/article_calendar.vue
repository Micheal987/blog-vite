<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import Article_calendar_charts from './article_calendar_charts.vue'
import { getArticleCalendarApi } from '@/api/article/article_api'
import { useStoreConfig } from '@/store'
const store = useStoreConfig()
let data = reactive<{ dateList: string[]; countList: Array<[string, number]> }>({
  dateList: [],
  countList: [],
})
let isShow = ref(false)
const listInfo = async () => {
  let res = await getArticleCalendarApi()
  data.dateList = [res.data[0].data, res.data[res.data.length - 1].data]
  data.countList = []
  res.data.forEach((item) => {
    data.countList.push([item.data, item.count])
  })
  isShow.value = true
}
listInfo()
watch(
  () => store.theme,
  () => {
    isShow.value = false
    setTimeout(() => {
      isShow.value = true
    })
  },
)
</script>
<template>
  <div class="blog_article_calendar_charts">
    <Article_calendar_charts
      v-if="isShow"
      :date-list="data.dateList"
      :count-list="data.countList"
      :theme="store.theme" />
  </div>
</template>
<style lang="scss">
.blog_article_calendar_charts {
}
</style>
