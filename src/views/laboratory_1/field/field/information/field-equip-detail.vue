<!--
    @Author: 刘梓伊
    @Description: 实验室的器材详情
    @Date: 2020-06-13 16:41
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
      <el-button type="primary" size="medium" @click="handleEquipSoftwareList">查看配置软件</el-button>
      <el-button type="primary" size="medium" @click="handleAttachment">查看入库附件</el-button>
    </div>
    <!-- 详细信息展示 -->
    <div class="form-style">
      <h2>器材详细信息</h2>
      <el-form ref="dataForm" :model="dataForm" :rules="rules" hide-required-asterisk>
        <el-row type="flex" class="row-bg" justify="space-around">
          <!-- 编号 -->
          <el-col :span="6">
            <el-form-item label="编号" label-width="100px" prop="number">
              <span v-show="isRead">{{ dataForm.number }}</span>
              <el-input v-show="!isRead" v-model="dataForm.number" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <!-- 中文名称 -->
          <el-col :span="6">
            <el-form-item label="中文名称" label-width="100px" prop="name">
              <span v-show="isRead">{{ dataForm.name }}</span>
              <el-input v-show="!isRead" v-model="dataForm.name" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <!-- 英文名称 -->
          <el-col :span="6">
            <el-form-item label="英文名称" label-width="100px" prop="english_name">
              <span v-show="isRead">{{ dataForm.english_name }}</span>
              <el-input v-show="!isRead" v-model="dataForm.english_name" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <!-- 器材分类 -->
          <el-col :span="6">
            <el-form-item label="器材分类" label-width="100px" prop="lab_equipment_category_id">
              <span v-show="isRead">{{ dataForm.lab_equipment_category_name }}</span>
              <el-button v-show="!isRead" type="info" plain style="width: 165px" @click="handleOpenDialog('labEquipmentCategoryDialogVisible')">
                {{ dataForm.lab_equipment_category_name === null ? '请选择' : dataForm.lab_equipment_category_name }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <!-- 型号 -->
          <el-col :span="6">
            <el-form-item label="型号" label-width="100px" prop="lab_equipment_model_id">
              <span v-show="isRead">{{ dataForm.equipment_model_name }}</span>
              <el-button v-show="!isRead" type="info" plain style="width: 165px" @click="handleOpenDialog('equipmentModelDialogVisible')">
                {{ dataForm.equipment_model_name === null ? '请选择' : dataForm.equipment_model_name }}
              </el-button>
            </el-form-item>
          </el-col>
          <!-- 单位 -->
          <el-col :span="6">
            <el-form-item label="单位" label-width="100px" prop="lab_unit_id">
              <span v-show="isRead">{{ dataForm.lab_unit_name }}</span>
              <el-button v-show="!isRead" type="info" plain style="width: 165px" @click="handleOpenDialog('unitDialogVisible')">
                {{ dataForm.lab_unit_name === null ? '请选择' : dataForm.lab_unit_name }}
              </el-button>
            </el-form-item>
          </el-col>
          <!-- 数量 -->
          <el-col :span="6">
            <el-form-item label="数量" label-width="100px" prop="quantity">
              <span v-show="isRead">{{ dataForm.quantity }}</span>
              <el-input v-show="!isRead" v-model="dataForm.quantity" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <!-- 单价 -->
          <el-col :span="6">
            <el-form-item label="单价" label-width="100px" prop="unit_price">
              <span v-show="isRead">{{ dataForm.unit_price }}</span>
              <el-input v-show="!isRead" v-model="dataForm.unit_price" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <!-- 生产商 -->
          <el-col :span="6">
            <el-form-item label="生产商" label-width="100px" prop="lab_manufacturer_id">
              <span v-show="isRead">{{ dataForm.manufacturer_name }}</span>
              <el-button v-show="!isRead" type="info" plain style="width: 165px" @click="handleOpenDialog('manufacturerDialogVisible')">
                {{ dataForm.manufacturer_name === null ? '请选择' : dataForm.manufacturer_name }}
              </el-button>
            </el-form-item>
          </el-col>
          <!-- 生产商电话 -->
          <el-col :span="6">
            <el-form-item label="生产商电话" label-width="100px">
              <span v-show="isRead">{{ dataForm.manufacturer_telephone }}</span>
              <el-input v-show="!isRead" v-model="dataForm.manufacturer_telephone" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <!-- 供货商 -->
          <el-col :span="6">
            <el-form-item label="供货商" label-width="100px" prop="lab_supplier_id">
              <span v-show="isRead">{{ dataForm.supplier_name }}</span>
              <el-button v-show="!isRead" type="info" plain style="width: 165px" @click="handleOpenDialog('supplierDialogVisible')">
                {{ dataForm.supplier_name === null ? '请选择' : dataForm.supplier_name }}
              </el-button>
            </el-form-item>
          </el-col>
          <!-- 供货商电话 -->
          <el-col :span="6">
            <el-form-item label="供货商电话" label-width="100px">
              <span v-show="isRead">{{ dataForm.supplier_telephone }}</span>
              <el-input v-show="!isRead" v-model="dataForm.supplier_telephone" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <!-- 总价 -->
          <el-col :span="6">
            <el-form-item label="总价" label-width="100px" prop="total_price">
              <span v-show="isRead">{{ dataForm.total_price }}</span>
              <el-input v-show="!isRead" v-model="dataForm.total_price" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <!-- 国码 -->
          <el-col :span="6">
            <el-form-item label="国码" label-width="100px" prop="country_code_id">
              <span v-show="isRead">{{ dataForm.country_code_name }}</span>
              <el-button v-show="!isRead" type="info" plain style="width: 165px" @click="handleOpenDialog('countryCodeDialogVisible')">
                {{ dataForm.country_code_name === null ? '请选择' : dataForm.country_code_name }}
              </el-button>
            </el-form-item>
          </el-col>
          <!-- 出产日期 -->
          <el-col :span="6">
            <el-form-item label="出产日期" label-width="100px" prop="production_date">
              <span v-show="isRead">{{ dataForm.production_date }}</span>
             <!-- <el-input v-show="isRead" v-model="dataForm.production_date" style="width: auto" :readonly="isRead" />-->
              <el-date-picker v-show="!isRead" v-model="dataForm.production_date" type="date" style="width: 165px" value-format="yyyy-MM-dd" clearable />
            </el-form-item>
          </el-col>
          <!-- 保修期 -->
          <el-col :span="6">
            <el-form-item label="保修期" label-width="100px" prop="warranty">
              <span v-show="isRead">{{ dataForm.warranty }}</span>
              <el-input v-show="!isRead" v-model="dataForm.warranty" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <!-- 单据号 -->
          <el-col :span="6">
            <el-form-item label="单据号" label-width="100px" prop="bills_number">
              <span v-show="isRead">{{ dataForm.bills_number }}</span>
              <el-input v-show="!isRead" v-model="dataForm.bills_number" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <!-- 购置日期 -->
          <el-col :span="6">
            <el-form-item label="购置日期" label-width="100px" prop="purchase_date">
              <span v-show="isRead">{{ dataForm.purchase_date }}</span>
              <!--<el-input v-show="isRead" v-model="dataForm.purchase_date" style="width: auto" :readonly="isRead" />-->
              <el-date-picker v-show="!isRead" v-model="dataForm.purchase_date" style="width: 165px" type="date" value-format="yyyy-MM-dd" clearable />
            </el-form-item>
          </el-col>
          <!-- 存放地点 -->
          <el-col :span="6">
            <el-form-item label="存放地点" label-width="100px" prop="field_id">
              <span v-show="isRead">{{ dataForm.field_name }}</span>
              <el-button v-show="!isRead" type="info" plain style="width: 165px" @click="handleOpenDialog('fieldDialogVisible')">
                {{ dataForm.field_name === null ? '请选择' : dataForm.field_name }}
              </el-button>
            </el-form-item>
          </el-col>
          <!-- 购买方式 -->
          <el-col :span="6">
            <el-form-item label="购买方式？" label-width="100px" prop="purchase_method">
              <span v-show="isRead">{{ dataForm.purchase_method }}</span>
              <el-input v-show="!isRead" v-model="dataForm.purchase_method" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <!-- 经费来源 -->
          <el-col :span="6">
            <el-form-item label="经费来源？" label-width="100px" prop="expenditure">
              <span v-show="isRead">{{ dataForm.expenditure }}</span>
              <el-input v-show="!isRead" v-model="dataForm.expenditure" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <!-- 状态 -->
          <el-col :span="6">
            <el-form-item label="状态" label-width="100px" prop="status_name">
              <span v-show="isRead">{{ dataForm.status_name }}</span>
              <!--<el-input v-show="isRead" v-model="dataForm.status_name" style="width: auto" :readonly="isRead" />-->
              <el-select v-show="!isRead" v-model="dataForm.status" style="width: 165px;" placeholder="状态">
                <!--获取数据库信息动态生成option-->
                <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 用途 -->
          <el-col :span="6">
            <el-form-item label="用途" label-width="100px" prop="usage">
              <span v-show="isRead">{{ dataForm.usage }}</span>
              <el-input v-show="!isRead" v-model="dataForm.usage" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <!-- 品牌 -->
          <el-col :span="6">
            <el-form-item label="品牌" label-width="100px" prop="brand_name">
              <span v-show="isRead">{{ dataForm.brand_name }}</span>
              <el-button v-show="!isRead" type="info" plain style="width: 165px" @click="handleOpenDialog('brandDialogVisible')">
                {{ dataForm.brand_name === null ? '请选择' : dataForm.brand_name }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- 附件 -->
          <el-col :span="6">
            <el-form-item label="附件URL" label-width="100px" prop="infoValidation">
              <span v-show="isRead">{{ dataForm.URL }}</span>
              <el-input v-show="!isRead" v-model="dataForm.URL" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="附件IP" label-width="100px" prop="infoValidation">
              <span v-show="isRead">{{ dataForm.IP }}</span>
              <el-input v-show="!isRead" v-model="dataForm.IP" style="width: auto" :readonly="isRead" />
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
    <div v-if="dataForm.id">
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
import { fetchEquipmentCategoryInfoById, fetchEquipmentCategoryInfos } from '@/api/laboratory_1/equipment-category'
import { deleteEquipmentById, fetchEquipmentInfoById, modifyEquipmentInfo } from '@/api/laboratory_1/equipment'
import { fetchFieldInfoById, fetchFieldInfos } from '@/api/laboratory_1/field'
import { fetchBrandInfoById, fetchBrandInfos } from '@/api/laboratory_1/brand'
import { fetchModelInfoById, fetchModelInfos } from '@/api/laboratory_1/model'
import { fetchUnitPriceInfoById, fetchUnitPriceInfos } from '@/api/laboratory_1/unit-price'
import { fetchSupplierInfoById, fetchSupplierInfos } from '@/api/laboratory_1/supplier'
import { fetchManufacturerInfoById, fetchManufacturerInfos } from '@/api/laboratory_1/manufacturer'
import { fetchCountryCodeInfoById, fetchCountryCodeInfos } from '@/api/laboratory_1/country-code'
export default {
  name: 'field-equip-detail',
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
      dataForm: {
        id: null,
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
      tempData: null,
      tempDataByID: null,
      // 校验规则
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
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        status_name: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        usage: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ]
      },
      isRead: true,
      isAble: false,
      showSaveBtn: false,

      labEquipmentCategoryDialogVisible: false,
      // 品牌radio组合
      brandDialogVisible: false,
      // 计量单位radio组合
      unitDialogVisible: false,
      // 供应商radio组合
      supplierDialogVisible: false,
      // 生产商radio组合
      manufacturerDialogVisible: false,
      // 国码radio组合
      countryCodeDialogVisible: false,
      // 型号radio组合
      equipmentModelDialogVisible: false,
      // 场地radio组合
      fieldDialogVisible: false,

      // 器材分类列表
      equCategoryList: [],
      // 计量单位列表
      unitList: [],
      // 品牌列表
      brandList: [],
      // 型号列表
      equipmentModelList: [],
      // 生产商列表
      manufacturerList: [],
      // 供应商列表
      supplierList: [],
      // 场地列表
      fieldList: [],
      // 国码列表
      countryCodeList: [],
      // 状态列表
      statusList: []
    }
  },
  created() {
    this.getOriginalData()
    this.getEquStatusList()
  },
  methods: {
    /* 根据ID获取数据 */
    async getOriginalData() {
      const id = this.$route.query.id
      console.log(id)
      await fetchEquipmentInfoById(id).then(res => {
        this.dataForm = res.data.item;
      }).catch(err => {
        alert('获取信息失败')
      })
    },
    /* 获取器材状态信息 */
    getEquStatusList() {
      this.statusList = statusList
      console.log('equ category list')
    },
    /* 获取器材分类信息 */
    async getEquCategoryList(keyword) {
      await fetchEquipmentCategoryInfos(keyword).then(res => {
        this.equCategoryList = res.data.list;
      }).catch(err => {
        alert('获取器材分类信息失败')
      })
    },
    /* 获取场地列表信息 */
    async getFieldList(keyword) {
      console.log('调用获取场地列表信息接口')
      await fetchFieldInfos(keyword).then(res => {
        this.fieldList = res.data.list;
      }).catch(err => {
        alert('获取场地信息失败！' + err)
      })
    },
    /* 获取品牌列表信息 */
    async getBrandList(keyword) {
      await fetchBrandInfos(keyword).then(res => {
        this.brandList = res.data.list;
      }).catch(err => {
        alert('获取品牌列表失败！' + err)
      })
    },
    /* 获取型号列表信息 */
    async getEquipmentModelList(keyword) {
      await fetchModelInfos(keyword).then(res => {
        this.equipmentModelList = res.data.list;
      }).catch(err => {
        alert('获取型号列表失败！' + err)
      })
    },
    /* 获取计量单位列表信息 */
    async getUnitList(keyword) {
      await fetchUnitPriceInfos(keyword).then(res => {
        this.unitList = res.data.list;
      }).catch(err => {
        alert('获取计量单位列表信息失败！' + err)
      })
    },
    /* 获取供货商列表信息 */
    async getSupplierList(keyword) {
      await fetchSupplierInfos(keyword).then(res => {
        this.supplierList = res.data.list;
      }).catch(err => {
        alert('获取供货商列表信息失败！' + err)
      })
    },
    /* 获取生产商列表信息 */
    async getManufacturerList(keyword) {
      await fetchManufacturerInfos(keyword).then(res => {
        this.manufacturerList = res.data.list;
      }).catch(err => {
        alert('获取生产商列表信息失败！' + err)
      })
    },
    /* 获取国码列表信息 */
    async getCountryCodeList(keyword) {
      await fetchCountryCodeInfos(keyword).then(res => {
        this.countryCodeList = res.data.list;
      }).catch(err => {
        alert('获取生产商列表信息失败！' + err)
      })
    },

    /* 根据id获取器材类别信息 */
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
    /* 根据id获取品牌信息 */
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
    /* 根据id获取型号信息 */
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
    /* 根据id获取计量单位信息 */
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
    /* 根据id获取供货商信息 */
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
    /* 根据id获取生产商信息 */
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
    /* 根据id获取国码信息 */
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
    /* 根据id获取场地信息 */
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
    /* 根据关键词打开dialog */
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
    /* 测试 根据关键字获取对应方法 并返回查询出的数据 */
    async getMethodByKey(key, id) {
      let option = key2option.filter(m => m.key === key).map(m => m.option).pop()
      await this[option](id)
    },
    /* 抽取方法 将信息同步 */
    async handleSelect(data) {
      // 查询 选择的id的相关的数据
      await this.getMethodByKey(data.methodKey, data.select_id_value)
      let tempData = this.tempDataByID
      this.tempDataByID = null
      getSelectValue(data, this.dataForm, tempData)
      this.$refs['dataForm'].validateField(data.select_id_key) // 表单数据验证规则
      this[data.dialogVisibleKey] = false // 关闭对话框
    },
    /* 查询 */
    handleQuery(data) {
      let keyword = data.queryKeyword
      let listName = data.listName
      const option = allListName.filter(m => m.key === listName).map(m => m.option).pop()
      if (option) {
        this[option](keyword); // 根据option找出对应筛选方法
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
      // 检验输入数据是否合法
      this.$refs[formName].validate((valid) => {
        if (valid) {
          modifyEquipmentInfo(this.dataForm).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.afterEdit()
          }).catch(err =>{
            this.$message({
              message: '修改失败' + err,
              type: 'error'
            })
          })
        } else {
          this.$message({
            message: '修改失败！请注意输入的内容',
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
    async handleDelete() {
      await deleteEquipmentById(this.dataForm.id).then(res => {
        return true
      }).catch(err => {
        return false
      })
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
    handleEquipSoftwareList(id) {
      this.$router.push({
        name: 'Equip_Software_List',
        query: {
          id: this.dataForm.id
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
