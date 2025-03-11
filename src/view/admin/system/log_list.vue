<script setup lang="ts">
import { getLogList, getReadLogListApi, type LogRequestType, type LogType } from '@/api/log/log_api'
import Blog_table from '@/components/admin/blog_table.vue'
import type { RecordType } from '@/components/admin/blog_table.vue'
import { reactive, ref, h, nextTick, createApp } from 'vue'
import { Tag } from '@arco-design/web-vue'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
import { dateTimeFormat, dateFormat } from '@/utils/date'
const cloumnDict = {
  1: [
    { title: 'id', dataIndex: 'id' },
    { title: 'ip', dataIndex: 'ip' },
    { title: '地址', slotName: 'address' },
    { title: '等级', dataIndex: 'level' },
    { title: '标题', slotName: 'title' },
    {
      title: '状态',
      dataIndex: 'status',
      render: (data: any) => {
        if (data == null || undefined) return
        const record = data.record as LogType
        if (record.status) {
          return h(Tag, { color: 'blue' }, { default: () => '成功' })
        }
        return h(Tag, { color: 'red' }, { default: () => '失败' })
      },
    },
    { title: '用户名', slotName: 'userName' },
    { title: '密码', dataIndex: 'content' },
    { title: '日志时间', slotName: 'date' },
    { title: '操作', slotName: 'action' },
  ],
  2: [
    { title: 'id', dataIndex: 'id' },
    { title: 'ip', dataIndex: 'ip' },
    { title: '地址', slotName: 'address' },
    {
      title: '等级',
      dataIndex: 'level',
      render: (data: any) => {
        if (data == null || undefined) return
        const record = data.record as LogType
        switch (record.level) {
          case 'debug':
            return h(Tag, { color: 'blue' }, { default: () => 'debug' })
          case 'info':
            return h(Tag, { color: 'grenn' }, { default: () => 'info' })
          case 'warning':
            return h(Tag, { color: 'yellow' }, { default: () => 'warning' })
          case 'error':
            return h(Tag, { color: 'red' }, { default: () => 'error' })
        }
      },
    },
    { title: '用户名', slotName: 'userName' },
    { title: '标题', dataIndex: 'title' },
    { title: '日志时间', dataIndex: 'date' },
    { title: '操作', slotName: 'action' },
  ],
  3: [
    { title: 'id', dataIndex: 'id' },
    { title: '标题', slotName: 'title' },
    { title: '服务', dataIndex: 'server' },
    {
      title: '等级',
      dataIndex: 'level',
      render: (data: any) => {
        if (data == null || undefined) return
        const record = data.record as LogType
        switch (record.level) {
          case 'debug':
            return h(Tag, { color: 'blue' }, { default: () => 'debug' })
          case 'info':
            return h(Tag, { color: 'grenn' }, { default: () => 'info' })
          case 'warning':
            return h(Tag, { color: 'yellow' }, { default: () => 'warning' })
          case 'error':
            return h(Tag, { color: 'red' }, { default: () => 'error' })
        }
      },
    },
    { title: '服务', dataIndex: 'serviceName' },
    { title: '日志时间', slotName: 'date' },
    { title: '操作', slotName: 'action' },
  ],
}
const logTypeOptions = [
  { lable: '登录日志', value: 1 },
  { lable: '操作日志', value: 2 },
  { lable: '运行日志', value: 3 },
  { lable: 'debug日志', value: 4 },
]
const levelTypeOptions = [
  { lable: 'warning', value: 1 },
  { lable: 'error', value: 2 },
  { lable: 'debug', value: 3 },
]
// blog_table父组件 a-table 显示的字段--头部
const params = reactive<LogRequestType>({
  level: undefined,
  type: 1,
  ip: undefined,
  userID: undefined,
  addr: undefined,
  date: undefined,
  status: undefined,
  userName: undefined,
})
//使用parmas 判断
const columns = ref(cloumnDict[params.type as keyof typeof cloumnDict])
const selectDropdown = (val: string, cloumn: 'userName' | 'addr' | 'date') => {
  if (cloumn == 'date') {
    val = dateFormat(val)
  }
  params[cloumn] = val
  infoList()
}
const statusOptions = [
  { label: '成功', value: true },
  { label: '失败', value: false },
]
const visible = ref(false) //modal 开关
//ref
const blogTableRef = ref()
//
const logTypeChange = () => {
  blogTableRef.value.clearData()
  columns.value = cloumnDict[params.type as keyof typeof cloumnDict]
  blogTableRef.value.infoList(params)
}
const infoList = () => {
  if (params.status == '') {
    params.status == undefined
  }
  blogTableRef.value.infoList(params)
}
const add = () => {
  // Object.assign(recordData, defaultPromotionForm)
  // recordData.id = undefined
  visible.value = true
}
//emit --emit
const edit = (record: RecordType<any>) => {
  console.log(record)
  // Object.assign(recordData, record)
  visible.value = true
}

