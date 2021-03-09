<template>
  <div class="layout-wrapper">
    <div class="content">
     <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
export default {
  props: ['fixcontent'],
  name: 'Layout'
};
</script>
<style lang = 'scss' scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  overflow: auto;
  flex-grow: 1; //尽量占取高度，剩下的给导航栏。
}

</style>