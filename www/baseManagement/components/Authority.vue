<template>
  <el-tabs :active-name="activeName">
    <!--<el-tab-pane label="商圈列表" name="first">
        <trade-area></trade-area>
    </el-tab-pane>-->
    <el-tab-pane label="小组管理" name="second">
       <group-management></group-management> 
    </el-tab-pane>
    <el-tab-pane label="账户管理" name="third">
        <account-management></account-management>
    </el-tab-pane>
    <el-tab-pane label="经营区域管理" class="areaOfOperation" name="fourth">
        <area-of-operations></area-of-operations>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import 'babel-polyfill'
import TradeArea from './TradeArea.vue'
import GroupManagement from './GroupManagement.vue'
import AccountManagement from './AccountManagement.vue'
import AreaOfOperations from './AreaOfOperations.vue'
 export default {
    data() {
      return {
        activeName: 'second'
      };
    },
     components : {TradeArea,GroupManagement,AccountManagement,AreaOfOperations}
  };
</script>
<style>
  .el-tabs {
    width: 100%;
  }
  .areaOfOperation {
    height: 100%;
  }
</style>