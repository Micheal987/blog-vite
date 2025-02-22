<script lang="ts" setup>
import { RouterView } from 'vue-router'
import { useStoreConfig } from '@/store/index'
const store = useStoreConfig()
store.loadTheme()
store.loadToken()
</script>
<template>
  <RouterView />
</template>
