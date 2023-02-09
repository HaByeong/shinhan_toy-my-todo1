<template>
	<div class="page">
    <header><h1>Vue Fire todo1</h1></header>
    <main>
      <div class="todos">
        <transition name="fade">
        <div class="write" v-if="writeState === 'add'" key="add"> <!-- 등록 -->
          <input 
            ref="writeArea"
            type="text" 
            v-model="addItemText" 
            @keyup.enter="addItem"/>
          <button class="btn add" @click="addItem">Add</button>
        </div>
        <div class="write" v-else key="edit"> <!-- 수정 -->
          <input 
            ref="writeArea"
            type="text" 
            v-model="editItemText" 
            @keyup.enter="editSave"/>
          <button class="btn add" @click="editSave">Save</button>
        </div>
        </transition>
        <ul class="list" ref="">
          <li v-for="(item, i) in todos" :key="i">
            <i 
              @click="checkItem(i)"
              :class="[item.state === 'yet' ? 'far' : 'fas', 'fa-check-square']">
            </i>
            <span>
              {{ item.text }}
              <b>
                <a href="" @click.prevent="editShow(i)">Edit</a>
                <a href="" @click.prevent="delShow(i)">Del</a>
              </b>
            </span>
          </li>
        </ul>
      </div>
    </main>
	</div>
</template>

// 커밋이름 
// 1. 할일 목록 리스팅 (11시55분까지)
// 2. 할일 등록 기능 (1시 45분까지)
// 3. 체크 기능 (2시 20분까지)
<script>
import {db} from '../firebase/db';
console.log(db)

export default {
  data() {
    return {
      writeState: 'add',
      addItemText: '',
      editItemText: '',
      crrEditItem: '',
      todos:[
   
      ]
    }
  },
  methods: {
    addItem() {
      if (this.addItemText === '') return;
      db.collection('todos').add({text: this.addItemText, state: 'yet'})
      // this.todos.push({text: this.addItemText, state: 'yet'});
      this.addItemText = '';
    },
    checkItem(index) {
      if (this.todos[index].state === 'yet') {
        this.todos[index].state = 'done'
      } else {
        this.todos[index].state = 'yet'
      }
    },
    editShow(index) {
      this.crrEditItem = index;
      this.writeState = 'edit';
      this.editItemText = this.todos[index].text;
      this.$refs.list.children[index].className='editing';
    },
    editSave() {
      this.todos[this.crrEditItem].text = this.editItemText;
      this.writeState = 'add'
      this.$refs.list.children[this.crrEditItem].className='';
    },
    delShow(i) {
            this.todos.splice(i, 1);}
  },
  mounted() {
    this.$refs.writeArea.focus();
    db.collection('todos').get().then((result) => {
    result.forEach((doc)=>{
        console.log(doc.data())
        this.todos.push(doc.data());
    })
});
  },
  firestore: {
    todos: db.collection('todos')
  }
}
</script>

<style>

</style>