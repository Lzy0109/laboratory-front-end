<template>
  <div class="app-container">
    <!-- 简单搜索 + 其他功能区域 -->
    <div class="filter-container">
      <el-button type="primary" @click="handleReturn" size="medium">返回</el-button>
      <div class="button-filter-container">
            <div class="filter-container-conditions" style="margin: 2px">
              <el-input v-model="listQuery.equip_no" placeholder="设施编号" style="width: 230px;" clearable>
                <template slot="prepend">设施编号</template>
              </el-input>
              <el-select v-model="listQuery.equip_cate" style="width: 160px;" placeholder="设施分类" filterable clearable @change="handleFilter">
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
              <el-select v-model="listQuery.equip_cate" style="width: 160px;" placeholder="设施状态" filterable clearable @change="handleFilter">
                <!--获取数据库信息动态生成option-->
                <!--
                <el-option v-for="item in CategoryList" :key=item.id :label="item.name" :value="item.id" >
                  <span style="float: left">编号:{{ item.id }}</span>
                  <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
                </el-option>
                -->
                <el-option key="1" label="状态1" value="1" />
                <el-option key="0" label="状态2" value="0" />
              </el-select>
              <el-button-group>
                <el-button type="primary" size="medium" @click="handleFilter">搜索</el-button>
              </el-button-group>
            </div>
            <el-button-group>
              <el-button type="primary" size="medium" @click="DetailSearchShow = !DetailSearchShow">
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
    <el-dialog :visible.sync="DetailSearchShow" width="95%" :show-close="false">
      <span slot="title" class="my-dialog-title">高级搜索</span>
      <div class="DetailSearch_son">
        <!--按钮定位-->
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
          label="名称"
          prop="fac_name"
        />
        <el-table-column
          label="种类"
          prop="fac_category"
        />
        <el-table-column
          label="状态"
          prop="fac_status"
        />
        <el-table-column
          label="负责人"
          prop="fac_owner"
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
  // 假数据
  const fakeData = {
    id: 1,
    fac_name:"设施名称",
    fac_category: "设施种类",
    fac_status: "设施状态",
    fac_quantity: "数量",
    fac_owner: "负责人",
    fac_storage: "存放地点",
    fac_unit: "单位",
    fac_unitPrice: "单价",
    fac_specifications: "规格",
    fac_code: "国码",
    fac_produceDate: "出产日期",
    fac_keepPeriod: "保修期",
    fac_purchaseDate: "购置日期",
    fac_purchaseWay: "购买方式",
    fac_fundsSource: "经费来源",
    fac_documentCode: "单据号",
    fac_supplier: "供货商",
    supplier_phone: "供货商电话",
    fac_accessories: "其他附件"
  }
  //假数据列表
  const fakeDataList = [ {...fakeData},{...fakeData},{...fakeData},{...fakeData},{...fakeData},{...fakeData},{...fakeData},{...fakeData},{...fakeData},{...fakeData} ]
  export default {
    name: "field-fac-list",
    components: {
      Pagination
    },
    data(){
      return{
        listLoading: true,
        tableData: null,
        /* 分页参数 待修改 */
        total: 100,
        pageNum: 1,
        pageSize: 20,
        /* 查询条件 */
        listQuery: {
          equip_no: null,
          equip_name: null,
          equip_cate: null,
          equip_quantity: null,
          equip_location: null,
        }
      }
    },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      // fake data
      this.tableData = fakeDataList
      this.listLoading = false
      // 根据传过来的实验室id获取对应的设施
      console.log('实验室id获取对应的设施.lab id' + this.$route.query.id)
    },
    /* 返回上一页 */
    handleReturn() {
      this.$router.go(-1)
    },
    /* 详情 */
    handleDetail(row, column, event) {
      console.log('handleDetail id=' + row.id)
      this.$router.push({
        name: 'Field_Fac_Detail',
        query: {
          id: row.id
        }
      })
    }
  }
}
</script>

<style scoped>
  .filter-container {
    color: #5a5e66;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.1);
    padding: 10px;
    margin-bottom: 70px;
  }
  .button-filter-container {
    display: inline-block;
    margin-left: 120px;
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
