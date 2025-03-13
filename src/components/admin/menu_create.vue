<script lang="ts" setup>
import { reactive, ref } from 'vue'
import {
  type BannerType,
  type ImageSortType,
  type MenuCreateRequest,
  postMenuCreateApi,
  putMenuUpdateApi,
} from '@/api/menu/menu_api'
import type { ImageType } from '@/api/image/image_api'
import { getImageInfoApi } from '@/api/image/image_api'
import { Message } from '@arco-design/web-vue'
import { defaultMenuFrom } from '@/api/menu/menu_api'
//props
const props = defineProps<{
  visible: boolean //modal
  record: MenuCreateRequest & { banners: BannerType[]; id?: number }
}>()
//emits
const emits = defineEmits<{
  (e: 'update', visible: boolean): void
  (e: 'ok', value: boolean): void
}>()
//default

//form
const form = reactive<MenuCreateRequest & { abstractString: string; imageIdList: number[] }>({
  title: '',
  path: '',
  slogan: '',
  abstract: [],
  abstract_time: 1,
  banner_time: 1,
  sort: 1,
  image_sort_list: [],
  abstractString: '',
  imageIdList: [],
})
//ref
const formRef = ref()

//edit
const editId = ref<number | undefined>(undefined)

let imageList = ref<ImageType[]>([])
const imageInfo = async () => {
  const res = await getImageInfoApi()
  imageList.value = res.data
}
imageInfo()

const beforeOpen = () => {
  Object.assign(form, props.record)
  //abs
  form.abstractString = props.record.abstract.join('\n')
  //banners
  const imageIdsList: number[] = []
  for (const banner of props.record.banners) {
    imageIdsList.push(banner.id)
  }
  form.imageIdList = imageIdsList //list
  editId.value = props.record.id //edit
}
//创建菜单
const okHandler = async () => {
  let val = await formRef.value.validate() //验证规则为undefined代表验证通过
  if (val) return false //有值代表校验不通过
  form.abstract = form.abstractString.split('\n') //按\n分
  //
  let imageSortIdList: ImageSortType[] = []
  for (let i = 0; i < form.imageIdList.length; i++) {
    const imageIds = form.imageIdList[i]
    imageSortIdList.push({
      image_id: imageIds,
      sort: form.imageIdList.length - i,
    })
  }
  form.image_sort_list = imageSortIdList
  console.log('imageSortIdList', imageSortIdList)
  let res
  if (editId.value) {
    res = await putMenuUpdateApi(editId.value as number, form)
  } else {
    res = await postMenuCreateApi(form)
  }
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  Object.assign(form, defaultMenuFrom)
  emits('update', false)
  emits('update', false)
  return true
}
</script>
<template>
  <div>
    <!-- modal -->
    <a-modal
      :title="editId ? '编辑菜单' : '创建菜单'"
      :visible="props.visible"
      @before-open="beforeOpen"
      @cancel="emits('update', false)"
      v-on:before-ok="okHandler">
      <!-- form -->
      <a-form ref="formRef" :model="form">
        <!-- 菜单标题  required-->
        <a-form-item
          field="title"
          label="菜单标题"
          :rules="[{ required: true, message: '菜单标题不能为空' }]"
          :validate-trigger="['blur']">
          <a-input v-model="form.title" placeholder="请输入菜单标题"></a-input>
        </a-form-item>
        <!-- 路径 required-->
        <a-form-item
          field="path"
          label="路径"
          :rules="[{ required: true, message: '路径不能为空' }]"
          :validate-trigger="['blur']">
          <a-input v-model="form.path" placeholder="请输入路径"></a-input>
        </a-form-item>
        <!-- slogan -->
        <a-form-item field="slogan" label="slogan" :validate-trigger="['blur']">
          <a-input v-model="form.slogan" placeholder="请输入slogan"></a-input>
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
        <!-- 选择banners图 -->
        <a-form-item field="image_sort_list" label="banners图" :validate-trigger="['blur']">
          <a-select v-model="form.imageIdList" multiple placeholder="选择banners图" allow-clear>
            <a-option v-for="item in imageList" :key="item.id" :value="item.id">
              <div class="banners_image_div">
                <img height="40px" :src="'http://127.0.0.1:8000/' + item.path" alt="" />
                <span>{{ item.name }}</span>
              </div>
            </a-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<style lang="scss">
.banners_image_div {
  display: flex;
  align-items: center;
  padding: 0 10px;

  img {
    height: 40px;
    border-radius: 10px;
    margin-right: 5px;
  }
}
</style>
