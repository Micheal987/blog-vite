<script lang="ts" setup>
import type { MessageType } from '@/api/user/message_api'
import { ref } from 'vue'

interface Props {
  data: MessageType[]
}

const props = defineProps<Props>()
const emits = defineEmits<{
  (e: 'check', value: MessageType): void
}>()
let active = ref<number>(0)
const checkItem = (record: MessageType) => {
  active.value = record.user_id
  emits('check', record)
}
</script>
<template>
  <div class="blog_message_list">
    <div
      :class="{ item: true, active: active === item.user_id }"
      @click="checkItem(item)"
      v-for="item in props.data"
      :key="item.user_id">
      <div class="avatar">
        <img :src="'http://127.0.0.1:8000/' + item.avatar" alt="" />
      </div>
      <div class="nick_name">
        <a-typography-paragraph
          :ellipsis="{ rows: 2,showTooltip: true,}">{{ item.nick_name }}
        </a-typography-paragraph>
      </div>
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
      width: 120px;
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
