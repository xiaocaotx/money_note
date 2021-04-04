<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="createRecord"></NumberPad>
   
    <Notes
        label-name="备注"
        placeholder="请在这里写备注"
        @update:value="onUpdateNotes"
        @update:date="onUpdateDate"
    ></Notes>
    <Tags @update:value="updateTag"/>
  <Types :value.sync="record.type"></Types>
  </layout>
</template>
<script lang="ts">
import Tags from '@/components/money/Tags.vue';
import Notes from '@/components/money/Notes.vue';
import Types from '@/components/money/Types.vue';
import NumberPad from '@/components/money/NumberPad.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import dayjs from 'dayjs';



@Component({
  components: {NumberPad, Types, Notes, Tags},
})
export default class Money extends Vue {

    get recordList(){
    return this.$store.state.recordList;
    }
    record: RecordItem= {
    tags: [], notes: '', type: '-', amount: 0,createdAt: dayjs().format("YYYY-MM-DD"),
    };

   
    beforeCreate() {
      this.$store.commit('fetchRecords');
    }
 
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  onUpdateDate(date: string) {
    this.record.createdAt = date;
  }

  createRecord() {
    this.$store.commit("createRecord",this.record)

  }
  updateTag(value: TagLabel[]){
    this.record.tags = value;
  }

}
</script>

<style lang='scss' scoped >
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}

</style>