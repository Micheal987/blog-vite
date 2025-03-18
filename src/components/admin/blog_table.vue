<script lang="ts" setup>
import type { ListDateType, ListRequest, PageParamType, ResponseResult } from '@/api/axios'
import { IconRefresh } from '@arco-design/web-vue/es/icon'
import { reactive, ref, type Component } from 'vue'
import { Message, type TableColumnData, type TableRowSelection } from '@arco-design/web-vue'
import { dateTimeFormat } from '@/utils/date'
import type { optionType } from '@/types'
import { defaultDeleteApi, defaultOptionApi } from '@/api'
import { useRoute } from 'vue-router'

const routes = useRoute()
//tab数据
const data = reactive<ListDateType<any>>({
  list: [],
  count: 0,
})

//批量操作组actionOption
export interface actionOptionType extends optionType {
  callback?: (idList: (string | number)[]) => Promise<boolean>
}

//过滤组
type filterFn = (params?: PageParamType) => Promise<ResponseResult<optionType[]>>

export interface filterOptionType extends optionType {
  column: string
  source: optionType[] | string | filterFn | Promise<ResponseResult<optionType[]>> //可以是现成的数据也可以是url地址也可以是一个函数
  options?: optionType[]
}

//props
//Promise<ResponseResult<ListDateType<ArticleType>>>
interface Props {
  url: (params: PageParamType) => Promise<ResponseResult<ListDateType<any>>> | ListRequest<any>
  columns: TableColumnData[] //定义的操作组
  limit?: number //分页每一页几条
  rowKey?: string //用户id
  labelName?: string //创建用户
  defaultDel?: boolean //默认删除
  noActionGroup?: boolean //不启用操作组
  actionGroup?: actionOptionType[] //操作组
  noCheck?: boolean //不能选择
  filterGroup?: filterOptionType[] //过滤组
  noConfirm?: boolean //关闭操作组的确认
  noAdd?: boolean //没有添加按钮
  noDelete?: boolean //没有删除按钮
  noEdit?: boolean //没有编辑按钮
  searchPlaceholder?: string //模糊搜索
  defaultParams?: PageParamType & any //第一次查询的参数
  noPage?: boolean
}

//props
const props = defineProps<Props>()
//props 默认值
const { rowKey = 'id', labelName = '添加', searchPlaceholder = '搜索' } = props
//init
//组件
const selectedKeys = ref<number[] | string[]>([])
const rowSelection = reactive<TableRowSelection>({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
})
//defineEmits
export type RecordType<T> = T & {}
const emit = defineEmits<{
  (e: 'add', value: boolean): void //添加
  (e: 'edit', record: RecordType<any>): void //编辑
  (e: 'remove', idList: number[]): void //组件传参删除
}>()
//init操作组
const actionOptions = ref<actionOptionType[]>([{ label: '批量删除', value: 0 }]) //操作组选项之一
const actionValue = ref<number | string | undefined | ''>(undefined) //执行按钮定义
//init操作组
const initActionGroup = () => {
  //判断props.actionGroup
  if (!props.actionGroup) return
  //val使用循环的index下标
  for (let i = 0; i < props.actionGroup.length; i++) {
    actionOptions.value.push({
      label: props.actionGroup[i].label,
      value: i + 1,
      callback: props.actionGroup[i].callback,
    })
  }
}
initActionGroup()
//执行方法
//批量删除
const actionMethod = () => {
  if (actionValue.value == undefined) return
  if (actionValue.value == 0) {
    // 判断是不是1
    if (selectedKeys.value.length == 0) {
      Message.error('请选择删除的数据')
      return
    }
    removeIdsDate(selectedKeys.value as number[])
    return
  }
  //执行操作
  const action = actionOptions.value[actionValue.value as number]
  //通过回调函数判断
  if (!action.callback) return
  action.callback(selectedKeys.value).then((res) => {
    if (res) {
      selectedKeys.value = []
      infoList()
      return
    } else {
      Message.error('操作失败')
    }
  })
}
//过滤操作init
const filterGroup = ref<filterOptionType[]>([])
const initFilter = async () => {
  if (!props.filterGroup) return
  for (let i = 0; i < props.filterGroup.length; i++) {
    //处理source的数据
    const item = props.filterGroup[i]
    let source: optionType[] = []
    switch (typeof item.source) {
      case 'object':
        source = item.source as optionType[]
        break
      case 'string':
        let res1 = await defaultOptionApi(item.source as string)
        source = res1.data
        break
      case 'function':
        let res = await (item.source as filterFn)()
        console.log(res)
        source = res.data
        break
    }
    filterGroup.value.push({
      label: item.label,
      value: item.value ? item.value : i,
      column: item.column,
      options: source,
      source: item.source,
    })
  }
}
initFilter()
//过滤
const filterChange = (item: any, val: any) => {
  infoList({ [item.column]: val })
}
const add = () => {
  emit('add', true)
}
const edit = (record: RecordType<any>) => {
  emit('edit', record)
}
const removes = (record: RecordType<any>) => {
  //id切片
  let ids = record[rowKey]
  if (ids == undefined) {
    ids = record.ID
  }
  removeIdsDate([ids])
}
//删除
const removeIdsDate = async (idList: number[]) => {
  //父组件传删除的bool
  if (!props.defaultDel) {
    Message.error('删除未配置')
    return
  }
  //请求
  //删除接口都是要传idlist
  //接口都是按_分取第一部分即index为0
  let path = routes.name as string
  let url = path.split('_')
  console.log(url, 'url')
  let res = await defaultDeleteApi(url[0], idList)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  emit('remove', idList)
  selectedKeys.value = [] //删除成功清空数据
  flush()
}
//api请求参数
const params = reactive<PageParamType>({
  page: 1,
  limit: props.limit ? props.limit : 10,
  key: '',
})
//页面loading变量
const loading = ref()

