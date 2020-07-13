<!--
    @Author: 刘梓伊
    @Description: 为实验室添加器材页面
    @Date: 2020-07-02 19:25
    @Version: 1.0
-->
<template>
  <div class="app-container">
    <!-- 功能区域 -->
    <div class="filter-container">
      <el-button type="primary" size="medium" @click="handleReturn">返回</el-button>
      <div class="button-filter-container">
        <!-- 选择器材种类 -->
        <el-button-group>
          <el-button type="primary" size="medium" @click="showCategoryBtn = !showCategoryBtn">
            选择器材种类
          </el-button>
        </el-button-group>
        <!-- 器材分类选择窗口 -->
        <!--
            已抽成组件 DictionaryRadios
            属性： showBtn： 布尔值，是否显示窗口
                  dictionaryList: 字典数据列表
                  title： 显示窗口标题
            事件： handleCancel： 点击窗口取消按钮
                  handleSelect： 监听选择radio
                  handleConfirm： 点击窗口确认按钮
                  fuzzySearch： 点击模糊搜索按钮
        -->
        <dictionary-radios :showBtn="showCategoryBtn"
                           :dictionaryList="categoryList" title="器材种类搜索"
                           @handleCancel="showCategoryBtn = !showCategoryBtn"
                           @handleConfirm="handleSelectCategoryConfirm"
                           @fuzzySearch="categoryFuzzySearch">
        </dictionary-radios>
        <!-- 选择品牌 -->
        <el-button-group>
          <el-button type="primary" size="medium" @click="showBrandBtn = !showBrandBtn">选择器材品牌</el-button>
        </el-button-group>
        <!-- 品牌选择窗口 -->
        <dictionary-radios :showBtn="showBrandBtn"
                           :dictionaryList="brandList" title="器材品牌搜索"
                           @handleCancel="showBrandBtn = !showBrandBtn"
                           @handleConfirm="handleSelectBrandConfirm"
                           @fuzzySearch="brandFuzzySearch">
        </dictionary-radios>
        <!-- 选择型号 -->
        <el-button-group>
          <el-button type="primary" size="medium" @click="showModelBtn = !showModelBtn">选择器材型号</el-button>
        </el-button-group>
        <!-- 型号选择窗口 -->
        <dictionary-radios :showBtn="showModelBtn"
                           :dictionaryList="modelList" title="器材型号搜索"
                           @handleCancel="showModelBtn = !showModelBtn"
                           @handleConfirm="handleSelectModelConfirm"
                           @fuzzySearch="modelFuzzySearch">
        </dictionary-radios>
        <!-- 高级搜索 -->
        <el-button-group>
          <el-button type="primary" size="medium" @click="showDetailSearchBtn = !showDetailSearchBtn">
            高级搜索
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
    <!-- 详情浮动窗口 -->
    <el-dialog :visible.sync="showDetailBtn" width="80%" :show-close="false">
      <h3 slot="title">器材概要</h3>
      <el-row type="flex" class="row-bg" justify="space-around" style="margin-bottom: 20px">
        <el-col :span="6">
          <span style="font-size: 16px; padding: 10px; font-weight: 700">器材编号: </span>
          <span>1001</span>
        </el-col>
        <el-col :span="6">
          <span style="font-size: 16px; padding: 10px; font-weight: 700">器材名称: </span>
          <span>Equip</span>
        </el-col>
        <el-col :span="6">
          <span style="font-size: 16px; padding: 10px; font-weight: 700">器材种类: </span>
          <span>EquipCategory</span>
        </el-col>
        <el-col :span="6">
          <span style="font-size: 16px; padding: 10px; font-weight: 700">品牌: </span>
          <span>Equip1001</span>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around" style="margin-bottom: 20px">
          <el-col :span="6">
            <span style="font-size: 16px; padding: 10px; font-weight: 700">数量: </span>
            <span>100</span>
          </el-col>
          <el-col :span="6">
            <span style="font-size: 16px; padding: 10px; font-weight: 700">生厂商: </span>
            <span>Equip生产商</span>
          </el-col>
          <el-col :span="6">
            <span style="font-size: 16px; padding: 10px; font-weight: 700">供货商: </span>
            <span>Equip供货商</span>
          </el-col>
          <el-col :span="6">
            <span style="font-size: 16px; padding: 10px; font-weight: 700">器材状态: </span>
            <span>Good</span>
          </el-col>
        </el-row>
      <div style="text-align: center; margin-top: 50px">
