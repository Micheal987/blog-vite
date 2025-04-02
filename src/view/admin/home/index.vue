<script setup lang="ts">
import Blog_card from '@/components/common/blog_card.vue'
import { IconSettings } from '@arco-design/web-vue/es/icon'
import { type Component } from 'vue'
import { router } from '@/router'
import { relativeCurrentTime } from '@/utils/date'
import Login_data_chat from '@/components/charts/login_data_charts.vue'
import { useStoreConfig } from '@/store'
import Blog_home_welcome from '@/components/admin/blog_home_welcome.vue'
const store = useStoreConfig()
interface quickEntryType {
  bg: string //背景色
  color: string //文字颜色
  font: Component
  text: string
  name?: string
  link?: string
}
let quickEntryList: quickEntryType[] = [
  {
    bg: '',
    color: '',
    font: IconSettings,
    text: '日志更新',
    name: '',
    link: '',
  },
  {
    bg: '',
    color: '',
    font: IconSettings,
    text: '日志更新',
    name: '',
    link: '',
  },
  {
    bg: '',
    color: '',
    font: IconSettings,
    text: '日志更新',
    name: '',
    link: '',
  },
  {
    bg: '',
    color: '',
    font: IconSettings,
    text: '日志更新',
    name: '',
    link: '',
  },
]
if (store.isGeneral()) {
  quickEntryList = [
    {
      bg: '',
      color: '',
      font: IconSettings,
      text: '个人信息',
      name: '',
      link: '',
    },
  ]
}
interface UpadteLogType {
  id?: number
  title: string
  conent: string
  created_at: string
}
const updateLogList: UpadteLogType[] = [
  {
    title: '更新日志内容',
    conent: '内容',
    created_at: '2025-03-024',
  },
  {
    title: '更新日志内容',
    conent: '内容',
    created_at: '2025-03-024',
  },
]
const goLink = (record: quickEntryType) => {
  if (record.name) {
    router.push({
      name: record.name,
    })
  }
  if (record.link) {
    window.open(record.link, '_blank')
  }
}
</script>
<template>
  <div class="home_view">
    <Blog_home_welcome />
    <div class="main">
      <div class="left">
        <Blog_card title="快捷入口" class="quick_entry">
          <div
            class="item"
            v-for="item in quickEntryList"
            :style="{ '--icon_bg': item.bg, '--icon_color': item.color }">
            <div class="icon" @click="goLink(item)">
              <component :is="item.font"></component>
            </div>
            <div class="text">
              {{ item.text }}
            </div>
          </div>
        </Blog_card>
        <Blog_card class="statistics" title="数据统计">
          <Login_data_chat></Login_data_chat>
        </Blog_card>
      </div>
      <div class="right">
        <Blog_card title="更新日志" class="update_log">
          <div class="item" v-for="(item, index) in updateLogList">
            <span>
              <span class="index">{{ index + 1 }}</span>
              <span class="content">
                <a-typography-paragraph
                  :ellipsis="{
                    rows: 2,
                    showTooltip: true,
                    css: true,
                  }"
                  >{{ item.title }}</a-typography-paragraph
                >
              </span>
            </span>
            <span class="date">{{ relativeCurrentTime(item.created_at) }}</span>
          </div>
        </Blog_card>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.home_view {
  padding: 10px;
  .main {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .left {
      width: 70%;
      .quick_entry {
        .body {
          display: flex;
        }
        .item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-right: 30px;
          &:last-child {
            margin-right: 0;
          }
          .icon {
            background-color: var(--icon_bg);
            color: var(--icon_color);
            border-radius: 10px;
            width: 60px;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            transform: all 0.3;
            cursor: pointer;
            svg {
              transform: all 0.3;
            }
            &:hover {
              transform: scale(1.05);
              svg {
                transform: scale(1.1);
              }
            }
          }
          .text {
            margin-top: 5px;
            color: var(--color-text-2);
          }
        }
      }
      .statistics {
        margin-top: 20px;
      }
    }
    .right {
      width: calc(30% - 20px);
      .update_log {
        .item {
          display: flex;
          align-items: center;
          height: 40px;
          > span {
            display: flex;
            align-items: center;
          }
          .index {
            margin-right: 10px;
          }
          .content {
            display: flex;
            align-items: center;
            .arco-typography {
              margin-bottom: 0;
              display: inline-block;
            }
          }
          .date {
            margin-left: 10px;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>
