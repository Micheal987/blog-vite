<script lang="ts" setup>
import { ref, watch, type Component } from 'vue'
import { IconMenu, IconUser, IconMessage } from '@arco-design/web-vue/es/icon'
import { useRoute, useRouter } from 'vue-router'
import { useStoreConfig } from '@/store'
const store = useStoreConfig()
interface MenuType {
  key: string
  title: string
  icon?: Component
  name?: string
  child?: MenuType[]
}
const menuList: MenuType[] = [
  {
    key: '0',
    title: '首页',
    icon: IconMenu,
    name: 'home',
    child: [],
  },
  {
    key: '1',
    title: '个人中心',
    icon: IconUser,
    name: 'user_center',
    child: [
      {
        key: '1-1',
        title: '我的信息',
        icon: IconMessage,
        name: 'user_info',
        child: [],
      },
    ],
  },
  {
    key: '2',
    title: '文章管理',
    icon: IconUser,
    name: 'article',
    child: [
      {
        key: '2-1',
        title: '文章列表',
        icon: IconUser,
        name: 'article_list',
        child: [],
      },
    ],
  },
  {
    key: '3',
    title: '用户管理',
    icon: IconUser,
    name: 'users',
    child: [
      {
        key: '3-1',
        title: '用户列表',
        icon: IconUser,
        name: 'users_list',
        child: [],
      },
    ],
  },
  {
    key: '4',
    title: '群聊管理',
    icon: IconUser,
    name: 'chat_group',
    child: [
      {
        key: '4-1',
        title: '聊天记录',
        icon: IconUser,
        name: 'chat_list',
        child: [],
      },
    ],
  },
  {
    key: '5',
    title: '系统管理',
    icon: IconUser,
    name: 'system',
    child: [
      {
        key: '5-1',
        title: '菜单列表',
        icon: IconUser,
        name: 'menu_list',
        child: [],
      },
      {
        key: '5-2',
        title: '广告列表',
        icon: IconUser,
        name: 'promotion_list',
        child: [],
      },
      {
        key: '5-3',
        title: '系统日志',
        icon: IconUser,
        name: 'log_list',
        child: [],
      },
      {
        key: '5-4',
        title: '系统配置',
        icon: IconUser,
        name: 'system_system',
        child: [],
      },
    ],
  },
]
const route = useRoute()
const router = useRouter()
const selectKeys = ref([route.name])
const openKeys = ref([route.matched[1].name])
const clickMenu = (name: string) => {
  router.push({
    name: name,
  })
}
//菜单折叠
const collapse = (collapsed: boolean) => {
  store.setCollapsed(collapsed)
}
//与menu关联
watch(
  () => route.name,
  () => {
    selectKeys.value = [route.name]
    openKeys.value = [route.matched[1].name]
  },
)
</script>
<template>
  <div class="blog_menu">
    <a-menu
      theme="light"
      @menu-item-click="clickMenu"
      v-model:selected-keys="selectKeys"
      v-model:open-keys="openKeys"
      show-collapse-button
      @collapse="collapse">
      <template v-for="(item, _index) in menuList" :key="item.key">
        <!-- 情况一 -->
        <a-menu-item :key="item.name" v-if="item.child?.length === 0">
          {{ item.title }}
          <template #icon>
            <component :is="item.icon"></component>
          </template>
        </a-menu-item>
        <!-- 情况二 -->
        <a-sub-menu :key="item.name" v-if="item.child?.length !== 0">
          <template #icon>
            <component :is="item.icon"></component>
          </template>
          <template #title>{{ item.title }}</template>
          <!-- item -->
          <a-menu-item :key="sub.name" v-for="sub in item.child">
            {{ sub.title }}
            <template #icon>
              <component :is="sub.title"></component>
            </template>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>
<style lang="scss">
.blog_menu {
  background-color: var(--color-bg-1);
  .action_icon {
    size: 16px;
    margin: 0 10px;
    cursor: pointer;
  }
  .arco-menu {
    position: inherit;
    .arco-menu-collapse-button {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(50%, -50%);
      opacity: 0;
      transition: all 1s;
    }
  }
}
aside:hover {
  .blog_menu {
    .arco-menu-collapse-button {
      opacity: 1;
    }
  }
}
</style>
