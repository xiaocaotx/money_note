<template>
  <my-nav >
    <router-link to = "/money">
      <svg>
        <use xlink:href="#money"></use>
      </svg>
      记账</router-link>
    |
    <router-link to = "/labels">标签</router-link>
    |
    <router-link to = "/statistics">统计</router-link>
  </my-nav>
</template>

<script lang = "ts">
//一次性引入icons下的svg文件，这种方式就可以一次引入多个文件
const importAll = (requireContext: __WebpackModuleApi.RequireContext) =>requireContext.keys().forEach(requireContext);
try {
  importAll(require.context('../assets/icons',true,/\.svg$/))
}catch (error){
  console.log(error)
}

export default {
name: "MyNav"
}
</script >

<style lang = 'scss' scoped >



</style>