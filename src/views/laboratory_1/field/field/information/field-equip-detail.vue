<template>
  <div class="app-container">
    <!-- 功能按钮 -->
    <div class="detail-button">
      <el-button type="primary" size="medium" @click="handleReturn">返回</el-button>
      <el-button type="primary" :disabled="isAble" size="medium" @click="beforeEdit">编辑信息</el-button>
      <el-button type="danger" size="medium" @click="beforeHandleDelete">删除</el-button>
      <el-button type="success" size="medium" @click="handleDownload">导出信息</el-button>
      <el-button type="primary" size="medium" @click="handleEquipSoftwareList">查看配置软件</el-button>
      <el-button type="primary" size="medium" @click="handleAttachment">查看入库附件</el-button>
    </div>
    <!-- 详细信息展示 -->
    <div class="form-style">
      <h2>器材详细信息</h2>
      <el-form ref="dataForm" :model="dataForm" :rules="rules">
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="编号" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.number" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="名称" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.name" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="种类" label-width="100px" prop="infoValidation">
              <el-input v-show="isRead" v-model="dataForm.lab_equipment_category_name" style="width: auto" :readonly="isRead" />
              <el-select v-show="!isRead" v-model="dataForm.lab_equipment_category_id" style="width: 203px;" placeholder="器材种类" filterable clearable>
                <!--获取数据库信息动态生成option-->
                <el-option v-for="item in equCategoryList" :key="item.id" :label="item.name" :value="item.id">
                  <span style="float: left">编号:{{ item.id }}</span>
                  <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="品牌" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.brand_name" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="型号" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.model_name" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单位" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.lab_unit_id" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="生产商" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.manufacturer" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="生产商电话" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.manufacturer_telephone" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供货商" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.supplier" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="供货商电话" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.supplier_telephone" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="数量" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.quantity" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单价" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.unit_price" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="总价" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.total_price" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="国码" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.country_code" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出产日期" label-width="100px" prop="infoValidation">
              <el-input v-show="isRead" v-model="dataForm.production_date" style="width: auto" :readonly="isRead" />
              <el-date-picker v-show="!isRead" v-model="dataForm.production_date" type="date" value-format="yyyy-MM-dd" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="单据号" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.bills_number" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="购置日期" label-width="100px" prop="infoValidation">
              <el-input v-show="isRead" v-model="dataForm.purchase_date" style="width: auto" :readonly="isRead" />
              <el-date-picker v-show="!isRead" v-model="dataForm.purchase_date" type="date" value-format="yyyy-MM-dd" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="存放地点" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.field_name" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="经费来源" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.expenditure" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="购买方式" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.purchase_method" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="保修期" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.warranty" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="8">
            <el-form-item label="附件URL" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.URL" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="附件IP" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.IP" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态" label-width="100px" prop="infoValidation">
              <el-input v-show="isRead" v-model="dataForm.status_name" style="width: auto" :readonly="isRead" />
              <el-select v-show="!isRead" v-model="dataForm.status" style="width: 203px;" placeholder="状态">
                <!--获取数据库信息动态生成option-->
                <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="用途" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.usage" style="width: auto" :readonly="isRead" />
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
const statusList = [
  { id: 0, name: '在库' },
  { id: 1, name: '使用中' },
  { id: 2, name: '出借' },
  { id: 3, name: '故障' },
  { id: 4, name: '报废' },
  { id: 5, name: '丢失' }
]
const equCategoryList = [
  { id: 1, name: '分类1' },
  { id: 2, name: '分类2' }
]
// 假数据
const fakeData = {
  id: 1,
  number: '器材编号',
  name: '器材名称',
  lab_equipment_category_name: '分类1',
  lab_equipment_category_id: 1,
  brand_id: 1,
  brand_name: '品牌',
  model_id: 1,
  model_name: '型号',
  lab_unit_id: '单位',
  manufacturer: '生产商',
  manufacturer_telephone: '生产商电话',
  supplier: '供货商',
  supplier_telephone: '供货商电话',

  quantity: '数量',
  unit_price: '单价',
  total_price: '总价',
  country_code: '国码',
  production_date: '出产日期',

  bills_number: '单据号',
  purchase_date: '购置日期',
  field_id: 1,
  field_name: '存放场所',
  expenditure: '经费来源',
  purchase_method: '购买方式',
  warranty: '保修期',
  IP: '附件IP',
  URL: '附件URL',

  status: '4',
  status_name: '报废',
  usage: '用途'
}

export default {
  name: 'field-equip-detail',
  data() {
    return {
      dataForm: null,
      tempData: null,
      rules: {
        number: [
          { type: 'number', message: '请输入数字', trigger: 'blur' }
        ],
        infoValidationValidation: [
          { type: 'string', message: '请输入', trigger: 'blur' }
        ]
      },
      isRead: true,
      isAble: false,
      showSaveBtn: false,
      equCategoryList: [],
      statusList: []
    }
  },
  created() {
    this.getOriginalData()
    this.getEquStatusList()
    this.getEquCategoryList()
  },
  methods: {
    /* 根据ID获取数据 */
    getOriginalData() {
      // 暂用假数据
      this.dataForm = fakeData
      const id = this.$route.query.id
      console.log(id)
    },
    /* 获取器材分类信息 */
    getEquCategoryList() {
      this.equCategoryList = equCategoryList
      console.log('equ category list')
    },
    /* 获取器材状态信息 */
    getEquStatusList() {
      this.statusList = statusList
      console.log('equ category list')
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
    /* 同步耗材种类id 和 名称 */
    synchronizeData(keyName, keyId, keyNameIdList) {
      this.dataForm[keyName] = keyNameIdList
        .filter(m => m.id === keyId)
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
          console.log('success submit!!')
          this.synchronizeData('lab_equipment_category_name', this.dataForm.lab_equipment_category_id, this.equCategoryList)
          this.synchronizeData('status_name', this.dataForm.status, this.statusList)

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
          type: 'infoValidation'
        })
      })
    },
    /* 导出 */
    handleDownload() {
      console.log('导出')
    },
    /* 跳转配置软件列表 */
    handleEquipSoftwareList(id) {
      this.$router.push({
        name: 'Equip_Software_List',
        query: {
          id: id
        }
      })
    },
    /* 查看附件 */
    handleAttachment() {
      console.log('查看入库附件')
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
