<template>
  <div class="app-container">
    <!-- 功能按钮 -->
    <div class="detail-button">
      <el-button type="primary" @click="handleNormalReturn" size="medium">普通归还</el-button>
      <el-button type="primary" @click="handleBatchReturn" size="medium">批量归还</el-button>
    </div>
    <el-collapse-transition>
      <div v-show="showNormalBtn">
        <!-- 出借列表 -->
        <el-table
          v-loading="listLoading"
          :data="normalReturnData"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
          @row-click="handleDetail"
          :header-cell-style="{'font-size': '17px'}"
        >
          <el-table-column
            label="序号"
            type="index"
            width="70"
            align="center"
          />
          <el-table-column
            prop="lab_num"
            label="资产编号"
            width="auto"
          />
          <el-table-column
            prop="lab_num"
            label="资产分类"
            width="auto"
          />
          <el-table-column
            prop="lab_name"
            label="资产名称"
            width="auto"
          />
          <el-table-column
            prop="lab_category"
            label="出借日期"
          />
        </el-table>
        <!-- 分页栏 -->
        <pagination v-show="total > 0"
                    :total="100"
                    :page.sync="pageNum"
                    :limit.sync="pageSize"
        />
      </div>
    </el-collapse-transition>
    <el-collapse-transition>
      <div v-show="showBatchBtn">
        <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
        <el-table :data="batchReturnData" border highlight-current-row style="width: 100%;margin-top:20px;">
          <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
        </el-table>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
  import UploadExcelComponent from '@/components/UploadExcel/index.vue'
  import Pagination from '@/components/Pagination'
  const fakeData = {

  }
  //假数据列表
  const fakeDataList = [ {...fakeData},{...fakeData},{...fakeData},{...fakeData},{...fakeData},{...fakeData},{...fakeData},{...fakeData},{...fakeData},{...fakeData} ]
  export default {
    name: 'property-lend',
    components: {
      Pagination,
      UploadExcelComponent
    },
    data() {
      return {
        /* 表格参数 */
        normalReturnData: null,
        listLoading: false,
        /* 分页参数 待修改 */
        total: 100,
        pageNum: 1,
        pageSize: 20,
        /* 批量出借 */
        batchReturnData: null,
        tableHeader: [],
        showNormalBtn: false,
        showBatchBtn: false
      }
    },
    methods: {
      /* 获取列表信息 */
      getTableList() {
        this.normalReturnData = fakeDataList
        this.listLoading = false
      },
      /* 普通出借 */
      handleNormalReturn() {
        this.showBatchBtn = false
        this.showNormalBtn = !this.showNormalBtn
      },
      /* 批量出借 */
      handleBatchReturn() {
        this.showNormalBtn = false
        this.showBatchBtn = !this.showBatchBtn
      },
      /* 详情 */
      handleDetail() {

      },
      /* 页面创建时，加载数据 */
      created() {
        this.getTableList()
      },
      /* 上传excel批量 */
      beforeUpload(file) {
        const isLt1M = file.size / 1024 / 1024 < 1

        if (isLt1M) {
          return true
        }

        this.$message({
          message: 'Please do not upload files larger than 1m in size.',
          type: 'warning'
        })
        return false
      },
      handleSuccess({ results, header }) {
        this.batchReturnData = results
        this.tableHeader = header
      }
    }
  }
</script>

<style scoped>
  .detail-button{
    color: #5a5e66;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.1);
    padding:10px 20px;
    margin-bottom: 20px;
  }
</style>
