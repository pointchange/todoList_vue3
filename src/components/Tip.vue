<template>
    <Transition name="tip">
        <!--v-show="store.tip.show" -->
        <div class="test"
        v-show="store.tip.show" 
        :style="{
            color:store.tip.color,
            '--theme-var':store.tip.color,
        }"
        @animationend="store.tip.show=false">
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

    @media screen and (max-width: 480px){
        .test{
            padding: 1rem;
            background-color: var(--theme-while);
            border-radius: .5rem;
            box-shadow: 0 0 .4rem var(--theme-var);
            /* color: #fff; */
            /* border: 1px solid #000; */
            z-index: 99;
        }
    }
</style>