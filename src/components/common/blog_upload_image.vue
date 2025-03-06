<script lang="ts" setup>
import { useStoreConfig } from '@/store'
import { type FileItem, Message } from '@arco-design/web-vue'
import type { ResponseResult } from '@/api/axios'
import { ref, watch } from 'vue'
const store = useStoreConfig()
const props = defineProps<{
  modelVal: string
}>()
const imageStr = ref('')
watch(()=>props.modelVal,()=>{
  imageStr.value = props.modelVal
})
const emits = defineEmits<{
  updateImage: [value: string]
}>()

const valueInput = (value: string) => {
  console.log(value)
}
const setHeader = {
  token: store.userInfo.token,
}
const imageSuccessEnet = (file:FileItem)=>{
  const response = file.response as ResponseResult<any>
  if (response.code) {
    Message.error(response.msg)
    return
  }
  Message.success(response.msg)
  imageStr.value = response.data[0].file_name as any
  console.log(file)
}
//watch方法
watch(imageStr, () => {
  console.log(imageStr.value)
  emits('updateImage', imageStr.value)
})
</script>
<template>
  <div class="blog_upload_image">
    <div class="line">
      <a-input placeholder="上传图片链接" v-model="imageStr" @input="valueInput"></a-input>
      <a-upload :show-file-list="false" action="/api/images" name="images" :headers="setHeader"  @success="imageSuccessEnet" />
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
    .arco-image-img{
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
