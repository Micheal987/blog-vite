<script lang="ts" setup>
import { getStatisticApi, type StatisticsType } from '@/api/data/data_api'
import { useStoreConfig } from '@/store'
import { IconMessage, IconUser, IconFile, IconArchive } from '@arco-design/web-vue/es/icon'
import { reactive } from 'vue'
const store = useStoreConfig()
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
</script>
<template>
  <div class="blog_home_welcome">
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
  </div>
</template>
<style lang="scss">
.blog_home_welcome {
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
}
</style>
