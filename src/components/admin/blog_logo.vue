<script lang="ts" setup></script>
<template>
    <div class="blog_log">
        <img src="/image/log.jpg" alt="">
        <div class="log_head">
          <div>feng博客</div>
          <div>fengwei博客</div>
        </div>
      </div>
</template>
<style lang="scss">
.blog_log {
    height: 90px;
    display: flex;
    padding: 20px;
    align-items: center;
    border-bottom: 1px solid var(--bg);
    transition: all .3s;

    img {
      width: 60px;
      height: 60px;
      border-radius: 10px;
      transition: all .3s;
    }

    .log_head {
      margin-left: 20px;
      transition: all 1s;
      transform: scale(1);

      >div:nth-child(1) {
        font-size: 22px;
      }

      >div:nth-child(2) {
        margin-top: 10px;
        font-size: 12px;
      }
    }
  }
  .collapsed{
    .blog_log{
        padding: 0 5px;
    img{
        width: 40px;
        height: 40px;
    }
    .log_head{
        margin: 0;
        display: none;
        transition: all 1s;
        transform-origin: left;
    }
    }
  }
</style>