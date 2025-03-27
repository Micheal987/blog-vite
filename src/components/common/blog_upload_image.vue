<script lang="ts" setup>
import { useStoreConfig } from '@/store'
import { type FileItem, Message } from '@arco-design/web-vue'
import type { ResponseResult } from '@/api/axios'
import { ref, watch } from 'vue'
const store = useStoreConfig()
interface Props {
  modelVal: string
  placeholder?: string
}
const props = defineProps<Props>()
const { placeholder = '图片上传链接' } = props
const imageStr = ref('')
//watch
watch(
  () => props.modelVal,
  () => {
    imageStr.value = props.modelVal
  },
)
const emits = defineEmits<{
  (e: 'updateImage', value: string): void
}>()

const valueInput = (value: string) => {}
const setHeader = {
  token: store.userInfo.token,
}
const imageSuccessEnet = (file: FileItem) => {
  const response = file.response as ResponseResult<any>
  if (response.code) {
    Message.error(response.msg)
    return
  }
  Message.success(response.msg)
  imageStr.value = response.data[0].file_name as any
}
//watch方法
watch(imageStr, () => {
  emits('updateImage', imageStr.value)
})
</script>
<template>
  <div class="blog_upload_image">
    <div class="line">
      <a-input :placeholder="placeholder" v-model="imageStr" @input="valueInput"></a-input>
      <a-upload
        :show-file-list="false"
        action="/api/images"
        name="images"
        :headers="setHeader"
        @success="imageSuccessEnet" />
    </div>
    <a-image :src="imageStr" height="80px" v-if="imageStr"></a-image>
  </div>
</template>
<style lang="scss">
.blog_upload_image {
  width: 100%;

  .line {
    display: flex;

    .arco-upload-wrapper {
      display: inherit;
    }
    .arco-image-img {
      margin-top: 10px;
      object-fit: cover;
      max-width: 100%;
      border-radius: 5px;
    }
    .arco-btn {
      margin-left: 10px;
    }
  }
}
</style>
