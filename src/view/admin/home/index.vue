<script setup lang="ts">
import Blog_card from '@/components/common/blog_card.vue'
import { IconMessage, IconSettings, IconUser, IconFile, IconArchive } from '@arco-design/web-vue/es/icon'
import { reactive, type Component } from 'vue'
import { router } from '@/router'
import { relativeCurrentTime } from '@/utils/date'
import Login_data_chat from '@/components/charts/login_data_charts.vue'
import { getStatisticApi } from '@/api/data/data_api'
import type { StatisticsType } from '@/api/data/data_api'
import { useStoreConfig } from '@/store'
const store = useStoreConfig()
interface quickEntryType {
  bg: string //背景色
  color: string //文字颜色
  font: Component
  text: string
  name?: string
  link?: string
}
const quickEntryList: quickEntryType[] = [
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
const StatisticDate = reactive<StatisticsType>({
  user_count: 0,
  article_count: 0,
  message_count: 0,
  chat_group_count: 0,
  now_login_count: 0,
  now_sing_count: 0,
  flow_count: 0,
})
const statisticList = async () => {
  let res = await getStatisticApi()
  Object.assign(StatisticDate, res.data)
}
statisticList()
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
    <div class="welcome">
      <div class="title">早安{{ store.userInfo.nick_name }},请开始一天的工作吧</div>
      <div class="weather">天气天气</div>
      <div class="statistics">
        <span>
          <span><IconMessage /></span>
          在线流量:{{ StatisticDate.flow_count }}
        </span>
        <span>
          <span><IconUser /></span>
          用户总数:{{ StatisticDate.user_count }}
        </span>
        <span>
          <span><IconFile /></span>
          文章总数:{{ StatisticDate.article_count }}
        </span>
        <span>
          <span><IconMessage /></span>
          群聊消息:{{ StatisticDate.chat_group_count }}
        </span>
        <span>
          <span><IconArchive /></span>
          今日登录:{{ StatisticDate.now_login_count }}
        </span>
        <span>
          <span><IconMessage /></span>
          站内消息:{{ StatisticDate.message_count }}
        </span>
      </div>
      <div class="link">
        <div>前端教程:<a-link>xxxx</a-link></div>
        <div>后端教程:<a-link>xxxx</a-link></div>
        <div>nodejs教程:<a-link>xxxx</a-link></div>
      </div>
    </div>
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
                    rows: 1,
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
  .welcome {
    width: 100%;
    background-image: url('http://127.0.0.1:8000/uploads/avatar/default.jpg');
    background-repeat: no-repeat;
    background-position: right;
    background-color: var(--color-bg-1);
    padding: 20px;
    border-radius: 10px;
    background-size: 30%;
    color: var(--color-text-1);
    .title {
      margin-top: 20px;
      font-size: 20px;
      font-weight: 600;
      color: var(--color-text-2);
    }
    .weather {
      margin: 20px 0 10px 0;
    }
    .statistics {
      margin: 20px 0 10px 0;
      font-size: 16px;
      > span {
        margin-right: 20px;
        transform: all 0.3;
        .arco-icon {
          &:hover {
            transform: scale(0.8);
          }
        }
        &:hover {
          cursor: pointer;
        }
      }
    }
    .link {
      margin: 20px 0 20px 0;
      > div {
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
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
