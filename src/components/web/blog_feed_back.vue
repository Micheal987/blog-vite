<script lang="ts" setup>
import type { PageParamType } from '@/api/axios'
import {
  getFeedBackListApi,
  postFeedBackCreateApi,
  type FeedBackCreateType,
  type FeedBackType,
} from '@/api/feed_back/feed_back_api'
import { dateFormat } from '@/utils/date'
import { Message } from '@arco-design/web-vue'
import { reactive, ref } from 'vue'

let form = reactive<FeedBackCreateType>({
  email: '',
  content: '',
})
let list = reactive<FeedBackType[]>([
  {
    content: '支持移动端',
    created_at: '2025-01-02',
    email: '',
  },
])
const formRef = ref()
let params = reactive<PageParamType>({})
const listInfo = async () => {
  let res = await getFeedBackListApi(params)
  list = res.data.list
}
listInfo()
const sendFeedback = async () => {
  let val = await formRef.value.validate()
  if (val) return
  let res = await postFeedBackCreateApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  Object.assign(form, res.data)
}
</script>
<template>
  <div class="blog_feed_back">
    <div class="form">
      <a-form ref="formRef" :model="form" :label-col-props="{ span: 0 }" :wrapper-col-props="{ span: 24 }">
        <a-form-item>
          <a-input
            v-model="form.email"
            field="email"
            :rules="[
              { required: true, message: '邮箱不能是空的', type: 'string' },
              { required: true, message: '邮箱格式不正确', type: 'email' },
            ]"
            :validate-trigger="['focus']"
            placeholder="请输入邮箱"></a-input>
        </a-form-item>
        <a-form-item>
          <a-textarea
            show-word-limit
            :max-length="160"
            :auto-size="{ maxRows: 5, minRows: 6 }"
            v-model="form.content"
            field="content"
            placeholder="请输入反馈内容"
            :rules="[{ required: true, message: '反馈内容不能是空的' }]"
            :validate-trigger="['focus']"></a-textarea>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" style="width: 100%" @click="sendFeedback">发布</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="feed_back_list">
      <div class="title">反馈列表</div>
      <div class="list">
        <div class="item" v-for="item in list">
          <div class="content">
            <a-typography-paragraph
              :ellipsis="{
                rows: 1,
                showTooltip: true,
                css: true,
              }">
              {{ item.content }}
            </a-typography-paragraph>
          </div>
          <div class="date">{{ dateFormat(item.created_at) }}</div>
        </div>
      </div>
      <div class="page">
        <a-pagination :total="50" />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.blog_feed_back {
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
  .form {
    padding: 20px;
  }
  .feed_back_list {
    color: var(--color-text-2);
    padding: 20px;
    .list {
      margin-top: 20px;
      .item {
        margin-bottom: 10px;
        padding: 20px;
        background-color: var(--color-fill-2);
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
        .arco-typography {
          margin-bottom: 0;
        }
        .content {
          white-space: nowrap;
          display: flex;
          align-items: center;
        }
        .date {
          white-space: nowrap;
          display: flex;
          align-items: center;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    .page {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
