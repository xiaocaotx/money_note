<template>
  <div class="tags">
    <ul class="current-tag">
      <li v-for="tag in dataSource " :key="tag.id"
          :class="{selected:selectedTags.indexOf(tag)>=0}"
          @click="toggle(tag)"
      >{{tag.name}}
      </li>
    </ul>
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
  </div>
</template>

<script lang = "ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Tags extends Vue{
  @Prop() readonly dataSource: TagLabel[] | undefined;
  selectedTags: TagLabel[] = [];

  toggle(tag: TagLabel) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit('update:value', this.selectedTags)
  }

  createTag(){
    const name = window.prompt('请输入标签名');
    if (name === '') {
      window.alert('标签名不能为空');
    } else if (this.dataSource) {
      // this.dataSource.push(name);
      console.log(name);
      console.log(this.dataSource)
      this.$emit('update:datasource',
          [...this.dataSource, name]);
    }
  }
}
</script >

<style lang = 'scss' scoped>
@import "~@/assets/styles/helper.scss";
.tags{
  flex-grow: 1;
  font-size: 14px;
  padding: 16px;
  overflow: auto;
  > .current-tag{
    display: flex;
    flex-wrap: wrap;

    > li{
      $bg: #d9d9d9;
      background: $bg;
      $h:24px;
      height: $h;
      line-height: $h;
      border-radius: ($h/2);
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      &.selected{
        background: darken($bg, 50%);
        color: white;
      }
    }
  }
  > .new{
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }

}

</style>