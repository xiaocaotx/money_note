<template>
    <layout>
      <div class="tags">
        <router-link class="tag"
            v-for="tag in tagList" :key="tag.id"
             :to="`/labels/edit/${tag.id}`">
          <span>{{tag.name}}</span>
          <Icon name="right"/>
        </router-link>
      </div>
      <div class="createTag-wrapper">
        <Button class="createTag"
        @click="createTag"
        >自定义标签</Button>
      </div>
    </layout>
</template>

<script lang = "ts">
import Button from '@/components/Button.vue';
import Icon from '@/components/Icon.vue';
import Vue from 'vue'
import {Component} from 'vue-property-decorator';
import TagHelper from '@/mixins/TagHelper'
import createId from '@/lib/createId';



@Component({
  components: { Button,Icon },
})
export default class Labels extends TagHelper{
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
  

}
</script >

<style lang = 'scss' scoped>

.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    svg {
      width: 18px;
      height: 18px;
      color: #666;
      margin-right: 16px;
    }
  }
}
.createTag {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>