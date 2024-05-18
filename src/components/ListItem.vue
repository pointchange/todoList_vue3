<template>
    <!-- @animationend="changeElementTop" -->
    <li :style="animationStyle" :class="{'li-active':isLiAcitive,'li-Done':isDone}"
    @animationiteration="changeElementTop"
    @click.capture="clickHandler">
        <div class="context" :style="changeFontSize">
            {{ context }}
        </div>
        <div class="date" >
            {{ countDate }}
        </div>
        <Transition name="delAnimation">
            <button  class="deleteBtn" 
            @click.stop="deleteTodoHanler"
            v-if="isShowDeleteBtn"
            >
                删除
            </button>
        </Transition>
    </li>
</template>
<script setup>
    import { computed, nextTick, onBeforeUnmount, onMounted,onUnmounted,reactive,ref } from 'vue';
    import { usetodoListStore } from '@/store/todoList';
    const props = defineProps(['id','context','isDone','date','getCoord'])
    const store=usetodoListStore();
    const {deleteTodoHanler,changeIsDone}=store;
    //10-20
    let rand=computed(function fn(){
        let r= parseInt(Math.random()*50);
        if(r>=10&&r<=20){
            return r;
        }else{
            return fn();
        }
    })
    let id=ref(null);
    let animationStyle=ref({
        animation:`liAnimation ${rand.value}s infinite linear`,
        top:`${Math.random()*100}%`
    })
    let isLiAcitive=ref(false);
    let countDate=computed(()=>{
        let now=new Date().getTime();
        let timeDiff=now-props.date;
        if(timeDiff<0)return 'error';
        let min=1000*60;
        let hour=min*60;
        let day=hour*24;
        let week=day*7;
        let mouth=day*30;
        //year?
        let minDiff=timeDiff/min;
        let hourDiff=timeDiff/hour;
        let dayDiff=timeDiff/day;
        let weekDiff=timeDiff/week;
        let mouthDiff=timeDiff/mouth;
        if(timeDiff>=0&&timeDiff<=min){
            return '刚刚'
        }else if(minDiff>=1&&minDiff<60){
            return parseInt(minDiff)+'分钟前'
        }else if(hourDiff>=1&&hourDiff<24){
            return parseInt(hourDiff)+'小时前'
        }else if(dayDiff>=1&&dayDiff<7){
            return parseInt(dayDiff)+'天前'
        }else if(weekDiff>=1&&weekDiff<4){
            return parseInt(weekDiff)+'周前'
        }else if(mouthDiff>=1&&mouthDiff<4){
            return parseInt(mouthDiff)+'月前'
        }
    })
    let isShowDeleteBtn=ref(false);
    let changeFontSize=computed(()=>{
        if(props.isDone) return {};
        let {value}=countDate;
        if(/小时前/.test(value)&&value.match(/\d+/)[0]>1){
            return {fontSize:'1.2rem'}
        }else if(/天前/.test(value)&&value.match(/\d+/)[0]>1){
            return {fontSize:'2rem'}
        }else if(/周前/.test(value)&&value.match(/\d+/)[0]>1){
            return {fontSize:'4rem'}
        }else if(/月前/.test(value)&&value.match(/\d+/)[0]>1){
            return {fontSize:'5rem'}
        }
    })
    let fourSecond=ref(0);

    onBeforeUnmount(()=>{
        // id.value=null;
    })


    function changeElementTop(){
        animationStyle.value.animation=`liAnimation ${rand.value}s infinite linear`;
        animationStyle.value.top=`${Math.random()*100}%`;
    }
    function clickHandler(e){
        isShowDeleteBtn.value=true;
        isLiAcitive.value=true;
        animationStyle.value.animationPlayState='paused';

        clearTimeout(id.value);
        id.value=null;
        id.value = setTimeout(()=>{
            props.getCoord(`-10%`,`50%`)
            animationStyle.value.animationPlayState='running';
            isLiAcitive.value=false;
            isShowDeleteBtn.value=false;
            store.toEditing.focus=false;
        },4000);
        // id.value=setInterval(() => {
        //     if(fourSecond.value===4)return;
        //     fourSecond.value++;
        // }, 1000);
        

        props.getCoord(
            e.clientX,
            (e.target===e.currentTarget?e.clientY-e.offsetY:e.clientY-e.offsetY-e.target.offsetTop)+e.currentTarget.offsetHeight,
            e.currentTarget.offsetWidth,
        )
        store.toEditing.id=props.id;
        store.toEditing.context=props.context;
        
        if(e.detail<2)return;
        changeIsDone(props.id);
    }
</script>
<style scoped>
    li{
        position: absolute;
        padding: .2rem .4rem;
        display: inline-flex;
        align-items: center;
        color: var(--theme-little-black);
        text-wrap: nowrap;
        cursor: pointer;
    }
    .li-active{
        border: .1rem solid var(--theme-very-gray);
        border-radius: .2rem;
    }
    .li-Done{
        text-decoration: line-through;
    }
    .context{
        font-size: 1rem;
    }
    .date{
        margin-left: .2rem;
        font-size: 1rem;
        transform-origin: 0 0 ;
        transform: scale(.6);
        color: var(--theme-not-like-black);
        text-wrap: nowrap;
    }
    .deleteBtn{
        position: absolute;
        top: -100%;
        right: 0;
        padding:.1rem .2rem;
        text-wrap: nowrap;
        border-radius: .5rem;
        box-shadow: 0 0 .4rem var(--theme-red);
        background-color: var(--theme-while);
        font-size: 1.2rem;
        color: var(--theme-red);
        letter-spacing: .1rem;
        cursor: pointer;
    }
    .delAnimation-enter-active,
    .delAnimation-leave-active {
        transition: opacity 1s ease;
    }

    .delAnimation-enter-from,
    .delAnimation-leave-to {
        opacity: 0;
    }
</style>