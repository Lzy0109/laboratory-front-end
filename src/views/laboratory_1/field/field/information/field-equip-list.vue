<template>
  <div class="app-container">
    <!-- 功能区域 -->
    <div class="filter-container">
      <el-button type="primary" size="medium" @click="handleReturn">返回</el-button>
      <div class="button-filter-container">
        <!-- 简单搜索 -->
        <div class="filter-container-conditions" style="margin: 2px">
          <el-input v-model="queryList.number" placeholder="器材编号" style="width: 230px;" clearable>
            <template slot="prepend">器材编号</template>
          </el-input>
          <el-input v-model="queryList.lab_equipment_category_name" placeholder="器材分类" style="width: 230px;" clearable>
            <template slot="prepend">器材分类</template>
          </el-input>
          <!-- 旧版 -->
          <!--<el-select v-model="queryList.lab_equipment_category_id" style="width: 160px;" placeholder="器材分类" filterable clearable>
            &lt;!&ndash;获取数据库信息动态生成option&ndash;&gt;
            <el-option v-for="item in equCategoryList" :key="item.id" :label="item.name" :value="item.id">
              <span style="float: left">编号:{{ item.id }}</span>
              <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
            </el-option>
          </el-select>-->
          <el-button-group>
            <el-button type="primary" size="medium" @click="handleFilter">搜索</el-button>
          </el-button-group>
        </div>
        <!-- 功能按钮 -->
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
          <el-button type="primary" size="medium" @click="handleDownload">
            导出
          </el-button>
        </el-button-group>
      </div>
    </div>
    <!-- 浮动高级搜索区域 -->
    <el-dialog :visible.sync="showDetailSearchBtn" width="95%" :show-close="false">
      <span slot="title" class="my-dialog-title">高级搜索</span>
      <div class="DetailSearch_son">
        <!-- el-row内容需要替换 -->
        <el-row class="DetailSearch_son_row">
          <!-- 器材编号 -->
          <el-col :span="6">
            <el-input v-model="queryList.number" placeholder="器材编号" style="width: 300px;" clearable>
              <template slot="prepend">器材编号</template>
            </el-input>
          </el-col>
          <!-- 器材种类 -->
          <el-col :span="6">
            <el-input v-model="queryList.lab_equipment_category_name" placeholder="器材分类" style="width: 300px;" clearable>
              <template slot="prepend">器材分类</template>
            </el-input>
            <!-- 旧版 -->
            <!--<div class="detail-search-prepend">器材种类</div>
            <div style="display: table-cell">
              <el-select v-model="queryList.lab_equipment_category_id" style="width: 203px;" placeholder="器材种类" filterable clearable @change="handleFilter">
                &lt;!&ndash;获取数据库信息动态生成option&ndash;&gt;
                <el-option v-for="item in equCategoryList" :key="item.id" :label="item.name" :value="item.id">
                  <span style="float: left">编号:{{ item.id }}</span>
                  <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
                </el-option>
              </el-select>
            </div>-->
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryList.equip_name" placeholder="器材名称" style="width: 300px;" clearable>
              <template slot="prepend">器材名称</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryList.field_name" placeholder="存放场所" style="width: 300px;" clearable>
              <template slot="prepend">存放场所</template>
            </el-input>
            <!-- 旧版 -->
            <!--<div class="detail-search-prepend">存放场所</div>
            <div style="display: table-cell">
              <el-select v-model="queryList.field_id" style="width: 203px;" placeholder="存放场所" filterable clearable @change="handleFilter">
                &lt;!&ndash;获取数据库信息动态生成option&ndash;&gt;
                <el-option v-for="item in fieldList" :key="item.id" :label="item.name" :value="item.id">
                  <span style="float: left">编号:{{ item.id }}</span>
                  <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
                </el-option>
              </el-select>
            </div>-->
          </el-col>
        </el-row>
        <el-row class="DetailSearch_son_row">
          <el-col :span="6">
            <el-input v-model="queryList.quantity" placeholder="器材数量" style="width: 300px;" clearable>
              <template slot="prepend">器材数量</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryList.brand_id" placeholder="品牌" style="width: 300px;" clearable>
              <template slot="prepend">品牌</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryList.model_id" placeholder="型号" style="width: 300px;" clearable>
              <template slot="prepend">型号</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryList.manufacturer" placeholder="生产商" style="width: 300px;" clearable>
              <template slot="prepend">生产商</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row class="DetailSearch_son_row">
          <el-col :span="6">
            <el-input v-model="queryList.supplier" placeholder="供货商" style="width: 300px;" clearable>
              <template slot="prepend">供货商</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <div class="detail-search-prepend">购置日</div>
            <div style="display: table-cell">
              <el-date-picker
                v-model="queryList.fac_purchaseDate"
                type="date"
                style="width: 217px;"
                placeholder="购置日"
              /></div>
          </el-col>
          <el-col :span="6">
            <div class="detail-search-prepend">出产日期</div>
            <div style="display: table-cell">
              <el-date-picker
                v-model="queryList.production_date"
                type="date"
                style="width: 203px;"
                placeholder="出产日期"
              /></div>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryList.usage" placeholder="用途" style="width: 300px;" clearable>
              <template slot="prepend">用途</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row class="DetailSearch_son_row">
          <el-col :span="6">
            <el-input v-model="queryList.warranty" placeholder="保修期" style="width: 300px;" clearable>
              <template slot="prepend">保修期</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <div class="detail-search-prepend">状态</div>
            <div style="display: table-cell">
              <el-select v-model="queryList.status" style="width: 231px;" placeholder="状态" filterable clearable>
                <!--获取数据库信息动态生成option-->
                <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </div>
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
    <!-- 列表 -->
    <div class="form-style">
      <el-table
        v-loading="listLoading"
        :data="tableData"
        element-loading-text="Loading"
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
          label="编号"
          prop="number"
        />
        <el-table-column
          label="名称"
          prop="name"
        />
        <el-table-column
          label="器材种类"
          prop="lab_equipment_category_name"
        />
        <el-table-column
          label="存放场所"
          prop="field_name"
        />
      </el-table>
    </div>
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

