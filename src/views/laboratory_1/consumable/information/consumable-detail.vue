<template>
  <div class="app-container">
    <!-- 功能按钮 -->
    <div class="detail-button">
      <el-button type="primary" size="medium" @click="handleReturn">返回</el-button>
      <el-button type="primary" :disabled="isAble" size="medium" @click="beforeEdit">编辑信息</el-button>
      <el-button type="danger" size="medium" @click="beforeHandleDelete">删除</el-button>
      <el-button type="success" size="medium" @click="handleDownload">导出信息</el-button>
    </div>
    <!-- 详细信息展示 -->
    <div class="form-style">
      <h2>耗材详细信息</h2>
      <el-form ref="dataForm" :model="dataForm" :rules="rules">
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="种类" label-width="100px" prop="infoValidation">
              <el-input v-show="isRead" v-model="dataForm.lab_consumable_category_name" style="width: auto" :readonly="isRead" />
              <el-select v-show="!isRead" v-model="dataForm.lab_consumable_category_id" style="width: 160px;" placeholder="耗材种类">
                <!--获取数据库信息动态生成option-->
                <el-option v-for="item in consumableCategoryList" :key="item.id" :label="item.name" :value="item.id">
                  <span style="float: left">编号:{{ item.id }}</span>
                  <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="规格" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.specification" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单位" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.unit" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="数量" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.quantity" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-collapse-transition>
        <div v-show="showSaveBtn" style="text-align: center">
          <el-button type="success" size="medium" @click="submitEdit('dataForm')">保存</el-button>
          <el-button type="primary" size="medium" @click="beforeCancelEdit">取消</el-button>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
const fakeData = {
  id: 1,
  lab_consumable_category_id: 1,
  lab_consumable_category_name: '耗材类别1',
  specification: '规格',
  unit: '单位',
  quantity: '数量'
}
const fake_consumableCategoryList = [
  { id: 1, name: '耗材种类1' },
  { id: 2, name: '耗材种类2' },
  { id: 3, name: '耗材种类3' }
]
export default {
  name: 'ConsumableDetail',
  data() {
    return {
      dataForm: null,
      tempData: null,
      rules: {
        number: [
          { type: 'number', message: '请输入数字', trigger: 'blur' }
        ],
        infoValidation: [
          { type: 'string', message: '请输入', trigger: 'blur' }
        ]
      },
      consumableCategoryList: [],
      isRead: true,
      isAble: false,
      showSaveBtn: false
    }
  },
  created() {
    this.getOriginalData()
    this.getConsumableCategoryList()
  },
  methods: {
    /* 根据ID获取数据 */
    getOriginalData() {
      // 暂用假数据
      this.dataForm = fakeData
      const id = this.$route.query.id
      console.log(id)
    },
    /* 获取耗材种类列表信息 */
    getConsumableCategoryList() {
      // 调用接口
      console.log('调用获取软件分类列表信息接口')
      // 暂用假数据
      this.consumableCategoryList = fake_consumableCategoryList
    },
    /* 返回上一页 */
    handleReturn() {
      this.$router.go(-1)
    },
    /* 编辑前 */
    beforeEdit() {
      this.showSaveBtn = !this.showSaveBtn
      // 保存修改前数据
      this.tempData = { ...this.dataForm }
      // 使input为非readonly
      this.isRead = false
      // 显示保存信息按钮
      this.showSaveBtn = true
      // 设为不可用,防止暂存数据出错
      this.isAble = true
    },
    /* 编辑后 */
    afterEdit() {
      // 还原修改前所有状态
      this.tempData = null
      this.isRead = true
      this.showSaveBtn = false
      this.isAble = false
    },
    /* 同步耗材种类id 和 名称 */
    synchronizeData() {
      this.dataForm.lab_consumable_category_name = this.consumableCategoryList
        .filter(m => m.id === this.dataForm.lab_consumable_category_id)
        .map(m => m.name)
        .pop()
    },
    /* 提交编辑的内容 */
    submitEdit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.synchronizeData()
          // 根据返回信息重新复制dataForm
          console.log('success submit!!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // 修改后操作
      this.afterEdit()
    },
    /* 取消编辑操作 */
    cancelEdit() {
      this.dataForm = { ...this.tempData }
      this.afterEdit()
    },
    /* 取消 确认弹窗 */
    beforeCancelEdit() {
      this.$confirm('修改信息还没保存, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.cancelEdit()
        this.$message({
          message: '已取消',
          type: 'success'

        })
      }).catch(() => {
        console.log('已取消退出')
      })
    },
    /* 删除 */
    handleDelete() {
      if (this.dataForm.id) {
        console.log(this.dataForm.id)
        return true
      } else {
        return false
      }
    },
    /* 删除 确认弹窗 */
    beforeHandleDelete() {
      this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.handleDelete()) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.$router.go(-1)
        } else {
          this.$message({
            type: 'warning',
            message: '删除失败'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    /* 导出 */
    handleDownload() {
      console.log('导出')
    }
  }
}
</script>
<!-- 悬浮input鼠标状态 -->
<style>
  input {
    cursor: auto;
  }
</style>
<style scoped>
  .form-style{
    color: #5a5e66;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.1);
    padding: 10px 20px;
  }
  .detail-button{
    color: #5a5e66;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.1);
    padding:20px;
    margin-bottom: 20px;
  }
</style>
