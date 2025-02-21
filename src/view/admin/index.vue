<script setup lang="ts">
import {
  IconHome,
  IconDown
} from '@arco-design/web-vue/es/icon';
import Blog_menu from '../../components/admin/blog_menu.vue';
import Blog_tags from '../../components/admin/blog_tags.vue';
import Blog_bread_crumb from '../../components/admin/blog_bread_crumb.vue';
import Blog_theme from '@/components/common/blog_theme.vue';
import {useRouter} from "vue-router"
const router = useRouter()
const goIndex =()=>{
  router.push({
    path:"/"
  })
}
</script>
<template>
  <div class="blog_admin">
    <aside>
      <div class="blog_log">
        <img src="/image/log.jpg" alt="">
        <div class="log_head">
          <div>feng博客</div>
          <div>fengwei博客</div>
        </div>
      </div>
      <!-- menu -->
      <Blog_menu />
    </aside>
    <main>
      <div class="blog_head">
        <!-- bread -->
        <Blog_bread_crumb />
        <div class="blog_function_menu_area">
          <div class="blog_menu" @click="goIndex">
            <IconHome class="action_icon"></IconHome>
          </div>
          <!-- theme -->
           <Blog_theme/>
          <div class="user_info_menu">
            <a-dropdown :popup-max-height="false">
              <div class="user_info_menu_dropdown">
                <img src="/image/user1.jpg" alt="">
                <span class="user_info_menu_dropdown_name">fengwei</span>
                <IconDown></IconDown>
              </div>
              <template #content>
                <a-doption>Option 1</a-doption>
                <a-doption>Option 2</a-doption>
                <a-doption>Option 3</a-doption>
              </template>
            </a-dropdown>
          </div>
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

    .blog_log {
      height: 90px;
      display: flex;
      padding: 20px;
      align-items: center;
      border-bottom: 1px solid var(--bg);

      img {
        width: 60px;
        height: 60px;
        border-radius: 10px;
      }

      .log_head {
        margin-left: 20px;

        >div:nth-child(1) {
          font-size: 22px;
        }

        >div:nth-child(2) {
          margin-top: 10px;
          font-size: 12px;
        }
      }
    }
  }

  main {
    width: calc(100% - 240px);
    overflow-x: hidden;
    overflow-y: auto;
    background-color: var(--color-bg-1);
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