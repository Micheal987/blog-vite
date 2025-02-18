<script setup lang="ts">
import { ref } from 'vue';
import {
  IconMenuFold,
  IconMenuUnfold,
  IconApps,
  IconBug,
  IconBulb,
} from '@arco-design/web-vue/es/icon';
const collapsed = ref(false);
</script>
<template>
        <div class="blog_admin">
            <aside>
            <div class="blog_log">
                <img src="/image/log.jpg" alt="">
               <div class="log_head">
                <div>博客</div>
                <div>fengwei</div>
               </div>
            </div>
            <div class="blog-menu">
                <a-menu
                :style="{ width: '200px', borderRadius: '4px' }"
                theme="dark"
                :collapsed="collapsed"
                :default-open-keys="['0']"
                :default-selected-keys="['0_2']"
              >
                <a-sub-menu key="0">
                  <template #icon><icon-apps></icon-apps></template>
                  <template #title>Navigation 1</template>
                  <a-menu-item key="0_0">Menu 1</a-menu-item>
                  <a-menu-item key="0_1">Menu 2</a-menu-item>
                  <a-menu-item key="0_2">Menu 3</a-menu-item>
                  <a-menu-item key="0_3">Menu 4</a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="1">
                  <template #icon><icon-bug></icon-bug></template>
                  <template #title>Navigation 2</template>
                  <a-menu-item key="1_0">Menu 1</a-menu-item>
                  <a-menu-item key="1_1">Menu 2</a-menu-item>
                  <a-menu-item key="1_2">Menu 3</a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="2">
                  <template #icon><icon-bulb></icon-bulb></template>
                  <template #title>Navigation 3</template>
                  <a-menu-item key="2_0">Menu 1</a-menu-item>
                  <a-menu-item key="2_1">Menu 2</a-menu-item>
                  <a-sub-menu key="2_2" title="Navigation 4">
                    <a-menu-item key="2_2_0">Menu 1</a-menu-item>
                    <a-menu-item key="2_2_1">Menu 2</a-menu-item>
                  </a-sub-menu>
                </a-sub-menu>
              </a-menu>
            </div>
        </aside>
    <main>
        <RouterView/>
    </main>
</div>
</template>
<style lang="scss">
.blog_admin{
    display: flex;
    aside{
        width: 240px;
        .blog_log{
            height: 90px;
            display: flex;
            padding: 20px;
            align-items: center;
            img{
                width: 60px;
                height: 60px;
                border-radius: 10px;
            }
            .log_head{
                margin-left: 20px;
                >div:nth-child(1){
                    font-size: 22px;
                }
                >div:nth-child(2){
                    font-size: 12px;
                }
            }
        }
    }
    main{
        width: calc(100% - 240px);
    }
}
</style>