<script setup lang="ts">
import Blog_login from '@/components/common/blog_login.vue'
import Blog_theme from '@/components/common/blog_theme.vue'
import { ref } from 'vue'
const visible = ref(false)
const handleUpdate = (val: boolean) => {
  visible.value = val
}
</script>
<template>
  <div>
    首页
    <Blog_login v-model:visible="visible" @update="handleUpdate" />
    <Blog_theme />
    <a-button @click="visible = true">登录</a-button>
    <RouterLink to="login">登录</RouterLink>
    <RouterLink to="admin">后台</RouterLink>
  </div>
</template>
<style lang="scss"></style>
