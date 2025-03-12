<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { ImageType } from '@/api/image/image_api'
import { getImageInfoApi } from '@/api/image/image_api'
import { Message } from '@arco-design/web-vue'
import blog_upload_image from '@/components/common/blog_upload_image.vue'
import {
  defaultPromotionForm,
  postCreateAdvertApi,
  putUpdateAdvertApi,
  type promotionCreateType,
} from '@/api/promotion/promotion_api'
//props
const props = defineProps<{
  visible: boolean //modal
  record: promotionCreateType
}>()
//emits
const emits = defineEmits<{
  (e:'update',visible:boolean):void
  (e:'ok',value:boolean):void
}>()
//default

//form
const form = reactive<promotionCreateType>({
  href: '',
  images: '',
  is_show: false,
  title: '',
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
  editId.value = props.record.id //edit
}
//创建菜单
const okHandler = async () => {
  let val = await formRef.value.validate() //验证规则为undefined代表验证通过
  console.log('ok', val)
  if (val) return false //有值代表校验不通过
  let res
  if (editId.value) {
    res = await putUpdateAdvertApi(editId.value as number, form)
  } else {
    res = await postCreateAdvertApi(form)
  }
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  Object.assign(form, defaultPromotionForm)
  emits('update', false)
  emits('update', false)
}
//emits--updateImage
const updateImage = (val: string) => {
  form.images = val
  console.log('updateImage', val)
}
</script>
<template>
  <div>
    <!-- modal -->
    <a-modal
      :title="editId ? '编辑广告' : '创建广告'"
      :visible="props.visible"
      @before-open="beforeOpen"
      @cancel="emits('update', false)"
      v-on:before-ok="okHandler">
      <!-- form -->
      <a-form ref="formRef" :model="form">
        <!-- 广告标题  required-->
        <a-form-item
          field="title"
          label="广告标题"
          :rules="[{ required: true, message: '广告标题不能为空' }]"
          :validate-trigger="['blur']">
          <a-input v-model="form.title" placeholder="请输入广告标题"></a-input>
        </a-form-item>
        <!-- 跳转链接 required-->
        <a-form-item
          field="href"
          label="跳转链接"
          :rules="[{ required: true, message: '跳转链接不能为空' }]"
          :validate-trigger="['blur']">
          <a-input v-model="form.href" placeholder="请输入跳转链接"></a-input>
        </a-form-item>
        <!-- 图片链接 required -->
        <a-form-item
          field="images"
          label="图片链接"
          :rules="[{ required: true, message: '图片链接不能为空' }]"
          :validate-trigger="['blur']">
          <blog_upload_image
            @updateImage="updateImage"
            v-model="form.images"
            :model-val="form.images"></blog_upload_image>
        </a-form-item>
        <!-- 是否显示 -->
        <a-form-item field="abstractString" label="是否显示" :validate-trigger="['blur']">
          <a-switch v-model="form.is_show"></a-switch>
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
