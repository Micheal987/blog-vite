<script lang="ts" setup></script>
<template>
  <div class="blog_footer">
    <div class="blog_footer_container">
      <div class="left">
        <div class="version">
          <span>Version</span>
          <span>8.1</span>
        </div>
        <div class="date">
          <span class="create_site_date">2024-12-19</span>
          <span class="site_runing_date">网站已运行30天</span>
        </div>
        <div class="beian">
          <img src="/image/icon/qq.png" alt="" />
          <a href="" target="_blank">备案号:xxx</a>
        </div>
      </div>
      <div class="right">
        <a href="" target="_blank">
          <img src="/image/icon/qq.png" alt="" />
        </a>
        <a href="" target="_blank">
          <img src="/image/icon/qq.png" alt="" />
        </a>
        <a href="" target="_blank">
          <img src="/image/icon/qq.png" alt="" />
        </a>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.blog_footer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-bg-1);
  padding: 40px 0;
  color: var(--color-text-2);
  .blog_footer_container {
    width: var(--containter_width);
    display: flex;
    .left {
      width: 60%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .version {
        margin-bottom: 20px;
        span {
          padding: 4px 10px;
          background-color: var(--color-fill-2);
        }
        span:nth-child(1) {
          background-color: var(--active);
          padding: 10px 10px;
          color: white;
          border-radius: 5px;
        }
        span:nth-child(2) {
          padding: 10px 10px 10px 20px;
          border-radius: 5px;
        }
      }
      .date {
        margin: 10px 0;
        .site_runing_date {
          margin-left: 10px;
        }
      }
      .beian {
        display: flex;
        align-items: center;
        img {
          width: 30px;
          height: 30px;
          border-radius: 10px;
        }
        a {
          text-decoration: none;
          color: var(--color-text-2);
          margin-left: 5px;
        }
      }
    }
    .right {
      width: 40%;
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        margin-right: 40px;
        img {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
}
</style>
