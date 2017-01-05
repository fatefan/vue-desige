<template>
  <div class="body-subject" id="app">
    <el-row>
      <nav-section :nav-list="list"></nav-section>
      <el-col :span="21" id="content-area">
        <bar></bar>
        <div class="windows"><router-view></router-view></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import 'babel-polyfill'
import Bar from '../common/components/Bar.vue'
import NavSection from '../common/components/NavSection.vue'
import {route} from './config.js'
import router from './router.js'
  export default {
      name: 'App',
      data () {
        return {
          list:route
        }
      },
      components:{NavSection,Bar},
      created () {
      if (this.$route.name === undefined) {
        this.$router.push(route[0].path)
      }
        this.$store.dispatch('receiveItem',this.list);
        this.$store.dispatch('receiveRouter',router);
      }
  }
</script>