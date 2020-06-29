<template>
  <div class="app-container">
    <!-- 功能按钮 -->
    <div class="detail-button">
      <el-button type="primary" @click="handleReturn" size="medium">返回</el-button>
      <el-button type="primary" :disabled="isAble" @click="beforeEdit" size="medium">编辑信息</el-button>
      <el-button type="danger" @click="beforeHandleDelete" size="medium">删除</el-button>
      <el-button type="success" @click="handleDownload" size="medium">导出信息</el-button>
      <el-button type="primary" @click="handleEquipComponentsList" size="medium">查看配置零部件</el-button>
      <el-button type="primary" @click="handleEquipSoftwareList" size="medium">查看配置软件</el-button>
      <el-button type="primary" @click="handleAttachment" size="medium">查看入库附件</el-button>
    </div>
    <!-- 详细信息展示 -->
    <div class="form-style">
      <h2>器材详细信息</h2>
      <el-form ref="dataForm" :model="dataForm" :rules="rules">
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="器材编号" label-width="100px" prop="number">
              <el-input v-model="dataForm.equip_num" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="器材名称" label-width="100px" prop="info">
              <el-input v-model="dataForm.equip_name" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="器材状态" label-width="100px" prop="info">
              <el-input v-model="dataForm.equip_status" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="器材种类" label-width="100px" prop="info">
              <el-input v-model="dataForm.equip_category" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="数量" label-width="100px" prop="info">
              <el-input v-model="dataForm.equip_quantity" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="负责人" label-width="100px" prop="info">
              <el-input v-model="dataForm.equip_inCharge" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="购置日期" label-width="100px" prop="info">
              <el-input v-model="dataForm.equip_purchaseDate" style="width: auto" :readonly="isRead" v-show="isRead" />
              <el-date-picker type="date" v-model="dataForm.equip_purchaseDate" value-format="yyyy-MM-dd" clearable v-show="!isRead"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="购买方式" label-width="100px" prop="info">
              <el-input v-model="dataForm.equip_purchaseMethod" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经费来源" label-width="100px" prop="info">
              <el-input v-model="dataForm.equip_expenditure" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="单位" label-width="100px" prop="info">
              <el-input v-model="dataForm.equip_unit" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单价" label-width="100px" prop="info">
              <el-input v-model="dataForm.equip_unitPrice" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="总价" label-width="100px" prop="info">
              <el-input v-model="dataForm.equip_totalPrice" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="规格" label-width="100px" prop="info">
              <el-input v-model="dataForm.equip_specification" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="国码" label-width="100px" prop="info">
              <el-input v-model="dataForm.equip_countryCode" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="使用方向" label-width="100px" prop="info">
              <el-input v-model="dataForm.equip_useDirection" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="出产日期" label-width="100px" prop="info">
              <el-input v-model="dataForm.equip_produceDate" style="width: auto" :readonly="isRead" v-show="isRead" />
              <el-date-picker type="date" v-model="dataForm.equ_produceDate" value-format="yyyy-MM-dd" clearable v-show="!isRead"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="器材型号" label-width="100px" prop="info">
              <el-input v-model="dataForm.equip_model" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单据号" label-width="100px" prop="info">
              <el-input v-model="dataForm.equip_billsNumber" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="保修期" label-width="100px" prop="info">
              <el-input v-model="dataForm.equip_warranty" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供货商" label-width="100px" prop="info">
              <el-input v-model="dataForm.equip_supplier" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供货商电话" label-width="100px" prop="info">
              <el-input v-model="dataForm.equip_supplierTel" style="width: auto" :readonly="isRead" />
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
    id: 1, // 主键id
    equip_num: '器材编号', // 器材编号
    equip_name: '器材名称', // 器材名称
    equip_model: '器材型号', // 器材型号
    equip_category: '器材分类', // 器材分类
    equip_status: '器材状态', // 器材状态
    equip_useDirection: '使用方向', // 器材使用方向
    equip_quantity: '器材数量', // 器材数量
    equip_unit: '单位', // 单位
    equip_unitPrice: '单价', // 单价
    equip_totalPrice: '总价', // 总价
    equip_purchaseDate: '购置日期', // 购置日期
    equip_specification: '规格', // 规格
    equip_countryCode: '国码', // 国码
    equip_produceDate: '出产日期', // 出产日期
    equip_expenditure: '经费来源', // 经费来源
    equip_purchaseMethod: '购买方式', // 购买方式
    equip_billsNumber: '单据号', // 单据号
    equip_attachment: '附件', // 附件
    equip_warranty: '保修期', // 保修期
    equip_inCharge: '负责人', // 负责人
    equip_supplier: '供货商', // 供货商
    equip_supplierTel: '供货商联系电话', // 供货商联系电话
  }

  export default {
    name: 'equipment-detail',
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
          name: 'Equip_Software_List',
          query: {
            id: id
          }
        })
      },
      /* 跳转到配置零部件列表 */
      handleEquipComponentsList(id) {
        this.$router.push({
          name: 'Equip_Components_List',
          query: {
            id: id
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
