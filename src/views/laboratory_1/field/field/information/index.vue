<template>
  <div class="app-container">
    <!-- 简单搜索 + 其他功能区域 -->
    <div class="filter-container">
      <div class="filter-container-conditions" style="margin: 2px">
        <el-input v-model="listQuery.lab_num" placeholder="实验室编号" style="width: 230px;" clearable>
          <template slot="prepend">实验室编号</template>
        </el-input>
        <el-input v-model="listQuery.lab_name" placeholder="实验室名称" style="width: 230px;" clearable>
          <template slot="prepend">实验室名称</template>
        </el-input>
        <el-select v-model="listQuery.lab_owner" style="width: 160px;" placeholder="实验室分类" filterable clearable @change="handleFilter">
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
        <el-select v-model="listQuery.lab_owner" style="width: 160px;" placeholder="实验室负责人" filterable clearable @change="handleFilter">
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
      <div class="button-filter-container">

        <el-button-group>
          <el-button type="primary"  size="medium" @click="DetailSearchShow = !DetailSearchShow">
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
    <el-dialog :visible.sync="DetailSearchShow" width="95%" :show-close="false">
      <span class="my-dialog-title" slot="title">
        高级搜索
      </span>
      <div class="DetailSearch_son">
        <el-row class="DetailSearch_son_row">
          <!-- 实验室编号 -->
          <el-col :span="6">
            <el-input v-model="listQuery.lab_num" placeholder="实验室编号" style="width: 300px;" clearable>
              <template slot="prepend">实验室编号</template>
            </el-input>
          </el-col>
          <!-- 实验室名称 -->
          <el-col :span="6">
            <el-input v-model="listQuery.lab_name" placeholder="实验室名称" style="width: 300px;" clearable>
              <template slot="prepend">实验室名称</template>
            </el-input>
          </el-col>
          <!-- 实验室分类 -->
          <el-col :span="6">
            <el-select v-model="listQuery.lab_owner" style="width: 300px;" placeholder="实验室分类" filterable clearable @change="handleFilter">
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
            <el-select v-model="listQuery.lab_owner" style="width: 300px;" placeholder="实验室负责人" filterable clearable @change="handleFilter">
              <el-option key="1" label="负责人1" value="1" />
              <el-option key="0" label="负责人2" value="0" />
            </el-select>
          </el-col>
        </el-row>
        <el-row class="DetailSearch_son_row">
          <el-col :span="6">
            <el-input v-model="listQuery.other" placeholder="楼" style="width: 300px;" clearable>
              <template slot="prepend">楼</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="listQuery.other" placeholder="房间号" style="width: 300px;" clearable>
              <template slot="prepend">房间号</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="listQuery.other" placeholder="最大机位数" style="width: 300px;" clearable>
              <template slot="prepend">最大机位数</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="listQuery.other" placeholder="可容纳人数上限" style="width: 300px;" clearable>
              <template slot="prepend">可容纳人数上限</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row class="DetailSearch_son_row">

          <el-col :span="6">
            <el-input v-model="listQuery.other" placeholder="可用设备数" style="width: 300px;" clearable>
              <template slot="prepend">可用设备数</template>
            </el-input>
          </el-col>
