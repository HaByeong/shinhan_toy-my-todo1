<template>
    <div class="page">
        <header><h1>todo1</h1></header>
        <main>
        <div class="todos">
            <div class="write">
            <input
            ref="writeArea" type="text" v-model="addItemText">
            <button class="btn add" @click.prevent="addItem">Add</button>
            </div>
            <ul class="list" v-for="(item,i) in todos" :key="item.text">
            <li>
                <i @click="checkItem(i)" :class="[item.state==='yet' ? `far` : `fas`, `fa-check-square`]"></i>
                <span>
                {{ item.text }}
                <b>
                    <a href="">Edit</a>
                    <a href="">Del</a>
                </b>
                </span>
            </li>
            </ul>
        </div>
        </main>
    </div>
</template>

<!-- 1. 할일 목록 리스팅 -->

<script>
export default {
    data() {
        return {
            addItemText: '',
            todos:[
            {text: '공부하기', state: 'yet'},
            {text: '운동하기', state: 'done'},
            {text: '글쓰기', state: 'done'},
            ]
        }
    },
    methods: {
        addItem() {
            this.todos.push({text: this.addItemText, state: 'yet'})
        },
        checkItem(i){
          if(this.todos[i].state==='yet'){
            this.todos[i].state='done'}
          else{
            this.todos[i].state='yet'}
        }

    },
    mounted(){
      this.$refs.writeArea.focus();
    }
}
</script>

<style>
</style>