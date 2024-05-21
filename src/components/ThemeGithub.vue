<template>
    <div class="theme-github" >
      <span @click="changeTheme">{{themeText}}</span>
      <span> <a href="https://github.com/pointchange/todoList_vue3">GitHub</a> </span>
    </div>
</template>
<script  setup>
    import { onBeforeUnmount, onMounted, ref } from 'vue';
    let light=ref(true)
    let themeText=ref('白天')

    function switchThemeHandler(){
        if(this.matches){
            light.value=true;
            themeText.value='白天';
            clickSwitchTheme();
        }else{
            light.value=false;
            themeText.value='黑夜';
            clickSwitchTheme();
        }
    }

    onMounted(()=>{
        window.matchMedia("(prefers-color-scheme: light)").addEventListener('change',switchThemeHandler)
    })
    onBeforeUnmount(()=>{
        window.matchMedia("(prefers-color-scheme: light)").removeEventListener('change',switchThemeHandler)
    })

    function setTheme(prop,value){
        return document.documentElement.style.setProperty(prop, value)
    }

    function clickSwitchTheme(){
        if(light.value){
            themeText.value='白天'
            setTheme("--theme-while", '#fff');
            setTheme("--theme-mdn-bar-color", '#f9f9fb');
            setTheme("--theme-black", '#000');
            setTheme("--theme-little-black", '#222');
            setTheme("--theme-not-like-black", '#666');
            setTheme("--theme-gray", '#ddd');
        }else{
            themeText.value='黑夜'
            setTheme("--theme-while", '#1b1b1b');
            setTheme("--theme-mdn-bar-color", '#333');
            setTheme("--theme-black", '#ddd');
            setTheme("--theme-little-black", '#fff');
            setTheme("--theme-not-like-black", '#999');
            setTheme("--theme-gray", '#666');
        }
    }

    function changeTheme(){
        console.log('changeTheme')
        light.value=!light.value;
        clickSwitchTheme()
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