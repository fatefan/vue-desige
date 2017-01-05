<template>
    <el-card class="box-card personInfo">
        <div v-for="(value, key) in personInfo" class="text item personInfo-item">
            <span class="itemtext">{{key}}</span><span>{{value}}</span>
        </div>
    </el-card>
</template>
<script> 
    import { mapGetters } from 'vuex'
    export default {
        name: 'PersonCenter',
        methods: {

        },
        computed: mapGetters({
            personInfo: 'getPersonInfo'
    }),
        created() {

        }
    };
</script>
<style>
    .personInfo{
        width: 40%;
        margin: auto;
        margin-top: 5%;
    }
    .personInfo-item{
        padding: 15px;
        color: #324057;
        border-bottom: 1px solid #ddd;
    }
    .personInfo-item:hover{
        background: #EFF2F7;
    }
    .itemtext{
        width: 30%;
        display: inline-block;
    }
</style>