<!--          <el-input-number v-model="equipAddCount"  @change="handleChange" :min="1" :max="120" style="display: block; margin: 10px auto;"></el-input-number>-->
          <h3 style="float: left; font-weight: bold; font-size: 17px; color: #000">填写器材使用用途</h3>
          <el-input v-model="equipUsage" type="textarea" :autosize="{ minRows:2,maxRows:5 }" style="display: block; margin: 10px auto"/>
          <el-button type="primary" size="medium" @click="showDetailBtn = !showDetailBtn">返回</el-button>
          <el-button type="primary" size="medium" @click="handleAdd">添加</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import DictionaryRadios from '@/components/DictionaryRadios'

  // 分类列表
  const categoryList = [
    {
      id: 1,
      name: '种类1'
    },
    {
      id: 2,
      name: '种类2'
    },
    {
      id: 3,
      name: '种类3'
    },
    {
      id: 4,
      name: '种类4'
    },
    {
      id: 5,
      name: '种类5'
    },
    {
      id: 6,
      name: '种类6'
    },
    {
      id: 7,
      name: '种类7'
    },
    {
      id: 8,
      name: '种类8'
    },
    {
      id: 9,
      name: '种类9'
    },
    {
      id: 10,
      name: '种类10'
    }
  ]
  // 品牌列表
  const brandList = []
  // 型号列表
  const modelList = []
  // 器材状态列表
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

    quantity: 100,
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
    name: 'field-equip-add',
    components: {
      Pagination,
      DictionaryRadios
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
        /* 显示高级搜索 */
        showDetailSearchBtn: false,
        /* 显示详情 */
        showDetailBtn: false,
        /* 详情dataForm */
        dataForm: null,
        /* 添加器材个数 */
        equipAddCount: 1,
        /* 添加器材填写用途 */
        equipUsage: null,
        /* 显示器材分类搜索 */
        showCategoryBtn: false,
        /* 显示器材品牌搜索 */
        showBrandBtn: false,
        /* 显示器材型号搜索 */
        showModelBtn: false,
        /* 器材分类列表 */
        equCategoryList: [],
        /* 状态列表 */
        statusList: [],
        /* 场地列表 */
        fieldList: [],
        /* 种类列表 */
        categoryList,
        /* 选择的种类id */
        categorySelected: null,
        /* 品牌列表 */
        brandList,
        /* 选择的品牌id */
        brandSelected: null,
        /* 型号列表 */
        modelList,
        /* 选择的型号id */
        modelSelected: null
      }
    },
    created() {
      this.getTableList()
      this.getEquOwnerList()
      this.getEquCategoryList()
    },
    methods: {
      /* 获取器材信息列表 */
      getTableList() {
        /* fake data */
        this.tableData = fakeDataList
        this.listLoading = false
        this.statusList = statusList
        /* 根据传过来的实验室id获取对应的器材 */
        console.log('实验室id获取对应的器材. lab id')
      },
      /* 获取器材负责人信息 */
      getEquOwnerList() {
        console.log('equ owner list')
      },
      /* 获取器材分类信息 */
      getEquCategoryList() {
        console.log('equ category list')
      },
      /* 返回上一步 */
      handleReturn() {
        this.$router.go(-1)
      },
      /* 弹窗显示器材概要信息 */
      handleDetail(row) {
        console.log('handleDetail id=' + row.id)
        // 获取data
        this.dataForm = fakeData
        this.showDetailBtn = !this.showDetailBtn
      },
      /* 添加器材按钮操作，提示信息 */
      handleAdd() {
        this.$confirm('添加器材, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 添加器材
          console.log("添加器材,个数=" + this.equipAddCount)
          // 刷新列表
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.showDetailBtn = !this.showDetailBtn
        }).catch(() => {
          console.log('已取消')
        })
      },
      /* 监听添加器材数量（功能已注释，可后期根据需求打开） */
      handleChange(value) {
        console.log(value);
      },
      /* 查找 */
      handleFilter() {

      },
      /* 高级搜索中的取消按钮，清空搜索数据 */
      handleClose() {
        /* 清空旧数据 */
        for (const key in this.queryList) {
          this.queryList[key] = null
        }
        /* 关闭 */
        this.showDetailSearchBtn = false
      },
      /* 分类radio选择确认 */
      handleSelectCategoryConfirm(id) {
        this.categorySelected = id
        this.showCategoryBtn = !this.showCategoryBtn
        console.log("点击确认，选中的id为：" + this.categorySelected)
        /* 更新器材列表 */
      },
      /* 分类radio模糊搜索 */
      categoryFuzzySearch(value) {
        /* 更新分类列表 */
        console.log("输入的关键字：" + value)
      },
      /* 品牌radio选择确认 */
      handleSelectBrandConfirm(id) {
        this.brandSelected = id
        this.showBrandBtn = !this.showBrandBtn
        console.log("点击确认，选中的id为：" + this.brandSelected)
        /* 更新品牌列表 */
      },
      /* 品牌radio模糊搜索 */
      brandFuzzySearch(value) {
        /* 更新品牌列表 */
        console.log("输入的关键字：" + value)
      },
      /* 型号radio选择确认 */
      handleSelectModelConfirm(id) {
        this.modelSelected = id
        this.showModelBtn = !this.showModelBtn
        console.log("点击确认，选中的id为：" + this.modelSelected)
        /* 更新型号列表 */
      },
      /* 型号radio模糊搜索 */
      modelFuzzySearch(value) {
        /* 更新型号列表 */
        console.log("输入的关键字：" + value)
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
    float: right;
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
    margin-right: 50px;
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
