<template>
  <div class="app-container">
    <!-- 功能区域 -->
    <div class="filter-container">
      <!-- 简单搜索 -->
      <div class="filter-container-conditions" style="margin: 2px">
        <el-input v-model="queryList.name" placeholder="实验室名称" style="width: 230px;" clearable>
          <template slot="prepend">实验室名称</template>
        </el-input>
        <el-select v-model="queryList.lab_category_id" style="width: 160px;" placeholder="实验室分类" filterable clearable @change="handleFilter">
          <!--获取数据库信息动态生成option-->
          <el-option v-for="item in labCategoryList" :key="item.id" :label="item.name" :value="item.id">
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
          <!-- 实验室名称 zh -->
          <el-col :span="6">
            <el-input v-model="queryList.name" placeholder="名称" style="width: 300px;" clearable>
              <template slot="prepend">实验室名称</template>
            </el-input>
          </el-col>
          <!-- 实验室名称 en -->
          <el-col :span="6">
            <el-input v-model="queryList.english_name" placeholder="实验室英文名称" style="width: 300px;" clearable>
              <template slot="prepend">实验室英文名称</template>
            </el-input>
          </el-col>
          <!-- 最大机位数 -->
          <el-col :span="6">
            <el-input v-model="queryList.max_seat" placeholder="最大机位数" style="width: 300px;" clearable>
              <template slot="prepend">最大机位数</template>
            </el-input>
          </el-col>
          <!-- 实验室分类 -->
          <el-col :span="6">
            <div class="detail-search-prepend">实验室分类</div>
            <div style="display: table-cell">
              <el-select v-model="queryList.lab_category_id" style="width: 189px;" placeholder="实验室分类" filterable clearable @change="handleFilter">
                <!--获取数据库信息动态生成option-->
                <el-option v-for="item in labCategoryList" :key="item.id" :label="item.name" :value="item.id">
                  <span style="float: left">编号:{{ item.id }}</span>
                  <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
                </el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row class="DetailSearch_son_row">
          <el-col :span="6">
            <el-input v-model="queryList.college_id" placeholder="学校名称" style="width: 300px;" clearable>
              <template slot="prepend">学校名称</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryList.school_id" placeholder="校区名称" style="width: 300px;" clearable>
              <template slot="prepend">校区名称</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryList.area_name" placeholder="功能区名称" style="width: 300px;" clearable>
              <template slot="prepend">功能区名称</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryList.field_manager" placeholder="场地负责人" style="width: 300px;" clearable>
              <template slot="prepend">场地负责人</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row class="DetailSearch_son_row">
          <el-col :span="6">
            <el-input v-model="queryList.field_floor" placeholder="楼层" style="width: 300px;" clearable>
              <template slot="prepend">楼层</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryList.field_room" placeholder="房间号" style="width: 300px;" clearable>
              <template slot="prepend">房间号</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="queryList.field_volumn" placeholder="最大容纳人数" style="width: 300px;" clearable>
              <template slot="prepend">最大容纳人数</template>
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
        prop="english_name"
        label="实验室英文名称"
        width="auto"
      />
      <el-table-column
        prop="name"
        label="实验室名称"
        width="auto"
      />
      <el-table-column
        prop="lab_category_name"
        label="实验室分类"
      />
      <el-table-column
        prop="max_seat"
        label="最大机位数"
      />
      <el-table-column
        prop="field_manager"
        label="场地负责人"
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
const fakeData = {
  id: 1,
  english_name: 'en-test',
  name: '测试实验室1',
  lab_category_name: '实验室类别1',
  max_seat: '100',
  field_manager: '负责人'
}
const fake_labCategoryList = [
  { id: 1, name: '实验室类别1' },
  { id: 2, name: '实验室类别2' }
]
// 假数据列表
const fakeDataList = [{ ...fakeData }, { ...fakeData }, { ...fakeData }, { ...fakeData }, { ...fakeData }, { ...fakeData }, { ...fakeData }, { ...fakeData }, { ...fakeData }, { ...fakeData }]
export default {
  name: 'FieldList',
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
        name: null,
        english_name: null,
        max_seat: null,
        lab_category_id: null,
        college_id: null,
        school_id: null,
        area_name: null,
        field_manager: null,
        field_floor: null,
        field_room: null,
        field_volumn: null
      },
      /* 是否显示高级搜索 */
      showDetailSearchBtn: false,
      /* 实验室分类列表信息 */
      labCategoryList: []
    }
  },
  /* 页面创建时，加载数据 */
  created() {
    this.getTableList()
    this.getLabCategoryList()
  },
  methods: {
    /* 获取列表信息 */
    getTableList() {
      this.tableData = fakeDataList
      this.listLoading = false
      // 调用获取列表信息接口
    },
    /* 获取实验室分类信息 */
    getLabCategoryList() {
      this.labCategoryList = fake_labCategoryList
      // 调用获取列表信息接口
    },
    /* 详情 */
    handleDetail(row) {
      console.log('handleDetail')
      this.$router.push({
        name: 'Field_Detail',
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
    /* 跳转添加实验室页面 */
    handleCreate() {
      console.log('handleCreate')
      this.$router.push({
        name: 'Field_Create'
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

