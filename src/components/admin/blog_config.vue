<script lang="ts" setup>
import type { ResponseResult } from '@/api/axios'
import Blog_help from './blog_help.vue'
import Blog_title from '../common/blog_title.vue'
import {
  type SettingNameType,
  type HelpDataType,
  type SettingType,
  putSettingUpdateApi,
  getSettingInfoApi,
} from '@/api/setting/setting_api'
import { Message } from '@arco-design/web-vue'
import { reactive, ref } from 'vue'
import type { ConfigColumnType } from '@/types/setting'
const formRef = ref()
let form = reactive<SettingType>({
  secret: '',
  expires: 0,
  issuer: '',
})
interface Props {
  title: string
  name: SettingNameType
  cloumn: ConfigColumnType<any>[]
  form?: SettingType
  labelSpan?: number
  wrapperSpan?: number
  leftWidth?: number
  rightWidth?: number
  helpData?: HelpDataType[]
}
const props = withDefaults(defineProps<Props>(), {
  labelSpan: 5,
  wrapperSpan: 20,
  leftWidth: 50,
  rightWidth: 50,
})
const InfoDataList = async () => {
  let res = (await getSettingInfoApi(props.name)) as ResponseResult<SettingType>
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(form, res.data)
}
InfoDataList()
const InfoUpdate = async () => {
  let val = await formRef.value.validate()
  if (val) return
  let res = await putSettingUpdateApi(props.name, form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
}
</script>
<template>
  <div class="blog_config_components">
    <div class="left" :style="{ '--col': leftWidth + '%' }">
      <div class="site_info">
        <slot name="alert"></slot>
        <Blog_title :title="props.title"></Blog_title>
        <a-form
          ref="formRef"
          :model="form"
          :label-col-props="{ span: labelSpan }"
          :wrapper-col-props="{ span: wrapperSpan }">
          <a-form-item
            v-for="item in cloumn"
            :label="item.label"
            :field="(item.field as keyof SettingType)"
            :rules="item.rules"
            :type="item.inputType"
            :validate-trigger="['blur']">
            <template v-if="item.type == 'boolean'">
              <a-switch v-model="form[(item.field as keyof SettingType)]"></a-switch>
            </template>
            <template v-else-if="item.type == 'number'">
              <a-input-number
                v-model="form[(item.field as keyof SettingType)]"
                :placeholder="item.placeholder"></a-input-number>
            </template>
            <template v-else>
              <a-input v-model="form[(item.field as keyof SettingType)]" :placeholder="item.placeholder"></a-input>
            </template>
          </a-form-item>
        </a-form>
      </div>
      <div class="site_config_update">
        <a-button type="primary" @click="InfoUpdate">更新</a-button>
      </div>
    </div>
    <div class="right" :style="{ '--col': rightWidth + '%' }">
      <Blog_help v-if="props.helpData" :data="props.helpData" />
    </div>
  </div>
</template>
<style lang="scss">
.blog_config_components {
  display: flex;

  .left {
    width: var(--col);
    .site_info {
    }

    .site_config_update {
      margin-top: 20px;
    }
  }

  .arco-form {
    margin-top: 20px;
  }

  .right {
    width: var(--col);
    margin-top: 10px;
    margin-left: 20px;
    img {
      max-width: 100%;
    }
  }
}
</style>
