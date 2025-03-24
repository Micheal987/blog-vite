<script lang="ts" setup>
import { onMounted } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
interface Props {
  date_list: string[]
  login_date: number[]
  sing_date: number[]
  height: number
}
const props = defineProps<Props>()
const { height = 300 } = props
onMounted(() => {
  const chartDom = document.getElementById('statistics_log')!
  const myChart = echarts.init(chartDom)
  let option: EChartsOption
  const bg = getComputedStyle(document.body).getPropertyValue('--bg')
  const charst_color1 = getComputedStyle(document.body).getPropertyValue('--charts_color1')
  const charst_color2 = getComputedStyle(document.body).getPropertyValue('--charts_color2')
  const charst_color3 = getComputedStyle(document.body).getPropertyValue('--charts_color3')
  console.log(bg)
  option = {
    color: [charst_color1, charst_color2],
    title: {
      text: 'Stacked Area Chart',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: charst_color3,
        },
      },
    },
    legend: {
      data: ['登录', '注册'],
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: props.date_list,
      },
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: bg,
          },
        },
      },
    ],
    series: [
      {
        name: '登录',
        type: 'line',
        // stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: props.login_date,
      },
      {
        name: '注册',
        type: 'line',
        // stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: props.sing_date,
      },
    ],
  }
  window.addEventListener('reset', () => {
    myChart.resize()
  })
  option && myChart.setOption(option)
})
</script>
<template>
  <div id="statistics_log" :style="{ height: height + 'px' }"></div>
</template>
