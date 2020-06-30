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
      <h2>资产出借详细信息</h2>
      <el-form ref="dataForm" :model="dataForm" :rules="rules">
        <el-row type="flex" class="row-bg" justify="space-around">
          <!-- 资产名称 -->
          <el-col :span="8">
            <el-form-item label="资产名称" label-width="100px" prop="number">
              <el-input v-model="dataForm.property_name" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <!-- 资产种类 -->
          <el-col :span="8">
            <el-form-item label="资产种类" label-width="100px" prop="number">
              <el-input v-show="isRead" v-model="dataForm.property_category" style="width: auto" :readonly="isRead" />
              <el-select v-show="!isRead" v-model="dataForm.lab_category_id" style="width: 160px;" placeholder="资产种类" filterable clearable>
                <!--获取数据库信息动态生成option-->
                <el-option v-for="item in labCategoryList" :key="item.id" :label="item.name" :value="item.id">
                  <span style="float: left">编号:{{ item.id }}</span>
                  <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 出借人 -->
          <el-col :span="8">
            <el-form-item label="出借人" label-width="100px" prop="name">
              <el-input v-model="dataForm.user_id" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <!-- 出借开始日期 -->
          <el-col :span="8">
            <el-form-item label="出借开始日期" label-width="100px" prop="info">
              <el-input v-model="dataForm.start_date" style="width: auto" :readonly="isRead" v-show="isRead" />
              <el-date-picker type="date" v-model="dataForm.equip_purchaseDate" value-format="yyyy-MM-dd" clearable v-show="!isRead"></el-date-picker>
            </el-form-item>
          </el-col>
          <!-- 出借截止日期 -->
          <el-col :span="8">
            <el-form-item label="出借截止日期" label-width="100px" prop="info">
              <el-input v-model="dataForm.end_date" style="width: auto" :readonly="isRead" v-show="isRead" />
              <el-date-picker type="date" v-model="dataForm.equip_purchaseDate" value-format="yyyy-MM-dd" clearable v-show="!isRead"></el-date-picker>
            </el-form-item>
          </el-col>
          <!-- 归还日期 -->
          <el-col :span="8">
            <el-form-item label="归还日期" label-width="100px" prop="info">
              <el-input v-model="dataForm.return_date" style="width: auto" :readonly="isRead" v-show="isRead" />
              <el-date-picker type="date" v-model="dataForm.equip_purchaseDate" value-format="yyyy-MM-dd" clearable v-show="!isRead"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <!-- 出借数量 -->
          <el-col :span="8">
            <el-form-item label="出借数量" label-width="100px" prop="number">
              <el-input v-model="dataForm.quantity" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <!-- 出借状态 -->
          <el-col :span="8">
            <el-form-item label="出借状态" label-width="100px" prop="number">
              <el-input v-show="isRead" v-model="dataForm.status" style="width: auto" :readonly="isRead" />
              <el-select v-show="!isRead" v-model="dataForm.status" style="width: 160px;" placeholder="出借状态" filterable clearable>
                <el-option key="0" label="正在出借" value="0" />
                <el-option key="1" label="已归还" value="1" />
                <el-option key="2" label="丢失" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 出借用途 -->
          <el-col :span="8">
            <el-form-item label="出借用途" label-width="100px" prop="number">
              <el-input v-model="dataForm.use" style="width: auto" :readonly="isRead" />
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
  // 假数据
  const fakeData = {
    id: 1,
    property_name: '资产名称',
    property_category: '资产种类',
    user_id: '出借人',
    start_date: '出借开始日期',
    end_date: '出借截止日期',
    return_date: '归还日期',
    status: '出借状态',
    quantity: '出借数量',
    use: '出借用途'
  }
  const fake_labCategoryList = [
    { id: 1, name: '实验室类别1' },
    { id: 2, name: '实验室类别2' },
    { id: 3, name: '实验室类别3' }
  ]
  const fake_labOwnerList = [
    { id: 1, name: '实验室负责人1' },
    { id: 2, name: '实验室负责人2' },
    { id: 3, name: '实验室负责人3' }
  ]
  export default {
    name: 'property-detail',
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
        isRead: true,
        isAble: false,
        showSaveBtn: false,
        labCategoryList: [],
        labOwnerList: []
      }
    },
    created() {
      this.getOriginalData()
      this.getLabCategoryList()
      this.getLabOwnerList()
    },
    methods: {
      /* 根据ID获取数据 */
      getOriginalData() {
        // 暂用假数据
        this.dataForm = fakeData
        const id = this.$route.query.id
        console.log(id)
      },
      /* 获取实验室类别信息 */
      getLabCategoryList() {
        // 暂用假数据
        this.labCategoryList = fake_labCategoryList
        // 调用获取类别信息的接口
      },
      /* 获取实验室类别信息 */
      getLabOwnerList() {
        // 暂用假数据
        this.labOwnerList = fake_labOwnerList
        // 调用获取类别信息的接口
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
        this.dataForm.lab_owner_name = this.labOwnerList
          .filter(m => m.id === this.dataForm.lab_owner_id)
          .map(m => m.name)
          .pop()
        this.dataForm.lab_category_name = this.labCategoryList
          .filter(m => m.id === this.dataForm.lab_category_id)
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
