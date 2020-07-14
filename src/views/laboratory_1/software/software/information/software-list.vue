<!--
    @Author 李国烨
    @Date 2020/6/19 11:05
    @Description: 软件信息列表页面
    @Version 1.0
-->
<template>
  <div class="app-container">
    <!-- 功能区域 -->
    <div class="filter-container">
      <!-- 简单搜索 -->
      <div class="filter-container-conditions" style="margin: 2px">
        <el-input v-model="queryList.name" placeholder="软件名称" style="width: 230px;" clearable>
          <template slot="prepend">软件名称</template>
        </el-input>
        <el-input v-model="queryList.lab_software_category_name" placeholder="软件种类" style="width: 230px;" clearable>
          <template slot="prepend">软件种类</template>
        </el-input>
        <el-input v-model="queryList.applicable_system_name" placeholder="适用系统" style="width: 230px;" clearable>
          <template slot="prepend">适用系统</template>
        </el-input>
<!--
        <el-select v-model="queryList.lab_software_category_name" style="width: 160px;" placeholder="软件种类" filterable clearable @change="handleFilter">
          &lt;!&ndash;获取数据库信息动态生成option&ndash;&gt;
          <el-option v-for="item in softwareCategoryList" :key="item.id" :label="item.name" :value="item.id">
            <span style="float: left">编号:{{ item.id }}</span>
            <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
          </el-option>
        </el-select>
-->
        <!--<el-select v-model="queryList.applicable_system" style="width: 160px;" placeholder="适用系统" filterable clearable @change="handleFilter">
          &lt;!&ndash;获取数据库信息动态生成option&ndash;&gt;
          <el-option v-for="item in oSystemList" :key="item.id" :label="item.name" :value="item.id" >
            <span style="float: left">编号:{{ item.id }}</span>
            <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
          </el-option>
        </el-select>-->
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
          <el-col :span="6">
            <el-input v-model="queryList.lab_software_category_name" placeholder="软件种类" style="width: 300px;" clearable>
              <template slot="prepend">软件种类</template>
            </el-input>
          </el-col>
          <!-- 适用系统 -->
          <!--<el-col :span="6">
            <el-select v-model="queryList.applicable_system" style="width: 300px;" placeholder="适用系统" filterable clearable @change="handleFilter">
              &lt;!&ndash;获取数据库信息动态生成option&ndash;&gt;
              <el-option v-for="item in oSystemList" :key="item.id" :label="item.name" :value="item.id" >
                <span style="float: left">编号:{{ item.id }}</span>
                <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
              </el-option>
            </el-select>
          </el-col>-->
          <el-col :span="6">
            <el-input v-model="queryList.applicable_system_name" placeholder="适用系统" style="width: 300px;" clearable>
              <template slot="prepend">适用系统</template>
            </el-input>
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
            <el-input v-model="queryList.price_name" placeholder="单价" style="width: 300px;" clearable>
              <template slot="prepend">单价</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryList.brand_name" placeholder="品牌" style="width: 300px;" clearable>
              <template slot="prepend">品牌</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryList.size" placeholder="软件大小" style="width: 300px;" clearable>
              <template slot="prepend">软件大小</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row class="DetailSearch_son_row">
          <el-col :span="6">
            <el-input v-model="queryList.manufacturer_name" placeholder="生产商" style="width: 300px;" clearable>
              <template slot="prepend">生产商</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryList.supplier_name" placeholder="供货商" style="width: 300px;" clearable>
              <template slot="prepend">供货商</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryList.course_name" placeholder="适用课程" style="width: 300px;" clearable>
              <template slot="prepend">适用课程</template>
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
        prop="lab_software_category_name"
        label="软件种类"
        width="auto"
      />
      <el-table-column
        prop="size"
        label="软甲大小"
      />
      <el-table-column
        prop="applicable_system_name"
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
      :total="total"
      :page.sync="queryList.pageNum"
      :limit.sync="queryList.pageSize"
      @pagination="getTableList"
    />
  </div>
</template>

<script>
// const fake_data = [
//   {
//     id: 1,
//     number: 'sw-1234',
//     name: '软件名称',
//     size: '软件大小（暂留）',
//     lab_software_category_id: 1,
//     lab_software_category_name: '分类1',
//     applicable_system_id: 1,
//     applicable_system_name: '适用系统',
//     version: '软件版本号',
//     price_id: 1,
//     price_name: '单价',
//     lab_brand_id: 1,
//     brand_name: '品牌',
//     lab_unit_id: 1,
//     lab_unit_name: '计量单位',
//     specification: '规格',
//     lab_manufacturer_id: 1,
//     manufacturer_name: '生厂商',
//     manufacturer_telephone: '生厂商电话',
//     lab_supplier_id: 1,
//     supplier_name: '供货商',
//     supplier_telephone: '供货商电话',
//     course_id: 1,
//     course_name: '适用课程'
//   }
// ]

import Pagination from '@/components/Pagination'
import { fetchSoftwareInfos } from '@/api/laboratory_1/software'

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
      total: 0,
      /* 类别信息列表 */
      softwareCategoryList: [],
      /* 通用系统信息列表 */
      oSystemList: [],
      /* 导出excel相关参数 */
      downloadLoading: false,
      /* 查询条件 */
      queryList: {
        // 需要修改
        pageNum: 1,
        pageSize: 20,
        name: null,
        lab_software_category_name: null,
        applicable_system_name: null,
        publisher_name: null,
        version: null,
        supplier_name: null,
        price: null,
        size: null,
        course_name: null
      },
      /* 是否显示高级搜索 */
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
      * @create date： 2020/6/19
      * @update date： 2020/7/13
      * @author：李国烨
     */
    getTableList() {
      fetchSoftwareInfos(this.queryList).then(res => {
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
    /* 详情 */
    /**
      * @method：handleDetail
      * @desc：跳转到详情页面
      * @params:
      * @create date： 2020/6/19
      * @update date： 2020/7/13
      * @author：李国烨
     */
    handleDetail(row) {
      console.log('handleDetail')
      this.$router.push({
        name: 'Software_Detail',
        query: {
          id: row.id
        }
      })
    },
    /**
      * @method：handleFilter
      * @desc：条件查询
      * @params:
      * @create date： 2020/6/19
      * @update date： 2020/7/13
      * @author：李国烨
     */
    handleFilter() {
      console.log(JSON.stringify(this.queryList))
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
      * @create date： 2020/6/19
      * @update date： 2020/7/13
      * @author：李国烨
     */
    handleDownload() {

    },
    /**
      * @method：handleCreate
      * @desc：跳转添加页面
      * @params:
      * @create date： 2020/6/19
      * @update date： 2020/7/13
      * @author：李国烨
     */
    handleCreate() {
      console.log('handleCreate')
      this.$router.push({
        name: 'Software_Create'
      })
    },
    /**
      * @method：handleBatchCreate
      * @desc：批量添加
      * @params:
      * @create date： 2020/6/19
      * @update date： 2020/7/13
      * @author：李国烨
     */
    handleBatchCreate() {

    },
    /**
      * @method：handleClose
      * @desc：关闭管理高级搜索对话框
      * @params:
      * @create date： 2020/6/19
      * @update date： 2020/7/13
      * @author：李国烨
     */
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
<!-- 功能栏样式 -->
<style scoped>
  .filter-container {
    margin-bottom: 70px;
  }
  .button-filter-container {
    display: inline-block;
    position: absolute;
    top: 25px;
    right: 30px;
  }
  .filter-container-conditions {
    float: left;
    display: inline-block;
  }
</style>

