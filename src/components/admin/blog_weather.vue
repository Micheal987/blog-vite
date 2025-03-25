<script lang="ts" setup>
import type { WeatherType } from '@/api/data/data_api'
import { reactive, computed, ref } from 'vue'
import { getWeatherApi } from '@/api/data/data_api'
let data = reactive<WeatherType>({
  province: '',
  city: '',
  weather: '',
  temperature: '',
  winddirection: '',
  windpower: '',
  humidity: '',
  reporttime: '',
})
const isShow = ref(false)
const listInfo = async () => {
  isShow.value = false
  let val = sessionStorage.getItem('weather')
  if (val != null) {
    try {
      let res1 = JSON.parse(val)
      Object.assign(data, res1)
      return
    } catch (e) {
      sessionStorage.removeItem('weather')
      return
    }
  }
  let res = await getWeatherApi()
  if (res.code) {
    return
  }
  Object.assign(data, res.data)
  sessionStorage.setItem('weather', JSON.stringify(data))
  isShow.value = true
}
const weatherTips = computed(() => {
  const tip = Number(data.temperature)
  if (tip > 30) {
    return '天气炎热,请多注意避暑'
  }
  if (tip > 20 && tip > 30) {
    return '天气温和,适合户外运动'
  }
  if (tip > 20 && tip <= 0) {
    return '天气凉,适合户外运动'
  }
  if (tip < 0) {
    return '天气寒冷,注意保暖'
  }
})
listInfo()
</script>
<template>
  <div>
    <div class="weather">
      <a-skeleton-line v-if="isShow" :rows="1" :widths="[100]" />
      <template v-else>
        {{ data.province }}.{{ data.city }}今日{{ data.weather }},{{ data.temperature }}度{{ weatherTips }}
      </template>
    </div>
  </div>
</template>
<style lang="scss"></style>
