<script lang="ts" setup>
import { type MessageRecordType, type MessagePublish, deleteMessageApi } from '@/api/user/message_api'
import { nextTick, reactive, ref, watch } from 'vue'
import { postMessageRecordApi, postMessageUserPublishApi } from '@/api/user/message_api'
import type { ListDateType } from '@/api/axios'
import { Message } from '@arco-design/web-vue'
import { IconRefresh } from '@arco-design/web-vue/es/icon'
interface Props {
  userID: number
  NickName?: string
  isHead?: boolean
}
const props = defineProps<Props>()
const { isHead = false } = props
let messageRecordData = reactive<ListDateType<MessageRecordType>>({
  list: [],
  count: 0,
})
//redcordData
const MessagePublishData = reactive<MessagePublish>({
  conent: '',
  rev_user_id: props.userID,
})

const infoRecordData = async () => {
  let res = await postMessageRecordApi(props.userID)
  messageRecordData.list = res.data.list
  messageRecordData.count = res.data.count
}
const messagePublish = async () => {
  if (MessagePublishData.conent === '') {
    Message.error('消息内容不能为空')
    return
  }
  let res = await postMessageUserPublishApi(MessagePublishData)
  if (res.code) Message.error(res.msg)
  Message.success(res.msg)
  infoRecordData()
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
const isManage = ref<boolean>(false)
const selectIDList = ref<number[]>([])
const flush = () => {
  Message.success('刷新成功')
  infoRecordData()
}
const removeCaht = async () => {
  let res = await deleteMessageApi(selectIDList.value)
  if (res.code) {
    Message.success(res.msg)
    return
  }
  Message.success(res.msg)
  selectIDList.value = []
  infoRecordData()
}
watch(
  () => props.userID,
  () => {
    if (props.userID != 0) {
      //   recordData.userID = props.userID
      //   messagePublishData.rev_user_id = props.userID
      infoRecordData()
    }
  },
  { immediate: true },
)
</script>
<template>
  <div class="blog_message_record_component" v-if="props.userID">
    <div class="head" v-if="isHead">
      <div class="title">{{ props.NickName }}聊天记录</div>
      <div class="manage">
        <a-checkbox v-model="isManage">管理模式</a-checkbox>
        <IconRefresh @click="flush" style="cursor: pointer; margin-left: 5px"></IconRefresh>
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
    <div :class="{ record_list: true, isHead: isHead }">
      <a-checkbox-group v-model="selectIDList">
        <div class="user_record_menu">
          <div :class="{ messages: true, isMe: item.isMe, isManage: isManage }" v-for="item in messageRecordData.list">
            <a-checkbox :value="item.rev_user_id"></a-checkbox>
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
      </a-checkbox-group>
    </div>
    <div class="message_record">
      <a-textarea
        placeholder="请输入聊天内容"
        v-model="MessagePublishData.conent"
        auto-size
        style="height: 100%"
        @keyup.enter.ctrl="messagePublish"></a-textarea>
      <a-button type="primary" @click="messagePublish">回复</a-button>
    </div>
  </div>
</template>
<style lang="scss">
.blog_message_record_component {
  width: 100%;
  height: calc(100vh - 210px);
  .head {
    width: 100%;
    height: 60px;
    border-bottom: solid 1px var(--bg);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .manage {
      position: absolute;
      right: 20px;
      display: flex;
      align-items: center;
    }
  }
  .record_list {
    height: calc(100% - 200px);
    &.isHead {
      height: calc(100% - 260px);
    }
    overflow-y: auto;
    .arco-checkbox-group {
      width: 100%;
    }
    .messages {
      padding: 20px;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      position: relative;
      &:first-child {
        margin-top: 20px;
      }

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
      .arco-checkbox {
        position: absolute;
        right: -10px;
        top: 50%;
        transform: translateY(-50%);
      }
      &.isManage {
        background-color: var(--color-fill-1);
      }
    }
  }
  .message_record {
    border-top: 1px solid var(--bg);
    padding: 10px 20px;
    position: relative;
    height: 200px;
    button {
      position: absolute;
      right: 30px;
      bottom: 20px;
    }
  }
}
</style>
