import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "web",
    component: () => import("@/view/web/web.vue"),
    children: [
      {
        path: "",
        name: "index",
        component: () => import("@/view/web/index.vue"),
      },
    ],
  },
  {
    "path": "/login",
    name: "login",
    component: () => import("@/view/login/login.vue")
  },
  {
    path: "/admin",
    name: "admin",
    meta: { title: "首页" },
    component: () => import("@/view/admin/index.vue"),
    children: [
      {
        path: "",
        name: "home",
        meta: { title: "home" },
        component: () => import("@/view/admin/home/index.vue"),
      },
      {
        path: "user_center",
        name: "user_center",
        meta: { title: "用户中心" },
        children: [
          {
            path: "user_info",
            name: "user_info",
            meta: { title: "我的信息" },
            component: () => import("@/view/admin/user_center/user_info.vue"),
          },
        ],
      },
      {
        path: "article",
        name: "article",
        meta: { title: "文章管理" },
        children: [
          {
            path: "article_list",
            name: "article_list",
            meta: { title: "文章列表" },
            component: () => import("@/view/admin/article/article_list.vue"),
          },
        ],
      },
      {
        path: "users",
        name: "users",
        meta: { title: "用户管理" },
        children: [
          {
            path: "users_list",
            name: "users_list",
            meta: { title: "用户列表" },
            component: () => import("@/view/admin/users/user_list.vue"),
          },
        ],
      },
      {
        path: "chat_group",
        name: "chat_group",
        meta: { title: "群聊管理" },
        children: [
          {
            path: "chat_list",
            name: "chat_list",
            meta: { title: "聊天记录" },
            component: () => import("@/view/admin/chat_group/chat_list.vue"),
          },
        ],
      },
      {
        path: "system",
        name: "system",
        meta: { title: "系统管理" },
        children: [
          {
            path: "menu_list",
            name: "menu_list",
            meta: { title: "菜单列表" },
            component: () => import("@/view/admin/system/menu_list.vue"),
          },
          {
            path: "log_list",
            name: "log_list",
            meta: { title: "系统日志" },
            component: () => import("@/view/admin/system/log_list.vue"),
          },
        ],
      },
    ],
  },
];
export { routes };
