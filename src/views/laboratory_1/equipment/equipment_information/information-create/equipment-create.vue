<template>
  <div class="app-container">
    <!-- 功能按钮 -->
    <div class="detail-button">
      <el-button type="primary" size="medium" @click="handleReturn">返回</el-button>
      <el-button type="success" size="medium" @click="submitCreate('dataForm')">创建</el-button>
    </div>
    <!-- 添加信息表单 -->
    <div class="form-style">
      <h2>新增器材</h2>
      <el-form ref="dataForm" :model="dataForm" :rules="rules" hide-required-asterisk>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6">
            <el-form-item label="编号" label-width="100px" prop="number">
              <el-input v-model="dataForm.number" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="名称" label-width="100px" prop="name">
              <el-input v-model="dataForm.name" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="种类" label-width="100px" prop="lab_equipment_category_name">
              <el-select v-model="dataForm.lab_equipment_category_id" style="width: 165px;" filterable>
                <!-- 获取数据库信息动态生成option -->
                <el-option v-for="item in equCategoryList" :key="item.id" :label="item.name" :value="item.id">
                  <span style="float: left">编号:{{ item.id }}</span>
                  <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="品牌" label-width="100px" prop="brand_name">
              <el-input v-model="dataForm.brand_name" style="width: auto" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6">
            <el-form-item label="型号" label-width="100px" prop="model_name">
              <el-input v-model="dataForm.model_name" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单位" label-width="100px" prop="lab_unit_id">
              <el-input v-model="dataForm.lab_unit_id" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="数量" label-width="100px" prop="quantity">
              <el-input v-model="dataForm.quantity" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单价" label-width="100px" prop="unit_price">
              <el-input v-model="dataForm.unit_price" style="width: auto" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6">
            <el-form-item label="生产商" label-width="100px" prop="manufacturer">
              <el-input v-model="dataForm.manufacturer" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="生产商电话" label-width="100px" prop="manufacturer_telephone">
              <el-input v-model="dataForm.manufacturer_telephone" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="供货商" label-width="100px" prop="supplier">
              <el-input v-model="dataForm.supplier" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="供货商电话" label-width="100px" prop="supplier_telephone">
              <el-input v-model="dataForm.supplier_telephone" style="width: auto" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6">
            <el-form-item label="总价" label-width="100px" prop="total_price">
              <el-input v-model="dataForm.total_price" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="国码" label-width="100px" prop="country_code">
              <el-input v-model="dataForm.country_code" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="出产日期" label-width="100px" prop="production_date">
              <el-date-picker v-model="dataForm.production_date" type="date" style="width: 165px" :picker-options="pickerOptions" value-format="yyyy-MM-dd" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="保修期" label-width="100px" prop="warranty">
              <el-input v-model="dataForm.warranty" style="width: auto" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6">
            <el-form-item label="单据号" label-width="100px" prop="bills_number">
              <el-input v-model="dataForm.bills_number" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="购置日期" label-width="100px" prop="purchase_date">
              <el-date-picker v-model="dataForm.purchase_date" style="width: 165px" type="date" value-format="yyyy-MM-dd" :picker-options="pickerOptions" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="存放地点" label-width="100px" prop="field_name">
              <el-input v-model="dataForm.field_name" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="购买方式" label-width="100px" prop="purchase_method">
              <el-input v-model="dataForm.purchase_method" style="width: auto" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6">
            <el-form-item label="经费来源" label-width="100px" prop="expenditure">
              <el-input v-model="dataForm.expenditure" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态" label-width="100px" prop="status_name">
              <el-select v-model="dataForm.status" style="width: 165px;">
                <!--获取数据库信息动态生成option-->
                <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用途" label-width="100px" prop="usage">
              <el-input v-model="dataForm.usage" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="附件URL" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.URL" style="width: auto" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col>
            <el-form-item label="附件IP" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.IP" style="width: auto" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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
export default {
  name: 'equipment-create',
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      rules: {
        number: [
          { required: true, type: 'string', message: '请输入数字', trigger: 'blur' }
        ],
        infoValidationValidation: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        name: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        lab_equipment_category_name: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        lab_equipment_category_id: [
          { required: true, type: 'string', message: '请输入数字', trigger: 'blur' }
        ],
        brand_name: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        model_name: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        lab_unit_id: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        manufacturer: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        manufacturer_telephone: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        supplier: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        supplier_telephone: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        quantity: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        unit_price: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        total_price: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        country_code: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        production_date: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        bills_number: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        purchase_date: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        field_id: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        field_name: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        expenditure: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        purchase_method: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        warranty: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        status: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        status_name: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        usage: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ]
      },
      dataForm: {
        number: null,
        name: null,
        lab_equipment_category_name: null,
        lab_equipment_category_id: null,
        brand_id: null,
        brand_name: null,
        model_id: null,
        model_name: null,
        lab_unit_id: null,
        manufacturer: null,
        manufacturer_telephone: null,
        supplier: null,
        supplier_telephone: null,

        quantity: null,
        unit_price: null,
        total_price: null,
        country_code: null,
        production_date: null,

        bills_number: null,
        purchase_date: null,
        field_id: null,
        field_name: null,
        expenditure: null,
        purchase_method: null,
        warranty: null,
        IP: null,
        URL: null,
        status: null,
        status_name: null,
        usage: null
      },
      equCategoryList: [],
      statusList: []
    }
  },
  created() {
    this.getEquStatusList()
    this.getEquCategoryList()
  },
  methods: {
    submitCreate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 调用接口
          this.$message({
            message: '添加成功!',
            type: 'success'
          })
          console.log('success submit!!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
    }
  }
}
</script>

<style scoped>
  .form-style{
    color: #5a5e66;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.1);
    padding: 20px;
  }
  .detail-button{
    color: #5a5e66;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.1);
    padding: 20px;
    margin-bottom: 20px;
  }
</style>
