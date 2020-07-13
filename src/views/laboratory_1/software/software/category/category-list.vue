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
      :total="total"
      :page.sync="queryList.pageNum"
      :limit.sync="queryList.pageSize"
      @pagination="getTableList"
    />
  </div>
</template>

<script>
import { fetchSoftwareCategoryInfos } from '../../../../../api/laboratory_1/software-category'

import Pagination from '@/components/Pagination'
export default {
  name: 'CategoryList',
  components: {
    Pagination
  },
  data() {
    return {
      /* 表格参数 */
      tableData: null,
      listLoading: true,
      /* 分页参数 待修改 */
      total: 0,
      /* 导出excel相关参数 */
      downloadLoading: false,
      /* 查询条件 */
      queryList: {
        // 需要修改
        pageNum: 1,
        pageSize: 20,
        name: null
      }
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    /**
      * @method：getTableList
      * @desc：获取列表信息
      * @params:
      * @create date： 2020/7/13
      * @update date： 2020/7/13
      * @author：李国烨
     */
    getTableList() {
      // 调用获取信息接口
      fetchSoftwareCategoryInfos(this.queryList).then(res => {
        this.total = res.data.total
        this.tableData = res.data.list
        this.listLoading = false
      }).catch(err => {
        this.$message({
          message: '获取信息失败',
          type: 'error'
        })
      })
    },
    /**
      * @method：handleDetail
      * @desc：跳转到详情页面
      * @params: row 当前行的数据
      * @create date： 2020/7/13
      * @update date： 2020/7/13
      * @author：李国烨
     */
    handleDetail(row, column, event) {
      console.log('handleDetail')
      this.$router.push({
        name: 'Software_Category_Detail',
        query: {
          id: row.id
        }
      })
    },
    /**
      * @method：handleCreate
      * @desc：跳转添加页面
      * @params:
      * @create date： 2020/7/13
      * @update date： 2020/7/13
      * @author：李国烨
     */
    handleCreate() {
      console.log('handleCreate')
      this.$router.push({
        name: 'Software_Category_Create'
      })
    },
    /**
      * @method：handleFilter
      * @desc：条件查找
      * @params:
      * @create date： 2020/7/13
      * @update date： 2020/7/13
      * @author：李国烨
     */
    handleFilter() {
      this.queryList.pageNum = 1
      for (const key in this.queryList) {
        if (this.queryList[key] === '') { this.queryList[key] = null }
      }
      this.getTableList()
    },
    /**
      * @method：handleDownload
      * @desc：导出Excel
      * @params:
      * @create date： 2020/7/13
      * @update date： 2020/7/13
      * @author：李国烨
     */
    handleDownload() {

    },
    /**
      * @method：handleBatchCreate
      * @desc：批量添加
      * @params:
      * @create date： 2020/7/13
      * @update date： 2020/7/13
      * @author：李国烨
     */
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
