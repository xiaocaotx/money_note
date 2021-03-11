<template>
  <layout class-prefix="layout">
    <NumberPad></NumberPad>
    <Types xxx="hi"></Types>
    <Notes></Notes>
    <Tags></Tags>
  </layout>
</template>

<script lang="ts">


import Tags from '@/components/Tags.vue';
import Notes from '@/components/Notes.vue';
import Types from '@/components/Types.vue';
import NumberPad from '@/components/NumberPad.vue';

export default {
  name: 'Money',
  components: {NumberPad, Types, Notes, Tags},
};
</script>

<style lang='scss' >
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

</style>