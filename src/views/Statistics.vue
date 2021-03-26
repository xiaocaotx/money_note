<template>
<layout>
     <Types class-prefix="zzz" :value.sync="type"  />
      <Tabs class-prefix="zzz3" :dataSource="intervalList" :value.sync="intervel"  />
</layout>

</template>

<script lang = "ts">
import Types from '@/components/money/Types.vue';
import Tabs from '@/components/Tabs.vue';
import Vue from "vue";
import {Component} from 'vue-property-decorator'
import intervalList from '@/constants/intervalList'

@Component({
  components: {Types,Tabs},
})
export default class Statistics extends Vue {
  type = "-";
  intervel ='day';
  intervalList = intervalList;


}
</script >

<style lang = 'scss' scoped>

::v-deep .zzz-item{
background: white;

&.selected{
  background: #c4c4c4;
  &::after{
    display: none;
  }
}
}
</style>