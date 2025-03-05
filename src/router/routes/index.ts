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
    meta: { title: "首页", isLogin: true },
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
        meta: { title: "用户中心", isVisitor: false, isLogin: true, isAdmin: true, },
        children: [
          {
            path: "user_info",
            name: "user_info",
            meta: { title: "我的信息", isVisitor: false, isLogin: true, isAdmin: true, },
            component: () => import("@/view/admin/user_center/user_info.vue"),
          },
        ],
      },
      {
        path: "article",
        name: "article",
        meta: { title: "文章管理", isVisitor: false, isAdmin: true, isLogin: true },
        children: [
          {
            path: "article_list",
            name: "article_list",
            meta: { title: "文章列表", isVisitor: false, isAdmin: true, isLogin: true },
            component: () => import("@/view/admin/article/article_list.vue"),
          },
        ],
      },
      {
        path: "users",
        name: "users",
        meta: { title: "用户管理", isAdmin: true },
        children: [
          {
            path: "users_list",
            name: "users_list",
            meta: { title: "用户列表", isAdmin: true },
            component: () => import("@/view/admin/users/user_list.vue"),
          },
        ],
      },
      {
        path: "chat_group",
        name: "chat_group",
        meta: { title: "群聊管理", isAdmin: true },
        children: [
          {
            path: "chat_list",
            name: "chat_list",
            meta: { title: "聊天记录", isLogin: true, isVisitor: false },
            component: () => import("@/view/admin/chat_group/chat_list.vue"),
          },
        ],
      },
      {
        path: "system",
        name: "system",
        meta: { title: "系统管理", isAdmin: true },
        children: [
          {
            path: "menu_list",
            name: "menu_list",
            meta: { title: "菜单列表", isVisitor: true },
            component: () => import("@/view/admin/system/menu_list.vue"),
          },
          {
            path: "promotion_list",
            name: "promotion_list",
            meta: { title: "广告列表", isVisitor: true },
            component: () => import("@/view/admin/system/promotion_list.vue"),
          },
          {
            path: "log_list",
            name: "log_list",
            meta: { title: "系统日志", isAdmin: true },
            component: () => import("@/view/admin/system/log_list.vue"),
          },
        ],
      },
    ],
  },
];
export { routes };
