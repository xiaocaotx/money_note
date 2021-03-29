<template>
<layout>
     <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <ol>
      <li v-for="(group, title) in groupedList" :key="title">
       <h3 class="title">{{beautify(group.title)}} <span>￥{{group.total}}</span></h3>
        <ol>
        <li v-for="item in result" :key="item.id"
        class="record"
        >
          <span>{{tagString(item.tags)}}</span>
          <span class="notes">{{item.notes}}</span>
          <span>￥{{item.amount}} </span>
        </li>
        </ol>
      </li>
    </ol>
    
</layout>

</template>

<script lang = "ts">
import Types from '@/components/money/Types.vue';
import Tabs from '@/components/Tabs.vue';
import Vue from "vue";
import {Component} from 'vue-property-decorator'
import recordTypeList from '@/constants/recordTypeList.ts'
import dayjs from 'dayjs'
import clone from '@/lib/clone';

@Component({
  components: {Tabs},
})
export default class Statistics extends Vue {
  type = "-";
  recordTypeList = recordTypeList;

  created(){
    this.$store.commit("fetchRecords");
  }

  get recordList(){
    return this.$store.state.recordList;
  }

  get result(){
    console.log(this.$store.state.recordList)
    return this.$store.state.recordList;
  }

  tagString(tags: TagLabel[]) {
    if(tags.length === 0){
      return "无标签";
    }
    const joinstring=tags.map(tag=>tag.name).join(',');
    return joinstring;
    }

    beautify(string: string) {
      const day = dayjs(string);//格式化为 ISO8601的时间格式，用T来隔开
      const now = dayjs();//今天的日期加时间
      if (day.isSame(now, 'day')) {
        return '今天';
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        console.log('hi');
        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (day.isSame(now, 'year')) {
        return day.format('M月D日');
      } else {
        return day.format('YYYY年M月D日');
      }
    }
    
    get groupedList() {
      const {recordList} = this;
      if (recordList.length === 0) {return [];}

      const newList = clone(recordList) as RecordItem[];
      newList .filter((r) => r.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      type Result = { title: string; total?: number; items: RecordItem[] }[]
      const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
        }
      }
      result.map(group => {
        group.total = group.items.reduce((sum, item) => {
          return  Number(sum) +  Number(item.amount);
        }, 0);
      });
      return result;
    }

}
</script >

<style lang = 'scss' scoped>

::v-deep {
  .type-tabs-item{
    background: white;
    &.selected{
      background: #c4c4c4;
      &::after{
        display: none;
      }
    }
  }
}

 %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  .title {
    @extend %item;
  }
  .record {
    background: white;
    @extend %item;
  }
  .notes {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }
</style>