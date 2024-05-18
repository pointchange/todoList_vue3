<template>
  <header ref="header">
    <div class="header-first">
      <div class="header-left">
        to<div class="header-title">do</div>List
      </div>
      <div class="header-add-todo">
        <input type="text" v-model="inputValue" @keyup.enter
        ="addTodo">
        <button @click="addTodo">添加</button>
      </div>
      <ThemeGithub class="header-right"/>
    </div>
   <div class="header-second">
    <span>
      已完成 {{done}} / 共 {{totail}} 个
    </span>
    <ThemeGithub class="header-second-center" style="display: none;"/>
    <div>
      <button @click="clearDoneHanler">清除已完成</button>
    </div>
   </div>
  </header>
  <main :style="mainHeight">
    <ul :style="mainHeight" >
      <ListItem :getCoord="getCoord"
       v-for="item in todoList" :key="item.id" v-bind="item" 
      />
    </ul>
  </main>
  <Edit :style="editStyle" />
</template>
<script setup>
  import { nanoid } from 'nanoid';
  import {computed, onMounted, ref}from 'vue'
  import { storeToRefs } from 'pinia';
  import ListItem from './components/ListItem.vue';
  import Edit from './components/Edit.vue';
  import { usetodoListStore } from './store/todoList';
  import ThemeGithub from './components/ThemeGithub.vue';
  const store=usetodoListStore();
  const {todoList}=storeToRefs(store);
  const {addTodoHanler,clearDoneHanler}=store;

  const header=ref(null);
  let mainHeight=ref({})
  let inputValue=ref('');

  let totail=computed(()=>todoList.value.length);
  let done=computed(()=>todoList.value.reduce((pre,cur)=>cur.isDone?pre+1:pre,0))
  let editStyle=ref({});
  onMounted(()=>{
    mainHeight.value.height=`${(1-header.value.clientHeight/window.innerHeight)*100}%`;
  })
  function addTodo(){
    if(inputValue.value=='')return;
    addTodoHanler({
      id:nanoid(),
      context:inputValue.value,
      isDone:false,
      date:new Date().getTime()
    })
    inputValue.value='';
  }

  function getCoord(x,y,width){
    editStyle.value={
      top:typeof x==='number'?`${y}px`:x,
      left:typeof x==='number'?`${x}px`:y,
      width:`${width}px`
    };
    //屏幕20%-80%
    if(x<(window.innerWidth*0.2)){
      editStyle.value.transform="translateX(0)"
    }else if(window.innerWidth-x<window.innerWidth*0.2){
      editStyle.value.transform="translateX(-100%)"
    }else{
      editStyle.value.transform="translateX(-50%)"
    }
  }

</script>
<style  scoped>
  .header-first{
    padding: .4rem;
    /* display: grid;
    grid-template-columns: 20% 60% 20%;
    justify-content: center;
    align-items: center; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.5rem;
    box-sizing: border-box;
  }
  .header-left{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header-title{
    margin: 0 .4rem;
    font-size: 1.5em;
    transform-origin:top center;
    animation: doAnimation .4s ease  infinite;
  }
  .header-add-todo{
    display: flex;
    justify-content: center;
  }
  .header-add-todo input,
  .header-add-todo button{
    padding: .4rem;
    border: 1px solid var(--theme-very-very-gray);
    font-size: 1.2rem;
  }
  .header-add-todo input:focus{
    border: 1px solid var(--theme-not-like-black);
  }
  .header-add-todo button{
    padding: .3rem 1.2rem;
    margin-left: 1rem;
    text-wrap: nowrap;
  }
  
  .header-second{
    padding: .2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--theme-very-very-gray);
    border-bottom: 1px solid var(--theme-very-very-gray);
    background-color: var(--theme-mdn-bar-color);
    text-wrap: nowrap;
  } 
  .header-second button{
    padding: 0 1rem;
    border: 1px solid var(--theme-red);
    color: var(--theme-red);
    font-size: 1rem;
    cursor: pointer;
  }

  ul{
    position: relative;
  }

  @media screen and (max-width: 1024px){
    .header-first,
    .header-add-todo input,
    .header-add-todo button{
      font-size: 1rem;
    }
    .header-title{
      margin: .1rem;
    }
    .header-second,
    .header-second button{
      font-size: .8rem;
    }
  }
  @media screen and (max-width: 768px){
    header{
      width: 768px;
    }
  }
  @media screen and (max-width: 480px){
    .header-second-center{
      display: flex !important;
    }
    header{
      width: 100%;
    }
    .header-right{
      display: none;
    }
  }
</style>