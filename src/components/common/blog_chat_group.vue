<script lang="ts" setup>
import type { ListDateType, PageParamType } from '@/api/axios'
import {
  getCahtgroupListApi,
  deleteChatApi,
  type CahtGruopType,
  type CahtGroupConfigType,
  type CahtMessageType,
} from '@/api/chat/caht_api'
import { getSettingInfoApi } from '@/api/setting/setting_api'
import { Message } from '@arco-design/web-vue'
import { nextTick, reactive, ref } from 'vue'
import { IconFile, IconImage, IconRefresh } from '@arco-design/web-vue/es/icon'
import { dateTimeFormat } from '@/utils/date'
let paramsConfig = reactive<PageParamType>({})
let ChatListRecordData = reactive<ListDateType<CahtGruopType>>({
  list: [],
  count: 0,
})
const loading = ref(true)
let isManage = ref(false)
let content = ref('')
let selectIDList = ref<number[]>([])
const configInfo = reactive<CahtGroupConfigType>({
  is_anonymous: true,
  is_show_time: true,
  default_limit: 50,
  content_length: 100,
  welcome_title: '欢迎来到feng的聊天室',
  is_online_people: true,
  is_send_image: false,
  is_send_file: false,
  is_md: false,
})
const configList = async () => {
  let res = await getSettingInfoApi<CahtGroupConfigType>('chat_group')
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(configInfo, res.data)
  paramsConfig.limit = configInfo.default_limit
  chatList()
  loading.value = false
}
configList()
const chatList = async () => {
  const res = await getCahtgroupListApi(paramsConfig)
  ChatListRecordData.list = res.data.list
  ChatListRecordData.list.reverse()
  ChatListRecordData.count = res.data.count
}
chatList()
const removeCaht = async () => {
  let res = await deleteChatApi(selectIDList.value)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  selectIDList.value = []
  chatList()
}
const flush = async () => {
  await configList()
  await chatList()
  Message.success('刷新成功')
}
const imageSend = () => {
  Message.warning('开发中')
}
const FileSend = () => {
  Message.warning('开发中')
}
let socket = ref<WebSocket>()
let index = 0
let chatData = reactive({
  nick_name: '',
  on_line_count: 0,
})
const sendData = () => {
  socket.value?.send(
    JSON.stringify({
      content: content.value,
      msg_type: 2,
    }),
  )
  content.value = ''
}
const websocketConnect = () => {
  // 建立websocket连接
  socket.value = new WebSocket(`ws://${location.host}:8000/api/chat`)
  // 接收消息
  socket.value.onmessage = function (event) {
    let _data = event.data
    let jsonData = JSON.parse(_data) as CahtMessageType
    if (index == 0) {
      //第一条信息
      chatData.nick_name = jsonData.nickname
      chatData.on_line_count = jsonData.online_count
      index++
      return
    }
    ChatListRecordData.list.push({
      created_at: jsonData.created_at,
      nickname: jsonData.nickname,
      avatar: jsonData.avatar,
      msg_type: jsonData.msg_type,
      content: jsonData.content,
      isMe: jsonData.nickname === chatData.nick_name,
    })
    chatData.on_line_count = jsonData.online_count
    index++
    nextTick(() => {
      setTimeout(() => {
        let dom = document.querySelector('.record_list')
        dom?.scrollTo({
          top: dom.scrollHeight,
          behavior: 'smooth',
        })
      }, 500)
    })
  }

  // 连接成功之后的回调
  socket.value.onopen = function (ev) {
    console.log('onopen: ', ev)
    Message.success('进入聊天室成功')
  }
  // 错误
  socket.value.onerror = function (ev) {
    console.log('onerror: ', ev)
    Message.error('进入聊天室失败')
  }
  // 服务端关闭
  socket.value.onclose = function (ev) {
    console.log('onclose: ', ev)
    socket.value = undefined
    Message.error('连接断开')
  }
}
</script>
<template>
  <div class="blog_chat_group_component">
    <a-spin :loading="loading">
      <div class="head">
        <div class="title">{{ configInfo.welcome_title }}标题</div>
        <div class="outline">在线人数{{ configInfo.is_online_people ? chatData.on_line_count : '————' }}</div>
        <div class="manage">
          <a-checkbox v-model="isManage">管理模式</a-checkbox>
          <IconRefresh @click="flush" style="cursor: pointer"></IconRefresh>
          <a-button
            v-if="isManage && selectIDList.length"
            type="primary"
            status="danger"
            @click="removeCaht"
            style="margin-left: 10px"
            >删除</a-button
          >
        </div>
      </div>
      <div class="record_list">
        <a-checkbox-group v-model="selectIDList">
          <template v-for="item in ChatListRecordData.list">
            <div class="msg">
              <a-checkbox :value="item.id" v-if="isManage"></a-checkbox>
              <div class="date">{{ dateTimeFormat(item.created_at) }}</div>
              <div :class="{ user_record_menu: true, isManage: isManage }" v-if="item.msg_type === 2">
                <div :class="{ messages: true, isMe: item.isMe }">
                  <div class="avatar">
                    <img :src="'/' + item.avatar" alt="" />
                  </div>
                  <div class="message_main">
                    <div class="message_user">{{ item.nickname }}</div>
                    <div class="message_content">
                      <div class="content">
                        <div class="text-message">{{ item.content }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="item.msg_type === 1 || item.msg_type === 5" :class="{ system: true, isManage: isManage }">
                <div class="text-message">{{ item.content }}</div>
              </div>
            </div>
          </template>
        </a-checkbox-group>
      </div>
      <div class="foot">
        <div class="inRoom" v-if="!socket">
          <a-button type="primary" @click="websocketConnect">进入聊天室</a-button>
        </div>
        <div class="menu">
          <div class="menu_icon" @click="FileSend"><IconFile></IconFile></div>
          <div class="menu_icon" @click="imageSend"><IconImage></IconImage></div>
        </div>
        <a-textarea
          show-word-limit
          :max-length="configInfo.content_length"
          placeholder="聊天内容"
          @keyup.enter="sendData"
          v-model="content"
          :auto-size="{ maxRows: 5, minRows: 6 }"
          style="height: 100%"></a-textarea>
        <a-button type="primary" class="send_buuton" @click="sendData">发送</a-button>
      </div>
    </a-spin>
  </div>
</template>
<style lang="scss">
.blog_chat_group_component {
  background-color: var(--color-bg-1);
  .arco-spin {
    width: 100%;
  }
  .head {
    height: 60px;
    border-bottom: 1px solid var(--color-fill-2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    .title {
      font-size: 18px;
      font-weight: 700;
    }
    .outline {
      margin-top: 10px;
      color: var(--color-text-2);
    }
    .manage {
      position: absolute;
      right: 20px;
    }
  }
  .record_list {
    height: calc(100vh - 410px);
    padding: 20px;
    border-radius: 5px;
    background-color: var(--color-bg-1);
    overflow-y: auto;
    .msg {
      position: relative;
      .arco-checkbox {
        position: absolute;
        right: 0;
      }
    }
    .date {
      position: absolute;
      right: 20px;
      font-size: 12px;
      transform: scale(0.6);
      color: var(--color-text-2);
    }
    .user_record_menu {
      display: flex;
      align-items: center;
      &.isManage {
        border-radius: 10px;
        background-color: var(--bg);
      }
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
    .system {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      margin-top: 10px;
      &.isManage {
        border-radius: 10px;
        background-color: var(--bg);
      }
      .text-message {
        padding: 2px 5px;
        background-color: var(--color-bg-1);
        color: var(--color-text-1);
      }
    }

    .arco-checkbox-group {
      width: 100%;
    }
  }
  .foot {
    height: 220px;
    border-top: 1px solid var(--bg);
    padding: 20px;
    position: relative;
    .menu {
      display: flex;
      align-items: center;
      position: absolute;
      top: -31px;
      left: 0;
      border-top: 1px solid var(--bg);
      border-bottom: 1px solid var(--bg);
      height: 30px;
      .menu_icon {
        font-size: 18px;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
    }
    .inRoom {
      position: absolute;
      width: calc(100% - 40px);
      height: calc(100% - 40px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
      fill-opacity: 0.6;
      background-color: var(--login_bg);
    }
    .send_buuton {
      position: absolute;
      bottom: 30px;
      left: 30px;
    }
  }
}
</style>
