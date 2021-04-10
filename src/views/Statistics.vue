<template>
<layout>
  <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
  <div class="chart-wrapper" ref="chartWrapper">
      <Chart class="chart" :options="chartOptions"/>
  </div>
    <ol v-if="groupedList.length>0">
      <li v-for="(group, title) in groupedList" :key="title">
       <h3 class="title">{{beautify(group.title)}}<span>￥{{group.total}}</span></h3>
        <ol>
        <li v-for="item in group.items" :key="item.id"
        class="record"> 
          <span>{{tagString(item.tags)}}</span>
          <span class="notes">{{item.notes}}</span>
          <span>￥{{item.amount}}</span>
        </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">
      目前没有相关记录
    </div>
</layout>

</template>

<script lang = "ts">
import Tabs from '@/components/Tabs.vue';
import Chart from '@/components/Chart.vue';
import Vue from "vue";
import {Component} from 'vue-property-decorator'
import recordTypeList from '@/constants/recordTypeList.ts'
import dayjs from 'dayjs'
import clone from '@/lib/clone';
const  lodash = require('lodash');

type Result = { title: string; total?: number; items: RecordItem[] }[];
@Component({
  components: {Tabs,Chart},
})
export default class Statistics extends Vue {
  type = '-';
  recordTypeList = recordTypeList;

  created(){
    this.$store.commit("fetchRecords");
  }

  get recordList(){
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
      const filterList=newList.filter(r => r.type === this.type)
      if(filterList.length==0){
        return [];
      }
      filterList.sort((a, b) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf());
      const result: Result = [{title: dayjs(filterList[0].createdAt).format('YYYY-MM-DD'), items: [filterList[0]]}];
      
      for (let i = 1; i < filterList.length; i++) {
        const current = filterList[i];
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
    get keyValueList() {
      const today = new Date();
      const array = [];
      console.log(this.groupedList);
      for (let i = 0; i <= 29; i++) {
      // this.recordList = [{date:7.3, value:100}, {date:7.2, value:200}]
        const dateString = dayjs(today)
          .subtract(i, 'day').format('YYYY-MM-DD');
        const found = lodash.find(this.groupedList, {
          title: dateString
        });
        array.push({
          key: dateString, value: found ? found.total : 0
        });
      }
      array.sort((a, b) => {
        if (a.key > b.key) {
          return 1;
        } else if (a.key === b.key) {
          return 0;
        } else {
          return -1;
        }
      });
      return array;
    }
get chartOptions() {
      const keys = this.keyValueList.map(item => item.key);
      const values = this.keyValueList.map(item => item.value);
      return {
        grid: {
          left: 0,
          right: 0,
        },
        xAxis: {
          type: 'category',
          data: keys,
          axisTick: {alignWithLabel: true},
          axisLine: {lineStyle: {color: '#666'}},
          axisLabel: {
            formatter: function (value: string) {
              return value.substr(5);
            }
          }
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [{
          symbol: 'circle',
          symbolSize: 12,
          itemStyle: {borderWidth: 1, color: '#666', borderColor: '#666'},
          // lineStyle: {width: 10},
          data: values,
          type: 'line'
        }],
        tooltip: {
          show: true, triggerOn: 'click',
          position: 'top',
          formatter: '{c}'
        }
      };
    }
}
</script >

<style lang = 'scss' scoped>
  .chart {
    width: 430%;
    &-wrapper {
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
  .noResult {
    padding: 16px;
    text-align: center;
  }

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