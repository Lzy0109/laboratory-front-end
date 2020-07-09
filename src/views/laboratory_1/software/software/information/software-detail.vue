<template>
  <div class="app-container">
    <!-- 功能按钮 -->
    <div class="detail-button">
      <el-button type="primary" size="medium" @click="handleReturn">返回</el-button>
      <el-button type="primary" :disabled="isAble" size="medium" @click="beforeEdit">编辑信息</el-button>
      <el-button type="danger" size="medium" @click="beforeHandleDelete">删除</el-button>
      <el-button type="success" size="medium" @click="handleDownload">导出信息</el-button>
      <el-button type="primary" size="medium" @click="handleAttachment">查看使用说明</el-button>
    </div>
    <!-- 详细信息展示 -->
    <div class="form-style">
      <h2>软件详细信息</h2>
      <el-form ref="dataForm" :model="dataForm" :rules="rules" hide-required-asterisk>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6">
            <el-form-item label="软件编号" label-width="100px" prop="number">
              <span v-show="isRead">{{ dataForm.number }}</span>
              <el-input v-show="!isRead" v-model="dataForm.number" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="软件名称" label-width="100px" prop="name">
              <span v-show="isRead">{{ dataForm.name }}</span>
              <el-input v-show="!isRead" v-model="dataForm.name" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="英文名称" label-width="100px" prop="english_name">
              <span v-show="isRead">{{ dataForm.english_name }}</span>
              <el-input v-show="!isRead" v-model="dataForm.english_name" style="width: auto" />
            </el-form-item>
          </el-col>
          <!-- 暂留 -->
          <!--<el-col :span="6">
            <el-form-item label="软件大小" label-width="100px" prop="infoValidation">
              <el-input v-show="!isRead" v-model="dataForm.size" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>-->
          <el-col :span="6">
            <el-form-item label="软件种类" label-width="100px" prop="lab_software_category_id">
              <span v-show="isRead">{{ dataForm.lab_software_category_name }}</span>
              <el-button v-show="!isRead" type="info" plain style="width: 165px" @click="handleOpenDialog('softwareCategoryDialogVisible')">
                {{ dataForm.lab_software_category_name === null ? '请选择' : dataForm.lab_software_category_name }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6">
            <el-form-item label="适用系统" label-width="100px" prop="applicable_system_id">
              <span v-show="isRead">{{ dataForm.applicable_system_name }}</span>
              <el-button v-show="!isRead" type="info" plain style="width: 165px;" @click="handleOpenDialog('applicableSystemDialogVisible')">
                {{ dataForm.applicable_system_name === null ? '请选择' : dataForm.applicable_system_name }}
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="软件版本号" label-width="100px" prop="version">
              <span v-show="isRead">{{ dataForm.version }}</span>
              <el-input v-show="!isRead" v-model="dataForm.version" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单价" label-width="100px" prop="price_name">
              <span v-show="isRead">{{ dataForm.price_name }}</span>
              <el-input v-show="!isRead" v-model="dataForm.price_name" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="计量单位" label-width="100px" prop="lab_unit_id">
              <span v-show="isRead">{{ dataForm.lab_unit_name }}</span>
              <el-button v-show="!isRead" type="info" plain style="width: 165px" @click="handleOpenDialog('unitDialogVisible')">
                {{ dataForm.lab_unit_name === null ? '请选择' : dataForm.lab_unit_name }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="6">
            <el-form-item label="生产商" label-width="100px" prop="lab_manufacturer_id">
              <span v-show="isRead">{{ dataForm.manufacturer_name }}</span>
              <el-button v-show="!isRead" type="info" plain style="width: 165px" @click="handleOpenDialog('manufacturerDialogVisible')">
                {{ dataForm.manufacturer_name === null ? '请选择' : dataForm.manufacturer_name }}
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="生厂商电话" label-width="100px">
              <span v-show="isRead">{{ dataForm.manufacturer_telephone }}</span>
              <el-input v-show="!isRead" v-model="dataForm.manufacturer_telephone" style="width: auto" readonly />
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
              <el-input v-show="!isRead" v-model="dataForm.supplier_telephone" style="width: auto" readonly />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
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
              <el-date-picker
                v-show="!isRead"
                v-model="dataForm.production_date"
                align="right"
                type="date"
                style="width: 165px"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions"
              />
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
// 假数据
const fakeData = {
  number: 'sw-1234',
  english_name: 'english-name',
  name: '软件名称',
  size: '软件大小（暂留）',
  lab_software_category_id: 1,
  lab_software_category_name: '分类1',
  applicable_system_id: 1,
  applicable_system_name: '适用系统',
  version: '软件版本号',
  price_id: 1,
  price_name: '单价',
  lab_brand_id: 1,
  brand_name: '品牌',
  lab_unit_id: 1,
  lab_unit_name: '计量单位',
  specification: '规格',

  country_code_id: 1,
  country_code_name: '国码',
  production_date: '2020-07-03',

  lab_manufacturer_id: 1,
  manufacturer_name: '生厂商',
  manufacturer_telephone: '生厂商电话',
  lab_supplier_id: 1,
  supplier_name: '供货商',
  supplier_telephone: '供货商电话',
  course_id: 1,
  course_name: '适用课程'
}
// 下拉框信息测试
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
  { key: 'softwareCategoryList', dialogVisibleName: 'softwareCategoryDialogVisible', option: 'getSoftwareCategoryList' },
  { key: 'courseList', dialogVisibleName: 'courseDialogVisible', option: 'getCourseList' },
  { key: 'unitList', dialogVisibleName: 'unitDialogVisible', option: 'getUnitList' },
  { key: 'brandList', dialogVisibleName: 'brandDialogVisible', option: 'getBrandList' },
  { key: 'manufacturerList', dialogVisibleName: 'manufacturerDialogVisible', option: 'getManufacturerList' },
  { key: 'supplierList', dialogVisibleName: 'supplierDialogVisible', option: 'getSupplierList' },
  { key: 'applicableSystemList', dialogVisibleName: 'applicableSystemDialogVisible', option: 'getApplicableSystemList' },
  { key: 'countryCodeList', dialogVisibleName: 'countryCodeDialogVisible', option: 'getCountryCodeList' }
]
const key2option = [
  {key: 'softwareCategory', option: 'fetchSoftwareCategoryById'},
  {key: 'applicableSystem', option: 'fetchApplicableSystemById'},
  {key: 'brand', option: 'fetchBrandById'},
  {key: 'unit', option: 'fetchUnitById'},
  {key: 'manufacturer', option: 'fetchManufacturerById'},
  {key: 'supplier', option: 'fetchSupplierById'},
  {key: 'countryCode', option: 'fetchCountryCodeById'}
]

import {
  createSoftwareInfo, deleteSoftwareInfoById,
  fetchSoftwareCategoryInfoById,
  fetchSoftwareCategoryInfos,
  fetchSoftwareInfoById
} from '@/api/software'
import { getSelectValue } from '@/utils/get-select-value'
import { isChinese, isEnglish } from '@/utils/fieldValidate'
import DictionaryForSelect from '@/components/DictionaryForSelect'

export default {
  name: 'SoftwareDetail',
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
          { required: true, type: 'string', message: '请选择日期', trigger: 'change' }
        ]
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      isRead: true,
      isAble: false,
      showSaveBtn: false,

      // 各种列表
      softwareCategoryList: [],
      unitList: [],
      brandList: [],
      manufacturerList: [],
      supplierList: [],
      applicableSystemList: [],
      countryCodeList: [],
      // 对话框
      queryKeyword: null,
      softwareCategoryDialogVisible: false,
      applicableSystemDialogVisible: false,
      brandDialogVisible: false,
      unitDialogVisible: false,
      supplierDialogVisible: false,
      manufacturerDialogVisible: false,
      countryCodeDialogVisible: false
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
      // 调用接口获取软件详细信息
      fetchSoftwareInfoById(id)
        .then(res => {
          this.dataForm = res.data.item;
        }).catch(err => {
          alert('获取内容失败！' + err)
      })
    },
    /* 返回上一页 */
    handleReturn() {
      this.$router.go(-1)
    },
    /* 获取软件分类列表信息 */
    getSoftwareCategoryList(keyword) {
      console.log('调用获取软件分类列表信息接口')
      if (!keyword) {
        this.softwareCategoryList = fakeList
        return false
      }
      // 调用接口
      // 暂用假数据 作为筛选， 实际通过后台进行筛选
      this.softwareCategoryList = fakeList.filter(m => m.pre_name === keyword).map(m => ({
        id: m.id,
        pre_name: m.pre_name,
        name: m.name
      }))
      // 实际 keyword可为空
      // fetchSoftwareCategoryInfos(keyword)
      //   .then(res => {
      //     this.softwareCategoryList = res.data.list;
      //   })
      //   .catch(err => {
      //    alert('获取内容失败！' + err)
      // })
    },
    /* 获取适用系统列表信息 */
    getApplicableSystemList(keyword) {
      if (!keyword) {
        this.applicableSystemList = fakeList
        return false
      }
      // 调用接口
      // 暂用假数据 作为筛选， 实际通过后台进行筛选
      this.applicableSystemList = fakeList.filter(m => m.pre_name === keyword).map(m => ({
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

    /* 获取软件分类信息 id */
    fetchSoftwareCategoryById(id) {
      // 实际使用
      // fetchSoftwareCategoryInfoById(id).then(res => {
      //   return res.data.item
      // }).catch(err => {
      //   alert('获取内容失败！' + err)
      //   return null
      // })
      return null
      // return {
      //  lab_software_category_name: '??'
      // }
    },
    /* 获取适用系统信息 id */
    fetchApplicableSystemById(id) {
      // 根据select id key查询出的数据 各字段经过包装
      return null
      // return {
      //   applicable_system_name: '测试name',
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
    /* 利用字典1 根据关键词打开dialog */
    handleOpenDialog(dialogVisible) {
      this[dialogVisible] = true // 打开对应的dialog
      this.queryKeyword = null // 将查询值设为空
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
    /* 利用字典2 根据关键字获取对应方法 并返回查询出的数据 */
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
    /* 筛选操作 */
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
      console.log(this.dataForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createSoftwareInfo(this.dataForm).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            // 根据返回信息重新复制dataForm
            console.log('success submit!!')
            // 修改成功后操作
            this.afterEdit()
          }).catch(err => {
            alert('出错！')
          })
        } else {
          this.$message({
            message: '修改内容存在错误，请修改后再保存，或者点击取消按钮取消操作',
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
        console.log('已取消退出')
      })
    },
    /* 删除 */
    handleDelete() {
      if (this.dataForm.id) {
        deleteSoftwareInfoById(this.dataForm.id).then(res => {
          return true
        }).catch(err => {
          return false
        })
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
    },
    /* 跳转到使用说明 */
    handleAttachment() {

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
