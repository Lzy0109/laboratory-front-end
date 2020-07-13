<!--
    @Author: 刘梓伊
    @Description: 设施列表界面
    @Date: 2020-06-19 16:52
    @Version: 1.0
-->
<template>
  <div class="app-container">
    <!-- 功能区域 -->
    <div class="filter-container">
      <!-- 简单搜索 -->
      <div class="filter-container-conditions" style="margin: 2px">
        <el-input v-model="queryList.fac_num" placeholder="设施编号" style="width: 230px;" clearable>
          <template slot="prepend">设施编号</template>
        </el-input>
        <el-select v-model="queryList.fac_category_id" style="width: 160px;" placeholder="设施分类" filterable clearable @change="handleFilter">
          <!--获取数据库信息动态生成option-->
          <el-option v-for="item in facCategoryList" :key="item.id" :label="item.name" :value="item.id">
            <span style="float: left">编号:{{ item.id }}</span>
            <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
          </el-option>
        </el-select>
        <el-select v-model="queryList.fac_inCharge_id" style="width: 160px;" placeholder="设施负责人" filterable clearable @change="handleFilter">
          <!--获取数据库信息动态生成option-->
          <el-option v-for="item in facInchargeList" :key="item.id" :label="item.name" :value="item.id">
            <span style="float: left">编号:{{ item.id }}</span>
            <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
          </el-option>
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
          <!-- 设施编号 -->
          <el-col :span="6">
            <el-input v-model="queryList.fac_num" placeholder="设施编号" style="width: 300px;" clearable>
              <template slot="prepend">设施编号</template>
            </el-input>
          </el-col>
          <!-- 设施名称 -->
          <el-col :span="6">
            <el-input v-model="queryList.fac_name" placeholder="设施名称" style="width: 300px;" clearable>
              <template slot="prepend">设施名称</template>
            </el-input>
          </el-col>
          <!-- 设施分类 -->
          <el-col :span="6">
            <div class="detail-search-prepend">设施分类</div>
            <div style="display: table-cell">
              <el-select v-model="queryList.fac_category_id" style="width: 203px;" placeholder="设施分类" filterable clearable>
                <!--获取数据库信息动态生成option-->
                <el-option v-for="item in facCategoryList" :key="item.id" :label="item.name" :value="item.id">
                  <span style="float: left">编号:{{ item.id }}</span>
                  <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
                </el-option>
              </el-select>
            </div>
          </el-col>
          <!-- 设施负责人 -->
          <el-col :span="6">
            <div class="detail-search-prepend">设施负责人</div>
            <div style="display: table-cell">
              <el-select v-model="queryList.fac_inCharge_id" style="width: 189px;" placeholder="设施负责人" filterable clearable>
                <!--获取数据库信息动态生成option-->
                <el-option v-for="item in facInchargeList" :key="item.id" :label="item.name" :value="item.id">
                  <span style="float: left">编号:{{ item.id }}</span>
                  <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
                </el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row class="DetailSearch_son_row">
          <el-col :span="6">
            <el-input v-model="queryList.fac_model" placeholder="设施型号" style="width: 300px;" clearable>
              <template slot="prepend">设施型号</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <div class="detail-search-prepend">设施状态</div>
            <div style="display: table-cell">
              <el-select v-model="queryList.fac_status" style="width: 203px;" placeholder="设施状态" filterable clearable>
                <el-option key="1" label="状态1" :value="1" />
                <el-option key="2" label="状态2" :value="2" />
                <el-option key="3" label="状态3" :value="3" />
              </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryList.fac_quantity" placeholder="设施数量" style="width: 300px;" clearable>
              <template slot="prepend">设施数量</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryList.fac_unit" placeholder="单位" style="width: 300px;" clearable>
              <template slot="prepend">单位</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row class="DetailSearch_son_row">
          <el-col :span="6">
            <div class="detail-search-prepend">生产日期</div>
            <div style="display: table-cell">
              <el-date-picker
                v-model="queryList.fac_produceDate"
                align="right"
                type="date"
                style="width: 203px;"
                placeholder="生产日期"
                :picker-options="pickerOptions"
              />
            </div>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryList.fac_supplier" placeholder="供货商" style="width: 300px;" clearable>
              <template slot="prepend">供货商</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <div name="boss">
              <div class="detail-search-prepend">购买日期</div>
              <div style="display: table-cell">
                <el-date-picker
                  v-model="queryList.fac_purchaseDate"
                  align="right"
                  type="date"
                  style="width: 203px;"
                  placeholder="购买日期"
                  :picker-options="pickerOptions"
                /></div>
            </div>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryList.fac_purchaseMethod" placeholder="购买方式" style="width: 300px;" clearable>
              <template slot="prepend">购买方式</template>
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
        prop="fac_num"
        label="设施编号"
        width="auto"
      />
      <el-table-column
        prop="fac_name"
        label="设施名称"
        width="auto"
      />
      <el-table-column
        prop="fac_category_name"
        label="设施分类"
      />
      <el-table-column
        prop="fac_status"
        label="设施状态"
      />
      <el-table-column
        prop="fac_inCharge_name"
        label="设施负责人"
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
import Pagination from '@/components/Pagination'
// 假数据
const fakeData = {
  id: 1, // 主键id
  fac_num: '设施编号', // 设施编号
  fac_name: '设施名称', // 设施名称
  fac_model: '设施型号', // 设施型号
  fac_category_id: 1, // 设施分类
  fac_category_name: '设施分类1', // 设施分类
  fac_status: '设施状态', // 设施状态
  fac_quantity: '设施数量', // 设施数量
  fac_unit: '单位', // 单位
  fac_unitPrice: '单价', // 单价
  fac_totalPrice: '总价', // 总价
  fac_purchaseDate: '购置日期', // 购置日期
  fac_specification: '规格', // 规格
  fac_countryCode: '国码', // 国码
  fac_produceDate: '出产日期', // 出产日期
  fac_expenditure: '经费来源', // 经费来源
  fac_purchaseMethod: '购买方式', // 购买方式
  fac_billsNumber: '单据号', // 单据号
  fac_attachment: '附件', // 附件
  fac_warranty: '保修期', // 保修期
  fac_inCharge_id: 1, // 负责人
  fac_inCharge_name: '设施负责人1', // 负责人
  fac_supplier: '供货商', // 供货商
  fac_supplierTel: '供货商联系电话' // 供货商联系电话
}
// 假数据列表
const fakeDataList = [{ ...fakeData }, { ...fakeData }, { ...fakeData }, { ...fakeData }, { ...fakeData }, { ...fakeData }, { ...fakeData }, { ...fakeData }, { ...fakeData }, { ...fakeData }]
// 设施分类信息
const fake_facCategoryList = [
  { id: 1, name: '设施分类1' },
  { id: 2, name: '设施分类2' }
]
// 设施负责人信息
const fake_facInchargeList = [
  { id: 1, name: '设施负责人1' },
  { id: 2, name: '设施负责人2' }
]
export default {
  name: 'FacilityList',
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
      CategoryList: [],
      /* 导出excel相关参数 */
      downloadLoading: false,
      /* 查询条件 */
      queryList: {
        // 需要修改
        fac_num: null, // 设施编号
        fac_name: null, // 设施名称
        fac_model: null, // 设施型号
        fac_category_id: null, // 设施分类
        fac_status: null, // 设施状态
        fac_quantity: null, // 设施数量
        fac_unit: null, // 单位
        fac_unitPrice: null, // 单价
        fac_totalPrice: null, // 总价
        fac_purchaseDate: null, // 购置日期
        fac_specification: null, // 规格
        fac_countryCode: null, // 国码
        fac_produceDate: null, // 出产日期
        fac_expenditure: null, // 经费来源
        fac_purchaseMethod: null, // 购买方式
        fac_billsNumber: null, // 单据号
        fac_warranty: null, // 保修期
        fac_inCharge_id: null, // 负责人
        fac_supplier: null, // 供货商
        fac_supplierTel: null // 供货商联系电话
      },
      /* 是否显示高级搜索 */
      showDetailSearchBtn: false,
      /* 设施类别信息 */
      facCategoryList: [],
      /* 设施负责人信息 */
      facInchargeList: [],
      /* 日期选择器规则 */
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  /* 页面创建时，加载数据 */
  created() {
    this.getTableList()
    this.getFacCategoryList()
    this.getFacInchargeList()
  },
  methods: {
    /* 获取列表信息 */
    getTableList() {
      /* fake data */
      this.tableData = fakeDataList
      this.listLoading = false
    },
    /* 获取设施分类信息 */
    getFacCategoryList() {
      this.facCategoryList = fake_facCategoryList
      // 调用获取分类信息接口
    },
    /* 获取设施负责人信息 */
    getFacInchargeList() {
      this.facInchargeList = fake_facInchargeList
      // 调用获取负责人信息接口
    },
    /* 详情 */
    handleDetail(row, column, event) {
      console.log('handleDetail')
      this.$router.push({
        name: 'Facility_Detail',
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
    /* 跳转添加设施页面 */
    handleCreate() {
      console.log('handleCreate')
      this.$router.push({
        name: 'Facility_Create'
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
  .my-dialog-title {
    font-size: 20px;
    font-weight: 700;
  }
  .detail-search-prepend {
    background-color: #F5F7FA;
    color: #909399;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: 1px solid #DCDFE6;
    border-right-style: none;
    border-radius:  4px 0 0 4px;
    padding: 0 20px;
    width: 1px;
    white-space: nowrap;
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
<!-- 功能栏样式 -->
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
