//id构造器防止标签编辑页的id不重复
let id: number = parseInt(window.localStorage.getItem('_idMax') || '0') || 0;
//第一个0防止从localstorge中拿不到对应item，拿到的是null,第二个是防止拿到的不是数字，类似xxx

function createId() {
    id++;
    window.localStorage.setItem('_idMax',String(id));
    return id;
}

export default createId;