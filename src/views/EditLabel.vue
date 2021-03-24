<template>
<layout>
  <div class="title-wrapper">
    <Icon  class="leftIcon" name="left" @click.native="goBack"/>
    <span class="title">编辑标签</span>
    <span class="rightIcon"></span>
  </div>
  <div class="form-wrapper">
    <Notes label-name="标签名"
           placeholder="请输入标签名"
           :value="tag.name"
          @update:value="update"
    >
    </Notes>
  </div>
  <div class="button-wrapper">
    <Button @click="remove">删除标签</Button>
  </div>
</layout>
</template>

<script lang = "ts">
import Notes from '@/components/money/Notes.vue';
import Button from '@/components/Button.vue';
import Vue from 'vue'
import {Component} from 'vue-property-decorator';
import tagStore from '@/models/tagStore';

@Component({
  components: {Button, Notes}
})
export default class EditLabel extends Vue{
 tag?: TagLabel =undefined;

 created(){
   const id = this.$route.params.id;
   tagStore.fetchTags();
   const tags = tagStore.tagList;
   const findtag = tags.filter(t => t.id === id)[0];
   if (findtag) {
     this.tag = findtag;
   } else {
     this.$router.replace('/404');
   }
 }
  update(name: string) {
    if (this.tag) {
      tagStore.updateTag(this.tag.id, name);
    }
  }
  remove() {
    if (this.tag) {
      if (tagStore.removeTag(this.tag.id)) {
        this.$router.back();
      } else {
        window.alert('删除失败');
      }
    }
  }

  goBack() {
   console.log("goback进来了")
    this.$router.back();
  }
}
</script >

<style lang = 'scss' scoped>
.title-wrapper {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > .title {
  }
  > .leftIcon {
    width: 24px;
    height: 24px;
  }
  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}
.form-wrapper {
  background: white;
  margin-top: 8px;
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>