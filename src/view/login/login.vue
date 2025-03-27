<script lang="ts" setup>
import { postLoginQQApi } from '@/api/user/user_api'
import '@/assets/font.css'
import Login_form from '@/components/common/login_form.vue'
import { Message } from '@arco-design/web-vue'
import { useRouter, useRoute } from 'vue-router'
import { useStoreConfig } from '@/store'

const router = useRouter()
const route = useRoute()
const store = useStoreConfig()

//back
interface historyState {
  back?: string
}

const back = (window.history.state as historyState).back

//当前路由
interface query {
  flag?: string
  code?: string
}

const ok = () => {
  let back = window.history.state.back
  if (back === null) {
    router.push({
      name: 'index',
    })
  }
  router.push(back)
}
const init = async (query: query) => {
  if (!query.code || !query.flag) {
    return
  }
  let res = await postLoginQQApi(query.code)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  //
  await store.setToken(res.data)
  // 重定向到点击登录的页面
  let path = localStorage.getItem('redirectPath')
  if (path == '') {
    path = '/'
  }
  await router.push(path as string)
}
init(route.query)
</script>
<template>
  <div class="blog_login">
    <div class="blog_login_mask">
      <Login_form @off-eject="ok" :qq-redirect-path="back" />
    </div>
  </div>
</template>
<style lang="scss">
.blog_login {
  background: url('/image/pg2.png') 50% / cover no-repeat;
  width: 100%;
  height: 100vh;

  .blog_login_mask {
    position: absolute;
    right: 0;
    background-color: var(--login_bg);
    width: 400px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 40px;

    .title {
      font-family: BlexMonoNerd, serif;
      font-size: 24px;
      font-weight: 800;
      text-align: center;
      color: var(--active);
      margin-bottom: 20px;
    }

    .other_login {
      padding: 10px 0;

      .label {
        display: flex;
        align-items: center;
        text-align: center;

        &::before {
          display: inline-flex;
          width: 35%;
          height: 1px;
          content: '';
          background-color: var(--color-text-4);
        }

        &::after {
          display: inline-flex;
          width: 35%;
          height: 1px;
          content: '';
          background-color: var(--color-text-4);
        }
      }

      .icon {
        display: flex;
        justify-content: center;
        padding: 10px 0;

        > a {
          margin-right: 10px;

          &:last-child {
            margin-right: 0;
          }
        }

        img {
          width: 40px;
          height: 60px;
        }
      }
    }
  }
}
</style>