//删除
const removes = (idList: (string | number)[]) => {
  console.log(idList)
}
const logContent = ref('')
const readLog = async (record: LogType) => {
  if (!record.readStatus) {
    await getReadLogListApi(record.id)
    record.readStatus = true
  }
  logContent.value = record.content
  visible.value = true
  nextTick(() => {
    jsonPreview()
  })
}
const jsonPreview = () => {
  let jsonDomList = document.querySelectorAll('.log_json_body')
  jsonDomList.forEach((value: Element) => {
    if (value.innerHTML === '') return
    let jsonObj = JSON.parse(value.innerHTML)
    // 生成虚拟dom
    const vNode = h(VueJsonPretty, { data: jsonObj, deep: 1 })
    // 创建虚拟节点
    const app = createApp({ render: () => vNode })
    //挂载
    app.mount(value)
  })
}
</script>
<template>
  <div class="log_list_view">
    <a-modal title="日志详情" width="50%" v-model:visible="visible" :footer="false" body-class="log_modal_body">
      <div class="log_modal_content" v-html="logContent"></div>
    </a-modal>
    <Blog_table
      :url="getLogList as any"
      :columns="columns"
      ref="blogTableRef"
      search-placeholder="搜索日志名称"
      defualtDel
      :defualt-params="params"
      :limit="10"
      @add="add"
      @edit="edit"
      no-edit
      no-check
      @remove="removes">
      <!-- search -->
      <template #action_other_search>
        <!-- 搜索用户名称 -->
        <div class="search_user">
          <a-input
            v-model="params.userName"
            placeholder="搜索用户名称"
            @change="infoList"
            @keyup.enter="infoList"></a-input>
        </div>
        <div class="search_addr">
          <a-input v-model="params.addr" placeholder="搜索地址" @change="infoList" @keyup.enter="infoList"></a-input>
        </div>
        <!-- 状态过滤 -->
        <div class="filter_status" v-if="params.type == 1">
          <a-select
            v-model="params.status"
            style="width: 200px"
            :options="statusOptions"
            placeholder="状态过滤"
            allow-clear
            @change="infoList"></a-select>
        </div>
        <!-- 等级过滤 -->
        <div class="filter_status" v-if="params.type == 2 || params.type == 3">
          <a-select
            v-model="params.level"
            style="width: 200px"
            :options="levelTypeOptions"
            placeholder="等级过滤"
            allow-clear
            @change="infoList"></a-select>
        </div>
        <!-- 时间 -->
        <div class="search_date">
          <a-date-picker v-model="params.date" style="width: 200px" />
        </div>
        <div class="check_log_type">
          <a-radio-group v-model="params.type" :options="logTypeOptions" @change="logTypeChange"></a-radio-group>
        </div>
      </template>
      <template #userName="{ record }: { record: LogType }">
        <a-dropdown
          trigger="contextMenu"
          alignPoint
          :style="{ display: 'block' }"
          @select="selectDropdown($event as string, 'userName')">
          <div style="cursor: pointer">{{ record.userName }}</div>
          <template #content>
            <a-doption :value="record.userName">只看该用户的</a-doption>
          </template>
        </a-dropdown>
      </template>
      <template #address="{ record }: { record: LogType }">
        <a-dropdown
          trigger="contextMenu"
          alignPoint
          :style="{ display: 'block' }"
          @select="selectDropdown($event as string, 'addr')">
          <div style="cursor: pointer">{{ record.address }}</div>
          <template #content>
            <a-doption :value="record.address">只看该用户的</a-doption>
          </template>
        </a-dropdown>
      </template>
      <template #date="{ record }: { record: LogType }">
        <a-dropdown
          trigger="contextMenu"
          alignPoint
          :style="{ display: 'block' }"
          @select="selectDropdown($event as string, 'date')">
          <div style="cursor: pointer">{{ dateTimeFormat(record.created_at) }}</div>
          <template #content>
            <a-doption :value="record.created_at">只看该用户的</a-doption>
          </template>
        </a-dropdown>
      </template>
      <template #title="{ record }: { record: LogType }">
        <div class="log_cloumn_title">
          <span @click="readLog(record)" :class="{ isRead: record.readStatus }">{{ record.title }}</span>
        </div>
      </template>
    </Blog_table>
  </div>
</template>
<style lang="scss">
@mixin logLable($title, $color: --color-text-2) {
  &::before {
    display: block;
    content: $title;
    position: absolute;
    right: 10px;
    top: 10px;
    color: $color;
    font-size: 12px;
  }
}
.log_modal_body {
  max-height: 60px;
  overflow-y: auto;
  .log_modal_content {
    color: var(--color-text-2);
    > div {
      padding: 20px;
      background-color: var(--color-fill-2);
      margin-bottom: 20px;
      border-radius: 5px;
      position: relative;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .log_request_head {
    @include logLable('请求头');
  }
  .log_request {
    @include logLable('请求');
    .log_request_head {
      .log_request_method {
        font-weight: 700;
        &.deltel {
          color: var(--red-6);
          & ~ .log_request_path {
            color: rgb(var(---red-4));
          }
        }
        &.put {
          color: rgb(var(--orange-6));
          & ~ .log_request_path {
            color: rgb(var(--orange-4));
          }
        }
        &.post {
          color: rgb(var(--green-6));
          & ~ .log_request_path {
            color: rgb(var(--green-4));
          }
        }
        &.get {
          color: rgb(var(--arcoblue-5));
          & ~ .log_request_path {
            color: rgb(var(--arcoblue-4));
          }
        }
      }
    }
    .log_request_body {
      .log_json_body {
      }
    }
  }
  .log_item {
    display: flex;
    .log_item_label {
      font-weight: 600;
      white-space: nowrap;
      &::after {
        content: ':';
        display: inline-block;
        margin-right: 10px;
      }
    }
    .log_item_content {
      word-break: break-all;
    }

    &.info {
      @include logLable('info', rgb(var(--arcoblue-5)));
    }

    &.warning {
      @include logLable('warning', rgb(var(--orange-5)));
    }

    &.error {
      @include logLable('error', rgb(var(--red-6)));
    }
  }
  .log_response {
    @include logLable('响应');
  }
  .vjs-tree-node.is-highlight,
  .vjs-tree-node:hover {
    background-color: var(--color-fill-1);
  }
  .vjs-value {
    white-space: break-spaces;
  }
}
.log_list_view {
  .log_cloumn_title {
    span {
      color: var(--active);
      cursor: pointer;
      &.isRead {
        color: var(--color-text-2);
      }
    }
  }
}
</style>
