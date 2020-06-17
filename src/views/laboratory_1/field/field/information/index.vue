<template>
  <div class="app-container">
    <!-- 搜索栏 + 功能栏 -->
    <div class="filter-container">
      <div class="filter-container-conditions" style="margin: 2px">
        <el-input v-model="listQuery.lab_num" placeholder="编号" style="width: 230px;" clearable>
          <template slot="prepend">编号:</template>
        </el-input>
        <el-input v-model="listQuery.lab_name" placeholder="名称" style="width: 230px;" clearable>
          <template slot="prepend">名称:</template>
        </el-input>
        <el-select v-model="listQuery.lab_owner" style="width: auto;" placeholder="负责人" filterable clearable @change="handleFilter">
          <!--获取数据库信息动态生成option-->
          <!--
          <el-option v-for="item in CategoryList" :key=item.id :label="item.name" :value="item.id" >
            <span style="float: left">编号:{{ item.id }}</span>
            <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
          </el-option>
          -->
          <el-option key="1" label="负责人1" value="1" />
          <el-option key="0" label="负责人2" value="0" />
        </el-select>
        <el-button-group>
          <el-button type="primary"  size="medium" @click="handleFilter">搜索</el-button>
        </el-button-group>
      </div>
      <div class="button-filter-container">

        <el-button-group>
          <el-button type="primary"  size="medium" @click="DetailSearchShow = !DetailSearchShow">
            高级搜索
          </el-button>
        </el-button-group>
        <el-button-group>
          <el-button type="primary"  size="medium" @click="handleCreate">
            添加
          </el-button>
        </el-button-group>
        <el-button-group>
          <el-button type="primary"  size="medium" @click="handleBatchCreate">
            导入
          </el-button>
          <el-button type="primary"  size="medium" :loading="downloadLoading" @click="handleDownload">
            导出
          </el-button>
        </el-button-group>

      </div>
    </div>

    <!-- 浮动高级搜索栏 -->
    <el-dialog title="高级搜索" :visible.sync="DetailSearchShow" width="95%" :show-close="false">
      <div class="DetailSearch_son">
        <el-row class="DetailSearch_son_row">
          <el-col :span="6">
            <span>可用设备数:</span>
            <el-input v-model="listQuery.other" placeholder="可用设备数" style="width: auto;" clearable />
          </el-col>
          <el-col :span="6">
            <span>楼:</span>
            <el-input v-model="listQuery.other" placeholder="楼" style="width: auto;" clearable />
          </el-col>
          <el-col :span="6">
            <span>房间编号:</span>
            <el-input v-model="listQuery.other" placeholder="房间编号" style="width: auto;" clearable />
          </el-col>
          <el-col :span="6">
            <span>可容纳人数:</span>
            <el-input v-model="listQuery.other" placeholder="可容纳人数" style="width: auto;" clearable />
          </el-col>
        </el-row>
        <el-row class="DetailSearch_son_row">
          <el-col :span="6">
            <span>分类：</span>
            <el-select
              v-model="listQuery.other"
              style="width: auto"
              class="filter-item"
              placeholder="实验室类别"
              filterable
              clearable
            >
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
            <span>日期：</span>
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
            <span>可容纳人数:</span>
            <el-input v-model="listQuery.other" placeholder="可容纳人数" style="width: auto;" clearable />
          </el-col>
          <el-col :span="6">
            <el-input v-model="listQuery.other" placeholder="其他条件" style="width: auto;" clearable />
          </el-col>
        </el-row>

        <!--按钮定位-->
        <div class="DetailSearch_button">
          <el-button class="filter-item" type="primary" round icon="el-icon-search" @click="handleFilter">
            搜索
          </el-button>
          <el-button class="filter-item" type="primary" round icon="el-icon-close" @click="handleClose">
            取消
          </el-button>

        </div>

      </div>
    </el-dialog>
    <!-- table区域 -->
    <el-table
      v-loading="listLoading"
      :data="tableData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @row-dblclick="handleDetail"
    >
      <el-table-column
        label="序号"
        type="index"
        width="70"
        align="center"
      />
      <el-table-column
        prop="lab_num"
        label="编号"
        width="auto"
      />
      <el-table-column
        prop="lab_name"
        label="名称"
        width="auto"
      />
      <el-table-column
        prop="lab_category"
        label="分类"
      />
      <el-table-column
        prop="lab_equip_cur_num"
        label="可用设备数"
      />
      <el-table-column
        prop="lab_owner"
        label="负责人"
      />
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
  import Pagination from '@/components/Pagination'
  export default {
    components: {
      Pagination
    },
    data() {
      return {
        /* 表格参数*/
        tableData: null,
        listLoading: true,
        /* 分页参数 待修改*/
        total: 100,
        pageNum: 1,
        pageSize: 20,
        /* 类别信息列表*/
        CategoryList: [],
        /* 导出excel相关参数*/
        downloadLoading: false,
        /* 查询条件*/
        listQuery: {
          lab_name: null,
          lab_num: null,
          lab_owner: null,
          other: null
        },
        /* 是否显示高级搜索*/
        DetailSearchShow: false,
        /* 是否显示功能栏*/
        FunctionBtnShow: false,
        /* 是否显示批量删除确认按钮*/
        BatchDeleteBtnShow: false
      }
    },
    created() {
      this.getTableList()
    },
    methods: {
      /* 获取列表信息*/
      getTableList() {
        this.tableData = [{
          id: 1,
          lab_num: 105,
          lab_name: '测试实验室',
          lab_category: '实验室类别',
          lab_equip_cur_num: '当前可用设备数',
          lab_owner: '负责人'
        },
          {
            id: 2,
            lab_num: 103,
            lab_name: '测试实验室3',
            lab_category: '实验室类别3',
            lab_equip_cur_num: '当前可用设备数',
            lab_owner: '负责人'
          }]
        this.listLoading = false
      },

      /* 编辑*/
      handleEdit(index, row) {

      },
      /* 删除一条*/
      handleDelete(id) {
        if (id) {
          return true
        } else {
          return false
        }
      },
      /* 删除一条信息确认弹窗*/
      beforeHandleDelete(index, row) {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.handleDelete(row.id)) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message({
              type: 'warning',
              message: '删除失败!'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      beforeHandleBatchDelete() {
        this.$confirm('此操作将删除您选中的信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.handleBatchDelete()) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message({
              type: 'warning',
              message: '删除失败!'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      /* 详情*/
      handleDetail(row, column, event) {
        console.log('handleDetail')
        this.$router.push({
          path:'labdetail',
          query:{
            id: row.id
          }
        })
      },
      /* 查找*/
      handleFilter() {

      },
      /* 导出Excel*/
      handleDownload() {

      },
      /* 添加数据*/
      handleCreate() {

      },
      /* 批量添加*/
      handleBatchCreate() {

      },
      /* 管理高级搜索 */
      handleClose() {
        // 清空旧数据
        for (const key in this.listQuery) {
          this.listQuery[key] = null
        }
        // 关闭
        this.DetailSearchShow = false
      }
    }
  }
</script>

<style scoped>
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

<!--高级搜索样式-->
<style scoped>
  .DetailSearch{
    overflow:hidden;
    margin-top: 10px;
    margin-bottom: 10px;
    -webkit-box-shadow: #CCCCCC 0px 0px 5px;
    -moz-box-shadow: #CCCCCC 0px 0px 5px;
    box-shadow: #CCCCCC 0px 0px 5px;
  }
  .DetailSearch_son{
    margin : 5px;
  }
  .DetailSearch_son_row{
    margin-bottom: 5px;
  }
  .DetailSearch_button{
    margin-right:20px;
    margin-bottom: 5px;
    text-align: right;
  }
</style>
<!--功能栏样式-->
<style scoped>
  .filter-container {
    margin-bottom: 70px;
  }
  .FunctionBtn{
    overflow:hidden;
    margin-top: 10px;
    margin-bottom: 10px;
    -webkit-box-shadow: #CCCCCC 0px 0px 5px;
    -moz-box-shadow: #CCCCCC 0px 0px 5px;
    box-shadow: #CCCCCC 0px 0px 5px;
  }
  .FunctionBtn_Son{
    display: inline-block;
    margin : 5px;
  }
  .button-filter-container{
    display: inline-block;
    margin: 2px;
    float: right;
  }
  .filter-container-conditions{
    float: left;
    display: inline-block;
  }
</style>
