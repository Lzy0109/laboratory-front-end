<template>
  <div class="app-container">
    <!-- 功能区域 -->
    <div class="filter-container">
      <!-- 简单搜索 -->
      <div class="filter-container-conditions" style="margin: 2px">
        <el-input v-model="queryList.name" placeholder="软件名称" style="width: 230px;" clearable>
          <template slot="prepend">软件名称</template>
        </el-input>
        <el-select v-model="queryList.lab_software_category_id" style="width: 160px;" placeholder="软件种类" filterable clearable @change="handleFilter">
          <!--获取数据库信息动态生成option-->
          <el-option v-for="item in softwareCategoryList" :key="item.id" :label="item.name" :value="item.id">
            <span style="float: left">编号:{{ item.id }}</span>
            <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
          </el-option>
        </el-select>
        <el-select v-model="queryList.applicable_system" style="width: 160px;" placeholder="适用系统" filterable clearable @change="handleFilter">
          <!--获取数据库信息动态生成option-->
          <el-option v-for="item in oSystemList" :key="item.id" :label="item.name" :value="item.id" >
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
          <!-- 软件名称 -->
          <el-col :span="6">
            <el-input v-model="queryList.name" placeholder="" style="width: 300px;" clearable>
              <template slot="prepend">软件名称</template>
            </el-input>
          </el-col>
          <!-- 软件种类 -->
          <el-col :span="6">
            <el-select v-model="queryList.lab_software_category_id" style="width: 300px;" placeholder="软件种类" filterable clearable @change="handleFilter">
              <!--获取数据库信息动态生成option-->
              <el-option v-for="item in softwareCategoryList" :key="item.id" :label="item.name" :value="item.id">
                <span style="float: left">编号:{{ item.id }}</span>
                <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
              </el-option>
            </el-select>
          </el-col>
          <!-- 适用系统 -->
          <el-col :span="6">
            <el-select v-model="queryList.applicable_system" style="width: 300px;" placeholder="适用系统" filterable clearable @change="handleFilter">
              <!--获取数据库信息动态生成option-->
              <el-option v-for="item in oSystemList" :key="item.id" :label="item.name" :value="item.id" >
                <span style="float: left">编号:{{ item.id }}</span>
                <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
              </el-option>
            </el-select>
          </el-col>
          <!-- 发行方名称 -->
          <el-col :span="6">
            <el-input v-model="queryList.publisher_name" placeholder="发行方名称" style="width: 300px;" clearable>
              <template slot="prepend">发行方名称</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row class="DetailSearch_son_row">
          <el-col :span="6">
            <el-input v-model="queryList.version" placeholder="软件版本号" style="width: 300px;" clearable>
              <template slot="prepend">软件版本号</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryList.price" placeholder="价格" style="width: 300px;" clearable>
              <template slot="prepend">价格</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryList.size" placeholder="软件大小" style="width: 300px;" clearable>
              <template slot="prepend">软件大小</template>
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
        prop="name"
        label="软件名称"
        width="auto"
      />
      <el-table-column
        prop="lab_software_category_id"
        label="软件种类"
        width="auto"
      />
      <el-table-column
        prop="size"
        label="软甲大小"
      />
      <el-table-column
        prop="applicable_system"
        label="适用系统"
      />
      <el-table-column
        prop="version"
        label="软件版本号"
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
// id			主id
// name			软件名称
// lab_software_category_id 	软件种类			外键，对应软件种类表的id
// size			软件大小
// applicable_system	适用系统
// version			软件版本号
// price			价格
// publisher_name		发行方名称
// attachment_id 		使用说明			外键，对应附件表的id
//
// datetime		本记录的创建时间
// by_who			本记录的写入者关联到 		sys_user.id
// deleted			本记录是否有效			0：有效，-1：无效
// last_version		本记录的上一个版本的id		默认 -1：只有一条

// eslint-disable-next-line no-unused-vars
const fake_data = [
  {
    id: 1, name: '软件名称', lab_software_category_id: '软件种类', size: '软件大小', applicable_system: '适用系统', version: '软件版本号', price: '价格', publisher_name: '发行方名称', attachment_id: '使用说明'
  }
]

import Pagination from '@/components/Pagination'
export default {
  name: 'SoftwareList',
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
      softwareCategoryList: [],
      /* 通用系统信息列表 */
      oSystemList: [],
      /* 导出excel相关参数 */
      downloadLoading: false,
      /* 查询条件 */
      queryList: {
        // 需要修改
        name: null,
        lab_software_category_id: null,
        applicable_system: null,
        publisher_name: null,
        version: null,
        price: null,
        size: null
      },
      /* 是否显示高级搜索 */
      showDetailSearchBtn: false
    }
  },
  created() {
    this.getTableList()
    this.getSoftwareCategoryList()
    this.getOSystemList()
  },
  methods: {
    /* 获取列表信息 */
    getTableList() {
      this.tableData = fake_data
      this.listLoading = false
    },
    /* 获取软件分类列表信息 */
    getSoftwareCategoryList() {
      // 调用接口
      console.log('调用获取软件分类列表信息接口')
      // 暂用假数据
      this.softwareCategoryList.push({ id: 1, name: '分类1' }, { id: 2, name: 'cate2' })
    },
    /* 获取软件适用系统列表信息 */
    getOSystemList() {
      // 调用接口
      console.log('调用获取软件适用系统列表信息')
      // 暂用假数据
      this.oSystemList.push({ id: 1, name: 'window' }, { id: 2, name: 'linux' })
    },
    /* 详情 */
    handleDetail(row, column, event) {
      console.log('handleDetail')
      this.$router.push({
        name: 'Software_Detail',
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
        name: 'Software_Create'
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

