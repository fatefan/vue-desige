<template>
  <section>
    <div class="page-operate-div">
      <el-button type="primary" @click="addOrModify()">添加账户</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="name" label="姓名" width="100">
      </el-table-column>
      <el-table-column prop="mobile" label="手机号" width="160">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="230" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="xzqname" label="行政区" width="120">
      </el-table-column>
      <el-table-column prop="sfname" label="省份" width="120">
      </el-table-column>
      <el-table-column prop="sxqname" label="市辖区" width="120">
      </el-table-column>
      <el-table-column prop="scname" label="商圈" width="150">
      </el-table-column>
      <el-table-column prop="sqname" label="商区" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="groupname" label="小组" width="120">
      </el-table-column>
      <el-table-column prop="roleName" label="角色" width="120">
      </el-table-column>
      <el-table-column prop="deptName" label="部门" width="120">
      </el-table-column>
      <el-table-column prop="isAllocation" label="是否分配" width="120">
      </el-table-column>
      <el-table-column inline-template :context="_self" fixed="right" label="操作" width="150">
        <span>
            <el-button type="primary" size="small" @click="addOrModify($index, row)">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteMan($index,row)">删除</el-button>
        </span>
      </el-table-column>
    </el-table>
    <el-dialog :title="popupModalTitle" size="tiny" v-model="popupModal" :show-close="false" :close-on-click-modal="false">
      <el-form :model="form">
        <el-form-item label="部门" label-width="120px">
          <el-select v-model="form.selectedDepartment" :disabled="selectDisabled" placeholder="部门">
            <el-option
                v-for="item in form.departmentArr"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="人员" label-width="120px">
          <el-select v-model="form.selectedUse" :disabled="selectDisabled"  placeholder="人员">
            <el-option
                v-for="item in form.useSelectArr"
                :label="item.userName"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" label-width="120px">
          <el-select v-model="form.selectedRole"  placeholder="角色">
            <el-option
                v-for="item in form.roleArr"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="popup-button">
          <el-button @click="closePopup">取 消</el-button>
          <el-button type="primary" @click="confirmPopup">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="删除账户" size="tiny" v-model="delete_popupModal" :show-close="false" :close-on-click-modal="false">
      <el-form :model="delete_Form">
        <el-form-item label="商家接收人" label-width="120px">
          <el-select v-model="delete_Form.transferPeopleId" placeholder="商家接收人">
            <el-option
                v-for="item in form.useSelectArr"
                :label="item.userName"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="popup-button">
          <el-button @click="closeDeletePopup">取 消</el-button>
          <el-button type="primary" @click="confirmDelete">确 定</el-button>
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
    name:'AccountManagement',
    methods: {
      addOrModify(sort,item) {
          if(item != undefined) {
              this.$store.dispatch('modifyAccountBtn',{item:item});
          } else {
              this.$store.dispatch('createAccountBtn');            
          }
      },
      deleteMan (sort,item) {
            this.$store.dispatch('showDeleteAccountPopup',{item:item});            
      },
      confirmDelete () {
            this.$store.dispatch('confirmDeleteAccount');
      },
      closeDeletePopup () {
          this.$store.dispatch('closeDeleteAccountPopup');
      },
      closePopup () {
          this.$store.dispatch('closeAccountPopup')
      },
      confirmPopup () {
          this.$store.dispatch('createAccount')
      },
      jumPge(page) {
        var p = {
          pageIndex:page
        }
        this.$store.dispatch('receiveAccountTableData',p);
      }
    },
    computed:mapGetters({
        tableData:'accountTableData',
        totalPage:'accountTotalPage',
        popupModalTitle : 'accountPopupModalTitle',
        popupModal : 'accountPopupModal',
        delete_popupModal : 'accountDeletePopupModal',
        form : 'accountForm',
        delete_Form : 'accountDeleteForm',
        showClose:'accountShowClose',
        formLabelWidth:'accountFormLabelWidth',
        selectDisabled:'accountSelectDisabled'
    }),
    created() {
      this.$store.dispatch('receiveAccountTableData',{})
    }
  }
</script>
