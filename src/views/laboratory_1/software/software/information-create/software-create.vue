<!--
    @Author 李国烨
    @Date 2020/6/28 22:58
    @Description:
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
      <h2>新建软件</h2>
      <el-form ref="dataForm" :model="dataForm" :rules="rules" hide-required-asterisk>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6">
            <el-form-item label="软件编号" label-width="100px" prop="number">
              <el-input v-model="dataForm.number" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="软件名称" label-width="100px" prop="name">
              <el-input v-model="dataForm.name" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="英文名称" label-width="100px" prop="english_name">
              <el-input v-model="dataForm.english_name" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="软件种类" label-width="100px" prop="lab_software_category_id">
              <el-button type="info" plain style="width: 165px" @click="handleOpenDialog('softwareCategoryDialogVisible')">
                {{ dataForm.lab_software_category_name === null ? '请选择' : dataForm.lab_software_category_name }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6">
            <el-form-item label="适用系统" label-width="100px" prop="applicable_system_id">
              <el-button type="info" plain style="width: 165px;" @click="handleOpenDialog('applicableSystemDialogVisible')">
                {{ dataForm.applicable_system_name === null ? '请选择' : dataForm.applicable_system_name }}
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="软件版本号" label-width="100px" prop="version">
              <el-input v-model="dataForm.version" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单价" label-width="100px" prop="price_name">
              <el-input v-model="dataForm.price_name" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="计量单位" label-width="100px" prop="lab_unit_id">
              <el-button type="info" plain style="width: 165px" @click="handleOpenDialog('unitDialogVisible')">
                {{ dataForm.lab_unit_name === null ? '请选择' : dataForm.lab_unit_name }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="6">
            <el-form-item label="生产商" label-width="100px" prop="lab_manufacturer_id">
              <el-button type="info" plain style="width: 165px" @click="handleOpenDialog('manufacturerDialogVisible')">
                {{ dataForm.manufacturer_name === null ? '请选择' : dataForm.manufacturer_name }}
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="生厂商电话" label-width="100px">
              <el-input v-model="dataForm.manufacturer_telephone" style="width: auto" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="供货商" label-width="100px" prop="lab_supplier_id">
              <!--<el-input v-model="dataForm.supplier_name" style="width: auto" />-->
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
        <el-row type="flex" class="row-bg">
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
            <el-form-item label="国码" label-width="100px" prop="country_code_id">
              <el-button type="info" plain style="width: 165px" @click="handleOpenDialog('countryCodeDialogVisible')">
                {{ dataForm.country_code_name === null ? '请选择' : dataForm.country_code_name }}
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="出产日期" label-width="100px" prop="production_date">
              <el-date-picker
                v-model="dataForm.production_date"
                type="date"
                style="width: 165px"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 软件种类dialog -->
    <dictionary-for-select
      title="软件种类"
      listName="softwareCategoryList"
      idKey="lab_software_category_id"
      methodKey="softwareCategory"
      dialogVisibleKey="softwareCategoryDialogVisible"
      :currentDialogVisible = "softwareCategoryDialogVisible"
      :currentList = "softwareCategoryList"
      :currentSelectedItem = "dataForm.lab_software_category_id"
      @handleCancel="softwareCategoryDialogVisible = !softwareCategoryDialogVisible"
      @handleQuery="handleQuery"
      @handleSelect="handleSelect"
    >
    </dictionary-for-select>
    <!-- 适用系统dialog -->
    <dictionary-for-select
      title="适用系统"
      listName="applicableSystemList"
      idKey="applicable_system_id"
      methodKey="applicableSystem"
      dialogVisibleKey="applicableSystemDialogVisible"
      :currentDialogVisible = "applicableSystemDialogVisible"
      :currentList = "applicableSystemList"
      :currentSelectedItem = "dataForm.applicable_system_id"
      @handleCancel="applicableSystemDialogVisible = !applicableSystemDialogVisible"
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
  </div>
</template>

<script>

// 字典1
const allListName = [
  { key: 'softwareCategoryList', dialogVisibleName: 'softwareCategoryDialogVisible', option: 'getSoftwareCategoryList' },
  { key: 'courseList', dialogVisibleName: 'courseDialogVisible', option: 'getCourseList' },
  { key: 'unitList', dialogVisibleName: 'unitDialogVisible', option: 'getUnitList' },
  { key: 'brandList', dialogVisibleName: 'brandDialogVisible', option: 'getBrandList' },
  { key: 'manufacturerList', dialogVisibleName: 'manufacturerDialogVisible', option: 'getManufacturerList' },
  { key: 'supplierList', dialogVisibleName: 'supplierDialogVisible', option: 'getSupplierList' },
  { key: 'applicableSystemList', dialogVisibleName: 'applicableSystemDialogVisible', option: 'getApplicableSystemList' },
  { key: 'countryCodeList', dialogVisibleName: 'countryCodeDialogVisible', option: 'getCountryCodeList' }
]
// 字典2
const key2option = [
  {key: 'softwareCategory', option: 'fetchSoftwareCategoryById'},
  {key: 'applicableSystem', option: 'fetchApplicableSystemById'},
  {key: 'brand', option: 'fetchBrandById'},
  {key: 'unit', option: 'fetchUnitById'},
  {key: 'manufacturer', option: 'fetchManufacturerById'},
  {key: 'supplier', option: 'fetchSupplierById'},
  {key: 'countryCode', option: 'fetchCountryCodeById'}
]

import { getSelectValue } from '@/utils/get-select-value'
import { isChinese, isEnglish } from '@/utils/fieldValidate'
import DictionaryForSelect from '@/components/DictionaryForSelect'
import { createSoftwareInfo } from '@/api/laboratory_1/software'
import { fetchApplicableSystemInfoById, fetchApplicableSystemInfos } from '@/api/laboratory_1/applicable-system'
import { fetchBrandInfoById, fetchBrandInfos } from '@/api/laboratory_1/brand'
import { fetchUnitPriceInfoById, fetchUnitPriceInfos } from '@/api/laboratory_1/unit-price'
import { fetchSupplierInfoById, fetchSupplierInfos } from '@/api/laboratory_1/supplier'
import { fetchManufacturerInfoById, fetchManufacturerInfos } from '@/api/laboratory_1/manufacturer'
import { fetchCountryCodeInfoById, fetchCountryCodeInfos } from '@/api/laboratory_1/country-code'
import { fetchSoftwareCategoryInfoById, fetchSoftwareCategoryInfos } from '@/api/laboratory_1/software-category'

export default {
  name: 'SoftwareCreate',
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
      // 验证规则
      rules: {
        number: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        name: [
          { required: true, trigger: 'blur', validator: validateIsChinese }
        ],
        english_name: [
          { required: true, message: '请输入', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validateIsEnglish }
        ],
        size: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        lab_software_category_id: [
          { required: true, type: 'number', message: '请输入', trigger: 'change' }
        ],
        applicable_system_id: [
          { required: true, type: 'number', message: '请输入', trigger: 'change' }
        ],
        version: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        price_name: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        lab_brand_id: [
          { required: true, type: 'number', message: '请输入', trigger: 'change' }
        ],
        lab_unit_id: [
          { required: true, type: 'number', message: '请输入', trigger: 'change' }
        ],
        specification: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
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
        production_date: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]
      },
      // 日期选择范围
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      tempDataByID: null,
      dataForm: {
        number: null,
        name: null,
        english_name: null,
        size: null,
        lab_software_category_id: null,
        lab_software_category_name: null,
        applicable_system_id: null,
        applicable_system_name: null,
        version: null,
        price_id: null,
        price_name: null,
        lab_brand_id: null,
        brand_name: null,
        lab_unit_id: null,
        lab_unit_name: null,
        specification: null,
        country_code_id: null,
        country_code_name: null,
        production_date: null,

        lab_manufacturer_id: null,
        manufacturer_name: null,
        manufacturer_telephone: null,
        lab_supplier_id: null,
        supplier_name: null,
        supplier_telephone: null
        // course_id: null,
        // course_name: null
      },
      // 各种列表
      softwareCategoryList: [],
      courseList: [],
      unitList: [],
      brandList: [],
      manufacturerList: [],
      supplierList: [],
      applicableSystemList: [],
      countryCodeList: [],
      // 对话框
      softwareCategoryDialogVisible: false,
      applicableSystemDialogVisible: false,
      brandDialogVisible: false,
      unitDialogVisible: false,
      supplierDialogVisible: false,
      manufacturerDialogVisible: false,
      countryCodeDialogVisible: false,
      courseDialogVisible: false
    }
  },
  created() {

  },
  methods: {
    submitCreate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createSoftwareInfo(this.dataForm).then(res => {
            this.$message({
              message: '添加成功!',
              type: 'success'
            })
          }).catch(err => {
            this.$message({
              message: '添加失败!',
              type: 'error'
            })
          })
        } else {
          this.$message({
            message: '添加失败!请注意输入内容',
            type: 'error'
          })
          return false
        }
      })
    },
    /* 返回上一页 */
    handleReturn() {
      this.$router.go(-1)
    },
    /**
     * @method：getSoftwareCategoryList
     * @desc：获取软件分类列表信息
     * @params: keyword 查询条件，可为null
     * @create date： 2020/6/28
     * @update date： 2020/7/13
     * @author：李国烨
     */
    async getSoftwareCategoryList(keyword) {
      console.log('调用获取软件分类列表信息接口')
      // 实际 keyword可为空
      await fetchSoftwareCategoryInfos(keyword)
        .then(res => {
          this.softwareCategoryList = res.data.list;
        }).catch(err => {
          alert('获取用获取软件分类列表失败！' + err)
        })
    },
    /**
     * @method：getApplicableSystemList
     * @desc：获取适用系统列表信息
     * @params: keyword 查询条件，可为null
     * @create date： 2020/6/28
     * @update date： 2020/7/13
     * @author：李国烨
     */
    async getApplicableSystemList(keyword) {
      await fetchApplicableSystemInfos(keyword)
        .then(res => {
          this.applicableSystemList = res.data.list;
        }).catch(err => {
          alert('获取适用系统列表失败！' + err)
        })
    },
    /**
     * @method：getBrandList
     * @desc：获取品牌列表信息
     * @params: keyword 查询条件，可为null
     * @create date： 2020/6/28
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
     * @method：getUnitList
     * @desc：获取计量单位列表信息
     * @params: keyword 查询条件，可为null
     * @create date： 2020/6/28
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
     * @create date： 2020/6/28
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
     * @create date： 2020/6/28
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
     * @create date： 2020/6/28
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
     * @method：fetchSoftwareCategoryById
     * @desc：根据ID获取软件分类信息
     * @params: id
     * @create date： 2020/6/28
     * @update date： 2020/7/13
     * @author：李国烨
     */
    async fetchSoftwareCategoryById(id) {
      // 实际使用
      console.log('调用获取软件分类信息接口')
      await fetchSoftwareCategoryInfoById(id)
        .then(res => {
          this.tempDataByID = {
            lab_software_category_id: res.data.item.id,
            lab_software_category_name: res.data.item.name
          }
        })
        .catch(err => {
          alert('获取软件分类信息内容失败！' + err)
          return null
        })
    },
    /**
     * @method：fetchApplicableSystemById
     * @desc：根据ID获取适用系统信息
     * @params: id
     * @create date： 2020/6/28
     * @update date： 2020/7/13
     * @author：李国烨
     */
    async fetchApplicableSystemById(id) {
      // 根据select id key查询出的数据 各字段经过包装
      await fetchApplicableSystemInfoById(id).then(res => {
        this.tempDataByID = {
          applicable_system_id: res.data.item.id,
          applicable_system_name: res.data.item.name
        };
      }).catch(err => {
        alert('获取适用系统信息内容失败！' + err)
        return null
      })
    },
    /**
     * @method：fetchBrandById
     * @desc：获根据ID取品牌信息
     * @params: id
     * @create date： 2020/6/28
     * @update date： 2020/7/13
     * @author：李国烨
     */
    async fetchBrandById(id) {
      // 根据select id key查询出的数据 各字段经过包装
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
     * @method：fetchUnitById
     * @desc：根据ID获取计量单位信息
     * @params: id
     * @create date： 2020/6/28
     * @update date： 2020/7/13
     * @author：李国烨
     */
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
    /**
     * @method：fetchSupplierById
     * @desc：根据ID获取供货商信息
     * @params: id
     * @create date： 2020/6/28
     * @update date： 2020/7/13
     * @author：李国烨
     */
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
    /**
     * @method：fetchManufacturerById
     * @desc：根据ID获取生产商信息
     * @params: id
     * @create date： 2020/6/28
     * @update date： 2020/7/13
     * @author：李国烨
     */
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
    /**
     * @method：fetchCountryCodeById
     * @desc：根据ID获取国码信息
     * @params: id
     * @create date： 2020/6/28
     * @update date： 2020/7/13
     * @author：李国烨
     */
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
    /**
     * @method：handleOpenDialog
     * @desc：利用字典1 根据关键词打开dialog
     * @params: dialogVisible
     * @create date： 2020/6/28
     * @update date： 2020/7/13
     * @author：李国烨
     */
    async handleOpenDialog(dialogVisible) {
      this[dialogVisible] = true // 打开对应的dialog
      // 生成默认radio数据
      const option = allListName.filter(m => m.dialogVisibleName === dialogVisible).map(m => m.option).pop()
      console.log('option===' + option)
      if (option) {
        await this[option]()
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
     * @create date： 2020/6/28
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
     * @create date： 2020/6/28
     * @update date： 2020/7/13
     * @author：李国烨
     */
    async handleSelect(data) {
      // 查询 选择的id的相关的数据
      await this.getMethodByKey(data.methodKey, data.select_id_value)
      let tempData = this.tempDataByID
      this.tempDataByID = null
      // console.log('tempData=')
      // console.log({ ...tempData })
      getSelectValue(data, this.dataForm, tempData)
      // 表单数据验证规则
      this.$refs['dataForm'].validateField(data.select_id_key)
      // 关闭对话框
      // console.log('data.dialogVisibleKey = ' + data.dialogVisibleKey)
      this[data.dialogVisibleKey] = false
    },
    /**
     * @method：handleQuery
     * @desc：筛选radio
     * @params: data：自定义组件传的数据
     * @create date： 2020/6/28
     * @update date： 2020/7/13
     * @author：李国烨
     */
    handleQuery(data) {
      // console.log('data=>' + data.listName + ',' + data.queryKeyword)
      let keyword = data.queryKeyword
      let listName = data.listName
      const option = allListName.filter(m => m.key === listName).map(m => m.option).pop()
      // console.log('option=' + option)
      // console.log('keyword=', keyword)
      // 根据option找出对应筛选方法
      if (option) {
        this[option](keyword)
      } else {
        return false
      }
    },
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
  .my-dialog-title{
    font-size: 20px;
    font-weight: 700;
    margin-right: 50px;
  }
</style>
