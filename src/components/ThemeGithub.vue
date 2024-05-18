<template>
    <div class="theme-github" >
      <span @click="changeTheme">白天</span>
      <span> <a href="javascript:;">GitHub</a> </span>
    </div>
</template>
<script  setup>
    function changeTheme(){
        console.log('changeTheme')
    }
</script>
<style scoped>
    .theme-github{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
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