<template>
  <div class="app-container">
    <!-- 功能按钮 -->
    <div class="detail-button">
      <el-button type="primary" @click="handleReturn" size="medium">返回</el-button>
      <el-button type="primary" :disabled="isAble" @click="beforeEdit" size="medium">编辑信息</el-button>
      <el-button type="danger" @click="beforeHandleDelete" size="medium">删除</el-button>
      <el-button type="success" @click="handleDownload" size="medium">导出信息</el-button>
      <el-button type="primary" @click="handleEquipSoftwareList" size="medium">查看配置软件</el-button>
      <el-button type="primary" @click="handleAttachment" size="medium">查看入库附件</el-button>
    </div>
    <!-- 详细信息展示 -->
    <div class="form-style">
      <h2>器材详细信息</h2>
      <el-form ref="dataForm" :model="dataForm" :rules="rules">
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="编号" label-width="100px" prop="number">
              <el-input v-model="dataForm.equ_number" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="名称" label-width="100px" prop="info">
              <el-input v-model="dataForm.equ_name" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="种类" label-width="100px" prop="info">
              <el-input v-model="dataForm.equ_category" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="数量" label-width="100px" prop="info">
              <el-input v-model="dataForm.equ_quantity" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="负责人" label-width="100px" prop="info">
              <el-input v-model="dataForm.equ_owner" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="存放地点" label-width="100px" prop="info">
              <el-input v-model="dataForm.equ_storage" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="单位" label-width="100px" prop="info">
              <el-input v-model="dataForm.equ_unit" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单价" label-width="100px" prop="info">
              <el-input v-model="dataForm.equ_unitPrice" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="规格" label-width="100px" prop="info">
              <el-input v-model="dataForm.equ_specifications" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="国码" label-width="100px" prop="info">
              <el-input v-model="dataForm.equ_code" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出产日期" label-width="100px" prop="info">
              <el-input v-model="dataForm.equ_produceDate" style="width: auto" :readonly="isRead" v-show="isRead" />
              <el-date-picker type="date" v-model="dataForm.equ_produceDate" value-format="yyyy-MM-dd" clearable v-show="!isRead"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="保修期" label-width="100px" prop="info">
              <el-input v-model="dataForm.equ_keepPeriod" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="购置日期" label-width="100px" prop="info">
              <el-input v-model="dataForm.equ_purchaseDate" style="width: auto" :readonly="isRead" v-show="isRead" />
              <el-date-picker type="date" v-model="dataForm.equ_purchaseDate" value-format="yyyy-MM-dd" clearable v-show="!isRead"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="购买方式" label-width="100px" prop="info">
              <el-input v-model="dataForm.equ_purchaseWay" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经费来源" label-width="100px" prop="info">
              <el-input v-model="dataForm.equ_fundsSource" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="单据号" label-width="100px" prop="info">
              <el-input v-model="dataForm.equ_documentCode" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供货商" label-width="100px" prop="info">
              <el-input v-model="dataForm.equ_supplier" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供货商电话" label-width="100px" prop="info">
              <el-input v-model="dataForm.supplier_phone" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col>
            <el-form-item label="使用方向" label-width="100px" prop="info">
              <el-input v-model="dataForm.equ_userDirection" style="width: auto" :readonly="isRead" />
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
    equ_purchaseDate:"2000-06-01",
    equ_specifications:"规格",
    equ_code:"国码",
    equ_produceDate:"2020-06-19",
    equ_fundsSource:"经费来源",
    equ_purchaseWay:"购买方式",
    equ_keepPeriod:"保修期",
    equ_documentCode:"单据号",
    equ_supplier:"供货商",
    supplier_phone:"供货商电话",
    equ_accessories:"器材入库附件",
    equ_software:"器材配置安装软件",
  }

  export default {
    name: "field-equip-detail",
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
        this.dataForm = fakeData;
        let id = this.$route.query.id;
        console.log(id);
      },
      /* 返回上一页 */
      handleReturn() {
        this.$router.go(-1)
      },
      /* 编辑前 */
      beforeEdit() {
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
      /* 提交编辑的内容 */
      submitEdit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            // 根据返回信息重新复制dataForm
            console.log('success submit!!');
          } else {
            console.log('error submit!!');
            return false
          }
        })
        // 修改后操作
        this.afterEdit()
      },
      /* 取消编辑操作 */
      cancelEdit() {
        this.dataForm = { ...this.tempData };
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
            message: '已取消',
            type: 'info'
          })
        })
      },
      /* 导出 */
      handleDownload() {
        console.log('导出')
      },
      /* 跳转配置软件列表 */
      handleEquipSoftwareList(id){
        this.$router.push({
          name: 'Field_Equip_Sw_List',
          query: {
            id:id
          }
        })
      },
      /* 查看附件 */
      handleAttachment() {
        console.log("查看入库附件")
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
    padding: 20px;
    margin-bottom: 20px;
  }
</style>
