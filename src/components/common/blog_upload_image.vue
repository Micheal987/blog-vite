<script lang="ts" setup>
// const imageStr = ref('')
const props = defineProps<{
  modelVal: string
}>()
const emits = defineEmits<{
  updateImage: [value: string]
}>()
//watch方法
// watch(imageStr, () => {
//   console.log(imageStr.value)
//   emits('updateImage', imageStr.value)
// })
const valueInput = (value: string) => {
  emits('updateImage', value)
  console.log(value)
}
</script>
<template>
  <div class="blog_upload_image">
    <div class="line">
      <a-input placeholder="上传图片链接" :default-value="props.modelVal" @input="valueInput"></a-input>
      <a-button>上传</a-button>
    </div>
    <a-image-preview :src="props.modelVal"></a-image-preview>
  </div>
</template>
<style lang="scss">
.blog_upload_image {
  width: 100%;
  .line {
    display: flex;
    .arco-btn {
      margin-left: 10px;
    }
  }
}
</style>
