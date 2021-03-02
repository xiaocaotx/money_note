<template>
  <div class="mynav-wrapper">
    <div class="content">我是labels页面
    </div>
    <my-nav/>
  </div>
</template>

<script lang = "ts">
import MyNav from '@/components/MyNav.vue';
export default {
name: "Labels",
  components: {MyNav}
}
</script >

<style lang = 'scss' scoped>
.mynav-wrapper {
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  border: 1px solid blue;
  overflow: auto;
  flex-grow: 1; //尽量占取高度，剩下的给导航栏。
}
</style>