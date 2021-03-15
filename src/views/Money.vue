<template>
  <layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"></NumberPad>
    <Types :default-type.sync="record.type"></Types>
    <Notes
        label-name="备注"
        placeholder="请在这里写备注"
        @update:value="onUpdateNotes"
    ></Notes>
    <Tags :data-source.sync="defaultTags" @update:value="onUpdateTags"></Tags>

  </layout>
</template>

<script lang="ts">
import Tags from '@/components/money/Tags.vue';
import Notes from '@/components/money/Notes.vue';
import Types from '@/components/money/Types.vue';
import NumberPad from '@/components/money/NumberPad.vue';
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';


const recordItems = recordListModel.fetch();
const tagList = tagListModel.fetch();

@Component({
  components: {NumberPad, Types, Notes, Tags},
})
export default class Money extends Vue {
  defaultTags: TagLabel[] = tagList;

  recordList: RecordItem[] = recordItems;
  record: RecordItem = {
    tags: [], notes: '', type: '-', amount: 0
  };

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    const record2: RecordItem = JSON.parse(JSON.stringify(this.record));
    record2.createdAt = new Date();
    this.recordList.push(record2);
  }

  @Watch('recordList')
  onRecordListChange() {
    recordListModel.save(this.recordList);
  }

}
</script>

<style lang='scss'>
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

</style>