<template>
    <div class="page">
        <header><h1>Vue Fire todo1</h1></header>
        <main>
        <div class="todos">
            <div class="write">
            <input class="inner" type="text"/>
            <button class="btn add" @click="addItem">Add</button>
            </div>
            <ul>
            <li v-for="item in todos" class="list" :key="item.text">
                <i :class="[item.state==='yet' ? 'far' : 'fas','fa-check-square']"></i>
                <font-awesome-icon icon="fa-regular fa-square-check" />
                <span>
                {{item.text}}
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
          addItemText:'',
            todos:[
            {text: '공부하기', state: 'yet'},
            {text: '운동하기', state: 'done'},
            {text: '글쓰기', state: 'done'},
        ]
        }
    },
    methods:{
      addItem(){
        word=document.getElementsByClassName("inner").innerText
        console.log(word)
        addItemText=word
        if(this.addItemText==='') return;
        this.todos.push({
          text: this.addItemText,
          state: 'yet'
        });
        this.addItemText='';
      }
    }
}
</script>

<style>
</style>