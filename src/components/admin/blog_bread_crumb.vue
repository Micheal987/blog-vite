<script lang="ts" setup>
import type { RouteMeta } from 'vue-router';
import { useRoute } from "vue-router"
const route = useRoute()
interface MetaType extends RouteMeta {
    title: string
}
</script>
<template>
    <div class="blog_bread_crumbs">
        <a-breadcrumb>
            <a-breadcrumb-item v-for="item in route.matched">{{ (item.meta as MetaType).title }}</a-breadcrumb-item>
        </a-breadcrumb>
    </div>
</template>
<style lang="scss">
.blog_bread_crumbs {
    background-color: var(--color-bg-1);
    width: 100%;
}
</style>