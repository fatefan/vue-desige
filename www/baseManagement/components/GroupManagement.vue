<template>
  <section>
    <div class="page-operate-div">
      <el-button type="primary" @click="addOrModify()">创建小组</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="groupname" label="组名" width="150">
      </el-table-column>
      <el-table-column prop="leadername" label="组长" width="120">
      </el-table-column>
      <el-table-column prop="teamMembers" label="组员" width="230" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="xzqname" label="行政区" width="120">
      </el-table-column>
      <el-table-column prop="sfname" label="省" width="100">
      </el-table-column>
      <el-table-column prop="sxqname" label="市" width="120">
      </el-table-column>
      <el-table-column prop="xqname" label="市辖区" width="140">
      </el-table-column>
      <el-table-column prop="scname" label="商圈" width="180" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="sqname" label="商区" width="160" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="createtime" :formatter="formatterTime" label="创建时间" width="200">
      </el-table-column>
      <el-table-column inline-template :context="_self" fixed="right" label="操作" width="120">
        <span>
            <el-button type="primary" size="small" @click="addOrModify($index, row)">编辑</el-button>
        </span>
      </el-table-column>
    </el-table>
    <el-dialog :title="popupModalTitle" size="tiny" v-model="popupModal" :show-close="false" :close-on-click-modal="false">
      <el-form :model="form">
        <el-form-item label="组名" :label-width="formLabelWidth">
          <el-input v-model="form.groupName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="组长" :label-width="formLabelWidth">
          <el-select v-model="form.selectedLead" placeholder="请选择组长">
            <el-option v-for="item in form.leadArr" :label="item.name" :value="item.userid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="组员" :label-width="formLabelWidth">
          <el-tag v-for="tag in form.selectedTeamMemberArr" :closable="tag.closeAble" :type="tag.type" :key="tag" :close-transition="true"
            @close="tagClose(tag)">
            {{tag.name}}
          </el-tag>
          <el-dropdown trigger="click" @command="teamSelect" v-show="form.teamMemberArr.length != 0">
            <el-button size="small">
              <i class="el-icon-plus"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in form.teamMemberArr">{{item.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>
        <el-form-item label="商圈" :label-width="formLabelWidth">
          <el-select v-model="form.selectedCircle" placeholder="请选择商圈">
            <el-option v-for="item in form.circleArr" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="popup-button">
          <el-button @click="closePopup">取 消</el-button>
          <el-button type="primary" @click="certain">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="block page-pos">
      <el-pagination
        layout="prev, pager, next"
        :page-count="totalPage"
        @current-change="jumPge">
      </el-pagination>
    </div>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
  export default {
    name: 'GroupManagement',
    computed:mapGetters({
      tableData: 'getGroupTableData',
      totalPage:'getGroupTotalPage',
      popupModalTitle: 'groupPopupModalTitle',
      showClose: 'groupShowClose',
      form: 'groupFormObj',
      popupModal : 'groupPopupModal',
      formLabelWidth:'groupFormLabelWidth'
    }),
    methods: {
      addOrModify(sort, item) {
        if (item != undefined) {
          this.$store.dispatch('modifyGroupBtn', { item: item });
        } else {
          this.$store.dispatch('createGroupBtn');
        }
      },
      formatterTime (row) {
        let d = new Date();
        d.setTime(row.createtime);
        return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+" "+d.getHours()+":"+d.getMinutes();
      },
      closePopup () {
          this.$store.dispatch('closeGroupPopup');        
      },
      teamSelect (empty,vueComponent) {
        this.$store.dispatch('selectedTeamMember',{name:vueComponent.$el.innerText})
      },
      tagClose (item) {
        this.$store.dispatch('deleteSelectedMember',{item:item});        
      },
      certain () {        
        this.$store.dispatch('createGroup').then((state)=>{
            if(state&&state.code != 0) {
                this.$message.error(state.mesg);                        
            }
        });
      },
      jumPge(page) {
        var p = {
          pageIndex:page
        }
        this.$store.dispatch('receiveGroupTableData',p);
      }
    },
    created() {
      this.$store.dispatch('receiveGroupTableData',{});
    }
  }
</script>
<style>
  .page-pos{
    text-align: center;
    margin-top: 20px
  }
</style>