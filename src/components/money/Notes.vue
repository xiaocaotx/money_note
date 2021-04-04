<template>
  <div class="note-wrapper">
    <label class="notes">
      <span class="name">{{labelName}}</span>
      <input type="text"
             :value="value"
             @input="onValueChanged($event.target.value)"
             :placeholder="placeholder" >
    </label>
    <input type="date" class="create_date" :value="currentDate"  
    @input="onDataChanged($event.target.value)"
    min="2000-01-01" max="2030-12-31"/>
  </div>
</template>
<script lang = "ts">
import dayjs from 'dayjs';
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Notes extends Vue{

  @Prop({default: ''}) readonly value!: string|undefined;
  @Prop({default:''}) labelName: string|undefined;
  @Prop() placeholder?: string;

  get currentDate(){
  return dayjs().format("YYYY-MM-DD");
 } 
  onValueChanged(value: string) {
    this.$emit('update:value', value);
  }
  onDataChanged(date: string){
    this.$emit('update:date', date);
  }

}
</script >

<style lang = 'scss' scoped>
@import "~@/assets/styles/helper.scss";
.note-wrapper{
  font-size: 14px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  .create_date{
    text-align: right;
    min-width: 130px;
    max-height: 32px;
    border: none;
    background: transparent;
    margin-right:12px;
    padding-left: 4px;
  }
.notes{
  flex-grow: 1;
  padding-left: 12px;
  display: flex;
  align-items: center;
  .name{
    padding-right: 12px;
  }
  input{
    height: 48px;
    padding-right: 12px;
    flex-grow: 1;
    background: transparent;
    border: none;
  }
}
}
</style>