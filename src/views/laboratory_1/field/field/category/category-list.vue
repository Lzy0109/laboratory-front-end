<!--
    @Author: 刘梓伊
    @Description: 实验室分类列表界面
    @Date: 2020-06-18 16:20
    @Version: 1.0
-->
<template>
  <div class="app-container">
    <!-- 功能区域 -->
    <div class="filter-container">
      <!-- 简单搜索 -->
      <div class="filter-container-conditions" style="margin: 2px">
        <el-input v-model="queryList.name" placeholder="分类名称" style="width: 230px;" clearable>
          <template slot="prepend">分类名称</template>
        </el-input>
        <el-button-group>
          <el-button type="primary" size="medium" @click="handleFilter">搜索</el-button>
        </el-button-group>
      </div>
      <!-- 功能按钮 -->
      <div class="button-filter-container">
        <el-button-group>
          <el-button type="primary" size="medium" @click="handleCreate">
            添加
          </el-button>
        </el-button-group>
        <el-button-group>
          <el-button type="primary" size="medium" @click="handleBatchCreate">
            导入
          </el-button>
          <el-button type="primary" size="medium" :loading="downloadLoading" @click="handleDownload">
            导出
          </el-button>
        </el-button-group>
      </div>
    </div>
    <!-- table区域 -->
    <!-- 表格错位问题 设置全局样式 -->
    <el-table
      v-loading="listLoading"
      :data="tableData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      :header-cell-style="{'font-size': '17px'}"
      @row-click="handleDetail"
    >
      <el-table-column
        label="序号"
        type="index"
        width="70"
        align="center"
      />
      <el-table-column
        prop="name"
        label="分类名称"
        width="auto"
      />
      <el-table-column
        prop="english_name"
        label="英文名称"
        width="auto"
      />
      <el-table-column
        prop="description"
        label="分类描述"
        width="auto"
      />
    </el-table>
    <!-- 分页栏 -->
    <pagination
      v-show="total > 0"
      :total="100"
      :page.sync="pageNum"
      :limit.sync="pageSize"
    />
  </div>
</template>

<script>
  // 假数据
  const fake_data = [
  {
    id: 1,
    name: '实验室分类名称',
    english_name: 'test_lab_category',
    description: '实验室分类描述'
  }
]
import Pagination from '@/components/Pagination'
export default {
  name: 'category-list',
  components: {
    Pagination
  },
  data() {
    return {
      /* 表格参数 */
      tableData: null,
      listLoading: true,
      /* 分页参数 待修改 */
      total: 100,
      pageNum: 1,
      pageSize: 20,
      /* 导出excel相关参数 */
      downloadLoading: false,
      /* 查询条件 */
      queryList: {
        // 需要修改
        name: null
      }
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    /* 获取列表信息 */
    getTableList() {
      // 调用获取信息接口
      this.tableData = fake_data
      this.listLoading = false
    },
    /* 跳转到实验室分类详情页面 */
    handleDetail(row, column, event) {
      console.log('handleDetail')
      this.$router.push({
        name: 'Field_Category_Detail',
        query: {
          id: row.id
        }
      })
    },
    /* 跳转添加实验室分类页面 */
    handleCreate() {
      console.log('handleCreate')
      this.$router.push({
        name: 'Field_Category_Create'
      })
    },
    /* 查找 */
    handleFilter() {

    },
    /* 导出Excel */
    handleDownload() {

    },
    /* 批量添加 */
    handleBatchCreate() {

    }
  }
}
</script>

<!-- 功能栏样式 -->
<style scoped>
  .filter-container {
    margin-bottom: 70px;
  }
  .FunctionBtn {
    overflow:hidden;
    margin-top: 10px;
    margin-bottom: 10px;
    -webkit-box-shadow: #CCCCCC 0px 0px 5px;
    -moz-box-shadow: #CCCCCC 0px 0px 5px;
    box-shadow: #CCCCCC 0px 0px 5px;
  }
  .FunctionBtn_Son {
    display: inline-block;
    margin : 5px;
  }
  .button-filter-container {
    display: inline-block;
    margin: 5px;
    float: right;
  }
  .filter-container-conditions {
    float: left;
    display: inline-block;
  }
</style>
