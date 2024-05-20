<template>
    <div class="edit-container">
        <input type="text"
        v-model="toEditing.context"
        @keyup.enter="editTodoHanler"
        @focus="store.toEditing.focus=true"
        @blur="blurHandler"
        >
    </div>
</template>
<script setup>
    import { usetodoListStore } from '@/store/todoList';
    import { storeToRefs } from 'pinia';
    const props=defineProps(['editHandler']);
    const store=usetodoListStore();
    const {toEditing}=storeToRefs(store);
    const {editTodoHanler}=store;
    function blurHandler(){
        store.toEditing.focus=false;
        props.editHandler();
    }
</script>
<style scoped>
.edit-container{
    position: absolute;
    top: -10%;
    left: 50%;
    display: flex;
    flex-wrap: nowrap;
    border: 1px solid var(--theme-gray);
    box-shadow: 0 0 1rem var(--theme-very-gray);
    border-radius: 2rem;
    transform: translateX(-50%);
    transition: all .2s ease-in;
}
.edit-container input{
    padding: .4rem .5rem;
    width: 100%;
    font-size: 1rem;
    border-radius: 1rem;
    background-color: var(--theme-while);
    color: var(--theme-black)
}
</style>