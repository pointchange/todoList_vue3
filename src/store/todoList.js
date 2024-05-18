import { defineStore } from "pinia";
export const usetodoListStore = defineStore('todoList', {
    state: () => (
        {
            todoList: [
                { id: '001', context: 'vue', isDone: true, date: '1715443200000' },
                { id: '002', context: 'react', isDone: false, date: '1715529600000' },
                { id: '003', context: 'angular', isDone: false, date: '1715616000000' },
            ],
            toEditing: {
                id: '',
                context: '',
            },
        }
    ),
    getters: {

    },
    actions: {
        addTodoHanler({ id, context, isDone, date }) {
            this.todoList.unshift({
                id,
                context,
                isDone,
                date
            });
        },
        clearDoneHanler() {
            this.todoList = this.todoList.filter(item => !item.isDone);
        },
        editTodoHanler() {
            this.todoList.forEach(item => {
                if (item.id === this.toEditing.id) {
                    item.context = this.toEditing.context
                }
            });
        },
        deleteTodoHanler() {
            this.todoList = this.todoList.filter(item => item.id !== this.toEditing.id);
        },
        changeIsDone(id) {
            this.todoList.forEach(item => {
                if (item.id === id) {
                    item.isDone = !item.isDone
                }
            });
        }

    },
    // persist: true,
    persist: {
        key: 'todoList',
        storage: localStorage,
        path: ['todoList']
    }
})