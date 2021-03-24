<template>
    <layout>
      <div class="tags">
        <router-link class="tag"
            v-for="tag in tags" :key="tag.id"
             :to="`/labels/edit/${tag.id}`">
          <span>{{tag.name}}</span>
          <Icon name="right"/>
        </router-link>
      </div>
      <div class="createTag-wrapper">
        <Button class="createTag"
        @click="createTag"
        >新建标签</Button>
      </div>
    </layout>
</template>

<script lang = "ts">
import Button from '@/components/Button.vue';
import Icon from '@/components/Icon.vue';
import Vue from 'vue'
import {Component, Watch} from 'vue-property-decorator';
import tagStore from '@/models/tagStore';

const tagList = tagStore.fetchTags();

@Component({
  components: { Button,Icon },
})
export default class Labels extends Vue{
  tags = tagStore.tagList;

  createTag() {
    const name = window.prompt('请输出标签名');
    if(name===""){
      return;
    }
    if (name) {
      const message = tagStore.createTag(name);
      if (message === 'duplicated') {
        window.alert('标签名重复了');
      } else if (message === 'success') {
        window.alert('添加成功');
      }
    }
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