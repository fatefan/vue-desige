<template>
    <el-col :span="3" class="nav-col">
        <h5 class="nav-col-title">点点快富系统</h5>
        <el-menu default-openeds=[1] class="el-menu-vertical-demo" theme="dark">
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-setting"></i>基础管理</template>
                <li class="nav-item" :class="{ active: item.isActive }" @click="switchitem(index)" v-for="(item, index) in list">{{item.name}}</li>
            </el-submenu>
        </el-menu>
    </el-col>
</template>
<script>
    import 'babel-polyfill'
    export default {
        name: 'NavSection',
        data() {
            return {
                menu:[1]
            }
        },
        computed: {
            list () {
                return this.$store.getters.getNavList
            }
        },
        methods:{
            switchitem(sort) {
                this.$store.dispatch('switchItem', sort);
            }
        }
    }
</script>