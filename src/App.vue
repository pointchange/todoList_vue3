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
    <div class="header-second-firstChild">
      <label>
        <input ref="checkboxElement" type="checkbox" @change="changeHandler">
        全选
      </label>
      <span>
        已完成 {{done}} / 共 {{totail}} 个
      </span>
    </div>
    <!-- <Transition v-show="!store.tip.show" name="themeGithub"> -->
      <ThemeGithub  class="header-second-center"/>
    <!-- </Transition> -->
    <Tip class="Tip"/>
    <div>
      <button @click="clearDone">清除已完成</button>
    </div>
   </div>
   
  </header>
  <main :style="mainHeight">
    <ul v-if="totail">
      <ListItem :getCoord="getCoord" :editHandler="editHandler" ref="ListItemRef"
       v-for="item in todoList" :key="item.id" v-bind="item" 
      />
    </ul>
    <div class="empty" v-else>
      空
    </div>
  </main>
  <Edit :style="editStyle" :editHandler="editHandler"/>
</template>
<script setup>
  import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js';
  import {computed, onMounted, ref}from 'vue'
  import { storeToRefs } from 'pinia';
  import ListItem from './components/ListItem.vue';
  import Edit from './components/Edit.vue';
  import { usetodoListStore } from './store/todoList';
  import ThemeGithub from './components/ThemeGithub.vue';
  import Tip from './components/Tip.vue';
  const store=usetodoListStore();
  const {todoList}=storeToRefs(store);
  const {addTodoHanler,clearDoneHanler,checkedAll}=store;
  const header=ref(null);
  let mainHeight=ref({})
  let inputValue=ref('');
  let totail=computed(()=>todoList.value.length);
  let done=computed(()=>todoList.value.reduce((pre,cur)=>cur.isDone?pre+1:pre,0))
  let editStyle=ref({});
  onMounted(()=>{
    mainHeight.value.height=`${(1-header.value.clientHeight/window.innerHeight)*100}%`;
    store.tip.show=false;
    if(totail.value){
      store.$patch({
        tip:{
          title: '双击可完成哦',
          show: true,
          color:'var(--theme-deep-purple)'
        }
      })
    }else{
      store.$patch({
        tip:{
          title: '要做点什么，来！添加一个任务吧',
          show: true,
          color:'var(--theme-deep-purple)'
        }
      })
    }
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
  const ListItemRef=ref(null);
  function editHandler(){
    getCoord(`-10%`,`50%`);
    ListItemRef.value.forEach(element => {
      if(element.id===store.toEditing.id){
        // element.animationStyle.animationPlayState='running';
        // element.isLiAcitive=false;
        // element.isShowDeleteBtn=false;
        element.editBlurEffect()
      }
    });
  }
  function changeHandler(e){
    checkedAll(e.target.checked);
    if(e.target.checked){
      ListItemRef.value.forEach(element => {
        element.pausedEffect()
      });
    }else{
      ListItemRef.value.forEach(element => {
        element.editBlurEffect()
      });
    }
  }
  let checkboxElement=ref(null);
  function clearDone(){
    clearDoneHanler();
    checkboxElement.value.checked=false;
    if(totail.value===0){
      checkboxElement.value.checked=false;
    }
  }
</script>
<style  scoped>
  .header-first{
    position: relative;
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
    background-color: var(--theme-while);
    color: var(--theme-black);
    z-index: 10;
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
    color: var(--theme-black);
  }
  .header-add-todo input:focus{
    border: 1px solid var(--theme-not-like-black);
  }
  .header-add-todo button{
    padding: .3rem 1.2rem;
    margin-left: 1rem;
    text-wrap: nowrap;
    color: var(--theme-black);
  }
  
  .header-second{
    position: relative;
    padding: .2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--theme-very-very-gray);
    border-bottom: 1px solid var(--theme-very-very-gray);
    background-color: var(--theme-mdn-bar-color);
    text-wrap: nowrap;
  } 
  .header-second span{
    color: var(--theme-black);
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
    height: 100%;
    background-color: var(--theme-while);
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
  @media screen and (min-width: 480px) {
    .header-second-center{
      display: none;
    }
  }
  @media screen and (max-width: 480px){
    .header-second-center{
      display: flex ;
    }
    header{
      width: 100%;
    }
    .header-right{
      display: none;
    }
  }
  .Tip{
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    /* z-index: 999; */
  }
  .themeGithub-enter-active {
    transition: transform 2s ease-in-out;
  }
  
  .themeGithub-leave-active {
    transition: transform 0.5s ease-in-out;
  }
  .themeGithub-enter-from,
  .themeGithub-leave-to {
    transform: translateY(-125%);
  }

  .header-second-firstChild label{
    color: var(--theme-black);
  }
  .empty{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10rem;
    color: var(--theme-little-little-black);
    background-color: var(--theme-while);
  }
</style>