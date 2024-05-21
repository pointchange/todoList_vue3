<template>
    <Transition name="tip">
        <!--v-show="store.tip.show" -->
        <div v-show="store.tip.show" @animationend="store.tip.show=false">
            {{ store.tip.title }}
        </div>
    </Transition>
</template>
<script setup>
    import { usetodoListStore } from '@/store/todoList';

    const store=usetodoListStore();

</script>
<style scoped>
    .tip-enter-active {
        animation: move-up 2s ease-in-out;
    }
    
    .tip-leave-active {
        animation: move-down 2s ease-in-out;
    }
</style>