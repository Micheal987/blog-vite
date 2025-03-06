<script lang="ts" setup>
const props = defineProps<{
  title: string
}>()
</script>
<template>
  <div class="blog_title">
    {{ props.title }}
  </div>
</template>
<style lang="scss">
.blog_title {
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  &::before {
    width: 4px;
    height: 1.5rem;
    margin-right: 5px;
    content: '';
    display: inline-block;
    background-color: var(--active);
  }
}
</style>
