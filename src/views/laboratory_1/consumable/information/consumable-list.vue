<template>
  <div class="app-container">
    <!-- 功能区域 -->
    <div class="filter-container">
      <!-- 简单搜索 -->
      <div class="filter-container-conditions" style="margin: 2px">
        <el-select v-model="queryList.lab_consumable_category_id" style="width: 160px;" placeholder="耗材种类" filterable clearable @change="handleFilter">
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
          <el-button type="primary" size="medium" @click="handleFilter">搜索</el-button>
        </el-button-group>
      </div>
      <!-- 功能按钮 -->
      <div class="button-filter-container">
        <el-button-group>
          <el-button type="primary" size="medium" @click="showDetailSearchBtn = !showDetailSearchBtn">
            高级搜索
          </el-button>
        </el-button-group>
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
    <!-- 浮动高级搜索区域 -->
    <el-dialog :visible.sync="showDetailSearchBtn" width="95%" :show-close="false">
      <span slot="title" class="my-dialog-title">高级搜索</span>
      <div class="DetailSearch_son">
        <el-row class="DetailSearch_son_row">
          <!-- 耗材种类 -->
          <el-col :span="6">
            <el-select v-model="queryList.lab_consumable_category_id" style="width: 300px;" placeholder="耗材种类" filterable clearable @change="handleFilter">
              <!--获取数据库信息动态生成option-->
              <el-option v-for="item in consumableCategoryList" :key="item.id" :label="item.name" :value="item.id" >
                <span style="float: left">编号:{{ item.id }}</span>
                <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
              </el-option>
            </el-select>
          </el-col>
          <!-- 耗材单位 -->
          <el-col :span="6">
            <el-input v-model="queryList.unit" placeholder="耗材单位" style="width: 300px;" clearable>
              <template slot="prepend">耗材单位</template>
            </el-input>
          </el-col>
          <!-- 耗材数量 -->
          <el-col :span="6">
            <el-input v-model="queryList.quantity" placeholder="耗材数量" style="width: 300px;" clearable>
              <template slot="prepend">耗材数量</template>
            </el-input>
          </el-col>
        </el-row>
        <!-- 按钮定位 -->
        <div class="DetailSearch_button">
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            搜索
          </el-button>
          <el-button class="filter-item" type="primary" icon="el-icon-close" @click="handleClose">
            取消
          </el-button>
        </div>
      </div>
    </el-dialog>
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
        prop="lab_ consumable _category_id"
        label="耗材种类"
        width="auto"
      />
      <el-table-column
        prop="specification"
        label="规格"
        width="auto"
      />
      <el-table-column
        prop="unit"
        label="单位"
      />
      <el-table-column
        prop="quantity"
        label="数量"
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
// id				主id
// lab_ consumable _category_id	耗材种类id		外键，对应耗材种类表的id
// specification			规格
// unit				单位
// quantity				数量
const fake_consumableCategoryList = [
  { id: 1, name: '耗材种类1' },
  { id: 2, name: '耗材种类2' }
]
const fakeDataList = [
  {
    id: 1,
    lab_consumable_category_id: 101,
    specification: '规格',
    unit: '单位',
    quantity: '数量'
  }
]
import Pagination from '@/components/Pagination'
export default {
  name: 'ConsumableList',
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
      /* 类别信息列表 */
      consumableCategoryList: [],
      /* 导出excel相关参数 */
      downloadLoading: false,
      /* 查询条件 */
      queryList: {
        // 需要修改
        lab_consumable_category_id: null,
        unit: null,
        quantity: null
      },
      /* 是否显示高级搜索 */
      showDetailSearchBtn: false
    }
  },
  created() {
    this.getConsumableList()
    this.getTableList()
  },
  methods: {
    /* 获取列表信息 */
    getTableList() {
      // 暂用假数据
      this.tableData = fakeDataList
      this.listLoading = false
      // 调用获取信息的接口
    },
    getConsumableList() {
      // 暂用假数据
      this.consumableCategoryList = fake_consumableCategoryList
      // 调用获取分类信息的接口
    },
    /* 详情 */
    handleDetail(row) {
      console.log('handleDetail')
      this.$router.push({
        name: 'Consumable_Detail',
        query: {
          id: row.id
        }
      })
    },
    /* 查找 */
    handleFilter() {

    },
    /* 导出Excel */
    handleDownload() {

    },
    /* 跳转添加页面 */
    handleCreate() {
      console.log('handleCreate')
      this.$router.push({
        name: 'Consumable_Create'
      })
    },
    /* 批量添加 */
    handleBatchCreate() {

    },
    /* 管理高级搜索 */
    handleClose() {
      // 清空旧数据
      for (const key in this.queryList) {
        this.queryList[key] = null
      }
      // 关闭
      this.showDetailSearchBtn = false
    }
  }
}
</script>

<!-- 高级搜索样式 -->
<style>
  .my-dialog-title{
    font-size: 20px;
    font-weight: 700;
  }
  .DetailSearch_son {
    margin : 10px;
  }
  .DetailSearch_son_row {
    margin-bottom: 10px;
  }
  .DetailSearch_button {
    margin: 30px 10px 0px;
    text-align: right;
  }
</style>

<style scoped>
  .filter-container {
    margin-bottom: 70px;
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
