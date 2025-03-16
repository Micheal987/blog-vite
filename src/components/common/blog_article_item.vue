<script lang="ts" setup>
import type { ArticleDataType, ArticleUpdateType } from '@/api/article/article_api'
import { dateFormat } from '@/utils/date'
import { IconClockCircle } from '@arco-design/web-vue/es/icon'
interface Props {
  data: ArticleUpdateType & ArticleDataType
}
const props = defineProps<Props>()
</script>
<template>
  <div class="blog_article_item">
    <div class="cover">
      <a-image :src="'http://127.0.0.1:8000/' + props.data.banner_url"></a-image>
    </div>
    <div class="info">
      <div class="title">{{ props.data.title }}</div>
      <div class="abstract">
        <a-typography-paragraph
          :ellipsis="{
            rows: 2,
            CSS: true,
          }"
          >{{ props.data.abstract }}</a-typography-paragraph
        >
        <div class="data">
          <span class="category"
            ><a-tag color="red">{{ props.data.category }}</a-tag></span
          >
          <span class="date"><IconClockCircle></IconClockCircle>{{ dateFormat(props.data.created_at) }}</span>
          <span class="article_data">
            <span>
              <i class="fa fa-eye"></i>
              <span>{{ props.data.look_count }}</span>
            </span>
            <span>
              <i class="fa fa-comment-o"></i>
              <span>{{ props.data.comment_count }}</span>
            </span>
            <span>
              <i class="fa fa-star"></i>
              <span>{{ props.data.collects_count }}</span>
            </span>
            <span>
              <i class="fa fa-thumbs-o-up"></i>
              <span>{{ props.data.digg_count }}</span>
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.blog_article_item {
  width: 600px;
  padding: 20px;
  display: flex;
  background-color: var(--color-fill-2);
  border-radius: 5px;
  transform: scale(0.7);
  transform-origin: left top;

  .cover {
    width: 30%;
    border-radius: 5px;
    overflow: hidden;
    &:hover {
      img {
        transform: scale(1.05);
      }
    }
    .arco-image {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all, 0.3s;
      }
    }
  }
  .info {
    width: 70%;
    padding: 20px;
    color: var(--color-text-2);
    .title {
      font-weight: 600;
      font-size: 16px;
    }
    .abstract {
      .arco-typography {
        margin: 0;
      }
      .data {
        margin-top: 5px;
        .category {
          margin-right: 10px;
        }
        .date {
          margin-right: 10px;
        }
        .article_data {
          > span {
            margin-right: 8px;
            i {
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
