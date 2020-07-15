<!--
    @Author 李国烨
    @Date 2020/6/21 14:50
    @Description: 耗材信息创建页面
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
      <h2>新建耗材信息</h2>
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
            <el-form-item label="耗材分类" label-width="100px" prop="lab_consumable_category_id">
              <!-- 新版 -->
              <el-button type="info" plain style="width: 165px" @click="handleOpenDialog('consumableCategoryDialogVisible')">
                {{ dataForm.lab_consumable_category_name === null ? '请选择' : dataForm.lab_consumable_category_name }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6">
            <el-form-item label="型号" label-width="100px" prop="lab_model_id">
              <el-button type="info" plain style="width: 165px" @click="handleOpenDialog('equipmentModelDialogVisible')">
                {{ dataForm.model_name === null ? '请选择' : dataForm.model_name }}
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
              <el-input v-model.number="dataForm.unit_price" style="width: auto" />
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
              <el-input v-model.number="dataForm.total_price" style="width: auto" />
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
        <el-row>
          <el-col :span="6">
            <el-form-item label="经费来源？" label-width="100px" prop="expenditure">
              <el-input v-model="dataForm.expenditure" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="品牌" label-width="100px" prop="lab_brand_id">
              <el-button type="info" plain style="width: 165px" @click="handleOpenDialog('brandDialogVisible')">
                {{ dataForm.brand_name === null ? '请选择' : dataForm.brand_name }}
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="规格" label-width="100px" prop="specification">
              <el-input v-model="dataForm.specification" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="专用器材" label-width="100px" prop="specialized">
              <el-radio-group v-model="dataForm.specialized">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 耗材分类dialog -->
    <dictionary-for-select
      title="耗材分类"
      listName="consumableCategoryList"
      idKey="lab_consumable_category_id"
      methodKey="consumableCategory"
      dialogVisibleKey="consumableCategoryDialogVisible"
      :currentDialogVisible = "consumableCategoryDialogVisible"
      :currentList = "consumableCategoryList"
      :currentSelectedItem = "dataForm.consumableCategoryDialogVisible"
      @handleCancel="consumableCategoryDialogVisible = !consumableCategoryDialogVisible"
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
      idKey="lab_model_id"
      methodKey="equipmentModel"
      dialogVisibleKey="equipmentModelDialogVisible"
      :currentDialogVisible = "equipmentModelDialogVisible"
      :currentList = "equipmentModelList"
      :currentSelectedItem = "dataForm.lab_model_id"
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
// 字典1
import { createConsumableInfo } from '@/api/laboratory_1/consumable'

const allListName = [
  { key: 'consumableCategoryList', dialogVisibleName: 'consumableCategoryDialogVisible', option: 'getConsumableCategoryList' },
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
  {key: 'consumableCategory', option: 'fetchConsumableCategoryById'},
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
  fetchConsumableCategoryInfoById,
  fetchConsumableCategoryInfos
} from '../../../../api/laboratory_1/consumable-category'
import { fetchFieldInfoById, fetchFieldInfos } from '../../../../api/laboratory_1/field'
import { fetchBrandInfoById, fetchBrandInfos } from '../../../../api/laboratory_1/brand'
import { fetchCountryCodeInfoById, fetchCountryCodeInfos } from '../../../../api/laboratory_1/country-code'
import { fetchManufacturerInfoById, fetchManufacturerInfos } from '../../../../api/laboratory_1/manufacturer'
import { fetchSupplierInfoById, fetchSupplierInfos } from '../../../../api/laboratory_1/supplier'
import { fetchUnitPriceInfoById, fetchUnitPriceInfos } from '../../../../api/laboratory_1/unit-price'
import { fetchModelInfoById, fetchModelInfos } from '../../../../api/laboratory_1/model'

export default {
  name: 'ConsumableCreate',
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
        lab_consumable_category_id: [
          { required: true, type: 'number', message: '请输入数字', trigger: 'blur' }
        ],
        lab_brand_id: [
          { required: true, type: 'number', message: '请输入', trigger: 'change' }
        ],
        lab_model_id: [
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
          { required: true, type: 'number', message: '请输入', trigger: 'blur' }
        ],
        total_price: [
          { required: true, type: 'number', message: '请输入', trigger: 'blur' }
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
        specification: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        specialized: [
          { required: true, type: 'boolean', message: '请输入', trigger: 'change' }
        ]
      },
      tempDataByID: null,
      dataForm: {
        number: null,
        name: null,
        english_name: null,
        lab_consumable_category_id: null,
        lab_consumable_category_name: null,
        lab_brand_id: null,
        brand_name: null,
        lab_model_id: null,
        model_name: null,
        lab_unit_id: null,
        lab_unit_name: null,
        specification: null,
        specialized: null,
        lab_manufacturer_id: null,
        manufacturer_name: null,
        manufacturer_telephone: null,
        lab_supplier_id: null,
        supplier_name: null,
        supplier_telephone: null,
        bills_number: null,
        purchase_date: null,
        field_id: null,
        field_name: null,
        expenditure: null,
        purchase_method: null,
        warranty: null,

        quantity: null,
        unit_price: null,
        total_price: null,
        country_code_id: null,
        country_code_name: null,
        production_date: null,
      },
      consumableCategoryDialogVisible: false,
      brandDialogVisible: false,
      unitDialogVisible: false,
      supplierDialogVisible: false,
      manufacturerDialogVisible: false,
      countryCodeDialogVisible: false,
      equipmentModelDialogVisible: false,
      fieldDialogVisible: false,

      consumableCategoryList: [],
      unitList: [],
      brandList: [],
      equipmentModelList: [],
      manufacturerList: [],
      supplierList: [],
      fieldList: [],
      countryCodeList: []
    }
  },
  created() {

  },
  methods: {
    /**
      * @method：submitCreate
      * @desc：调用接口提交表单信息
      * @params: formName表单名称
      * @create date： 2020/6/21
      * @update date： 2020/7/13
      * @author：李国烨
     */
    submitCreate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createConsumableInfo(this.dataForm).then(res => {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.$router.go(-1)
          }).catch(err => {
            this.$message({
              message: '添加失败',
              type: 'error'
            })
          })
        } else {
          this.$message({
            message: '添加失败！请注意输入的内容',
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
    /**
     * @method：getConsumableCategoryList
     * @desc： 获取耗材种类列表信息
     * @params:
     * @create date： 2020/6/21
     * @update date： 2020/7/13
     * @author：李国烨
     */
    async getConsumableCategoryList(keyword) {
      await fetchConsumableCategoryInfos(keyword).then(res => {
        this.consumableCategoryList = res.data.list;
      }).catch(err => {
        alert('获取耗材种类信息失败！' + err)
      })
    },
    /**
     * @method：getFieldList
     * @desc：获取场地列表信息
     * @params:
     * @create date： 2020/6/21
     * @update date： 2020/7/13
     * @author：李国烨
     */
    async getFieldList(keyword) {
      console.log('调用获取场地列表信息接口')
      await fetchFieldInfos(keyword).then(res => {
        this.fieldList = res.data.list;
      }).catch(err => {
        alert('获取场地信息失败！' + err)
      })
    },
    /**
     * @method：getBrandList
     * @desc：获取品牌列表信息
     * @params: keyword 查询条件，可为null
     * @create date： 2020/6/21
     * @update date： 2020/7/13
     * @author：李国烨
     */
    async getBrandList(keyword) {
      await fetchBrandInfos(keyword).then(res => {
        this.brandList = res.data.list;
      }).catch(err => {
        alert('获取品牌列表失败！' + err)
      })
    },
    /**
     * @method：getEquipmentModelList
     * @desc：获取型号列表信息
     * @params:
     * @create date： 2020/6/21
     * @update date： 2020/7/13
     * @author：李国烨
     */
    async getEquipmentModelList(keyword) {
      await fetchModelInfos(keyword).then(res => {
        this.equipmentModelList = res.data.list;
      }).catch(err => {
        alert('获取型号列表失败！' + err)
      })
    },
    /**
     * @method：getUnitList
     * @desc：获取计量单位列表信息
     * @params: keyword 查询条件，可为null
     * * @create date： 2020/6/21
     * @update date： 2020/7/13
     * @author：李国烨
     */
    async getUnitList(keyword) {
      await fetchUnitPriceInfos(keyword).then(res => {
        this.unitList = res.data.list;
      }).catch(err => {
        alert('获取计量单位列表信息失败！' + err)
      })
    },
    /**
     * @method：getSupplierList
     * @desc：获取供货商列表信息
     * @params: keyword 查询条件，可为null
     * @create date： 2020/6/21
     * @update date： 2020/7/13
     * @author：李国烨
     */
    async getSupplierList(keyword) {
      await fetchSupplierInfos(keyword).then(res => {
        this.supplierList = res.data.list;
      }).catch(err => {
        alert('获取供货商列表信息失败！' + err)
      })
    },
    /**
     * @method：getManufacturerList
     * @desc：获取生产商列表信息
     * @params: keyword 查询条件，可为null
     * * @create date： 2020/6/21
     * @update date： 2020/7/13
     * @author：李国烨
     */
    async getManufacturerList(keyword) {
      await fetchManufacturerInfos(keyword).then(res => {
        this.manufacturerList = res.data.list;
      }).catch(err => {
        alert('获取生产商列表信息失败！' + err)
      })
    },
    /**
     * @method：getCountryCodeList
     * @desc：获取国码列表信息
     * @params: keyword 查询条件，可为null
     * * @create date： 2020/6/21
     * @update date： 2020/7/13
     * @author：李国烨
     */
    async getCountryCodeList(keyword) {
      await fetchCountryCodeInfos(keyword).then(res => {
        this.countryCodeList = res.data.list;
      }).catch(err => {
        alert('获取生产商列表信息失败！' + err)
      })
    },

    /**
     * @method：fetchConsumableCategoryById
     * @desc：根据ID获获取耗材种类信息
     * @params: id
     * @create date： 2020/6/21
     * @update date： 2020/7/13
     * @author：李国烨
     */
    async fetchConsumableCategoryById(id) {
      await fetchConsumableCategoryInfoById(id).then(res => {
        this.tempDataByID = {
          lab_consumable_category_id: res.data.item.id,
          lab_consumable_category_name: res.data.item.name
        }
      }).catch(err => {
        alert('取耗材种类信息内容失败！' + err)
        return null
      })
    },
    /**
     * @method：fetchBrandById
     * @desc：获根据ID取品牌信息
     * @params: id
     * @create date： 2020/6/21
     * @update date： 2020/7/13
     * @author：李国烨
     */
    async fetchBrandById(id) {
      await fetchBrandInfoById(id).then(res => {
        this.tempDataByID = {
          lab_brand_id: res.data.item.id,
          brand_name: res.data.item.name
        };
      }).catch(err => {
        alert('获取品牌信息信息内容失败！' + err)
        return null
      })
    },
    /**
     * @method：fetchEquipmentModelById
     * @desc：根据ID获取型号信息
     * @params:
     * @create date： 2020/6/21
     * @update date： 2020/7/13
     * @author：李国烨
     */
    async fetchEquipmentModelById(id) {
      await fetchModelInfoById(id).then(res => {
        this.tempDataByID = {
          lab_model_id: res.data.item.id,
          equipment_model_name: res.data.item.name
        }
      }).catch(err => {
        alert('获取型号信息内容失败！' + err)
        return null
      })
    },
    /**
     * @method：fetchUnitById
     * @desc：根据ID获取计量单位信息
     * @params: id
     * * @create date： 2020/6/21
     * @update date： 2020/7/13
     * @author：李国烨
     */
    async fetchUnitById(id) {
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
    /**
     * @method：fetchSupplierById
     * @desc：根据ID获取供货商信息
     * @params: id
     * * @create date： 2020/6/21
     * @update date： 2020/7/13
     * @author：李国烨
     */
    async fetchSupplierById(id) {
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
    /**
     * @method：fetchManufacturerById
     * @desc：根据ID获取生产商信息
     * @params: id
     * * @create date： 2020/6/21
     * @update date： 2020/7/13
     * @author：李国烨
     */
    async fetchManufacturerById(id) {
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
    /**
     * @method：fetchCountryCodeById
     * @desc：根据ID获取国码信息
     * @params: id
     * * @create date： 2020/6/21
     * @update date： 2020/7/13
     * @author：李国烨
     */
    async fetchCountryCodeById(id) {

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
    /**
     * @method：fetchFieldById
     * @desc：根据ID获取场地信息
     * @params:
     * @create date： 2020/6/21
     * @update date： 2020/7/13
     * @author：李国烨
     */
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
    /**
     * @method：handleOpenDialog
     * @desc：利用字典1 根据关键词打开dialog
     * @params: dialogVisible
     * @create date： 2020/6/21
     * @update date： 2020/7/13
     * @author：李国烨
     */
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
    /**
     * @method：getMethodByKey
     * @desc：利用字典2 根据关键字获取对应方法 并返回查询出的数据
     * @params: key：找出方法对关键字，id：被找出方法需要要参数值
     * @create date： 2020/6/21
     * @update date： 2020/7/13
     * @author：李国烨
     */
    async getMethodByKey(key, id) {
      let option = key2option.filter(m => m.key === key).map(m => m.option).pop()
      await this[option](id)
    },
    /**
     * @method：handleSelect
     * @desc：抽取方法 将信息同步
     * @params:
     * * @create date： 2020/6/21
     * @update date： 2020/7/13
     * @author：李国烨
     */
    async handleSelect(data) {
      // 查询 选择的id的相关的数据
      await this.getMethodByKey(data.methodKey, data.select_id_value)
      let tempData = this.tempDataByID
      this.tempDataByID = null
      getSelectValue(data, this.dataForm, tempData)
      this.$refs['dataForm'].validateField(data.select_id_key) // 表单数据验证规则
      this[data.dialogVisibleKey] = false // 关闭对话框
    },
    /**
     * @method：handleQuery
     * @desc：筛选radio
     * @params: data：自定义组件传的数据
     * * @create date： 2020/6/21
     * @update date： 2020/7/13
     * @author：李国烨
     */
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
