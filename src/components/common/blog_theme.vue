<script lang="ts" setup>
import { IconSun, IconMoon } from "@arco-design/web-vue/es/icon";
import { useStoreConfig } from "@/store/index";
const store = useStoreConfig();
store.loadTheme();
</script>
<template>
  <div @click="store.setTheme()" class="blog_theme">
    <IconSun class="action_icon" v-if="!store.theme"></IconSun>
    <IconMoon class="action_icon" v-else></IconMoon>
  </div>
</template>
<style lang="scss">
.blog_theme {
  .action_icon {
    size: 16px;
    margin: 0 10px;
    cursor: pointer;
    &:hover {
      background-color: rgb(var(--arcoblue-2));
      border-radius: 50%;
      transition: all 3s;
    }
  }
}
</style>
