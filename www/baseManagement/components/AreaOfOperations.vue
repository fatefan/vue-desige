<template>
    <section>
        <div class="page-operate-div">
            <el-button type="primary" @click="create">新建</el-button>
            <el-button type="danger" @click="del">删除</el-button>
        </div>
        <div class="areaOfOperation-content">
            <el-row>
                <el-col :span="12" class="col">
                    <el-card class="box-card overflow-card">
                        <el-tree
                        ref="tree"
                        :data="tree"
                        :props="props"
                        :load="loadNode"
                        lazy
                        node-key="code"
                        show-checkbox
                        :auto-expand-parent="true"
                        highlight-current
                        check-strictly
                        getCheckedNodes="getCheckedNodes"
                        @check-change="handleCheckChange"
                        @node-click="handleNodeClick"
                        @current-change="handleCurrentChange">
                        </el-tree>
                    </el-card>
                </el-col>
                <el-col :span="12" class="col">
                    <el-card class="box-card" v-show="formStatus">
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="名称">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="负责人">
                                <el-tag v-for="tag in form.selectedMemberArr" :closable="true" :type="tag.type" :key="tag" :close-transition="true"
                                    @close="tagClose(tag)">
                                    {{tag.name}}
                                </el-tag>
                                <el-dropdown trigger="click" @command="teamSelect" v-show="form.memberArr.length != 0">
                                    <el-button size="small">
                                        <i class="el-icon-plus"></i>
                                    </el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item v-for="item in form.memberArr">{{item.name}}</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="总人数">
                                <el-input v-model="form.totalSize"></el-input>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input type="textarea" v-model="form.remark"></el-input>
                            </el-form-item>
                            <el-form-item label="节点类型">
                                <el-select v-model="form.selectedNodeType" :disabled="form.disableNodeType" placeholder="节点类型">
                                    <el-option v-for="item in form.nodeTypeArr" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="商区类型">
                                <el-select v-model="form.selectedRegionParentType" :disabled="form.disableRegionParent" placeholder="商区类型">
                                    <el-option 
                                        v-for="item in form.regionParentTypeArr" 
                                        :label="item.name" 
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="createNode" v-if="certainBtnStatus">创建</el-button>
                                <el-button type="primary" @click="updateNode" v-if="!certainBtnStatus">更新</el-button>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </section>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: mapGetters({
            tree: 'areaOfOperationsTree',
            props:'areaOfOperationsProps',
            certainBtnStatus: 'areaOfOperationsCertainBtnStatus',
            form: 'areaOfOperationsForm',
            disableRegionParent: 'areaOfOperationsDisableRegionParent',
            formStatus:'areaOfOperationsFormStatus',
            certainBtnText:'areaOfOperationsCertainBtnText'
        }),
        created() {
            this.$store.dispatch('receiveAreaOfOperationsTreeTable');
        },
        methods: {
            create() {
                this.$store.dispatch('addAreaOfOperationsBtn');
            },
            del() {
                this.$store.dispatch('deleteAreaOfOperationsBtn');
            },
            //创建 节点
            createNode() {
                this.$store.dispatch('areaOfOperationsCertainBtn');
            },
            //更新 节点
            updateNode () {
                this.$store.dispatch('areaOfOperationsUpdateBtn');
            },
            teamSelect (empty,vueComponent) {
                this.$store.dispatch('areaOfOperationsSelectedTeamMember',{name:vueComponent.$el.innerText})
            },
            tagClose (item) {
                this.$store.dispatch('areaOfOperationsDeleteSelectedMember',{item:item}); 
            },
            setCheckedNodes (nodes) {
            },
            loadNode(node, resolve) {
                if(node.level == 0) return;
                if(node.data.childs.length != 0) {
                    resolve(node.data.childs)                    
                } else {
                    resolve([]);
                    return;
                }
            },
            handleCheckChange (data, checked, indeterminate) {
                let checkedArr = this.$refs.tree.getCheckedNodes();
                console.log('handleCheckChange-checkedArr',checkedArr);
                console.log('handleCheckChange-data',data);
                console.log('handleCheckChange-checked',checked);
                if(checked) {
                    var otherCheckedArr = checkedArr.filter((value)=>{
                      return(value.code != data.code);
                    });
                    for(let i = 0, l = otherCheckedArr.length; i < l; i++) {
                        this.$refs.tree.setChecked(otherCheckedArr[i].code,false);
                    }
                    this.$store.dispatch('receiveAreaOfOperationsUseSelect');
                    this.$store.dispatch('areaOfOperationsCurrentNodeData',{item:data});
                    this.$store.dispatch('receiveAreaOfOperationsFormData',{item:data});
                    this.$store.dispatch('areaOfOperationsFormCardStatus',{status:true});
                } else {
                    if(checkedArr.length == 0) {
                        this.$store.dispatch('areaOfOperationsCurrentNodeData',{item:{}});
                        this.$store.dispatch('areaOfOperationsFormClear');                        
                    }
                }
            },
            handleNodeClick (data,node,component) {
                console.info("handleNodeClick",data,node,component)
            },
            handleCurrentChange (data,node) {
                console.info("handleCurrentChange",data,node);
            }
        }
    }
</script>
<style>
.areaOfOperation-content {
    display: block;
    width: 100%;
    height: 500px;
}
.el-form {
    width: 300px;
}
.col {
    padding: 20px;
    overflow:auto;       
}
.col > div.box-card {
    height: 100%;
}
</style>