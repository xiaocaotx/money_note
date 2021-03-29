<template>
  <div class="tags">
    <ul class="current-tag">
      <li v-for="tag in tagList " :key="tag.id"
          :class="{selected:selectedTags.indexOf(tag)>=0}"
          @click="toggle(tag)"
      >{{tag.name}}
      </li>
    </ul>
    <div class="new">
      <button @click="createTag">自定义标签</button>
    </div>
  </div>
</template>

<script lang = "ts">
import createId from '@/lib/createId';
import TagHelper from '@/mixins/TagHelper';
import Vue from 'vue';
import {Component,} from 'vue-property-decorator';


@Component
export default class Tags extends TagHelper{
  defaultTagNames =['衣','食','住','行'];
  defaultTagList: TagLabel[] =[];

  createDefaultTag(){   
  for (let index = 0; index < this.defaultTagNames.length; index++) {
    const name = this.defaultTagNames[index];
    const id = createId().toString();
    this.defaultTagList.push({id,  name});
  }
  return this.defaultTagList;
  }

  
  get tagList (){
    if(this.$store.state.tagList.length ===0){
       if(this.defaultTagList.length===0){
          return this.createDefaultTag();
       }
      return this.defaultTagList;
    }
    return this.$store.state.tagList;
  }
  beforeCreate(){
    this.$store.commit("fetchTags");
 
  }
 createTag(){
   if(this.$store.state.tagList.length ===0){
      this.$store.commit("addTags",this.defaultTagList)
    }
    const name = window.prompt('请输入标签名');
    if (!name) { return window.alert('标签名不能为空'); }
    this.$store.commit('createTag', name);
 }
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