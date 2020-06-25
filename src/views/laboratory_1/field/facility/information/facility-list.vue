<template>
  <div class="app-container">
    <!-- 功能区域 -->
    <div class="filter-container">
      <!-- 简单搜索 -->
      <div class="filter-container-conditions" style="margin: 2px">
        <el-input v-model="queryList.lab_num" placeholder="设施编号" style="width: 230px;" clearable>
          <template slot="prepend">设施编号</template>
        </el-input>
        <el-select v-model="queryList.lab_cate" style="width: 160px;" placeholder="设施分类" filterable clearable @change="handleFilter">
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
        <el-select v-model="queryList.lab_owner" style="width: 160px;" placeholder="设施负责人" filterable clearable @change="handleFilter">
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
      <!-- 功能按钮 -->
      <div class="button-filter-container">
        <el-button-group>
          <el-button type="primary"  size="medium" @click="showDetailSearchBtn = !showDetailSearchBtn">
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
    <!-- 浮动高级搜索区域 -->
    <el-dialog :visible.sync="showDetailSearchBtn" width="95%" :show-close="false">
      <span class="my-dialog-title" slot="title">高级搜索</span>
      <div class="DetailSearch_son">
        <el-row class="DetailSearch_son_row">
          <!-- 实验室编号 -->
          <el-col :span="6">
            <el-input v-model="queryList.lab_num" placeholder="实验室编号" style="width: 300px;" clearable>
              <template slot="prepend">实验室编号</template>
            </el-input>
          </el-col>
          <!-- 实验室名称 -->
          <el-col :span="6">
            <el-input v-model="queryList.lab_name" placeholder="实验室名称" style="width: 300px;" clearable>
              <template slot="prepend">实验室名称</template>
            </el-input>
          </el-col>
          <!-- 实验室分类 -->
          <el-col :span="6">
            <el-select v-model="queryList.lab_owner" style="width: 300px;" placeholder="实验室分类" filterable clearable @change="handleFilter">
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
          <!-- 实验室负责人 -->
          <el-col :span="6">
            <el-select v-model="queryList.lab_owner" style="width: 300px;" placeholder="实验室负责人" filterable clearable @change="handleFilter">
              <el-option key="1" label="负责人1" value="1" />
              <el-option key="0" label="负责人2" value="0" />
            </el-select>
          </el-col>
        </el-row>
        <el-row class="DetailSearch_son_row">
          <el-col :span="6">
            <el-input v-model="queryList.other" placeholder="楼" style="width: 300px;" clearable>
              <template slot="prepend">楼</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryList.other" placeholder="房间号" style="width: 300px;" clearable>
              <template slot="prepend">房间号</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryList.other" placeholder="最大机位数" style="width: 300px;" clearable>
              <template slot="prepend">最大机位数</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryList.other" placeholder="可容纳人数上限" style="width: 300px;" clearable>
              <template slot="prepend">可容纳人数上限</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row class="DetailSearch_son_row">
          <el-col :span="6">
            <el-input v-model="queryList.other" placeholder="可用设备数" style="width: 300px;" clearable>
              <template slot="prepend">可用设备数</template>
            </el-input>
          </el-col>
          <!--          <el-col :span="6">-->
          <!--            <span>日期：</span>-->
          <!--            <el-date-picker-->
          <!--              v-model="queryList.other"-->
          <!--              type="date"-->
          <!--              placeholder="（其他）日期"-->
          <!--              value-format="yyyy-MM-dd"-->
          <!--              style="width: auto;"-->
          <!--              class="filter-item"-->
          <!--            />-->
          <!--          </el-col>-->
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
        prop="fac_category"
        label="设施分类"
      />
      <el-table-column
        prop="fac_status"
        label="设施状态"
      />
      <el-table-column
        prop="fac_inCharge"
        label="设施负责人"
      />
    </el-table>
    <!-- 分页栏 -->
    <pagination v-show="total > 0"
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
    fac_category: '设施分类', // 设施分类
    fac_status: '设施状态', // 设施状态
    fac_quantity: '设施数量', // 设施数量
    fac_unit: '单位', // 单位
    fac_unitPrice: '单价', // 单价
    fac_totalPrice: '总价', // 总价
    fac_purchaseDate: '购置日期', // 购置日期
    fac_specification: '规格', // 规格
    fac_countryCode: '国码', // 国码
    fac_produceDate: '生产日期', // 生产日期
    fac_expenditure: '经费来源', // 经费来源
    fac_purchaseMethod: '购买方式', // 购买方式
    fac_billsNumber: '单据号', // 单据号
    fac_attachment: '附件', // 附件
    fac_warranty: '保修期', // 保修期
    fac_inCharge: '负责人', // 负责人
    fac_supplier: '供货商', // 供货商
    fac_supplierTel: '供货商联系电话', // 供货商联系电话
  }
  //假数据列表
  const fakeDataList = [ {...fakeData},{...fakeData},{...fakeData},{...fakeData},{...fakeData},{...fakeData},{...fakeData},{...fakeData},{...fakeData},{...fakeData} ]
  export default {
    components: {
      Pagination
    },
    name: 'facility-list',
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
          lab_name: null,
          lab_num: null,
          lab_owner: null,
          lab_cate: null,
          other: null
        },
        /* 是否显示高级搜索 */
        showDetailSearchBtn: false
      }
    },
    methods: {
      /* 获取列表信息 */
      getList(){
        /* fake data */
        this.tableData = fakeDataList
        this.listLoading = false
      },
      /* 详情 */
      handleDetail(row, column, event) {
        console.log('handleDetail')
        this.$router.push({
          name: 'Facility_Detail',
          query:{
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
    },
    /* 页面创建时，加载数据 */
    created() {
      this.getList();
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
<!-- 高级搜索样式 -->
<style>
  .my-dialog-title{
    font-size: 20px;
    font-weight: 700;
  }
  .DetailSearch {
    overflow:hidden;
    margin-top: 10px;
    margin-bottom: 10px;
    -webkit-box-shadow: #CCCCCC 0px 0px 5px;
    -moz-box-shadow: #CCCCCC 0px 0px 5px;
    box-shadow: #CCCCCC 0px 0px 5px;
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
