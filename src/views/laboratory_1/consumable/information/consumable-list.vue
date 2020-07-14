<!--
    @Author 李国烨
    @Date 2020/6/21 14:40
    @Description: 耗材信息列表页面
    @Version 1.0
-->
<template>
  <div class="app-container">
    <!-- 功能区域 -->
    <div class="filter-container">
      <!-- 简单搜索 -->
      <div class="filter-container-conditions" style="margin: 2px">
        <el-input v-model="queryList.lab_consumable_category_name" placeholder="耗材种类" style="width: 300px;" clearable>
          <template slot="prepend">耗材种类</template>
        </el-input>
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
            <el-input v-model="queryList.lab_consumable_category_name" placeholder="耗材种类" style="width: 300px;" clearable>
              <template slot="prepend">耗材种类</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryList.name" placeholder="耗材名称" style="width: 300px;" clearable>
              <template slot="prepend">耗材名称</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryList.total_price" placeholder="总价" style="width: 300px;" clearable>
              <template slot="prepend">总价</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryList.unit_price" placeholder="单价" style="width: 300px;" clearable>
              <template slot="prepend">单价</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row class="DetailSearch_son_row">
          <el-col :span="6">
            <el-input v-model="queryList.quantity" placeholder="数量" style="width: 300px;" clearable>
              <template slot="prepend">数量</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryList.brand_name" placeholder="品牌" style="width: 300px;" clearable>
              <template slot="prepend">品牌</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryList.model_name" placeholder="型号" style="width: 300px;" clearable>
              <template slot="prepend">型号</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryList.manufacturer_name" placeholder="生产商" style="width: 300px;" clearable>
              <template slot="prepend">生产商</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row class="DetailSearch_son_row">
          <el-col :span="6">
            <el-input v-model="queryList.supplier_name" placeholder="供货商" style="width: 300px;" clearable>
              <template slot="prepend">供货商</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <div class="detail-search-prepend">购置日</div>
            <div style="display: table-cell">
              <el-date-picker
                v-model="queryList.purchase_date"
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
            <el-input v-model="queryList.country_code_name" placeholder="国码" style="width: 300px;" clearable>
              <template slot="prepend">国码</template>
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
            <el-input v-model="queryList.field_name" placeholder="存放场所" style="width: 300px;" clearable>
              <template slot="prepend">存放场所</template>
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
        prop="lab_consumable_category_name"
        label="耗材种类"
        width="auto"
      />
      <el-table-column
        prop="specification"
        label="规格"
        width="auto"
      />
      <el-table-column
        prop="brand_name"
        label="品牌"
      />
      <el-table-column
        prop="quantity"
        label="数量"
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
// 假数据
import { fetchConsumableInfos } from '@/api/laboratory_1/consumable'
import Pagination from '@/components/Pagination'
export default {
  name: 'ConsumableList',
  components: {
    Pagination
  },
  data() {
    return {
      /** 表格参数 **/
      tableData: null,
      listLoading: true,
      /** 分页参数 待修改 **/
      total: 0,
      /** 类别信息列表 **/
      consumableCategoryList: [],
      /** 导出excel相关参数 **/
      downloadLoading: false,
      /** 查询条件 **/
      queryList: {
        pageNum: 1,
        pageSize: 20,
        lab_consumable_category_name: null,
        brand_name: null,
        model_name: null,
        lab_unit_name: null,
        specialized: true,
        manufacturer_name: null,
        supplier_name: null,
        // 适用器材（applicative_equipment）
        purchase_date: null,
        field_name: null,

        quantity: null,
        unit_price: null,
        total_price: null,
        country_code_name: null,
        production_date: null,
      },
      /** 是否显示高级搜索 **/
      showDetailSearchBtn: false
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    /**
     * @method：getTableList
     * @desc：获取软件列表信息
     * @params:
     * @create date： 2020/6/21
     * @update date： 2020/7/13
     * @author：李国烨
     */
    getTableList() {
      // 调用获取信息的接口
      fetchConsumableInfos(this.queryList).then(res => {
        this.total = res.data.total
        this.tableData = res.data.list
        this.listLoading = false
      }).catch(err => {
        this.$message({
          message: '获取信息失败 ' + err,
          type: 'error'
        })
      })
    },
    /**
     * @method：handleDetail
     * @desc：跳转到详情页面
     * @params:
     * @create date： 2020/6/21
     * @update date： 2020/7/13
     * @author：李国烨
     */
    handleDetail(row) {
      console.log('handleDetail')
      this.$router.push({
        name: 'Consumable_Detail',
        query: {
          id: row.id
        }
      })
    },
    /**
     * @method：handleFilter
     * @desc：条件查询
     * @params:
     * @create date： 2020/6/21
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
     * @create date： 2020/6/21
     * @update date： 2020/7/13
     * @author：李国烨
     */
    handleDownload() {

    },
    /**
     * @method：handleCreate
     * @desc：跳转添加页面
     * @params:
     * @create date： 2020/6/21
     * @update date： 2020/7/13
     * @author：李国烨
     */
    handleCreate() {
      console.log('handleCreate')
      this.$router.push({
        name: 'Consumable_Create'
      })
    },
    /**
     * @method：handleBatchCreate
     * @desc：批量添加
     * @params:
     * @create date： 2020/6/21
     * @update date： 2020/7/13
     * @author：李国烨
     */
    handleBatchCreate() {

    },
    /**
     * @method：handleClose
     * @desc：关闭管理高级搜索对话框
     * @params:
     * @create date： 2020/6/21
     * @update date： 2020/7/13
     * @author：李国烨
     */
    handleClose() {
      for (const key in this.queryList) {
        this.queryList[key] = null; // 清空旧数据
      }
      this.showDetailSearchBtn = false; // 关闭
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