const statusList = [
  { id: 0, name: '在库' },
  { id: 1, name: '使用中' },
  { id: 2, name: '出借' },
  { id: 3, name: '故障' },
  { id: 4, name: '报废' },
  { id: 5, name: '丢失' }
]
// 假数据
const fakeData = {
  id: 1,
  number: '器材编号',
  name: '器材名称',
  lab_equipment_category_name: '器材种类',
  lab_equipment_category_id: 1,
  brand_id: '品牌',
  model_id: '型号',
  lab_unit_id: '单位',
  manufacturer: '生产商',
  manufacturer_telephone: '生产商电话',
  supplier: '供货商',
  supplier_telephone: '供货商电话',

  quantity: '数量',
  unit_price: '单价',
  total_price: '总价',
  country_code: '国码',
  production_date: '出产日期',

  bills_number: '单据号',
  purchase_date: '购置日',
  field_id: 1,
  field_name: '存放场所',
  expenditure: '经费来源',
  purchase_method: '购买方式',
  warranty: '保修期',
  IP: '附件IP',
  URL: '附件URL',

  status: '状态',
  usage: '用途'
}
// 假数据列表
const fakeDataList = [{ ...fakeData }, { ...fakeData }, { ...fakeData }, { ...fakeData }, { ...fakeData }, { ...fakeData }, { ...fakeData }, { ...fakeData }, { ...fakeData }, { ...fakeData }]
export default {
  name: 'field-equip-list',
  components: {
    Pagination
  },
  data() {
    return {
      /* 分页参数 待修改 */
      total: 100,
      pageNum: 1,
      pageSize: 20,
      listLoading: true,
      tableData: null,
      /* 查询条件 */
      queryList: {
        // 需求修改
        number: null,
        name: null,
        lab_equipment_category_name: null,
        lab_equipment_category_id: null,
        quantity: null,
        field_id: null,
        field_name: null,
        brand_id: null,
        model_id: null,
        lab_unit_id: null,
        manufacturer: null,
        supplier: null,
        production_date: null,
        purchase_date: null,
        warranty: null,

        status: null,
        usage: null
      },
      /* 是否显示高级搜索 */
      showDetailSearchBtn: false,
      equCategoryList: [],
      statusList: [],
      fieldList: []
    }
  },
  created() {
    this.getTableList()
    this.getEquOwnerList()
    this.getEquCategoryList()
  },
  methods: {
    getTableList() {
      /* fake data */
      this.tableData = fakeDataList
      this.listLoading = false
      this.statusList = statusList
      /* 根据传过来的实验室id获取对应的器材 */
      console.log('实验室id获取对应的器材. lab id')
    },
    /* 获取器材负责人（人员）信息 */
    getEquOwnerList() {
      console.log('equ owner list')
    },
    /* 获取器材分类信息 */
    getEquCategoryList() {
      console.log('equ category list')
    },
    handleReturn() {
      this.$router.go(-1)
    },
    /* 详情 */
    handleDetail(row) {
      console.log('handleDetail id=' + row.id)
      this.$router.push({
        name: 'Equipment_Detail',
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
    /* 添加器材 */
    handleCreate() {
      console.log('handleCreate')
      this.$router.push({
        name: 'Field_Equip_Add'
      })
    },
    /* 批量添加 */
    handleBatchCreate() {

    },
    /* 管理高级搜索 */
    handleClose() {
      /* 清空旧数据 */
      for (const key in this.queryList) {
        this.queryList[key] = null
      }
      /* 关闭 */
      this.showDetailSearchBtn = false
    }
  }
}
</script>

<!-- 功能栏样式 -->
<style scoped>
  .filter-container {
    color: #5a5e66;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.1);
    padding: 10px;
    margin-bottom: 10px;
  }
  .button-filter-container {
    display: inline-block;
    position: absolute;
    top: 25px;
    right: 30px;
  }
  .filter-container-conditions {
    display: inline-block;
  }
  .form-style{
    color: #5a5e66;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.1);
    padding: 5px 20px 15px;
    margin-bottom: 5px;
  }
</style>
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
</style>
