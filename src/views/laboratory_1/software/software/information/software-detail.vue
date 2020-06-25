<template>
  <div class="app-container">
    <!-- 功能按钮 -->
    <div class="detail-button">
      <el-button type="primary" size="medium" @click="handleReturn">返回</el-button>
      <el-button type="primary" :disabled="isAble" size="medium" @click="beforeEdit">编辑信息</el-button>
      <el-button type="danger" size="medium" @click="beforeHandleDelete">删除</el-button>
      <el-button type="success" size="medium" @click="handleDownload">导出信息</el-button>
      <el-button type="primary" size="medium" @click="handleAttachment">查看使用说明</el-button>
    </div>
    <!-- 详细信息展示 -->
    <div class="form-style">
      <h2>软件详细信息</h2>
      <el-form ref="dataForm" :model="dataForm" :rules="rules">
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="软件名称" label-width="100px" prop="name">
              <el-input v-model="dataForm.name" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="软件大小" label-width="100px" prop="name">
              <el-input v-model="dataForm.size" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="软件种类" label-width="100px" prop="number">
              <el-input v-show="isRead" v-model="dataForm.lab_software_category_id" style="width: auto" :readonly="isRead" />
              <el-select v-show="!isRead" v-model="dataForm.lab_software_category_id" style="width: 160px;" placeholder="软件种类">
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
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="适用系统" label-width="100px" prop="name">
              <el-input v-model="dataForm.applicable_system" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="软件版本号" label-width="100px" prop="number">
              <el-input v-model="dataForm.version" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="价格" label-width="100px" prop="name">
              <el-input v-model="dataForm.price" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="8">
            <el-form-item label="发行方名称" label-width="100px" prop="number">
              <el-input v-model="dataForm.publisher_name" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="使用说明" label-width="100px" prop="name">
              <el-input v-model="dataForm.attachment_id" style="width: auto" :readonly="isRead" />
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
  id: 1, name: '软件名称', lab_software_category_id: '软件种类', size: '软件大小', applicable_system: '适用系统', version: '软件版本号', price: '价格', publisher_name: '发行方名称', attachment_id: '使用说明'
}

export default {
  name: 'SoftwareDetail',
  data() {
    return {
      dataForm: null,
      tempData: null,
      rules: {
        lab_num: [
          { type: 'number', message: '请输入数字', trigger: 'blur' }
        ],
        infoValidation: [
          { type: 'string', message: '请输入', trigger: 'blur' }
        ]
      },
      isRead: true,
      isAble: false,
      showSaveBtn: false
    }
  },
  created() {
    this.getOriginalData()
  },
  methods: {
    /* 根据ID获取数据 */
    getOriginalData() {
      // 暂用假数据
      this.dataForm = fakeData
      const id = this.$route.query.id
      console.log(id)
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
      console.log(this.tempData.lab_name)
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
    /* 提交编辑的内容 */
    submitEdit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
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
      console.log(this.tempData.lab_name)
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
    },
    /* 跳转到设施详情 */
    handleFacilityDetail(id) {
      console.log('facility id =' + id)
      this.$router.push({
        name: 'Field_Fac_List',
        query: {
          id: id
        }
      })
    },
    /* 跳转到器材详情 */
    handleEquipmentDetail(id) {
      console.log('equipment id =' + id)
      this.$router.push({
        name: 'Field_Equip_List',
        query: {
          id: id
        }
      })
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
