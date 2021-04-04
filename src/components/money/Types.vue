<template>
    <div>
    <ul class="types">
      <li :class="value ==='-'&&'selected'"  @click="selectType('-')">支出</li>
      <li :class="value ==='+'&&'selected'"  @click="selectType('+')">收入</li>
  
    </ul>
   </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Types extends Vue{
  @Prop(String) readonly value!: string ;
  @Prop(String) classPrefix?: string ;

  selectType(typeValue: string){
      if(typeValue !== "-" && typeValue !=="+"){
        throw new Error('type is unknown');
      }
      console.log(typeValue);
      this.$emit('update:value', typeValue);
    }
  

}

</script>

<style lang='scss' scoped>
@import "~@/assets/styles/helper.scss";  
.types{
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 18px;
  > li{
    width: 50%;
    height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after{
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
      border-bottom: 4px solid ;

    }
  }
}
</style>