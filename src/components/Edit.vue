<template>
    <div class="edit-container">
        <input type="text"
        v-model="toEditing.context"
        @keyup.enter="editTodoHanler"
        @focus="toEditing.focus=true"
        @blur="toEditing.focus=false"
        >
    </div>
</template>
<script setup>
    import { usetodoListStore } from '@/store/todoList';
    import { storeToRefs } from 'pinia';
    const store=usetodoListStore();
    const {toEditing}=storeToRefs(store);
    const {editTodoHanler}=store;
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
    box-shadow: 0 0 1rem var(--theme-very-gray);
}
</style>