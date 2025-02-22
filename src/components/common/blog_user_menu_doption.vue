<script lang="ts" setup>
import { IconDown } from '@arco-design/web-vue/es/icon'
import { useStoreConfig } from '@/store'
import type { tabsType } from '@/types'
import { useRouter } from 'vue-router'
interface menuList extends tabsType {
  type?: string
}
const store = useStoreConfig()
const router = useRouter()
const dpList: menuList[] = [
  { name: 'user_info', title: '个人信息' },
  { name: '', title: '', type: 'line' },
  { name: 'users_list', title: '用户列表' },
  { name: 'article_list', title: '文章列表' },
  { name: 'log_list', title: '系统日志' },
  { name: '', title: '', type: 'line' },
  { name: 'logout', title: '注销登录' },
]
const selectMenu = (value: string | number | Record<string, any> | undefined | any) => {
  let val = value as string
  if (val == 'logout') {
    return
  }
  router.push({
    name: val,
  })
}
</script>
<template>
  <div class="user_info_menu">
    <a-dropdown class="blog_dropdown" :popup-max-height="false" @select="selectMenu">
      <div class="user_info_menu_dropdown">
        <img :src="store.userInfo.avatar" alt="" />
        <span class="user_info_menu_dropdown_name">{{ store.userInfo.nick_name }}</span>
        <IconDown></IconDown>
      </div>
      <template #content>
        <template v-for="(item, index) in dpList" :key="index">
          <a-dgroup v-if="item.type === 'line'"></a-dgroup>
          <a-doption v-else :value="item.name">{{ item.title }}</a-doption>
        </template>
      </template>
    </a-dropdown>
  </div>
</template>
<style lang="scss">
.user_info_menu {
  .user_info_menu_dropdown {
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .user_info_menu_dropdown_name {
      font-size: 16px;
      margin: 0 5px;
    }
  }
}
.blog_dropdown {
  .arco-dropdown-group-title {
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: var(--bg);
      position: absolute;
      left: 0;
    }
  }
}
</style>
