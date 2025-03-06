<script setup lang="ts"></script>
<template>
    <div class="system_view">
      <div class="system_menu">11</div>
    </div>
</template>
<style lang="scss">
.system_menu {
  display: flex;
  height: 100vh;
  .system_menu{
    width: 160px;
    height: calc(100% - 90px);
    border: 10px solid red;
    background-color: var(--color-bg-1);
  }
}
</style>