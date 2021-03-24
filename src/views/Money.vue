<template>
  <layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"></NumberPad>
    <Types :default-type.sync="record.type"></Types>
    <Notes
        label-name="备注"
        placeholder="请在这里写备注"
        @update:value="onUpdateNotes"
    ></Notes>
    <Tags @update:value="onUpdateSelectedTag"/>

  </layout>
</template>

<script lang="ts">
import Tags from '@/components/money/Tags.vue';
import Notes from '@/components/money/Notes.vue';
import Types from '@/components/money/Types.vue';
import NumberPad from '@/components/money/NumberPad.vue';
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import recordStore from '@/models/recordStore';
import tagStore from '@/models/tagStore';


const recordItems = recordStore.fetchRecords();
const tagList = tagStore.fetchTags();

@Component({
  components: {NumberPad, Types, Notes, Tags},
})
export default class Money extends Vue {
  defaultTags: TagLabel[] = tagList;

  recordList: RecordItem[] = recordItems;
  record: RecordItem = {
    tags: [], notes: '', type: '-', amount: 0
  };

  onUpdateSelectedTag(value: TagLabel[]) {
    this.record.tags = value;
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
   recordStore.createRecord(this.record);
  }


}
</script>

<style lang='scss'>
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

</style>