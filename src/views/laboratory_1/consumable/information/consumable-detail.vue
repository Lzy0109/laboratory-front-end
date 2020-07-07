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
      <h2>耗材详细信息</h2>
      <el-form ref="dataForm" :model="dataForm" :rules="rules" hide-required-asterisk>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6">
            <el-form-item label="编号" label-width="100px" prop="number">
              <span v-show="isRead">{{ dataForm.number }}</span>
              <el-input v-show="!isRead" v-model="dataForm.number" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="中文名称" label-width="100px" prop="name">
              <span v-show="isRead">{{ dataForm.name }}</span>
              <el-input v-show="!isRead" v-model="dataForm.name" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="英文名称" label-width="100px" prop="english_name">
              <span v-show="isRead">{{ dataForm.english_name }}</span>
              <el-input v-show="!isRead" v-model="dataForm.english_name" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="耗材分类" label-width="100px" prop="lab_consumable_category_id">
              <!-- 新版 -->
              <span v-show="isRead">{{ dataForm.lab_consumable_category_name }}</span>
              <el-button v-show="!isRead" type="info" plain style="width: 165px" @click="handleOpenDialog('consumableCategoryDialogVisible')">
                {{ dataForm.lab_consumable_category_name === null ? '请选择' : dataForm.lab_consumable_category_name }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6">
            <el-form-item label="型号" label-width="100px" prop="lab_model_id">
              <span v-show="isRead">{{ dataForm.model_name }}</span>
              <el-button v-show="!isRead" type="info" plain style="width: 165px" @click="handleOpenDialog('equipmentModelDialogVisible')">
                {{ dataForm.model_name === null ? '请选择' : dataForm.model_name }}
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单位" label-width="100px" prop="lab_unit_id">
              <span v-show="isRead">{{ dataForm.lab_unit_name }}</span>
              <el-button v-show="!isRead" type="info" plain style="width: 165px" @click="handleOpenDialog('unitDialogVisible')">
                {{ dataForm.lab_unit_name === null ? '请选择' : dataForm.lab_unit_name }}
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="数量" label-width="100px" prop="quantity">
              <span v-show="isRead">{{ dataForm.quantity }}</span>
              <el-input v-show="!isRead" v-model="dataForm.quantity" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单价" label-width="100px" prop="unit_price">
              <span v-show="isRead">{{ dataForm.unit_price }}</span>
              <el-input v-show="!isRead" v-model.number="dataForm.unit_price" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6">
            <el-form-item label="生产商" label-width="100px" prop="lab_manufacturer_id">
              <span v-show="isRead">{{ dataForm.manufacturer_name }}</span>
              <el-button v-show="!isRead" type="info" plain style="width: 165px" @click="handleOpenDialog('manufacturerDialogVisible')">
                {{ dataForm.manufacturer_name === null ? '请选择' : dataForm.manufacturer_name }}
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="生产商电话" label-width="100px">
              <span v-show="isRead">{{ dataForm.manufacturer_telephone }}</span>
              <el-input v-show="!isRead" v-model="dataForm.manufacturer_telephone" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="供货商" label-width="100px" prop="lab_supplier_id">
              <span v-show="isRead">{{ dataForm.supplier_name }}</span>
              <el-button v-show="!isRead" type="info" plain style="width: 165px" @click="handleOpenDialog('supplierDialogVisible')">
                {{ dataForm.supplier_name === null ? '请选择' : dataForm.supplier_name }}
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="供货商电话" label-width="100px">
              <span v-show="isRead">{{ dataForm.supplier_telephone }}</span>
              <el-input v-show="!isRead" v-model="dataForm.supplier_telephone" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6">
            <el-form-item label="总价" label-width="100px" prop="total_price">
              <span v-show="isRead">{{ dataForm.total_price }}</span>
              <el-input v-show="!isRead" v-model.number="dataForm.total_price" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="国码" label-width="100px" prop="country_code_id">
              <span v-show="isRead">{{ dataForm.country_code_name }}</span>
              <el-button v-show="!isRead" type="info" plain style="width: 165px" @click="handleOpenDialog('countryCodeDialogVisible')">
                {{ dataForm.country_code_name === null ? '请选择' : dataForm.country_code_name }}
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="出产日期" label-width="100px" prop="production_date">
              <span v-show="isRead">{{ dataForm.production_date }}</span>
              <!-- <el-input v-show="isRead" v-model="dataForm.production_date" style="width: auto" :readonly="isRead" />-->
              <el-date-picker v-show="!isRead" v-model="dataForm.production_date" type="date" style="width: 165px" value-format="yyyy-MM-dd" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="保修期" label-width="100px" prop="warranty">
              <span v-show="isRead">{{ dataForm.warranty }}</span>
              <el-input v-show="!isRead" v-model="dataForm.warranty" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6">
            <el-form-item label="单据号" label-width="100px" prop="bills_number">
              <span v-show="isRead">{{ dataForm.bills_number }}</span>
              <el-input v-show="!isRead" v-model="dataForm.bills_number" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="购置日期" label-width="100px" prop="purchase_date">
              <span v-show="isRead">{{ dataForm.purchase_date }}</span>
              <!--<el-input v-show="isRead" v-model="dataForm.purchase_date" style="width: auto" :readonly="isRead" />-->
              <el-date-picker v-show="!isRead" v-model="dataForm.purchase_date" style="width: 165px" type="date" value-format="yyyy-MM-dd" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="存放地点" label-width="100px" prop="field_id">
              <span v-show="isRead">{{ dataForm.field_name }}</span>
              <el-button v-show="!isRead" type="info" plain style="width: 165px" @click="handleOpenDialog('fieldDialogVisible')">
                {{ dataForm.field_name === null ? '请选择' : dataForm.field_name }}
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="购买方式？" label-width="100px" prop="purchase_method">
              <span v-show="isRead">{{ dataForm.purchase_method }}</span>
              <el-input v-show="!isRead" v-model="dataForm.purchase_method" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="经费来源？" label-width="100px" prop="expenditure">
              <span v-show="isRead">{{ dataForm.expenditure }}</span>
              <el-input v-show="!isRead" v-model="dataForm.expenditure" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="品牌" label-width="100px" prop="lab_brand_id">
              <span v-show="isRead">{{ dataForm.brand_name }}</span>
              <el-button v-show="!isRead" type="info" plain style="width: 165px" @click="handleOpenDialog('brandDialogVisible')">
                {{ dataForm.brand_name === null ? '请选择' : dataForm.brand_name }}
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="规格" label-width="100px" prop="specification">
              <span v-show="isRead">{{ dataForm.specification }}</span>
              <el-input v-show="!isRead" v-model="dataForm.specification" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="专用器材" label-width="100px" prop="specialized">
              <span v-show="isRead">{{ dataForm.specialized ? '是':'否' }}</span>
              <el-radio-group v-show="!isRead" v-model="dataForm.specialized">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-collapse-transition>
        <div v-show="showSaveBtn" style="text-align: center">
          <el-button type="success" size="medium" @click="submitEdit('dataForm')">保存</el-button>
          <el-button type="primary" size="medium" @click="beforeCancelEdit('dataForm')">取消</el-button>
        </div>
      </el-collapse-transition>
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
// 假数据
const fakeData = {
    id: 1,
    number: '耗材编号',
    name: '耗材名称',
    english_name: 'english-name',
    lab_consumable_category_id: 1,
    lab_consumable_category_name: '耗材种类',
    lab_brand_id: 1,
    brand_name: '品牌',
    lab_model_id: 1,
    model_name: '型号',
    lab_unit_id: 1,
    lab_unit_name: '单位111',
    specification: '规格',
    specialized: true,
    lab_manufacturer_id: 1,
    manufacturer_name: '生产商111',
    manufacturer_telephone: '12345678911',
    lab_supplier_id: 1,
    supplier_name: '供货商111',
    supplier_telephone: '12345678922',


    // 适用器材（applicative_equipment）

    bills_number: '单据号',
    purchase_date: '2016-01-01',
    field_id: 1,
    field_name: '存放场所',
    expenditure: '经费来源',
    purchase_method: '购买方式',
    warranty: '保修期',

    quantity: '数量',
    unit_price: '单价',
    total_price: '总价',
    country_code_id: 1,
    country_code_name: '国码',
    production_date: '2020-07-01',
  }
const fakeList = [
  { id: 1, pre_name: 'c1', name: 'radio内容1', phone: '13512341234' },
  { id: 2, pre_name: 'c1', name: 'radio内容2', phone: '16812341234' },
  { id: 3, pre_name: 'c1', name: 'radio内容3', phone: '13812341234' },
  { id: 4, pre_name: 'c1', name: 'radio内容4', phone: '13812341234' },
  { id: 5, pre_name: 'c1', name: 'radio内容5', phone: '13812341234' },
  { id: 6, pre_name: 'c1', name: 'radio内容6', phone: '13812341234' },
  { id: 7, pre_name: 'c1', name: 'radio内容7', phone: '13812341234' },
  { id: 8, pre_name: 'c1', name: 'radio内容8', phone: '13812341234' },
  { id: 9, pre_name: 'c1', name: 'radio内容9', phone: '13812341234' },
  { id: 10, pre_name: 'c1', name: 'radio内容10', phone: '13812341234' },
  { id: 11, pre_name: 'c1', name: 'radio内容11', phone: '13812341234' },
  { id: 12, pre_name: 'c2', name: 'radio内容12', phone: '13812341234' },
  { id: 13, pre_name: 'c2', name: 'radio内容13', phone: '13812341234' },
  { id: 14, pre_name: 'c2', name: 'radio内容14', phone: '13812341234' },
  { id: 15, pre_name: 'c2', name: 'radio内容15', phone: '13812341234' },
  { id: 16, pre_name: 'c2', name: 'radio内容16', phone: '13812341234' },
  { id: 17, pre_name: 'c3', name: 'radio内容17', phone: '13812341234' },
  { id: 18, pre_name: 'c3', name: 'radio内容18', phone: '13812341234' },
  { id: 19, pre_name: 'c3', name: 'radio内容19', phone: '13812341234' },
  { id: 20, pre_name: 'c3', name: 'radio内容20', phone: '13812341234' },
  { id: 21, pre_name: 'c3', name: 'radio内容21', phone: '13812341234' },
  { id: 22, pre_name: 'c3', name: 'radio内容22', phone: '13812341234' }
]

// 字典
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
export default {
  name: 'ConsumableDetail',
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
      dataForm: null,
      tempData: null,
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
      isRead: true,
      isAble: false,
      showSaveBtn: false,

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
    /* 获取耗材种类列表信息 */
    getConsumableCategoryList(keyword) {
      console.log('调用获取耗材种类列表信息接口')
      if (!keyword) {
        this.consumableCategoryList = fakeList
        return false
      }
      // 调用接口
      // 暂用假数据 作为筛选， 实际通过后台进行筛选
      this.consumableCategoryList = fakeList.filter(m => m.pre_name === keyword).map(m => ({
        id: m.id,
        pre_name: m.pre_name,
        name: m.name
      }))
    },
    /* 获取场地列表信息 */
    getFieldList(keyword) {
      console.log('调用获取场地列表信息接口')
      if (!keyword) {
        this.fieldList = fakeList
        return false
      }
      // 调用接口
      // 暂用假数据 作为筛选， 实际通过后台进行筛选
      this.fieldList = fakeList.filter(m => m.pre_name === keyword).map(m => ({
        id: m.id,
        pre_name: m.pre_name,
        name: m.name
      }))
    },
    /* 获取品牌列表信息 */
    getBrandList(keyword) {
      if (!keyword) {
        this.brandList = fakeList
        return false
      }
      // 调用接口
      // 暂用假数据 作为筛选， 实际通过后台进行筛选
      this.brandList = fakeList.filter(m => m.pre_name === keyword).map(m => ({
        id: m.id,
        pre_name: m.pre_name,
        name: m.name
      }))
    },
    /* 获取型号列表信息 */
    getEquipmentModelList(keyword) {
      if (!keyword) {
        this.equipmentModelList = fakeList
        return false
      }
      // 调用接口
      // 暂用假数据 作为筛选， 实际通过后台进行筛选
      this.equipmentModelList = fakeList.filter(m => m.pre_name === keyword).map(m => ({
        id: m.id,
        pre_name: m.pre_name,
        name: m.name
      }))
    },
    /* 获取计量单位列表信息 */
    getUnitList(keyword) {
      if (!keyword) {
        this.unitList = fakeList
        return false
      }
      // 调用接口
      // 暂用假数据 作为筛选， 实际通过后台进行筛选
      this.unitList = fakeList.filter(m => m.pre_name === keyword).map(m => ({
        id: m.id,
        pre_name: m.pre_name,
        name: m.name
      }))
    },
    /* 获取供货商列表信息 */
    getSupplierList(keyword) {
      if (!keyword) {
        this.supplierList = fakeList
        return false
      }
      // 调用接口
      // 暂用假数据 作为筛选， 实际通过后台进行筛选
      this.supplierList = fakeList.filter(m => m.pre_name === keyword).map(m => ({
        id: m.id,
        pre_name: m.pre_name,
        name: m.name
      }))
    },
    /* 获取生产商列表信息 */
    getManufacturerList(keyword) {
      if (!keyword) {
        this.manufacturerList = fakeList
        return false
      }
      // 调用接口
      // 暂用假数据 作为筛选， 实际通过后台进行筛选
      this.manufacturerList = fakeList.filter(m => m.pre_name === keyword).map(m => ({
        id: m.id,
        pre_name: m.pre_name,
        name: m.name
      }))
    },
    /* 获取国码列表信息 */
    getCountryCodeList(keyword) {
      if (!keyword) {
        console.log('keyword is null')
        this.countryCodeList = fakeList
        console.log('this.countryCodeList = ' + this.countryCodeList)
        return false
      }
      // 调用接口
      // 暂用假数据 作为筛选， 实际通过调用接口，在后台进行模糊筛选再返回数据
      console.log('keyword is not null')
      this.countryCodeList = fakeList.filter(m => m.pre_name === keyword).map(m => ({
        id: m.id,
        pre_name: m.pre_name,
        name: m.name
      }))
      console.log('this.courseList = ' + this.countryCodeList)
    },

    /* 获取耗材种类信息 id */
    fetchConsumableCategoryById(id) {
      // 根据select id key查询出的数据 各字段经过包装
      return null
      // return {
      // }
    },
    /* 获取品牌信息 id */
    fetchBrandById(id) {
      // 根据select id key查询出的数据 各字段经过包装
      return null
      // return {
      //   brand_name: '测试name',
      // }
    },
    /* 获取型号信息 id */
    fetchEquipmentModelById(id) {
      // 根据select id key查询出的数据 各字段经过包装
      return null
      // return {
      // }
    },
    /* 获取计量单位信息 id */
    fetchUnitById(id) {
      // 根据select id key查询出的数据 各字段经过包装
      // if (找不到)
      return null
      // return {
      //   lab_unit_name: '测试name',
      // }
    },
    /* 获取供货商信息 id */
    fetchSupplierById(id) {
      // 根据select id key查询出的数据 各字段经过包装
      // if (找不到)
      return null
      // return {
      //   supplier_name: '测试name',
      //   supplier_telephone: '13532142121'
      // }
    },
    /* 获取生产商信息 id */
    fetchManufacturerById(id) {
      // 根据select id key查询出的数据 各字段经过包装
      // if (找不到)
      // return null
      return {
        manufacturer_name: '测试name',
        manufacturer_telephone: '13532142121'
      }
    },
    /* 获取国码信息 id */
    fetchCountryCodeById(id) {
      // 根据select id key查询出的数据 各字段经过包装
      // if (找不到)
      //  return null
      return {
        country_code_name: '国码咯'
      }
    },
    /* 获取场地信息 id */
    fetchFieldById(id) {
      return {
        field_name: '场地1名称'
      }
    },
    /* 根据关键词打开dialog */
    handleOpenDialog(dialogVisible) {
      this[dialogVisible] = true // 打开对应的dialog
      // 生成默认radio数据
      const option = allListName.filter(m => m.dialogVisibleName === dialogVisible).map(m => m.option).pop()
      console.log('option===' + option)
      if (option) {
        this[option]()
      } else {
        this.$message({
          message: 'dialog null error!',
          type: 'error'
        })
      }
    },
    /* 测试 根据关键字获取对应方法 并返回查询出的数据 */
    getMethodByKey(key, id) {
      let option = key2option.filter(m => m.key === key).map(m => m.option).pop()
      return this[option](id)
    },
    /* 抽取方法 将信息同步 */
    handleSelect(data) {
      // 查询选择的id相关的数据
      let tempData = this.getMethodByKey(data.methodKey, data.select_id_value)
      getSelectValue(data, this.dataForm, tempData)
      // 表单数据验证规则
      this.$refs['dataForm'].validateField(data.select_id_key)
      // 关闭对话框
      console.log('data.dialogVisibleKey = ' + data.dialogVisibleKey)
      this[data.dialogVisibleKey] = false
    },
    /* 筛选数据 */
    handleQuery(data) {
      console.log('data=>' + data.listName + ',' + data.queryKeyword)
      let keyword = data.queryKeyword
      let listName = data.listName
      const option = allListName.filter(m => m.key === listName).map(m => m.option).pop()
      console.log('option=' + option)
      console.log('keyword=' + keyword)
      if (option) {
        this[option](keyword)
      } else {
        return false
      }
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
    /* 提交编辑的内容 */
    submitEdit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          // 修改后操作
          this.afterEdit()
          // 根据返回信息重新复制dataForm
          console.log('success submit!!')
        } else {
          this.$message({
            message: '修改失败',
            type: 'error'
          })
          console.log('error submit!!')
          return false
        }
      })
    },
    /* 取消编辑操作 */
    cancelEdit(formName) {
      this.dataForm = { ...this.tempData }
      this.$refs[formName].clearValidate()
      this.afterEdit()
    },
    /* 取消 确认弹窗 */
    beforeCancelEdit(formName) {
      this.$confirm('修改信息还没保存, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.cancelEdit(formName)
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
