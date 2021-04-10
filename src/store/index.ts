import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';

Vue.use(Vuex);
//这一句会把store绑到Vue.prototype（Vue产生对象的原型=Vue.prototype）上，Vue.prototype.$store=store;
// store等在main.ts中new Vue（初始化）的时候传进去,vue实例上可以调用.$store; 即this.$store；
// this上$store可以用在模板上，而导入的store不行。

type RootState = {
  recordList: RecordItem[];
  tagList: TagLabel[];
  currentTag?: TagLabel;

}
const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined
  } as RootState,
  mutations: {

    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    },
    updateTag(state, payload: { id: string; name: string }) {
      const {id, name} = payload;
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复了');
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
        }
      }
    },
    addTags(state,newTags: TagLabel[]){
     state.tagList= state.tagList.concat(newTags);
     store.commit('saveTags');
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit('saveTags');
        router.back();
      } else {
        window.alert('删除失败');
      }

    },

    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      
    },

    createTag(state, name: string) {
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert('标签名重复了');
      }
      const id = createId().toString();
      const tag ={id:id, name:name};
      state.tagList.push(tag);
      store.commit('saveTags');
      window.alert('标签添加成功');
    },

    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
   
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    createRecord(state, record) {
      const record2: RecordItem = clone(record);
      state.recordList.push(record2);
      store.commit('saveRecords');
      window.alert('记账成功');
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList',
        JSON.stringify(state.recordList));
    },
   
  }
});

export default store;
