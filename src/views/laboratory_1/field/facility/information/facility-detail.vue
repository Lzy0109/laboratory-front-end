<!--
    @Author: 刘梓伊
    @Description: 设施详情界面
    @Date: 2020-06-19 16:52
    @Version: 1.0
-->
<template>
  <div class="app-container">
    <!-- 功能按钮 -->
    <div class="detail-button">
      <el-button type="primary" size="medium" @click="handleReturn">返回</el-button>
      <el-button type="primary" :disabled="isAble" size="medium" @click="beforeEdit">编辑信息</el-button>
      <el-button type="danger" size="medium" @click="beforeHandleDelete">删除</el-button>
      <el-button type="success" size="medium" @click="handleDownload">导出信息</el-button>
      <el-button type="primary" size="medium" @click="handleAttachment">查看附件</el-button>
    </div>
    <!-- 详细信息展示 -->
    <div class="form-style">
      <h2>设施详细信息</h2>
      <el-form ref="dataForm" :model="dataForm" :rules="rules">
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="设施编号" label-width="100px" prop="number">
              <el-input v-model="dataForm.fac_num" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="设施名称" label-width="100px" prop="number">
              <el-input v-model="dataForm.fac_name" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="设施状态" label-width="100px" prop="name">
              <el-input v-model="dataForm.fac_status" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="设施分类" label-width="100px" prop="number">
              <el-input v-show="isRead" v-model="dataForm.fac_category_name" style="width: auto" :readonly="isRead" />
              <el-select v-show="!isRead" v-model="dataForm.fac_category_id" style="width: 160px;" placeholder="设施分类" filterable clearable>
                <!--获取数据库信息动态生成option-->
                <el-option v-for="item in facCategoryList" :key="item.id" :label="item.name" :value="item.id">
                  <span style="float: left">编号:{{ item.id }}</span>
                  <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="数量" label-width="100px" prop="number">
              <el-input v-model="dataForm.fac_quantity" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="负责人" label-width="100px" prop="name">
              <el-input v-show="isRead" v-model="dataForm.fac_inCharge_name" style="width: auto" :readonly="isRead" />
              <el-select v-show="!isRead" v-model="dataForm.fac_inCharge_id" style="width: 160px;" placeholder="负责人" filterable clearable>
                <!--获取数据库信息动态生成option-->
                <el-option v-for="item in ownerList" :key="item.id" :label="item.name" :value="item.id">
                  <span style="float: left">编号:{{ item.id }}</span>
                  <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="购置日期" label-width="100px" prop="name">
              <el-input v-model="dataForm.fac_purchaseDate" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="购买方式" label-width="100px" prop="number">
              <el-input v-model="dataForm.fac_purchaseMethod" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经费来源" label-width="100px" prop="number">
              <el-input v-model="dataForm.fac_expenditure" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="单位" label-width="100px" prop="name">
              <el-input v-model="dataForm.fac_unit" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单价" label-width="100px" prop="number">
              <el-input v-model="dataForm.fac_unitPrice" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="总价" label-width="100px" prop="name">
              <el-input v-model="dataForm.fac_totalPrice" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="规格" label-width="100px" prop="name">
              <el-input v-model="dataForm.fac_specification" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="国码" label-width="100px" prop="name">
              <el-input v-model="dataForm.fac_countryCode" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单据号" label-width="100px" prop="number">
              <el-input v-model="dataForm.fac_billsNumber" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="出产日期" label-width="100px" prop="number">
              <el-input v-model="dataForm.fac_produceDate" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="设施型号" label-width="100px" prop="name">
              <el-input v-model="dataForm.fac_model" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="保修期" label-width="100px" prop="name">
              <el-input v-model="dataForm.fac_warranty" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="供应商" label-width="100px" prop="number">
              <el-input v-model="dataForm.fac_supplier" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供应商电话" label-width="100px" prop="name">
              <el-input v-model="dataForm.fac_supplierTel" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8" />
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
  id: 1, // 主键id
  fac_num: '设施编号', // 设施编号
  fac_name: '设施名称', // 设施名称
  fac_model: '设施型号', // 设施型号
  fac_category_id: 1, // 设施分类
  fac_category_name: '设施分类1', // 设施分类
  fac_status: '设施状态', // 设施状态
  fac_quantity: '设施数量', // 设施数量
  fac_unit: '单位', // 单位
  fac_unitPrice: '单价', // 单价
  fac_totalPrice: '总价', // 总价
  fac_purchaseDate: '购置日期', // 购置日期
  fac_specification: '规格', // 规格
  fac_countryCode: '国码', // 国码
  fac_produceDate: '出产日期', // 出产日期
  fac_expenditure: '经费来源', // 经费来源
  fac_purchaseMethod: '购买方式', // 购买方式
  fac_billsNumber: '单据号', // 单据号
  fac_attachment: '附件', // 附件
  fac_warranty: '保修期', // 保修期
  fac_inCharge_id: 1, // 负责人
  fac_inCharge_name: '设施负责人1', // 负责人
  fac_supplier: '供货商', // 供货商
  fac_supplierTel: '供货商联系电话' // 供货商联系电话
}
const fake_facCategoryList = [
  { id: 1, name: '设施种类名称1' },
  { id: 2, name: '设施种类名称2' }
]
const fake_ownerList = [
  { id: 1, name: '设施负责人1' },
  { id: 2, name: '设施负责人2' }
]
export default {
  name: 'FacilityDetail',
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
      showSaveBtn: false,
      facCategoryList: [],
      ownerList: []
    }
  },
  created() {
    this.getFacCategoryList()
    this.getFacOwnerList()
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
    /* 获取设施分类信息 */
    getFacCategoryList() {
      // 暂用假数据
      this.facCategoryList = fake_facCategoryList
      // 调用获取信息的接口
    },
    /* 获取设施负责人信息 */
    getFacOwnerList() {
      // 暂用假数据
      this.ownerList = fake_ownerList
      // 调用获取信息的接口
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
    /* 同步部分的信息 （id 和 name） */
    synchronizeData() {
      this.dataForm.fac_category_name = this.facCategoryList
        .filter(m => m.id === this.dataForm.fac_category_id)
        .map(m => m.name)
        .pop()
      this.dataForm.fac_inCharge_name = this.ownerList
        .filter(m => m.id === this.dataForm.fac_inCharge_id)
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
          // 根据返回信息重新复制dataForm
          this.synchronizeData()
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
        console.log('delete')
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
    /* 查看附件 */
    handleAttachment() {
      console.log('查看附件')
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
