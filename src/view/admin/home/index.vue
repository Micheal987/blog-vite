<script setup lang="ts">
import Blog_card from '@/components/common/blog_card.vue'
import { IconMessage, IconSettings } from '@arco-design/web-vue/es/icon'
import { type Component } from 'vue'
import { router } from '@/router'
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
      <div class="title">早安XXX,请开始一天的工作吧</div>
      <div class="weather">天气天气</div>
      <div class="statistics">
        <span>
          <span><IconMessage /></span>
          在线流量:2444
        </span>
        <span>
          <span><IconMessage /></span>
          用户总数:2444
        </span>
        <span>
          <span><IconMessage /></span>
          文章总数:2444
        </span>
        <span>
          <span><IconMessage /></span>
          群聊消息:2444
        </span>
        <span>
          <span><IconMessage /></span>
          今日登录:2444
        </span>
      </div>
      <div class="link">
        <div>前端教程:<a-link>xxxx</a-link></div>
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
        <Blog_card class="statistics" title="数据统计"></Blog_card>
      </div>
      <div class="right">
        <Blog_card title="更新日志"></Blog_card>
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
      }
    }
    .link {
      margin: 20px 0 20px 0;
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
    }
  }
}
</style>
