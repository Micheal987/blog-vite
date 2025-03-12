<script lang="ts" setup>
import Blog_title from '../common/blog_title.vue'
import type { HelpDataType } from '@/api/setting/setting_api'
interface Props {
  helpTitle?: string
  data: HelpDataType[]
}
const props = defineProps<Props>()
const { helpTitle = '帮助信息' } = props
</script>
<template>
  <div class="blog_help">
    <Blog_title :title="helpTitle" />
    <div class="col" v-for="item in props.data">
      <div class="title">
        <div class="column">{{ item.column }}</div>
        <div class="abs">{{ item.abs }}</div>
      </div>
      <div class="content" v-html="item.content"></div>
    </div>
  </div>
</template>
<style lang="scss">
.blog_help {
  max-height: calc(100vh - 170px);
  overflow-y: auto;
  .clo {
    margin-top: 20px;
    .title {
      display: flex;
      .abs {
        white-space: nowrap;
      }
      .column {
        font-weight: 600;
        margin-right: 10px;
        &::after {
          content: ':';
        }
      }
      .content {
        line-height: 1rem;
        a {
          color: var(--active);
        }
        img {
          max-width: 100%;
        }
      }
    }
  }
}
</style>
