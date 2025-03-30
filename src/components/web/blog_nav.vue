:
<script lang="ts" setup>
import { IconSearch } from '@arco-design/web-vue/es/icon'
import Blog_theme from '../common/blog_theme.vue'
import { useStoreConfig } from '@/store'
import Blog_user_menu_doption from '@/components/common/blog_user_menu_doption.vue'
import { getMenuNameApi } from '@/api/menu/menu_api'
import type { MenuNameType } from '@/api/menu/menu_api'
import { onUnmounted, ref } from 'vue'
interface Props {
  noScroll?: boolean
}
const props = defineProps<Props>()
const { noScroll = false } = props
const isShow = ref(true)
const store = useStoreConfig()
const navList = ref<MenuNameType[]>([])
const scrollFn = () => {
  let top = document.documentElement.scrollTop
  if (top >= 200) {
    isShow.value = true
  } else {
    isShow.value = false
  }
}
if (!noScroll) {
  isShow.value = false
  window.addEventListener('scroll', scrollFn)
}
onUnmounted(() => {
  if (!noScroll) {
    window.removeEventListener('scroll', scrollFn)
  }
})
const listInfo = async () => {
  const val = sessionStorage.getItem('navList')
  if (val !== null) {
    try {
      navList.value = JSON.parse(val)
      return
    } catch (e) {}
  }
  let res = await getMenuNameApi()
  navList.value = res.data
  sessionStorage.setItem('navList', JSON.stringify(navList.value))
}
listInfo()
</script>
<template>
  <div :class="{ blog_nav: true, isShow: isShow }">
    <div class="blog_nav_container">
      <div class="left">
        <div class="log">
          <div class="slogan">{{ store.siteInfo.slogan }}</div>
          <div class="en_slog">{{ store.siteInfo.slogan_en }}</div>
        </div>
        <div class="nav">
          <template v-for="item in navList">
            <router-link :to="item.path" v-if="!item.path.startsWith('http')">{{ item.title }}</router-link>
            <a :href="item.path" v-else>{{ item.title }}</a>
          </template>
        </div>
        <div class="search">
          <IconSearch></IconSearch>
        </div>
      </div>
      <div class="right">
        <div class="login" v-if="!store.isLogin()">
          <RouterLink :to="{ name: 'login' }">登录</RouterLink>
        </div>
        <div class="user_info" v-else>
          <Blog_user_menu_doption />
        </div>
        <div class="theme">
          <Blog_theme />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.blog_nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  transform: all 0.3s;
  color: var(--nav_text_color);
  z-index: 100;
  &.isShow {
    background-color: var(--color-bg-1);
    color: var(--color-text-1);
    a {
      color: var(--color-text-1);
    }
  }
  a {
    text-decoration: none;
    color: var(--nav_text_color);
    &.router-link-exact-active {
      color: var(--active);
    }
  }
  .blog_nav_container {
    width: var(--containter_width);
    height: 60px;
    display: flex;
    align-items: center;
    .left {
      width: 70%;
      display: flex;
      align-items: center;
      .log {
        margin-right: 45px;
        .slogan {
          font-size: 18px;
        }
        .en_slogan {
          font-size: 12px;
          color: var(--color-text-2);
        }
      }
      .nav {
        margin-right: 30px;
        a {
          margin-right: 40px;
        }
      }
      .search {
        margin-right: 10px;
        svg {
          cursor: pointer;
        }
      }
    }
    .right {
      width: 30%;
      display: flex;
      justify-content: end;
      align-items: center;
      .user_info {
        margin-left: 10px;
      }
      .theme {
        margin-right: 20px;
        svg {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
