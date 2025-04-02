<script lang="ts" setup>
import { type MessageParams, type MessageRecordType, type MessageType } from '@/api/user/message_api'
import BlogMessageList from '@/components/common/blog_message_list.vue'
import { reactive, ref, watch } from 'vue'
import { getMessageUserApi, getMessageUserListByUserApi, getMessageUserRecordApi } from '@/api/user/message_api'
import type { ListDateType } from '@/api/axios'
import { Notification } from '@arco-design/web-vue'
import { useRoute } from 'vue-router'
import { router } from '@/router'

const params = reactive<MessageParams>({
  page: 1,
  limit: 10,
  nick_name: undefined,
})
const messageData = reactive<ListDateType<MessageType>>({
  list: [],
  count: 0,
})
let messageUserData = reactive<ListDateType<MessageType>>({
  list: [],
  count: 0,
})
const user1 = ref<number>(0)
const user2 = ref<number>(0)
const infoMessageList = async () => {
  //改下struct结构
  let res = await getMessageUserApi(params)
  if (res.code) {
    Notification.error({
      title: res.msg,
      content: '当前权限无法获取用户消息列表',
    })
    return
  }
  messageData.list = res.data.list
  messageData.count = res.data.count
}
infoMessageList()

let messageRecordData = reactive<ListDateType<MessageRecordType>>({
  list: [],
  count: 0,
})
const checkUser1 = async (user1ID: number) => {
  messageRecordData.list = []
  messageUserData.list = []
  user1.value = user1ID
  let res = await getMessageUserListByUserApi(user1ID)
  messageUserData.list = res.data.list
  messageUserData.count = res.data.count
}
const route = useRoute()
watch(
  () => route.query.send_user_id,
  () => {
    const user1ID = Number(route.query.send_user_id)
    if (isNaN(user1ID)) {
      return
    }
    checkUser1(user1ID)
  },
  { immediate: true },
)

const messageCheck = (data: MessageType) => {
  user1.value = data.user_id
  router.push({
    query: {
      send_user_id: user1.value,
    },
  })
}

async function checkUser2(user2ID: number) {
  user2.value = user2ID
  messageRecordData.list = []
  let res = await getMessageUserRecordApi(user1.value, user2.value)
  // 判断谁算右边 => isMe
  // 以user1为准
  const list: MessageRecordType[] = []
  res.data.list.forEach((item) => {
    if (item.send_user_id === user1.value) {
      item.isMe = true
    } else {
      item.isMe = false
    }
    list.push(item)
  })
  messageRecordData.list = list
  messageRecordData.count = res.data.count
}
watch(
  () => route.query.rev_user_id,
  () => {
    const user2ID = Number(route.query.rev_user_id)
    if (isNaN(user2ID)) {
      return
    }
    checkUser2(user2ID)
  },
  { immediate: true },
)

function messageUserCheck(data: MessageType) {
  router.push({
    query: {
      send_user_id: user1.value,
      rev_user_id: data.user_id,
    },
  })
}
</script>
<template>
  <div class="message_list_view">
    <div class="user_list_menu">
      <div class="head">
        <a-input-search
          placeholder="搜索用户名称"
          @search="infoMessageList"
          @keydown.enter="infoMessageList"></a-input-search>
      </div>
      <BlogMessageList :data="messageData.list" @check="messageCheck" />
      <div class="page">
        <a-pagination
          :total="messageData.count"
          @change="infoMessageList"
          v-model:current="params.page"
          :page-size="params.limit"
          simple />
      </div>
    </div>
    <div class="user_menu" v-if="messageUserData.list">
      <BlogMessageList @check="messageUserCheck" :data="messageUserData.list" />
    </div>
    <div class="user_record_menu" v-if="messageRecordData.list.length">
      <div :class="{ messages: true, isMe: item.isMe }" v-for="item in messageRecordData.list">
        <div class="avatar">
          <img :src="item.send_user_avatar" alt="" />
        </div>
        <div class="message_main">
          <div class="message_user">{{ item.send_user_nick_name }}</div>
          <div class="message_content">
            <div class="content">
              <div class="text-message">{{ item.content }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.message_list_view {
  display: flex;
  padding: 20px;

  > div {
    background-color: var(--color-bg-1);
    height: calc(100vh - 130px);
    border-radius: 10px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .user_list_menu {
    width: 280px;
    padding: 10px;

    .head {
      padding: 10px;
    }

    .page {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 10px;
    }
  }

  .user_menu {
    width: 280px;
    margin-left: 20px;
    padding: 20px;
  }

  .user_record_menu {
    width: calc(100% - 560px);
    margin-left: 20px;
    padding: 20px;

    .messages {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      .avatar {
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }

      .message_main {
        margin-top: 10px;

        .message_user {
          font-weight: 700;
        }

        .message_content {
          margin-left: 10px;

          .content {
            position: relative;
            top: 10px;
          }
        }

        .text-message {
          font-weight: 300;
          font-size: 19px;
          padding: 20px;
          background-color: var(--color-fill-2);
          border-radius: 5px;
          position: relative;
          width: fit-content;
          min-height: 41px;
          white-space: break-spaces;
          word-break: break-all;

          &::before {
            content: '';
            display: block;
            position: absolute;
            left: -20px;
            top: 6px;
            border-width: 5px 10px;
            border-style: solid;
            border-color: transparent var(--color-fill-2) transparent transparent;
          }
        }
      }

      &.isMe {
        justify-content: right;
        flex-direction: row-reverse;

        .message_main {
          margin-right: 10px;
          margin-left: 0;

          .message_user {
            text-align: right;
          }

          .text-message {
            &::before {
              content: '';
              display: block;
              position: absolute;
              left: 246px;
              top: 6px;
              border-width: 5px 10px;
              border-style: solid;
              border-color: transparent transparent transparent var(--color-fill-2);
            }
          }
        }
      }
    }
  }
}
</style>
