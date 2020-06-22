<template>
  <div class="app-container">
    <!-- 功能区域 -->
    <div class="filter-container">
      <el-button type="primary" @click="handleReturn" size="medium">返回</el-button>
      <div class="button-filter-container">
        <!-- 简单搜索 -->
        <div class="filter-container-conditions" style="margin: 2px">
          <el-input v-model="queryList.lab_num" placeholder="器材编号" style="width: 230px;" clearable>
            <template slot="prepend">器材编号</template>
          </el-input>
          <el-select v-model="queryList.equip_cate" style="width: 160px;" placeholder="器材分类" filterable clearable @change="handleFilter">
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
          <el-select v-model="queryList.equip_cate" style="width: 160px;" placeholder="实验室负责人" filterable clearable @change="handleFilter">
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
          <el-button type="primary"  size="medium" @click="handleDownload">
            导出
          </el-button>
        </el-button-group>
      </div>
    </div>
    <!-- 浮动高级搜索区域 -->
    <el-dialog :visible.sync="showDetailSearchBtn" width="95%" :show-close="false">
      <span class="my-dialog-title" slot="title">高级搜索</span>
      <div class="DetailSearch_son">
        <!-- el-row内容需要替换 -->
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
    <!-- 列表 -->
    <div class="form-style">
      <el-table
        v-loading="listLoading"
        :data="tableData"
        element-loading-text="Loading"
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
          label="编号"
          prop="equ_number"
        />
        <el-table-column
          label="名称"
          prop="equ_name"
        />
        <el-table-column
          label="种类"
          prop="equ_category"
        />
        <el-table-column
          label="负责人"
          prop="equ_owner"
        />
      </el-table>
    </div>
    <!-- 分页栏 -->
    <pagination v-show="total > 0"
                :total="100"
                :page.sync="pageNum"
                :limit.sync="pageSize"/>
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  // 假数据
  const fakeData = {
    id: 1,
    equ_number:"器材编号",
    equ_name:"器材名称",
    equ_category:"器材种类",
    equ_quantity:"数量",
    equ_storage:"存放地点",
    equ_owner:"负责人",
    equ_userDirection:"使用方向",
    equ_unit:"单位",
    equ_unitPrice:"单价",
    equ_purchaseDate:"购置日期",
    equ_specifications:"规格",
    equ_code:"国码",
    equ_produceDate:"出产日期",
    equ_fundsSource:"经费来源",
    equ_purchaseWay:"购买方式",
    equ_keepPeriod:"保修期",
    equ_documentCode:"单据号",
    equ_supplier:"供货商",
    supplier_phone:"供货商电话",
    equ_accessories:"器材入库附件",
    equ_software:"器材配置安装软件",
  }
  //假数据列表
  const fakeDataList = [ {...fakeData},{...fakeData},{...fakeData},{...fakeData},{...fakeData},{...fakeData},{...fakeData},{...fakeData},{...fakeData},{...fakeData} ]
  export default {
    components: {
      Pagination
    },
    name: 'field-equip-list',
    data(){
      return{
        /* 分页参数 待修改 */
        total: 100,
        pageNum: 1,
        pageSize: 20,
        listLoading: true,
        tableData: null,
        /* 查询条件 */
        queryList: {
          // 需求修改
          equip_no: null,
          equip_name: null,
          equip_cate: null,
          equip_quantity: null,
          equip_location: null,
        },
        /* 是否显示高级搜索 */
        showDetailSearchBtn: false
      }
    },
    methods:{
      getList(){
        /* fake data */
        this.tableData = fakeDataList;
        this.listLoading = false;
        /* 根据传过来的实验室id获取对应的器材 */
        console.log("实验室id获取对应的器材. lab id" +this.$route.query.id);
      },
      handleReturn() {
        this.$router.go(-1)
      },
      /* 详情 */
      handleDetail(row, column, event) {
        console.log('handleDetail id=' + row.id)
        this.$router.push({
          name: 'Field_Equip_Detail',
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
      /* 添加数据 */
      handleCreate() {

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
    },
    created() {
      this.getList();
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
