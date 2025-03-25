<script setup lang="ts">
import { IconHome } from '@arco-design/web-vue/es/icon'
import Blog_menu from '../../components/admin/blog_menu.vue'
import Blog_tags from '../../components/admin/blog_tags.vue'
import Blog_bread_crumb from '../../components/admin/blog_bread_crumb.vue'
import Blog_theme from '@/components/common/blog_theme.vue'
import { useRouter } from 'vue-router'
import { useStoreConfig } from '@/store'
import Blog_logo from '@/components/admin/blog_logo.vue'
import Blog_user_menu_doption from '@/components/common/blog_user_menu_doption.vue'
const store = useStoreConfig()
const router = useRouter()
const goIndex = () => {
  router.push({
    path: '/',
  })
}
const isLaptops1 = isLaptops
console.log('isLaptops1', isLaptops1)
</script>
<template>
  <div class="blog_admin">
    <aside :class="{ collapsed: store.collapsed }">
      <!-- logo -->
      <Blog_logo />
      <!-- menu -->
      <Blog_menu />
    </aside>
    <main :class="{ isLaptops: isLaptops1 }">
      <div class="blog_head">
        <!-- bread -->
        <Blog_bread_crumb />
        <div class="blog_function_menu_area">
          <div class="blog_menu" @click="goIndex">
            <IconHome class="action_icon"></IconHome>
          </div>
          <!-- theme -->
          <Blog_theme />
          <!-- usermenu -->
          <Blog_user_menu_doption />
        </div>
      </div>
      <!-- tag -->
      <Blog_tags />
      <div class="blog_container">
        <RouterView v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component"></component>
          </Transition>
        </RouterView>
      </div>
    </main>
  </div>
</template>
<style lang="scss">
.blog_admin {
  display: flex;
  color: var(--color-text-1);
  height: 100vh;

  aside {
    width: 240px;
    height: 100vh;
    border-right: 1px solid var(--bg);
    background-color: var(--color-bg-1);
    position: relative;
    transition: all 1s;
  }
  aside.collapsed {
    width: 48px;
    & ~ main {
      width: calc(100% - 48px);
    }
  }

  main {
    width: calc(100% - 240px);
    overflow-x: hidden;
    overflow-y: auto;
    background-color: var(--color-bg-1);
    transition: all 1s;
    .blog_head {
      width: 100%;
      height: 60px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--bg);

      .blog_function_menu_area {
        display: flex;
        align-items: center;
      }
    }

    .blog_container {
      background-color: var(--bg);
      min-height: calc(100vh - 140px);

      .fade-leave-to {
        opacity: 0;
        transform: translateX(30px);
      }

      .fade-enter-active {
        transform: translateX(-30px);
        opacity: 0;
      }

      .fade-enter-to {
        transform: translateX(0px);
        opacity: 1;
      }

      .fade-leave-active,
      .fade-enter-active {
        transition: all 0.3s ease-out;
      }
    }
  }
}
</style>
