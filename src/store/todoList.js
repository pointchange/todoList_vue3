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
                focus: false,
            },
            tip: {
                title: '',
                show: false,
                color: ''
            }
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
            this.tip = {
                title: '添加成功',
                show: true,
                color: 'var(--theme-green)'
            };
        },
        clearDoneHanler() {
            this.todoList = this.todoList.filter(item => !item.isDone);
            this.tip = {
                title: '清除成功',
                show: true,
                color: 'var(--theme-red)'
            };
        },
        editTodoHanler() {
            this.todoList.forEach(item => {
                if (item.id === this.toEditing.id) {
                    item.context = this.toEditing.context
                }
            });
            this.tip = {
                title: '编辑成功',
                show: true,
                color: 'var(--theme-blue)'
            };
        },
        deleteTodoHanler() {
            this.todoList = this.todoList.filter(item => item.id !== this.toEditing.id);
            this.tip = {
                title: '删除成功',
                show: true,
                color: 'var(--theme-red)'
            };
        },
        changeIsDone(id) {
            this.todoList.forEach(item => {
                if (item.id === id) {
                    item.isDone = !item.isDone
                    if (item.isDone) {
                        this.tip = {
                            title: '好！又完成了一项！为什么要说又？',
                            show: true,
                            color: 'var(--theme-purple)'
                        };
                    } else {
                        this.tip = {
                            title: '没关系！相信你很快会完成的。',
                            show: true,
                            color: 'var(--theme-purple)'
                        };
                    }
                }
            });
        },
        checkedAll(boolean) {
            this.todoList.forEach(item => {
                item.isDone = boolean;
            })
        }

    },
    // persist: true,
    persist: {
        key: 'todoList',
        storage: localStorage,
        path: ['todoList']
    }
})