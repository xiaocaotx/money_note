<template>
  <div class="nav-wrapper">
    <div class="content">
     <slot/>
    </div>
    <Nav/>
  </div>
</template>

<style lang = 'scss' scoped>
.nav-wrapper {
  display: flex;
  flex-direction: column;
  height: 80vh;
}

.content {
  overflow: auto;
  flex-grow: 1; //尽量占取高度，剩下的给导航栏。
}

</style>