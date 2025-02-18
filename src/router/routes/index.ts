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
    path: "/admin",
    name: "admin",
    component: () => import("@/view/admin/index.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/view/admin/home/index.vue"),
      },
      {
        path: "user_center",
        name: "user_center",
        children: [
          {
            path: "user_info",
            name: "user_info",
            component: () => import("@/view/admin/user_center/user_info.vue"),
          },
        ],
      },
      {
        path: "article",
        name: "article",
        children: [
          {
            path: "article_list",
            name: "article_list",
            component: () => import("@/view/admin/article/article_list.vue"),
          },
        ],
      },
      {
        path: "users",
        name: "users",
        children: [
          {
            path: "users_list",
            name: "users_list",
            component: () => import("@/view/admin/users/user_list.vue"),
          },
        ],
      },
      {
        path: "chat_group",
        name: "chat_group",
        children: [
          {
            path: "chat_list",
            name: "chat_list",
            component: () => import("@/view/admin/chat_group/chat_list.vue"),
          },
        ],
      },
      {
        path: "system",
        name: "system",
        children: [
          {
            path: "menu_list",
            name: "menu_list",
            component: () => import("@/view/admin/system/menu_list.vue"),
          },
        ],
      },
    ],
  },
];
export { routes };
