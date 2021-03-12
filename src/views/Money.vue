<template>
  <layout class-prefix="layout">
    <NumberPad :value.sync="record.amount"  @submit="saveRecord"></NumberPad>
    <Types :default-type.sync="record.type" ></Types>
    <Notes></Notes>
    <Tags :data-source.sync="defaultTags" @update:value="onUpdateTags"></Tags>
    {{recordList}}
  </layout>
</template>

<script lang="ts">
import Tags from '@/components/Tags.vue';
import Notes from '@/components/Notes.vue';
import Types from '@/components/Types.vue';
import NumberPad from '@/components/NumberPad.vue';
import Vue from 'vue'
import {Component} from 'vue-property-decorator';

type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number; // 数据类型 object | string
  createdAt?: Date;  // 类 / 构造函数
}

@Component({
  components: {NumberPad, Types, Notes, Tags},
})
export default class  Money extends  Vue{
  defaultTags: string[] =['衣','食','住','行','护肤品'];
  recordList: Record[] = [];
  record: Record = {
    tags: [], notes: '', type: '-', amount: 0
  };
  onUpdateTags(value: string[]) {
    this.record.tags = value;
    console.log(this.record.tags);
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    const record2: Record = JSON.parse(JSON.stringify(this.record));
    record2.createdAt = new Date();
    this.recordList.push(record2);
  }



}
</script>

<style lang='scss' >
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

</style>