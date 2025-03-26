<script setup lang="ts"></script>
<template>
  <RouterView class="web_view" />
</template>
<style lang="scss">
.web_view {
  background-color: var(--bg);
}
@media screen and (min-width: 1400px) and (max-width: 1800px) {
  body {
    --containter_width: 1200px;
  }
}
@media screen and (min-width: 1200px) and (max-width: 1400px) {
  body {
    --containter_width: 1000px;
  }
}
@media screen and (min-width: 1000px) and (max-width: 1200px) {
  body {
    --containter_width: 800px;
  }
}
</style>
