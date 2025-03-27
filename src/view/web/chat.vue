<script setup lang="ts">
import Blog_chat_group from '@/components/common/blog_chat_group.vue'
import Blog_nav from '@/components/web/blog_nav.vue'
</script>
<template>
  <div class="chat_view">
    <Blog_nav></Blog_nav>
    <main>
      <div class="container">
        <Blog_chat_group></Blog_chat_group>
      </div>
    </main>
  </div>
</template>
<style lang="scss">
.chat_view {
  height: 100vh;
  main {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 80px;
    .container {
      width: var(--containter_width);
    }
  }
}
</style>
