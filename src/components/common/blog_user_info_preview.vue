<script lang="ts" setup>
import { IconGithub } from '@arco-design/web-vue/es/icon'
interface UserInfo {
  avatar: string
  nickName: string
  sign: string
  link: string
  look_count: number
  comment_count: number
  digg_count: number
  collects_count: number
}
interface Props {
  data: UserInfo
}
const props = defineProps<Props>()
</script>
<template>
  <div class="blog_user_info_preview_component">
    <a-link class="link_button" :href="props.data.link"><IconGithub></IconGithub></a-link>
    <div class="head">
      <div class="avatar">
        <a-avatar :size="60" :image-url="'http://127.0.0.1:8000/' + props.data.avatar"></a-avatar>
      </div>
      <div class="nick_name">{{ props.data.nickName }}</div>
    </div>
    <div class="sign">{{ props.data.sign }}</div>
    <div class="article_data">
      <div class="item">
        <span class="data">
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
</template>
<style lang="scss">
.blog_user_info_preview_component {
  padding: 20px;
  background-color: var(--color-bg-1);
  border-radius: 10px;
  width: 100%;
  border: 1px var(--bg) solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  &::before {
    position: absolute;
    width: 40px;
    height: 40px;
    content: '';
    display: block;
    top: -6px;
    right: 0;
    background-color: var(--color-fill-2);
    transform: rotate(45deg);
  }
  .link_button {
    position: absolute;
    top: 10px;
    right: 10px;
    color: var(--color-text-2);
  }
  .head {
    display: flex;
    flex-direction: column;
    align-items: center;
    .nick_name {
      margin-top: 10px;
      font-weight: 600;
      font-size: 20px;
    }
  }
  .sign {
    margin: 10px 0;
    text-align: center;
    line-height: 1.5;
    color: var(--color-text-2);
  }
  .article_data {
    .item {
      display: flex;
      align-items: center;
      .data {
        display: flex;
        color: var(--color-text-2);
        > span {
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          width: 45px;
          i {
            text-align: center;
            margin-left: 5px;
          }
        }
      }
    }
  }
}
</style>
