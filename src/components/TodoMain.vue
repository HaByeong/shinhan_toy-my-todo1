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
            <ul v-for="item in todos" class="list" :key="item.text">
            <li>
                <i @click="checkItem" :class="[item.state==='yet' ? `far` : `fas`, `fa-check-square`]"></i>
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
        checkItem(){
          if(this.todos.state==='yet'){
            this.todos.state='done'}
          else{
            this.todos.state='yet'}
        }

    },
    mounted(){
      this.$refs.writeArea.focus();
    }
}
</script>

<style>
</style>