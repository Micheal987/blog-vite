<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { MenuCreateRequest } from '@/api/menu/menu_api'
//props
const props = defineProps<{
  visible: boolean //modal
}>()
//emits
const emits = defineEmits<{
  update: [visible: boolean]
  ok: [vaule: boolean]
}>()
//form
const form = reactive<MenuCreateRequest & { abstractString: string }>({
  title: '',
  path: '',
  slogan: '',
  abstract: [],
  abstract_time: 1,
  banner_time: 1,
  sort: 1,
  image_sort_list: [],
  abstractString: '',
})
//ref
const formRef = ref()

//创建菜单
const createtMenu = async () => {
  let val = await formRef.value.validate() //验证规则为undfind代表验证通过
  if (val) return false //有值代表校验不通过
  form.abstract = form.abstractString.split('\n') //按\n分
}
</script>
<template>
  <div>
    <!-- modal -->
    <a-modal title="创建菜单" :visible="props.visible" @cancel="emits('update', false)" v-on:before-ok="createtMenu">
      <!-- form -->
      <a-form ref="formRef" :model="form">
        <!-- 菜单标题  required-->
        <a-form-item
          field="title"
          label="菜单标题"
          :rules="[{ required: true, message: '菜单标题不能为空' }]"
          :validate-trigger="['blur']">
          <a-input v-model="form.title" placeholder="请输入菜单标题"> </a-input>
        </a-form-item>
        <!-- 路径 required-->
        <a-form-item
          field="path"
          label="路径"
          :rules="[{ required: true, message: '路径不能为空' }]"
          :validate-trigger="['blur']">
          <a-input v-model="form.path" placeholder="请输入路径"> </a-input>
        </a-form-item>
        <!-- slogan -->
        <a-form-item field="slogan" label="slogan" :validate-trigger="['blur']">
          <a-input v-model="form.slogan" placeholder="请输入slogan"> </a-input>
        </a-form-item>
        <!-- 简介 -->
        <a-form-item field="abstractString" label="简介" :validate-trigger="['blur']">
          <a-textarea
            v-model="form.abstractString"
            placeholder="请输入简介"
            :auto-size="{ minRows: 4, maxRows: 4 }"></a-textarea>
        </a-form-item>
        <!-- 序号 -->
        <a-form-item field="sort" label="序号" :validate-trigger="['blur']">
          <a-input-number v-model="form.sort" placeholder="请输入序号"></a-input-number>
        </a-form-item>
        <!-- 简介切换时间 -->
        <a-form-item field="abstract_time" label="简介切换时间" :validate-trigger="['blur']">
          <a-input-number v-model="form.abstract_time" placeholder="选择简介切换时间"></a-input-number>
        </a-form-item>
        <!-- slogan切换时间 -->
        <a-form-item field="slogan" label="slogan切换时间" :validate-trigger="['blur']">
          <a-input-number v-model="form.abstract_time" placeholder="选择slogan切换时间"></a-input-number>
        </a-form-item>
        <!-- banners图 -->
        <a-form-item field="image_sort_list" label="banners图" :validate-trigger="['blur']">
          <a-select v-model="form.image_sort_list" placeholder="选择banners图"></a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
