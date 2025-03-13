<script lang="ts" setup>
import type { MessageListType, MessageRecordType, MessageType } from '@/api/user/message_api'
import BlogMessageList from '@/components/common/blog_message_list.vue'
import { reactive, ref } from 'vue'
import { getMessageUserApi, postMessageRecordApi, getMessageUserListApi } from '@/api/user/message_api'
import type { ListDateType } from '@/api/axios'

const messageData = reactive<ListDateType<MessageType>>({
  list: [],
  count: 0,
})
const messageList = ref<MessageType[]>([])
let userId = ref(0)
let userInfoId = ref(0)
const infoMessageList = async () => {
  //改下struct结构
  let res = await getMessageUserApi()
  messageData.list = res.data.list
  messageData.count = res.data.count
}
infoMessageList()
const listTest: MessageType[] = [
  {
    avatar: 'http://127.0.0.1:8000/uploads/avatar/default.jpg',
    count: 1,
    nickName: 'admin',
    userID: 1,
    userName: 'admin',
  },
  {
    avatar: 'http://127.0.0.1:8000/uploads/avatar/default.jpg',
    count: 2,
    nickName: 'admin',
    userID: 2,
    userName: 'admin',
  },
]
const recordList = reactive<MessageRecordType[] & { isMe: boolean }[]>([
  {
    created_at: '2025-03-09T19:39:45.746+08:00',
    send_user_id: 2,
    send_user_nick_name: 'admin',
    send_user_avatar: '/api/uploads/avatar/default.jpg',
    rev_user_id: 35,
    rev_user_nick_name: 'wei',
    rev_user_avatar: 'uploads/avatar/default.jpg',
    content: 'sdadasdasdddddddddd',
    message_count: 1,
    isMe: true,
  },
  {
    created_at: '2025-03-09T19:39:49.79+08:00',
    send_user_id: 35,
    send_user_nick_name: 'wei',
    send_user_avatar: '/uploads/avatar/default.jpg',
    rev_user_id: 2,
    rev_user_nick_name: 'admin',
    rev_user_avatar: '/uploads/avatar/default.png',
    content: 'sdadasdasdddddddddd',
    message_count: 1,
    isMe: false,
  },
])
let messageUserData = reactive<ListDateType<MessageRecordType>>({
  list: [],
  count: 0,
})
const messageRecordList = async (id: number) => {
  //改下struct结构
  let res = await postMessageRecordApi(id)
  messageUserData.list = res.data.list
  messageUserData.count = res.data.count
}
const messageCheck = (data: MessageType) => {
  console.log(data)
  userId.value = data.user_id
  messageRecordList(data.user_id)
}
let messageRecordData = reactive<ListDateType<MessageRecordType & { isMe: boolean }>>({
  list: [],
  count: 0,
})
const messageUserCheck = async (data: MessageListType) => {
  //函数发送人的id和接收人的id
  let res = await postMessageRecordApi(data.id)
  messageRecordData.list = res.data.list
  messageUserData.count = res.data.count
}
</script>
<template>
  <div class="message_list_view">
    <div class="user_list_menu">
      <div class="head">
        <a-input-search placeholder="搜索用户名称"></a-input-search>
      </div>
      <BlogMessageList :data="messageData.list" @check="messageCheck" />
      <div class="page">
        <a-pagination :total="messageData.count" simple />
      </div>
    </div>
    <div class="user_menu">
      <BlogMessageList @check="messageUserCheck" :data="messageUserData.list" />
    </div>
    <div class="user_record_menu">
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
