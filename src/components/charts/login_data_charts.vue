<script lang="ts" setup>
import Login_chat from './login_charts.vue'
import { reactive, ref, watch } from 'vue'
import { useStoreConfig } from '@/store'
import { getDateLoginApi } from '@/api/data/data_api'
import type { LoginDateType, LoginDateRequest } from '@/api/data/data_api'
const isShow = ref(false)
const store = useStoreConfig()
const data = reactive<LoginDateType>({
  date_list: ['2003-01-01', '2003-01-02', '2003-01-03', '2003-01-04', '2003-01-05', '2003-01-06', '2003-01-07'],
  login_date: [0, 2, 4, 5, 6, 7, 8],
  sing_date: [0, 3, 8, 1, 2, 3, 9],
})
const params = reactive<LoginDateRequest>({
  date: 1,
})
const dateFilterOptions = [
  { label: '七天', value: 1 },
  { label: '一个月', value: 2 },
  { label: '二个月', value: 3 },
  { label: '三个月', value: 4 },
  { label: '六个月', value: 5 },
  { label: '一年', value: 6 },
]
const listInfo = async () => {
  isShow.value = false
  let res = await getDateLoginApi(params)
  Object.assign(data, res.data)
  isShow.value = true
}
listInfo()
const dateFilterChange = async () => {
  listInfo()
}
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
  <div class="login_data_charts">
    <div class="select">
      <a-select
        v-model="params.date"
        :options="dateFilterOptions"
        placeholder="时间过滤"
        @change="dateFilterChange"></a-select>
    </div>
    <Login_chat
      v-if="isShow"
      :date_list="data.date_list"
      :login_date="data.login_date"
      :sing_date="data.sing_date"
      :height="300"></Login_chat>
  </div>
</template>
<style lang="scss">
.login_data_charts {
  position: relative;
  .select {
    position: absolute;
    right: 10px;
    top: 0;
    z-index: 1;
    width: 180px;
  }
}
</style>
