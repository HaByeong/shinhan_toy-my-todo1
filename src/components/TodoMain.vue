<template>
	<div class="page">
    <header><h1>Vue Fire todo1
      <span class="pie">
          <svg viewBox="0 0 64 64">
          <circle class="pie" r="32" cx="32" cy="32" style="stroke-width: 64;"></circle>
          <circle class="slice" r="32" cx="32" cy="32" 
          :style="{
            strokeWidth: 64,
            strokeDasharray: totalTodo+', 201',
            transition: 'all 0.3s linear'
            }"></circle>
        </svg>
        </span></h1></header>
    <main>
      <div class="todos">
        <transition name="fade">
          <div class="write add" v-if="writeState === 'add'" key="add"> <!-- 등록 -->
            <input 
              ref="writeArea"
              type="text" 
              v-model="addItemText" 
              @keyup.enter="addItem"/>
            <button class="btn add" @click="addItem">Add</button>
          </div>
          <div class="write edit" v-else key="edit"> <!-- 수정 -->
            <input 
              ref="writeArea"
              type="text" 
              v-model="editItemText" 
              @keyup.enter="editSave"/>
            <button class="btn add" @click="editSave">Save</button>
          </div>
        </transition>
        <ul class="list" ref="list">
          <li v-for="(item, i) in todos" :key="i">
            <i 
              @click="checkItem(i)"
              :class="[item.state === 'yet' ? 'far' : 'fas', 'fa-check-square']">
            </i>
            <span>
              {{ item.text }}
              <b>
                <a href="" @click.prevent="editShow(i)">Edit</a>
                <a href="" @click.prevent="deleteItem(i)">Del</a>
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
// 4. 삭제 기능 (3시 까지)
<script>
import {db} from '../firebase/db.js';
console.log(db)
export default {
  data() {
    return {
      writeState: 'add',
      addItemText: '',
      editItemText: '',
      crrEditItem: '',
      todos:[]
    }
  },
  methods: {
    addItem() {
      if (this.addItemText === '') return;
      db.collection('todos').add({
        text: this.addItemText, 
        state: 'yet',
        createdAt: new Date(),
      }).then(sn => {
        db.collection('todos').doc(sn.id).update({
          id: sn.id
        })
      });
      // this.todos.push({text: this.addItemText, state: 'yet'});
      this.addItemText = '';
    },
    checkItem(index) {
      if (this.todos[index].state === 'yet') {
        this.todos[index].state = 'done'
        db.collection('todos').doc(this.todos[index].id)
        .update({state:'done'})
      } else {
        // this.todos[index].state = 'yet'
      db.collection('todos').doc(this.todos[index].id)
        .update({state:'yet'})
      }
    },
    editShow(index) {
      this.crrEditItem = index;
      this.writeState = 'edit';
      this.editItemText = this.todos[index].text;
      this.$refs.list.children[index].className = 'editing';
    },
    editSave() {
      this.writeState = 'add';
      db.collection('todos')
        .doc(this.todos[this.crrEditItem].id)
          .update({
            text: this.editItemText
          })
      // this.todos[this.crrEditItem].text = this.editItemText;
      this.$refs.list.children[this.crrEditItem].className = '';
    },
    deleteItem(index) {
      db.collection('todos').doc(this.todos[index].id).delete();
      // this.todos.splice(index, 1)
    }
  },
  computed:{
    totalTodo(){
      let totalNum = 0;
      this.todos.forEach(item=>{
        if(item.state==='done')totalNum++;
      });
      return (totalNum/this.todos.length)*201 //비례
    }
  },
  mounted() {
    this.$refs.writeArea.focus();
  },
  //   db.collection('todos').get().then((result) => {
  //     result.forEach((doc)=>{
  //         console.log(doc.data())
  //         this.todos.push(doc.data());
  //     })
  //   });
  // },
  firestore: {
    todos: db.collection('todos').orderBy('createdAt','desc')
  }
}
</script>

<style>

</style>