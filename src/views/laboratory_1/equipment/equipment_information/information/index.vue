<template>
  <div class="app-container">
    <!-- 搜索栏 + 功能栏 -->
    <div class="filter-container">
      <el-input v-model="listQuery.lab_num" placeholder="编号" style="width: auto;"  clearable >
        <template slot="prepend">编号:</template>
      </el-input>
      <el-input v-model="listQuery.lab_name" placeholder="名称" style="width: auto;" clearable >
        <template slot="prepend">名称:</template>
      </el-input>
      <el-select v-model="listQuery.lab_category" style="width: auto;"  placeholder="实验室分类" filterable clearable @change="handleFilter">
        <!--获取数据库信息动态生成option-->
        <!--
        <el-option v-for="item in CategoryList" :key=item.id :label="item.name" :value="item.id" >
          <span style="float: left">编号:{{ item.id }}</span>
          <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
        </el-option>
        -->
        <el-option key="1" label="类别1" value="1" />
        <el-option key="0" label="类别2" value="0" />
      </el-select>
      <div class="filter-btn-container">
        <el-button  type="primary" icon="el-icon-search" @click="handleFilter">
          搜索
        </el-button>
        <el-button  type="primary" icon="el-icon-search"  @click="DetailSearchShow = !DetailSearchShow">
          高级搜素
        </el-button>
        <el-button  type="primary" icon="el-icon-info"  @click="FunctionBtnShow = !FunctionBtnShow">
          其他功能
        </el-button>
      </div>
    </div>
    <!-- 功能栏 -->
    <el-collapse-transition>
      <div class="FunctionBtn" v-show="FunctionBtnShow">
        <div class="FunctionBtn_Son">
          <h3>其他功能：</h3>
          <el-button  type="primary" icon="el-icon-plus" @click="handleCreate">
            添加
          </el-button>
          <el-button  icon="el-icon-plus"  type="primary" @click="handleBatchCreate">
            批量导入
          </el-button>
          <el-button :loading="downloadLoading" icon="el-icon-download" type="primary" @click="handleDownload">
            导出报表
          </el-button>
          <el-button  :icon="BatchDeleteBtnShow ? 'el-icon-close':'el-icon-delete'" type="danger"  @click="BatchDeleteBtnShow = !BatchDeleteBtnShow">
            批量删除
          </el-button>
        </div>
        <!-- 批量删除按钮执行功能按钮 -->
        <transition name="el-zoom-in-top">
          <div v-show="BatchDeleteBtnShow" class="FunctionBtn_Son">
            <el-button  type="danger" icon="el-icon-delete" @click="beforeHandleBatchDelete">
              删除所选
            </el-button>
            <el-button  type="primary" icon="el-icon-close" @click="BatchDeleteBtnShow = !BatchDeleteBtnShow">
              取消
            </el-button>
          </div>
        </transition>
      </div>
    </el-collapse-transition>
    <!-- 高级搜索栏 -->
    <el-collapse-transition>
      <div class="DetailSearch" v-show="DetailSearchShow">
        <div class="DetailSearch_son">
          <h3>高级搜索：</h3>
          <el-row class="DetailSearch_son_row">
            <el-col :span="6">
              <el-input v-model="listQuery.other" placeholder="其他条件" style="width: auto;" clearable>
                <template slot="prepend">其他条件:</template>
              </el-input>
            </el-col>
            <el-col :span="6">
              <el-input v-model="listQuery.other" placeholder="其他条件" style="width: auto;" clearable>
                <template slot="prepend">其他条件:</template>
              </el-input>
            </el-col>
            <el-col :span="6">
              <el-input v-model="listQuery.other" placeholder="其他条件" style="width: auto;" clearable>
                <template slot="prepend">其他条件:</template>
              </el-input>
            </el-col>
            <el-col :span="6">
              <el-input v-model="listQuery.other" placeholder="其他条件" style="width: auto;" clearable>
                <template slot="prepend">其他条件:</template>
              </el-input>
            </el-col>
          </el-row>
          <el-row class="DetailSearch_son_row">
            <el-col :span="6">
              <el-select v-model="listQuery.other" style="width: auto" class="filter-item" placeholder="其他分类" filterable clearable @change="handleFilter">
                <!--获取数据库信息动态生成option-->
                <!--
                <el-option v-for="item in CategoryList" :key=item.id :label="item.name" :value="item.id" >
                  <span style="float: left">编号:{{ item.id }}</span>
                  <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
                </el-option>
                -->
                <el-option key="1" label="类别1" value="1" />
                <el-option key="0" label="类别2" value="0" />
              </el-select>
            </el-col>
            <el-col :span="6">
              <el-date-picker
                v-model="listQuery.other"
                type="date"
                placeholder="（其他）日期"
                value-format="yyyy-MM-dd"
                style="width: auto;"
                class="filter-item"
              />
            </el-col>
            <el-col :span="6">
              <el-input v-model="listQuery.other" placeholder="其他条件" style="width: auto;" clearable>
              </el-input>
            </el-col>
            <el-col :span="6">
              <el-input v-model="listQuery.other" placeholder="其他条件" style="width: auto;" clearable>
              </el-input>
            </el-col>
          </el-row>

          <!--按钮定位-->
          <div class="DetailSearch_button">
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
              搜索
            </el-button>
            <el-button class="filter-item" type="primary" icon="el-icon-close" @click="DetailSearchShow = !DetailSearchShow">
              取消
            </el-button>

          </div>

        </div>
      </div>
    </el-collapse-transition>
    <!-- table区域 -->
    <el-table
      :data="tableData"
      v-loading="listLoading"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-collapse-transition>
        <el-table-column
          v-if="BatchDeleteBtnShow"
          type="selection"
          width="55">
        </el-table-column>
      </el-collapse-transition>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="编号">
              <span>{{ props.row.lab_num }}</span>
            </el-form-item>
            <el-form-item label="名称">
              <span>{{ props.row.lab_name }}</span>
            </el-form-item>
            <el-form-item label="类别">
              <span>{{ props.row.lab_category }}</span>
            </el-form-item>
            <el-form-item label="其他">
              <span>{{ props.row.labOtherInfo }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="序号"
        type="index"
        width="50"
        align="center"/>
      <el-table-column
        prop="lab_num"
        label="编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="lab_name"
        label="名称"
        width="180">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleDetail">{{row.lab_name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="lab_category"
        label="类别">
      </el-table-column>
      <el-table-column
        prop="labOtherInfo"
        label="实验室其他信息">
      </el-table-column>
      <el-table-column align="center" label="操作" >
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini"  @click="handleEdit(scope.$index,scope.row)" >编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="beforeHandleDelete(scope.$index,scope.row)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页栏 -->
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="pageNum"
      :limit.sync="pageSize"
    />
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination';
  export default {
    data() {
      return {
        /* 表格参数 */
        tableData: null,
        listLoading:true,
        /* 分页参数 待修改 */
        total:100,
        pageNum:1,
        pageSize:20,
        /* 储存多选框数据 */
        multipleSelection: [],
        /* 类别信息列表 */
        CategoryList:[],
        /* 导出excel相关参数 */
        downloadLoading:false,
        /* 查询条件 */
        listQuery:{
          lab_name:null,
          lab_num:null,
          lab_category:null,
          other:null
        },
        /* 是否显示高级搜索 */
        DetailSearchShow:false,
        /* 是否显示功能栏 */
        FunctionBtnShow:false,
        /* 是否显示批量删除确认按钮 */
        BatchDeleteBtnShow:false
      }
    },
    components:{
      Pagination
    },
    methods:{
      /* 获取列表信息 */
      getTableList(){
        this.tableData = [
          {
          id:1,
          lab_num: 101,
          lab_name: "测试实验室",
          lab_category: "实验室类别",
          labOtherInfo: "实验室其他信息"
          },
          {
            id:2,
            lab_num: 102,
            lab_name: "测试实验室",
            lab_category: "实验室类别",
            labOtherInfo: "实验室其他信息"
          },
          {
            id:3,
            lab_num: 103,
            lab_name: "测试实验室",
            lab_category: "实验室类别",
            labOtherInfo: "实验室其他信息"
          },{
            id:4,
            lab_num: 104,
            lab_name: "测试实验室",
            lab_category: "实验室类别",
            labOtherInfo: "实验室其他信息"
          },
          {
            id:5,
            lab_num: 105,
            lab_name: "测试实验室",
            lab_category: "实验室类别",
            labOtherInfo: "实验室其他信息"
          }
        ];
        this.listLoading = false
      },
      /* 或取多选框的信息 */
      handleSelectionChange(val) {
        this.multipleSelection = val;
        /* 筛选出ID */
        this.multipleSelection = this.multipleSelection.map(m => m.id);
        console.log(this.multipleSelection.toString())
      },
      /* 编辑 */
      handleEdit(index,row){

      },
      /* 删除一条 */
      handleDelete(id){
        if (id){
          return true;
        }else{
          return false;
        }

      },
      /* 删除一条信息确认弹窗 */
      beforeHandleDelete(index,row) {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.handleDelete(row.id)){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.tableData.splice(index,1)
          }else{
            this.$message({
              type: 'warning',
              message: '删除失败!'
            });
          }

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      /* 批量删除 */
      handleBatchDelete(){
        /* 获取需要删除的id this.multipleSelection*/
        /* 执行删除操作*/
        /* 返回true false*/
      },
      beforeHandleBatchDelete() {
        this.$confirm('此操作将删除您选中的信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.handleBatchDelete()){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }else{
            this.$message({
              type: 'warning',
              message: '删除失败!'
            });
          }

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      /* 详情 */
      handleDetail(index,row){
        console.log("handleDetail")
      },
      /* 查找 */
      handleFilter(){

      },
      /* 导出Excel */
      handleDownload(){

      },
      /* 添加数据 */
      handleCreate(){

      },
      /* 批量添加 */
      handleBatchCreate(){

      }
    },
    created() {
      this.getTableList();
    }
  }
</script>

<style scoped>
  .filter-container {
    margin: 20px 0 20px 0;
  }
  .filter-btn-container {
    float: right;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<!-- 高级搜索样式 -->
<style scoped>
  .DetailSearch{
    overflow:hidden;
    margin-bottom: 40px;
    -webkit-box-shadow: #CCCCCC 0px 0px 5px;
    -moz-box-shadow: #CCCCCC 0px 0px 5px;
    box-shadow: #CCCCCC 0px 0px 5px;
    border-radius: 4px;
  }
  .DetailSearch_son{
    margin-left: 15px;
  }
  .DetailSearch_son_row{
    margin-bottom: 5px;
  }
  .DetailSearch_button{
    margin-right:20px;
    margin-bottom: 10px;
    text-align: right;
  }
</style>
<!-- 功能栏样式 -->
<style scoped>
  .FunctionBtn{
    overflow:hidden;
    margin-bottom: 40px;
    -webkit-box-shadow: #CCCCCC 0px 0px 5px;
    -moz-box-shadow: #CCCCCC 0px 0px 5px;
    box-shadow: #CCCCCC 0px 0px 5px;
    border-radius: 4px;
  }
  .FunctionBtn_Son{
    display: inline-block;
    margin: 15px 10px 15px 15px;
  }
</style>
