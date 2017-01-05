<template>
  <section>
    <el-table :data="tableData" border>
      <el-table-column prop="largeArea" label="行政区" width="150">
      </el-table-column>
      <el-table-column prop="province" label="省份" width="120">
      </el-table-column>
      <el-table-column prop="city" label="市" width="120">
      </el-table-column>
      <el-table-column prop="municipal" label="市辖区" width="120">
      </el-table-column>
      <el-table-column prop="tradeArea" label="商圈" width="120">
      </el-table-column>
      <el-table-column prop="regionParent" label="商区" width="200">
      </el-table-column>
      <el-table-column prop="shop" label="商家" width="200">
      </el-table-column>
      <el-table-column inline-template label="操作" width="120">
        <span>
        <el-button @click="modify($index, row)" type="info" size="small">编辑</el-button>
      </span>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑商圈" v-model="modifyPopup">
      <el-form :model="form" ref="form">
        <el-form-item label="行政区" :label-width="formLabelWidth">
          <el-input v-model="form.largeArea" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="省份" :label-width="formLabelWidth">
          <el-input v-model="form.province" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="市" :label-width="formLabelWidth">
          <el-input v-model="form.city" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="市辖区" :label-width="formLabelWidth">
          <el-input v-model="form.municipal" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="商圈" :label-width="formLabelWidth">
          <el-input v-model="form.tradeArea" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item class="popup-button">
          <el-button @click="modifyPopup = false">取 消</el-button>
          <el-button type="primary" @click="modifyPopup = false">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>
<script>
  export default {
    methods: {
      modify(sort, row) {
        console.info(sort, row);
        this.form = row;
        this.modifyPopup = true;
      }
    },

    data() {
      return {
        formLabelWidth: '120px',
        tableData: [
          {
            largeArea: '华中区',
            province: '湖北省',
            city: '武汉市',
            municipal: '市辖区',
            tradeArea: '光谷圈',
            regionParent: '华科,光谷步行街',
            shop: 'XX小炒，XX黄焖鸡'
          }
        ],
        modifyPopup: false,
        form: {}
      }
    }
  }
</script>