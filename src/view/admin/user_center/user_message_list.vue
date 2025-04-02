<script lang="ts" setup>
import type { ListDateType } from '@/api/axios'
import { postUserListByMeApi, type MessageType } from '@/api/user/message_api'
import Blog_message_record from '@/components/common/blog_message_record.vue'
import { router } from '@/router'
import { useRoute } from 'vue-router'
import { reactive, ref, watch } from 'vue'
const route = useRoute()
const messageData = reactive<ListDateType<MessageType>>({
  list: [],
  count: 0,
})
const userID = ref<number>(Number(route.query.user_id))
let nick_name = ref<string>('')
const infoMessageList = async () => {
  //改下struct结构
  let res = await postUserListByMeApi()
  messageData.list = res.data.list
  messageData.count = res.data.count
  if (isNaN(userID.value)) {
    return
  }
  const item = messageData.list.find((item) => item.user_id == userID.value)
  if (item) {
    nick_name.value = item?.nick_name
  }
}
infoMessageList()

watch(userID, () => {})
const messageUserCheck = (data: MessageType) => {
  //函数发送人的id和接收人的id
  userID.value = data.user_id
  nick_name.value = data.nick_name
  router.push({
    query: { user_id: userID.value },
  })
}
</script>
<template>
  <div class="user_message_list_view">
    <div class="user_menu" v-if="messageData.list">
      <BlogMessageList @check="messageUserCheck" :data="messageData.list" />
    </div>
    <Blog_message_record :isHead="true" :userID="userID" :NickName="nick_name"></Blog_message_record>
  </div>
</template>
<style lang="scss">
.user_message_list_view {
  display: flex;
  padding: 20px;

  > div {
    background-color: var(--color-bg-1);
    height: calc(100vh - 130px);
    border-radius: 10px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .user_menu {
    width: 280px;
    margin-left: 20px;
    padding: 20px;
  }
  .blog_message_record_component {
    width: calc(100% - 320px);
    margin-left: 20px;
  }
}
</style>
