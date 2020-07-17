<!--
    @Author 李国烨
    @Date 2020/6/22 10:42
    @Description: 器材信息创建页面
    @Version 1.0
-->
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
            <el-form-item label="中文名称" label-width="100px" prop="name">
              <el-input v-model="dataForm.name" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="英文名称" label-width="100px" prop="english_name">
              <el-input v-model="dataForm.english_name" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="器材分类" label-width="100px" prop="lab_equipment_category_id">
              <!-- 新版 -->
              <el-button type="info" plain style="width: 165px" @click="handleOpenDialog('labEquipmentCategoryDialogVisible')">
                {{ dataForm.lab_equipment_category_name === null ? '请选择' : dataForm.lab_equipment_category_name }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6">
            <el-form-item label="型号" label-width="100px" prop="lab_equipment_model_id">
              <el-button type="info" plain style="width: 165px" @click="handleOpenDialog('equipmentModelDialogVisible')">
                {{ dataForm.equipment_model_name === null ? '请选择' : dataForm.equipment_model_name }}
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单位" label-width="100px" prop="lab_unit_id">
              <el-button type="info" plain style="width: 165px" @click="handleOpenDialog('unitDialogVisible')">
                {{ dataForm.lab_unit_name === null ? '请选择' : dataForm.lab_unit_name }}
              </el-button>
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
            <el-form-item label="生产商" label-width="100px" prop="lab_manufacturer_id">
              <el-button type="info" plain style="width: 165px" @click="handleOpenDialog('manufacturerDialogVisible')">
                {{ dataForm.manufacturer_name === null ? '请选择' : dataForm.manufacturer_name }}
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="生产商电话" label-width="100px">
              <el-input v-model="dataForm.manufacturer_telephone" style="width: auto" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="供货商" label-width="100px" prop="lab_supplier_id">
              <el-button type="info" plain style="width: 165px" @click="handleOpenDialog('supplierDialogVisible')">
                {{ dataForm.supplier_name === null ? '请选择' : dataForm.supplier_name }}
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="供货商电话" label-width="100px">
              <el-input v-model="dataForm.supplier_telephone" style="width: auto" readonly />
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
            <el-form-item label="国码" label-width="100px" prop="country_code_id">
              <el-button type="info" plain style="width: 165px" @click="handleOpenDialog('countryCodeDialogVisible')">
                {{ dataForm.country_code_name === null ? '请选择' : dataForm.country_code_name }}
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="出产日期" label-width="100px" prop="production_date">
              <!-- <el-input v-show="isRead" v-model="dataForm.production_date" style="width: auto" />-->
              <el-date-picker v-model="dataForm.production_date" type="date" style="width: 165px" value-format="yyyy-MM-dd" clearable />
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
              <!--<el-input v-show="isRead" v-model="dataForm.purchase_date" style="width: auto" />-->
              <el-date-picker v-model="dataForm.purchase_date" style="width: 165px" type="date" value-format="yyyy-MM-dd" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="存放地点" label-width="100px" prop="field_id">
              <el-button type="info" plain style="width: 165px" @click="handleOpenDialog('fieldDialogVisible')">
                {{ dataForm.field_name === null ? '请选择' : dataForm.field_name }}
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="购买方式？" label-width="100px" prop="purchase_method">
              <el-input v-model="dataForm.purchase_method" style="width: auto" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6">
            <el-form-item label="经费来源？" label-width="100px" prop="expenditure">
              <el-input v-model="dataForm.expenditure" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态" label-width="100px" prop="status">
              <!--<el-input v-show="isRead" v-model="dataForm.status_name" style="width: auto" />-->
              <el-select v-model="dataForm.status" style="width: 165px;" placeholder="状态">
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
            <el-form-item label="品牌" label-width="100px" prop="brand_name">
              <el-button type="info" plain style="width: 165px" @click="handleOpenDialog('brandDialogVisible')">
                {{ dataForm.brand_name === null ? '请选择' : dataForm.brand_name }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="附件URL" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.URL" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="附件IP" label-width="100px" prop="infoValidation">
              <el-input v-model="dataForm.IP" style="width: auto" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 器材分类dialog -->
    <dictionary-for-select
      title="器材分类"
      listName="equCategoryList"
      idKey="lab_equipment_category_id"
      methodKey="equCategory"
      dialogVisibleKey="labEquipmentCategoryDialogVisible"
      :currentDialogVisible = "labEquipmentCategoryDialogVisible"
      :currentList = "equCategoryList"
      :currentSelectedItem = "dataForm.lab_equipment_category_id"
      @handleCancel="labEquipmentCategoryDialogVisible = !labEquipmentCategoryDialogVisible"
      @handleQuery="handleQuery"
      @handleSelect="handleSelect"
    >
    </dictionary-for-select>
    <!-- 品牌dialog -->
    <dictionary-for-select
      title="品牌筛选"
      listName="brandList"
      idKey="lab_brand_id"
      methodKey="brand"
      dialogVisibleKey="brandDialogVisible"
      :currentDialogVisible = "brandDialogVisible"
      :currentList = "brandList"
      :currentSelectedItem = "dataForm.lab_brand_id"
      @handleCancel="brandDialogVisible = !brandDialogVisible"
      @handleQuery="handleQuery"
      @handleSelect="handleSelect"
    >
    </dictionary-for-select>
    <!-- 型号dialog -->
    <dictionary-for-select
      title="型号筛选"
      listName="equipmentModelList"
      idKey="lab_equipment_model_id"
      methodKey="equipmentModel"
      dialogVisibleKey="equipmentModelDialogVisible"
      :currentDialogVisible = "equipmentModelDialogVisible"
      :currentList = "equipmentModelList"
      :currentSelectedItem = "dataForm.lab_equipment_model_id"
      @handleCancel="equipmentModelDialogVisible = !equipmentModelDialogVisible"
      @handleQuery="handleQuery"
      @handleSelect="handleSelect"
    >
    </dictionary-for-select>
    <!-- 计量单位dialog -->
    <dictionary-for-select
      title="计量单位筛选"
      listName="unitList"
      idKey="lab_unit_id"
      methodKey="unit"
      dialogVisibleKey="unitDialogVisible"
      :currentDialogVisible = "unitDialogVisible"
      :currentList = "unitList"
      :currentSelectedItem = "dataForm.lab_unit_id"
      @handleCancel="unitDialogVisible = !unitDialogVisible"
      @handleQuery="handleQuery"
      @handleSelect="handleSelect"
    >
    </dictionary-for-select>
    <!-- 生产商dialog -->
    <dictionary-for-select
      title="生产商筛选"
      listName="manufacturerList"
      idKey="lab_manufacturer_id"
      methodKey="manufacturer"
      dialogVisibleKey="manufacturerDialogVisible"
      :currentDialogVisible = "manufacturerDialogVisible"
      :currentList = "manufacturerList"
      :currentSelectedItem = "dataForm.lab_manufacturer_id"
      @handleCancel="manufacturerDialogVisible = !manufacturerDialogVisible"
      @handleQuery="handleQuery"
      @handleSelect="handleSelect"
    >
    </dictionary-for-select>
    <!-- 供货商dialog -->
    <dictionary-for-select
      title="供货商筛选"
      listName="supplierList"
      idKey="lab_supplier_id"
      methodKey="supplier"
      dialogVisibleKey="supplierDialogVisible"
      :currentDialogVisible = "supplierDialogVisible"
      :currentList = "supplierList"
      :currentSelectedItem = "dataForm.lab_supplier_id"
      @handleCancel="supplierDialogVisible = !supplierDialogVisible"
      @handleQuery="handleQuery"
      @handleSelect="handleSelect"
    >
    </dictionary-for-select>
    <!-- 国码dialog -->
    <dictionary-for-select
      title="国码"
      listName="countryCodeList"
      idKey="country_code_id"
      methodKey="countryCode"
      dialogVisibleKey="countryCodeDialogVisible"
      :currentDialogVisible = "countryCodeDialogVisible"
      :currentList = "countryCodeList"
      :currentSelectedItem = "dataForm.country_code_id"
      @handleCancel="countryCodeDialogVisible = !countryCodeDialogVisible"
      @handleQuery="handleQuery"
      @handleSelect="handleSelect"
    >
    </dictionary-for-select>
    <!-- 场地dialog -->
    <dictionary-for-select
      title="场地"
      listName="fieldList"
      idKey="field_id"
      methodKey="field"
      dialogVisibleKey="fieldDialogVisible"
      :currentDialogVisible = "fieldDialogVisible"
      :currentList = "fieldList"
      :currentSelectedItem = "dataForm.field_id"
      @handleCancel="fieldDialogVisible = !fieldDialogVisible"
      @handleQuery="handleQuery"
      @handleSelect="handleSelect"
    >
    </dictionary-for-select>
  </div>
</template>

<script>
import { createEquipmentInfo } from '@/api/laboratory_1/equipment'

const statusList = [
  { id: 0, name: '在库' },
  { id: 1, name: '使用中' },
  { id: 2, name: '出借' },
  { id: 3, name: '故障' },
  { id: 4, name: '报废' },
  { id: 5, name: '丢失' }
]
// 字典1
const allListName = [
  { key: 'equCategoryList', dialogVisibleName: 'labEquipmentCategoryDialogVisible', option: 'getEquCategoryList' },
  { key: 'brandList', dialogVisibleName: 'brandDialogVisible', option: 'getBrandList' },
  { key: 'equipmentModelList', dialogVisibleName: 'equipmentModelDialogVisible', option: 'getEquipmentModelList' },
  { key: 'unitList', dialogVisibleName: 'unitDialogVisible', option: 'getUnitList' },
  { key: 'manufacturerList', dialogVisibleName: 'manufacturerDialogVisible', option: 'getManufacturerList' },
  { key: 'supplierList', dialogVisibleName: 'supplierDialogVisible', option: 'getSupplierList' },
  { key: 'countryCodeList', dialogVisibleName: 'countryCodeDialogVisible', option: 'getCountryCodeList' },
  { key: 'fieldList', dialogVisibleName: 'fieldDialogVisible', option: 'getFieldList' }
]
// 字典2
const key2option = [
  {key: 'equCategory', option: 'fetchEquCategoryById'},
  {key: 'equipmentModel', option: 'fetchEquipmentModelById'},
  {key: 'brand', option: 'fetchBrandById'},
  {key: 'unit', option: 'fetchUnitById'},
  {key: 'manufacturer', option: 'fetchManufacturerById'},
  {key: 'supplier', option: 'fetchSupplierById'},
  {key: 'countryCode', option: 'fetchCountryCodeById'},
  {key: 'field', option: 'fetchFieldById'}

]

import { getSelectValue } from '@/utils/get-select-value'
import { isChinese, isEnglish } from '@/utils/fieldValidate'
import DictionaryForSelect from '@/components/DictionaryForSelect'
import {
  fetchEquipmentCategoryInfoById,
  fetchEquipmentCategoryInfos
} from '@/api/laboratory_1/equipment-category'
import { fetchFieldInfoById, fetchFieldInfos } from '@/api/laboratory_1/field'
import { fetchBrandInfoById, fetchBrandInfos } from '@/api/laboratory_1/brand'
import { fetchModelInfoById, fetchModelInfos } from '@/api/laboratory_1/model'
import { fetchUnitPriceInfoById, fetchUnitPriceInfos } from '@/api/laboratory_1/unit-price'
import { fetchSupplierInfoById, fetchSupplierInfos } from '@/api/laboratory_1/supplier'
import { fetchManufacturerInfoById, fetchManufacturerInfos } from '@/api/laboratory_1/manufacturer'
import { fetchCountryCodeInfoById, fetchCountryCodeInfos } from '@/api/laboratory_1/country-code'
export default {
  name: 'equipment-create',
  components: {
    DictionaryForSelect
  },
  data() {
    const validateIsChinese = (rule, value, callback) => {
      if (!isChinese(value)) {
        callback(new Error('请输入中文'))
      } else {
        callback()
      }
    }
    const validateIsEnglish = (rule, value, callback) => {
      if (!isEnglish(value)) {
        callback(new Error('请输入英文'))
      } else {
        callback()
      }
    }
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
        name: [
          { required: true, trigger: 'blur', validator: validateIsChinese }
        ],
        english_name: [
          { required: true, message: '请输入', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validateIsEnglish }
        ],
        lab_equipment_category_id: [
          { required: true, type: 'number', message: '请输入数字', trigger: 'blur' }
        ],
        lab_brand_id: [
          { required: true, type: 'number', message: '请输入', trigger: 'change' }
        ],
        lab_equipment_model_id: [
          { required: true, type: 'number', message: '请输入', trigger: 'change' }
        ],
        lab_unit_id: [
          { required: true, type: 'number', message: '请输入', trigger: 'change' }
        ],
        lab_manufacturer_id: [
          { required: true, type: 'number', message: '请输入', trigger: 'change' }
        ],
        lab_supplier_id: [
          { required: true, type: 'number', message: '请输入', trigger: 'change' }
        ],
        country_code_id: [
          { required: true, type: 'number', message: '请输入', trigger: 'change' }
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
          { required: true, type: 'number', message: '请输入', trigger: 'change' }
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
          { required: true, type: 'number', message: '请输入', trigger: 'change' }
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
        english_name: null,
        lab_equipment_category_name: null,
        lab_equipment_category_id: null,
        lab_brand_id: null,
        brand_name: null,
        lab_equipment_model_id: null,
        equipment_model_name: null,
        lab_unit_id: null,
        lab_unit_name: null,
        lab_manufacturer_id: null,
        manufacturer_name: null,
        manufacturer_telephone: null,
        lab_supplier_id: null,
        supplier_name: null,
        supplier_telephone: null,

        quantity: null,
        unit_price: null,
        total_price: null,
        country_code_id: null,
        country_code_name: null,
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
      labEquipmentCategoryDialogVisible: false,
      brandDialogVisible: false,
      unitDialogVisible: false,
      supplierDialogVisible: false,
      manufacturerDialogVisible: false,
      countryCodeDialogVisible: false,
      equipmentModelDialogVisible: false,
      fieldDialogVisible: false,

      equCategoryList: [],
      unitList: [],
      brandList: [],
      equipmentModelList: [],
      manufacturerList: [],
      supplierList: [],
      fieldList: [],
      countryCodeList: [],
      statusList: []
    }
  },
  created() {
    this.getEquCategoryList()
    this.statusList = statusList
  },
  methods: {
    /** 提交表单信息 **/
    submitCreate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createEquipmentInfo(this.dataForm).then(res => {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.$router.go(-1)
          }).catch(err => {
            this.$message({
              message: '添加失败' + err,
              type: 'error'
            })
          })
        } else {
          this.$message({
            message: '添加失败！请注意输入内容',
            type: 'error'
          })
          console.log('error submit!!')
          return false
        }
      })
    },
    /** 返回上一页 **/
    handleReturn() {
      this.$router.go(-1)
    },
    /** 获取器材分类信息 **/
    async getEquCategoryList(keyword) {
      await fetchEquipmentCategoryInfos(keyword).then(res => {
        this.equCategoryList = res.data.list;
      }).catch(err => {
        alert('获取器材分类信息失败')
      })
    },
    /** 获取场地列表信息 **/
    async getFieldList(keyword) {
      console.log('调用获取场地列表信息接口')
      await fetchFieldInfos(keyword).then(res => {
        this.fieldList = res.data.list;
      }).catch(err => {
        alert('获取场地信息失败！' + err)
      })
    },
    /** 获取品牌列表信息 **/
    async getBrandList(keyword) {
      await fetchBrandInfos(keyword).then(res => {
        this.brandList = res.data.list;
      }).catch(err => {
        alert('获取品牌列表失败！' + err)
      })
    },
    /** 获取型号列表信息 **/
    async getEquipmentModelList(keyword) {
      await fetchModelInfos(keyword).then(res => {
        this.equipmentModelList = res.data.list;
      }).catch(err => {
        alert('获取型号列表失败！' + err)
      })
    },
    /** 获取计量单位列表信息 **/
    async getUnitList(keyword) {
      await fetchUnitPriceInfos(keyword).then(res => {
        this.unitList = res.data.list;
      }).catch(err => {
        alert('获取计量单位列表信息失败！' + err)
      })
    },
    /** 获取供货商列表信息 **/
    async getSupplierList(keyword) {
      await fetchSupplierInfos(keyword).then(res => {
        this.supplierList = res.data.list;
      }).catch(err => {
        alert('获取供货商列表信息失败！' + err)
      })
    },
    /** 获取生产商列表信息 **/
    async getManufacturerList(keyword) {
      await fetchManufacturerInfos(keyword).then(res => {
        this.manufacturerList = res.data.list;
      }).catch(err => {
        alert('获取生产商列表信息失败！' + err)
      })
    },
    /** 获取国码列表信息 **/
    async getCountryCodeList(keyword) {
      await fetchCountryCodeInfos(keyword).then(res => {
        this.countryCodeList = res.data.list;
      }).catch(err => {
        alert('获取生产商列表信息失败！' + err)
      })
    },

    /** 根据id获取器材类别信息 **/
    async fetchEquCategoryById(id) {
      await fetchEquipmentCategoryInfoById(id).then(res => {
        this.tempDataByID = {
          lab_equipment_category_id: res.data.item.id,
          lab_equipment_category_name: res.data.item.name
        }
      }).catch(err => {
        alert('获取器材类别信息失败')
        return null
      })
    },
    /** 根据id获取品牌信息 **/
    async fetchBrandById(id) {
      // 根据select id key查询出的数据 各字段经过包装
      await fetchBrandInfoById(id).then(res => {
        this.tempDataByID = {
          lab_brand_id: res.data.item.id,
          brand_name: res.data.item.name
        }
      }).catch(err => {
        alert('获取品牌信息信息内容失败！' + err)
        return null
      })
    },
    /** 根据id获取型号信息 **/
    async fetchEquipmentModelById(id) {
      await fetchModelInfoById(id).then(res => {
        this.tempDataByID = {
          lab_equipment_model_id: res.data.item.id,
          equipment_model_name: res.data.item.name
        }
      }).catch(err => {
        alert('获取型号信息内容失败！' + err)
        return null
      })
    },
    /** 根据id获取计量单位信息 **/
    async fetchUnitById(id) {
      // 根据select id key查询出的数据 各字段经过包装
      await fetchUnitPriceInfoById(id).then(res => {
        this.tempDataByID = {
          lab_unit_id: res.data.item.id,
          lab_unit_name: res.data.item.name
        };
      }).catch(err => {
        alert('获取计量单位信息内容失败！' + err)
        return null
      })
    },
    /** 根据id获取供货商信息 **/
    async fetchSupplierById(id) {
      // 根据select id key查询出的数据 各字段经过包装
      await fetchSupplierInfoById(id).then(res => {
        this.tempDataByID = {
          lab_supplier_id: res.data.item.id,
          supplier_name: res.data.item.name,
          supplier_telephone: res.data.item.telephone
        }
      }).catch(err => {
        alert('获取供货商信息内容失败！' + err)
        return null
      })
    },
    /** 根据id获取生产商信息 **/
    async fetchManufacturerById(id) {
      // 根据select id key查询出的数据 各字段经过包装
      await fetchManufacturerInfoById(id).then(res => {
        this.tempDataByID = {
          lab_manufacturer_id: res.data.item.id,
          manufacturer_name: res.data.item.name,
          manufacturer_telephone: res.data.item.telephone
        };
      }).catch(err => {
        alert('获取生产商信息内容失败！' + err)
        return null
      })
    },
    /** 根据id获取国码信息 **/
    async fetchCountryCodeById(id) {
      // 根据select id key查询出的数据 各字段经过包装
      await fetchCountryCodeInfoById(id).then(res => {
        this.tempDataByID = {
          country_code_id: res.data.item.id,
          country_code_name: res.data.item.name
        };
      }).catch(err => {
        alert('获取国码信息内容失败！' + err)
        return null
      })
    },
    /** 根据id获取场地信息 **/
    async fetchFieldById(id) {
      await fetchFieldInfoById(id).then(res => {
        this.tempDataByID = {
          field_id: res.data.item.id,
          field_name: res.data.item.name
        };
      }).catch(err => {
        alert('获取场地信息内容失败！' + err)
        return null
      })
    },
    /** 根据关键词打开dialog **/
    async handleOpenDialog(dialogVisible) {
      this[dialogVisible] = true // 打开对应的dialog
      const option = allListName.filter(m => m.dialogVisibleName === dialogVisible).map(m => m.option).pop()
      console.log('option===' + option)
      if (option) {
        await this[option](); // 生成默认radio数据
      } else {
        this.$message({
          message: 'dialog null error!',
          type: 'error'
        })
      }
    },
    /** 测试 根据关键字获取对应方法 并返回查询出的数据 **/
    async getMethodByKey(key, id) {
      let option = key2option.filter(m => m.key === key).map(m => m.option).pop()
      await this[option](id)
    },
    /** 抽取方法 将信息同步 **/
    async handleSelect(data) {
      // 查询 选择的id的相关的数据
      await this.getMethodByKey(data.methodKey, data.select_id_value)
      let tempData = this.tempDataByID
      this.tempDataByID = null
      getSelectValue(data, this.dataForm, tempData)
      this.$refs['dataForm'].validateField(data.select_id_key) // 表单数据验证规则
      this[data.dialogVisibleKey] = false // 关闭对话框
    },
    /** 查询 **/
    handleQuery(data) {
      let keyword = data.queryKeyword
      let listName = data.listName
      const option = allListName.filter(m => m.key === listName).map(m => m.option).pop()
      if (option) {
        this[option](keyword); // 根据option找出对应筛选方法
      } else {
        return false
      }
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
