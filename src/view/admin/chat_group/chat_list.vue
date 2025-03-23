<script setup lang="ts">
import Chat_group_config from '@/components/admin/chat_group_config.vue'
import Blog_chat_group from '@/components/common/blog_chat_group.vue'
</script>
<template>
  <div class="chat_list_view">
    <Blog_chat_group class="record_list_view" />
    <div class="config">
      <Chat_group_config />
    </div>
  </div>
</template>
<style lang="scss">
.chat_list_view {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  height: calc(100vh - 80px);
  .record_list_view {
    width: calc(100% - 420px);
    height: 100%;
  }
  .config {
    width: 400px;
    height: 100%;
    padding: 20px;
    background-color: var(--color-bg-1);
    border-radius: 10px;
    overflow-y: auto;
  }
}
</style>
