<script lang="ts" setup>
import { getTagListApi, type AriticleTagType } from '@/api/tags/tag_api'
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const active = ref<string>(route.query.tag as string)
let list = reactive<AriticleTagType[]>([
  {
    tags: 'go',
    count: 0,
  },
  {
    tags: 'java',
    count: 0,
  },
])
const listInfo = async () => {
  let res = await getTagListApi()
  list = res.data.list
}
listInfo()
const checkTag = (record: AriticleTagType) => {
  if (active.value == record.tags) {
    //第二次点击
    active.value = ''
  } else {
    active.value = record.tags
  }
  router.push({
    query: {
      tag: active.value,
    },
  })
}
</script>
<template>
  <div class="blog_tags">
    <div class="continter">
      <div :class="{ item: true, active: active === item.tags }" v-for="item in list">
        <a href="javascript:void (0)" @click="checkTag(item)">
          <span>{{ item.tags }}</span>
          <span>X{{ item.count }}</span>
        </a>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.blog_tags {
  position: relative;
  @keyframes box_move {
    0% {
      left: -20px;
      top: -20px;
    }
    25% {
      left: 100%;
      top: -20px;
    }
    50% {
      left: 100%;
      top: 100%;
    }
    75% {
      top: 100%;
      left: -20px;
    }
    100% {
      left: -20px;
      top: -20px;
    }
  }
  &::after {
    display: block;
    position: absolute;
    top: -20;
    bottom: -20;
    width: 20px;
    height: 20px;
    content: '';
    background-color: var(--active);
    animation-name: box_move;
    animation-duration: 5s;
    animation-iteration-count: infinite;
  }
  .item {
    padding: 20px;
    width: 50%;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-2);
    background-color: var(--color_fill-1);
    &:nth-child(4n + 1),
    &:nth-child(4n + 2) {
      background-color: var(--color_fill-2);
    }
    &:nth-child(4n + 1),
    &:nth-child(4n + 3) {
    }
    a {
      color: var(--color-text-2);
      text-decoration: none;
    }
    &.active {
      a {
        color: var(--active);
      }
    }
    span:nth-child(1) {
      margin-left: 5px;
    }
    span:nth-child(2) {
      font-size: 12px;
    }
  }
}
</style>
