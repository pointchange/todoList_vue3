<template>
    <div class="theme-github" >
      <span @click="changeTheme">{{light?"白天":"黑夜"}}</span>
      <span> <a href="https://github.com/pointchange/todoList_vue3">GitHub</a> </span>
    </div>
</template>
<script  setup>
    import { ref } from 'vue';
    let light=ref(true)

    function setTheme(prop,value){
        return document.documentElement.style.setProperty(prop, value)
    }

    function changeTheme(){
        light.value=!light.value;
        if(light.value){
            setTheme("--theme-while", '#fff');
            setTheme("--theme-mdn-bar-color", '#f9f9fb');
            setTheme("--theme-black", '#000');
            setTheme("--theme-little-black", '#222');
            setTheme("--theme-not-like-black", '#666');
            setTheme("--theme-gray", '#ddd');
        }else{
            setTheme("--theme-while", '#1b1b1b');
            setTheme("--theme-mdn-bar-color", '#333');
            setTheme("--theme-black", '#ddd');
            setTheme("--theme-little-black", '#fff');
            setTheme("--theme-not-like-black", '#999');
            setTheme("--theme-gray", '#666');
        }
    }
</script>
<style scoped>
    .theme-github{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        color: var(--theme-black);
    }
    .theme-github span{
        padding: .2rem .8rem;
        box-sizing: border-box;
        text-wrap: nowrap;
    }
    .theme-github span:hover{
        background-color: var(--theme-gray);
        cursor: pointer;
    }
</style>