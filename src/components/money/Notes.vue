<template>
  <div>
    <label class="notes">
      <span class="name">{{labelName}}</span>
      <input type="text"
             :value="value"
             @input="onValueChanged($event.target.value)"
             :placeholder="placeholder" >
    </label>
  </div>
</template>
<script lang = "ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Notes extends Vue{

  @Prop({default: ''}) readonly value!: string|undefined;
  @Prop({default:''}) labelName: string|undefined;
  @Prop() placeholder?: string;



  onValueChanged(value: string) {
    this.$emit('update:value', value);
  }


}
</script >

<style lang = 'scss' scoped>
@import "~@/assets/styles/helper.scss";
.notes{
  font-size: 14px;
  background: #f5f5f5;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name{
    padding-right: 16px;
  }
  input{
    height: 64px;
    padding-right: 16px;
    flex-grow: 1;
    background: transparent;
    border: none;
  }
}
</style>