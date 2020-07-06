<template>
  <div class="app-container">
    <!-- 功能按钮 -->
    <div class="detail-button">
      <el-button type="primary" size="medium" @click="handleReturn">返回</el-button>
      <el-button type="success" size="medium" @click="submitCreate('dataForm')">创建</el-button>
    </div>
    <!-- 详细信息展示 -->
    <div class="form-style">
      <h2>新增器材零部件信息</h2>
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
            <el-form-item label="零部件分类" label-width="100px" prop="lab_equipment_parts_category_id">
              <!-- 新版 -->
              <el-button type="info" plain style="width: 165px" @click="handleOpenDialog('labEquipmentPartsCategoryDialogVisible')">
                {{ dataForm.lab_equipment_parts_category_name === null ? '请选择' : dataForm.lab_equipment_parts_category_name }}
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
        </el-row>
      </el-form>
    </div>
    <!-- 器材分类dialog -->
    <dictionary-for-select
      title="器材零部件分类"
      listName="labEquipmentPartsCategoryList"
      idKey="lab_equipment_parts_category_id"
      methodKey="labEquipmentPartsCategory"
      dialogVisibleKey="labEquipmentPartsCategoryDialogVisible"
      :currentDialogVisible = "labEquipmentPartsCategoryDialogVisible"
      :currentList = "labEquipmentPartsCategoryList"
      :currentSelectedItem = "dataForm.lab_equipment_parts_category_id"
      @handleCancel="labEquipmentPartsCategoryDialogVisible = !labEquipmentPartsCategoryDialogVisible"
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
    { key: 'labEquipmentPartsCategoryList', dialogVisibleName: 'labEquipmentPartsCategoryDialogVisible', option: 'getLabEquipmentPartsCategoryList' },
    { key: 'brandList', dialogVisibleName: 'brandDialogVisible', option: 'getBrandList' },
    { key: 'equipmentModelList', dialogVisibleName: 'equipmentModelDialogVisible', option: 'getEquipmentModelList' },
    { key: 'unitList', dialogVisibleName: 'unitDialogVisible', option: 'getUnitList' },
    { key: 'manufacturerList', dialogVisibleName: 'manufacturerDialogVisible', option: 'getManufacturerList' },
    { key: 'supplierList', dialogVisibleName: 'supplierDialogVisible', option: 'getSupplierList' },
    { key: 'countryCodeList', dialogVisibleName: 'countryCodeDialogVisible', option: 'getCountryCodeList' },
    { key: 'fieldList', dialogVisibleName: 'fieldDialogVisible', option: 'getFieldList' }
  ]
  const key2option = [
    {key: 'labEquipmentPartsCategory', option: 'fetchEquPartsCategoryById'},
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
    name: 'components-information-create',
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
          number: null,
          name: null,
          english_name: null,
          lab_equipment_parts_category_name: null,
          lab_equipment_parts_category_id: null,
          lab_brand_id: null,
          brand_name: null,
          lab_model_id: null,
          model_name: null,
          lab_unit_id: null,
          lab_unit_name: null,
          lab_manufacturer_id: null,
          manufacturer_name: null,
          manufacturer_telephone: null,
          lab_supplier_id: null,
          supplier_name: null,
          supplier_telephone: null,
          country_code_name: null,
          field_id: null,
          field_name: null,
          production_date: null,
          purchase_date: null,
          warranty: null,
          specification: null,
          quantity: null,
          unit_price: null,
          total_price: null,
        },
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
          lab_equipment_parts_category_id: [
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
          specification: [
            { required: true, type: 'string', message: '请输入', trigger: 'blur' }
          ]
        },

        labEquipmentPartsCategoryDialogVisible: false,
        brandDialogVisible: false,
        unitDialogVisible: false,
        supplierDialogVisible: false,
        manufacturerDialogVisible: false,
        countryCodeDialogVisible: false,
        equipmentModelDialogVisible: false,
        fieldDialogVisible: false,

        labEquipmentPartsCategoryList: [],
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
      /* 获取器材零部件分类信息 */
      getLabEquipmentPartsCategoryList(keyword) {
        console.log('调用获取场地列表信息接口')
        if (!keyword) {
          this.labEquipmentPartsCategoryList = fakeList
          return false
        }
        // 调用接口
        // 暂用假数据 作为筛选， 实际通过后台进行筛选
        this.labEquipmentPartsCategoryList = fakeList.filter(m => m.pre_name === keyword).map(m => ({
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

      /* 获取器材零部件类别信息 id */
      fetchEquPartsCategoryById(id) {
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
      /* 提交数据 */
      submitCreate(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 调用接口
            this.$message({
              message: '添加成功!',
              type: 'success'
            })
            console.log('success submit!!')
            // this.$router.go(-1)
          } else {
            this.$message({
              message: '添加失败!请注意输入内容',
              type: 'error'
            })
            console.log('error submit!!')
            return false
          }
        })
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