//api搜索
//进页面至少调用一次
const infoList = async (p?: PageParamType & any) => {
  if (p) {
    Object.assign(params, p)
  }
  console.log(p, params)
  loading.value = true //loading
  const res = await props.url(params)
  loading.value = false //loading 关闭
  if (res.code) {
    Message.error(res.msg)
    return
  }
  data.count = res.data.count
  data.list = res.data.list
}
//页码变化
const pageChange = () => {
  infoList()
}
//搜索
const search = () => {
  //回到第一页
  params.page = 1
  infoList()
}
//刷新
const flush = () => {
  infoList()
}

infoList(props.defaultParams)
const clearData = () => {
  data.list = []
  data.count = 0
}
defineExpose({
  infoList,
  clearData,
})
//infoList
</script>
<template>
  <div class="blog_table">
    <!-- spin 加载 spin width100% -->
    <a-spin class="blog_table_data_spin" :loading="loading" tip="加载中">
      <div>
        <div class="blog_table_head">
          <div class="action_create">
            <!-- 添加 -->
            <a-button type="primary" v-if="!props.noAdd" @click="add">{{ labelName }}</a-button>
          </div>
          <div class="action_group" v-if="!props.noActionGroup">
            <!-- 选项 -->
            <a-select
              v-model="actionValue"
              placeholder="操作"
              style="width: 150px"
              :options="actionOptions"
              allow-clear
              value-key="value">
              <!-- <a-option :value=""></a-option> -->
            </a-select>
            <!-- 二次确认气泡框 -->
            <a-popconfirm content="是否删除" v-if="!props.noConfirm" @ok="actionMethod">
              <a-button
                type="primary"
                status="danger"
                v-if="actionValue !== undefined && actionValue !== '' && actionValue != null"
                >执行</a-button
              >
            </a-popconfirm>
          </div>
          <div class="action_search">
            <a-input-search
              :placeholder="searchPlaceholder"
              v-model="params.key"
              @keyup.enter="search"
              @search="search" />
          </div>
          <slot name="action_other_search"></slot>
          <!-- 过滤 -->
          <div class="action_filter" v-if="filterGroup.length">
            <a-select
              style="width: 150px"
              :placeholder="item.label"
              :options="item.options"
              v-for="item in filterGroup"
              @change="filterChange(item, $event)"
              allow-clear></a-select>
          </div>
          <!-- slot -->
          <slot name="action_filter_other"></slot>
          <slot name="action_slot"></slot>
          <!-- slot -->
          <!-- 刷新 -->
          <div class="action_flush">
            <a-button @click="flush">
              <IconRefresh></IconRefresh>
            </a-button>
          </div>
        </div>
        <div class="blog_table_data">
          <div class="blog_table_source">
            <!-- table -->
            <a-table
              :row-key="rowKey"
              :columns="props.columns"
              v-model:selectedKeys="selectedKeys as number[]"
              :row-selection="props.noCheck ? undefined : rowSelection"
              :data="data.list"
              :pagination="false">
              <template #columns>
                <template v-for="item in props.columns">
                  <!-- render -->
                  <a-table-column v-if="item.render" :title="(item.title as string)">
                    <template #cell="{ data }">
                      <component :is="item.render(data)  as Component"></component>
                    </template>
                  </a-table-column>
                  <!-- 操作组 -->
                  <a-table-column
                    v-else-if="!item.slotName"
                    :title="(item.title as string)"
                    :data-index="item.dataIndex"></a-table-column>
                  <!-- 自定义 slotName-->
                  <a-table-column :title="(item.title as string)" v-else>
                    <!-- action操作 -->
                    <template #cell="{ record }" v-if="item.slotName == 'action'">
                      <div class="blog_table_action">
                        <!-- action_left -->
                        <slot name="action_left" :record="record"></slot>
                        <a-button v-if="!props.noEdit" @click="edit(record)">编辑</a-button>
                        <!-- action_middle -->
                        <slot name="action_middle" :record="record"></slot>
                        <!-- 二次确认气泡框 -->
                        <a-popconfirm v-if="!props.noDelete" content="是否确认删除" @ok="removes(record)">
                          <a-button>删除</a-button>
                        </a-popconfirm>
                        <!-- action_right -->
                        <slot name="action_right" :record="record"></slot>
                      </div>
                    </template>
                    <!-- 时间处理 -->
                    <template #cell="{ record }" v-else-if="item.slotName == 'created_at'">
                      <span>{{ dateTimeFormat(record.created_at) }}</span>
                    </template>
                    <!--父组件的slot -->
                    <template #cell="{ record }" v-else>
                      <slot :name="item.slotName" :record="record"></slot>
                    </template>
                  </a-table-column>
                </template>
              </template>
            </a-table>
          </div>
          <!-- 分页 -->
          <div class="blog_table_page" v-if="!props.noPage">
            <a-pagination
              :total="data.count"
              v-model:current="params.page"
              @change="pageChange"
              :default-page-size="params.limit"
              show-total
              show-jumper
              show-page-size />
          </div>
        </div>
      </div>
    </a-spin>
  </div>
</template>
<style lang="scss">
.blog_table {
  background-color: var(--color-bg-1);
  border-radius: 10px;

  .blog_table_data_spin {
    width: 100%;

    .blog_table_head {
      padding: 20px 20px 10px 20px;
      border-bottom: 1px solid var(--bg);
      display: flex;
      align-items: center;
      position: relative;

      > div {
        margin-right: 10px;
      }

      .action_group {
        display: flex;

        button {
          margin-left: 10px;
          padding: 10px 10px;
          border-radius: 5px;
        }
      }

      .action_filter {
        display: flex;

        > .arco-select {
          margin-right: 10px;
        }
      }

      .action_create {
        button {
          border-radius: 5px;
        }
      }

      .action_flush {
        position: absolute;
        right: 0;
        margin-right: 10px;

        button {
          padding: 0 10px;
          border-radius: 5px;
        }
      }
    }

    .blog_table_data {
      padding: 10px 20px 20px 20px;

      .blog_table_source {
        font-size: 24px;

        .blog_table_action {
          > button {
            margin-right: 10px;

            &:last-child {
              margin-right: 0;
            }
          }
        }
      }

      .blog_table_page {
        padding-top: 25px;
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
