<!--
    @Author: 刘梓伊
    @Description: 实验室器材内置软件详情界面
    @Date: 2020-06-20 16:31
    @Version: 1.0
-->
<template>
  <div class="app-container">
    <!-- 功能按钮 -->
    <div class="detail-button">
      <el-button type="primary" @click="handleReturn" size="medium">返回</el-button>
      <el-button type="primary" :disabled="isAble" @click="beforeEdit" size="medium">编辑信息</el-button>
      <el-button type="danger" @click="beforeHandleDelete" size="medium">删除</el-button>
      <el-button type="success" @click="handleDownload" size="medium">导出信息</el-button>
      <!-- 考虑打开窗口显示附件列表（如果包含多个附件的话），或者点击下载附件 -->
      <el-button type="primary" @click="handleAttachment" size="medium">查看使用说明</el-button>
    </div>
    <!-- 详细信息展示 -->
    <div class="form-style">
      <h2>软件详细信息</h2>
      <el-form ref="dataForm" :model="dataForm" :rules="rules">
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="器材编号" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.software_number" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="器材名称" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.equ_name" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="软件名称" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.software_name" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="软件种类" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.software_category" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="适用专业" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.software_applicable" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="软件大小" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.software_size" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="版本号" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.software_version" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="配置实验室" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.software_Lab" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发行方" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.software_issuer" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="适用系统" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.software_systems" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="价格" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.software_price" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="软件安装路径" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.software_path" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-collapse-transition>
        <div v-show="showSaveBtn" style="text-align: center">
          <el-button type="success" @click="submitEdit('dataForm')" size="medium">保存</el-button>
          <el-button type="primary" @click="beforeCancelEdit" size="medium">取消</el-button>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
  // 假数据
  const fakeData = {
    id:1,
    software_number:"器材编号",
    equ_name: "器材名称",
    software_name: "软件名称",
    software_category:"软件种类",
    software_applicable: "适用专业",
    software_size: "软件大小",
    software_version: "版本号",
    software_Lab: "配置实验室",
    software_issuer: "发行方",
    software_systems: "适用系统",
    software_price: "价格",
    software_introduction: "使用说明（附件）",
    software_path: "软件安装路径",
  }

  export default {
    name: 'field-equip-sw-detail',
    data() {
      return {
        dataForm: null,
        tempData: null,
        // 校验规则
        rules: {
          number: [
            { type: 'number', message: '请输入数字', trigger: 'blur' }
          ],
          info: [
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
      /* 返回上一页 */
      handleReturn() {
        this.$router.go(-1)
      },
      /* 根据ID获取数据 */
      getOriginalData() {
        // 暂用假数据
        this.dataForm = fakeData;
        let id = this.$route.query.id;
        console.log("software-detail id=" + id);
      },
      /* 编辑前 */
      beforeEdit() {
        this.showSaveBtn = !this.showSaveBtn
        // 保存修改前数据
        this.tempData = { ...this.dataForm }
        //console.log(this.tempData.fac_name)
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
        //console.log(this.tempData.lab_name)
        this.afterEdit()
      },
      /* 取消编辑 确认弹窗 */
      beforeCancelEdit() {
        this.$confirm('修改信息还没保存, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.cancelEdit()
          this.$message({
            type: 'success',
            message: '已取消'
          })
        }).catch(() => {
          console.log('已取消')
        })
      },
      /* 删除 */
      handleDelete() {
        if (this.dataForm.id) {
          return true
        } else {
          return false
        }
      },
      /* 删除 确认弹窗 */
      beforeHandleDelete() {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
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
      /* 器材内置软件列表 */
      handleEquipSoftwareList(id){
        this.$router.push({
          name: 'Field_Equip_SW_List',
          query: {
            id: id
          }
        })
      },
      /* 查看使用说明 */
      handleAttachment() {
        console.log("查看使用说明")
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
