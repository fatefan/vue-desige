<template>
    <div class="bar">
        <h1>{{$route.name}}</h1>
        <span @click="logout" class="logout">注 销</span>
    </div>
</template>
<script>
    export default {
        name:'Nav',
        methods:{
            logout () {
                sessionStorage.isLogin = false;
                location.href='./index.html';
            }
        }
    }
</script>