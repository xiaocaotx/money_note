<template>
  <nav>
    <router-link to="/money" class="items" active-class="selected">
      <icon name="money"/>
      记账
    </router-link>

    <router-link to="/labels" class="items" active-class="selected">
      <icon name="label" />
      标签
    </router-link>

    <router-link to="/statistics" class="items" active-class="selected">
      <icon name="chart"/>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'Nav'
};

</script>

<style lang='scss' scoped>

nav {
  display: flex;
  flex-direction: row;
  box-shadow: 0 0 3px rgb(0, 0, 0, 0.25);
  font-size: 12px;

  > .items {
    width: 33.333%;
    padding: 2px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon{
      width: 32px;
      height: 32px;
    }
  }
  > .items.selected{
    color: red;
  }
}


</style>