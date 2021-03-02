<template>
  <div class="mynav">
    <router-link to = "/money">
      <svg>
        <use xlink:href="#money"></use>
      </svg>
      记账</router-link>
    |
    <router-link to = "/labels">标签</router-link>
    |
    <router-link to = "/statistics">统计</router-link>
  </div>
</template>

<script lang = "ts">
import x from '@/assets/icons/money.svg';
console.log(x)

export default {
name: "MyNav"
}
</script >

<style lang = 'scss' scoped >

.mynav{
  border: 1px solid red;

}

</style>