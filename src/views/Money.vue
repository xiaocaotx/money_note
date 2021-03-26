<template>
  <layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="createRecord"></NumberPad>
    <Types :value.sync="record.type"></Types>
    <Notes
        label-name="备注"
        placeholder="请在这里写备注"
        @update:value="onUpdateNotes"
    ></Notes>
    <Tags @update:value="updateTag"/>

  </layout>
</template>

<script lang="ts">
import Tags from '@/components/money/Tags.vue';
import Notes from '@/components/money/Notes.vue';
import Types from '@/components/money/Types.vue';
import NumberPad from '@/components/money/NumberPad.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';




@Component({
  components: {NumberPad, Types, Notes, Tags},
})
export default class Money extends Vue {

    get recordList(){
    return this.$store.state.recordList;
    }
    record: RecordItem = {
    tags: [], notes: '', type: '-', amount: 0
    };

    beforeCreate() {
      this.$store.commit('fetchRecords');
    }

 
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  createRecord() {
    this.$store.commit("createRecord",this.record)

  }
  updateTag(value: TagLabel[]){
    this.record.tags = value;
  }

}
</script>

<style lang='scss'>
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

</style>