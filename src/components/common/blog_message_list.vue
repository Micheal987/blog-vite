<script lang="ts" setup>
import type {MessageType } from '@/api/user/message_api'
import { ref } from 'vue'

interface Props {
  data: MessageType[]
}
const props = defineProps<Props>()
const emits = defineEmits<{
  (e:'check',value:MessageType): void
}>()
let active = ref<number>(0)
const checkItem = (record: MessageType) => {
  active.value = record.userID
  emits('check', record)
}
</script>
<template>
  <div class="blog_message_list">
    <div
      :class="{ item: true, active:( active === item.userID) }"
      @click="checkItem(item)"
      v-for="item in props.data"
      :key="item.userID">
      <div class="avatar">
        <img :src="item.avatar" alt="" />
      </div>
      <div class="nick_name">{{ item.nickName }}</div>
      <div class="count">{{ item.count }}</div>
    </div>
  </div>
</template>
<style lang="scss">
.blog_message_list {
  .item {
    display: flex;
    padding: 10px 10px;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    .avatar {
      img {
        width: 100%;
        height: 50px;
        border-radius: 50%;
      }
    }
    .nick_name {
      font-weight: 700;
    }
    .count {
      font-size: 16px;
    }
    &.active {
      background-color: var(--color-fill-2);
      border-radius: 5px;
    }
  }
}
</style>
