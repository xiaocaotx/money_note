<template>
<layout>
     <Types class-prefix="type" :value.sync="type"  />
      <Tabs class-prefix="inter" :dataSource="intervalList" :value.sync="interval"  />
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
  interval ='day';
  intervalList = intervalList;


}
</script >

<style lang = 'scss' scoped>

::v-deep {
  .type-item{
    background: white;
    &.selected{
      background: green;
      &::after{
        display: none;
      }
    }
  }

  .inter-tabs-item{
    max-height: 48px;
  }
}

</style>