<!--          <el-col :span="6">-->
<!--            <span>日期：</span>-->
<!--            <el-date-picker-->
<!--              v-model="listQuery.other"-->
<!--              type="date"-->
<!--              placeholder="（其他）日期"-->
<!--              value-format="yyyy-MM-dd"-->
<!--              style="width: auto;"-->
<!--              class="filter-item"-->
<!--            />-->
<!--          </el-col>-->
        </el-row>
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
      :header-cell-style="{'font-size': '19px'}"
    >
      <el-table-column
        label="#"
        type="index"
        width="70"
        align="center"
      />
      <el-table-column
        prop="lab_num"
        label="编号"
        width="auto"
      />
      <el-table-column
        prop="lab_name"
        label="名称"
        width="auto"
      />
      <el-table-column
        prop="lab_category"
        label="分类"
      />
      <el-table-column
        prop="lab_equip_cur_num"
        label="可用设备数"
      />
      <el-table-column
        prop="lab_owner"
        label="负责人"
      />
    </el-table>
    <!-- 分页栏 -->
    <pagination class="my-pagination"
                v-show="total > 0"
                :total="100"
                :page.sync="pageNum"
                :limit.sync="pageSize"
    />
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'
  export default {
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
        listQuery: {
          lab_name: null,
          lab_num: null,
          lab_owner: null,
          other: null
        },
        /* 是否显示高级搜索 */
        DetailSearchShow: false,
        /* 是否显示功能栏 */
        FunctionBtnShow: false,
      }
    },
    created() {
      this.getTableList()
    },
    methods: {
      /* 获取列表信息 */
      getTableList() {
        this.tableData = [
          {
          id: 1,
          lab_num: 101,
          lab_name: '测试实验室1',
          lab_category: '实验室类别',
          lab_equip_cur_num: '当前可用设备数',
          lab_owner: '负责人'
          },
          {
            id: 2,
            lab_num: 102,
            lab_name: '测试实验室2',
            lab_category: '实验室类别',
            lab_equip_cur_num: '当前可用设备数',
            lab_owner: '负责人'
          },
          {
            id: 3,
            lab_num: 103,
            lab_name: '测试实验室3',
            lab_category: '实验室类别',
            lab_equip_cur_num: '当前可用设备数',
            lab_owner: '负责人'
          },
          {
            id: 4,
            lab_num: 104,
            lab_name: '测试实验室4',
            lab_category: '实验室类别',
            lab_equip_cur_num: '当前可用设备数',
            lab_owner: '负责人'
          },
          {
            id: 5,
            lab_num: 105,
            lab_name: '测试实验室5',
            lab_category: '实验室类别',
            lab_equip_cur_num: '当前可用设备数',
            lab_owner: '负责人'
          },
          {
            id: 6,
            lab_num: 106,
            lab_name: '测试实验室6',
            lab_category: '实验室类别',
            lab_equip_cur_num: '当前可用设备数',
            lab_owner: '负责人'
          },
          {
            id: 7,
            lab_num: 107,
            lab_name: '测试实验室7',
            lab_category: '实验室类别',
            lab_equip_cur_num: '当前可用设备数',
            lab_owner: '负责人'
          },
          {
            id: 8,
            lab_num: 108,
            lab_name: '测试实验室8',
            lab_category: '实验室类别',
            lab_equip_cur_num: '当前可用设备数',
            lab_owner: '负责人'
          },
          {
            id: 9,
            lab_num: 109,
            lab_name: '测试实验室9',
            lab_category: '实验室类别',
            lab_equip_cur_num: '当前可用设备数',
            lab_owner: '负责人'
          },
          {
            id: 10,
            lab_num: 110,
            lab_name: '测试实验室10',
            lab_category: '实验室类别',
            lab_equip_cur_num: '当前可用设备数',
            lab_owner: '负责人'
          }
        ]
        this.listLoading = false
      },

      /* 详情 */
      handleDetail(row, column, event) {
        console.log('handleDetail')
        this.$router.push({
          name: 'Field_Info_Detail',
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
      /* 添加数据 */
      handleCreate() {

      },
      /* 批量添加 */
      handleBatchCreate() {

      },
      /* 管理高级搜索 */
      handleClose() {
        // 清空旧数据
        for (const key in this.listQuery) {
          this.listQuery[key] = null
        }
        // 关闭
        this.DetailSearchShow = false
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

<!-- 分页样式 -->
<!--<style scoped>-->
<!--  .pagination-container /deep/ ul {-->
<!--    display: none;-->
<!--  }-->
<!--  .pagination-container /deep/ .el-pagination__jump {-->
<!--    display: none;-->
<!--  }-->
<!--</style>-->
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

