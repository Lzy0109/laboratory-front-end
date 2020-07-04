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
            <el-form-item label="软件种类" label-width="100px" prop="lab_software_category_name">
              <el-button type="info" plain style="width: 165px" @click="handleOpenDialog('softwareCategoryDialogVisible')">
                {{ dataForm.lab_software_category_id === null ? '请选择' : dataForm.lab_software_category_name }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6">
            <el-form-item label="适用系统" label-width="100px" prop="applicable_system_name">
              <el-button type="info" plain style="width: 165px;" @click="handleOpenDialog('applicableSystemDialogVisible')">
                {{ dataForm.applicable_system_id === null ? '请选择' : dataForm.applicable_system_name }}
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
            <el-form-item label="计量单位" label-width="100px" prop="lab_unit_name">
              <el-button type="info" plain style="width: 165px" @click="handleOpenDialog('unitDialogVisible')">
                {{ dataForm.lab_unit_id === null ? '请选择' : dataForm.lab_unit_name }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="6">
            <el-form-item label="生产商" label-width="100px" prop="manufacturer_name">
              <el-button type="info" plain style="width: 165px" @click="handleOpenDialog('manufacturerDialogVisible')">
                {{ dataForm.lab_manufacturer_id === null ? '请选择' : dataForm.manufacturer_name }}
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="生厂商电话" label-width="100px">
              <el-input v-model="dataForm.manufacturer_telephone" style="width: auto" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="供货商" label-width="100px" prop="supplier_name">
              <!--<el-input v-model="dataForm.supplier_name" style="width: auto" />-->
              <el-button type="info" plain style="width: 165px" @click="handleOpenDialog('supplierDialogVisible')">
                {{ dataForm.lab_supplier_id === null ? '请选择' : dataForm.supplier_name }}
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
            <el-form-item label="品牌" label-width="100px" prop="brand_name">
              <el-button type="info" plain style="width: 165px" @click="handleOpenDialog('brandDialogVisible')">
                {{ dataForm.lab_brand_id === null ? '请选择' : dataForm.brand_name }}
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="规格" label-width="100px" prop="specification">
              <el-input v-model="dataForm.specification" style="width: auto" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="国码" label-width="100px" prop="country_code_name">
              <el-button type="info" plain style="width: 165px" @click="handleOpenDialog('countryCodeDialogVisible')">
                {{ dataForm.country_code_name === null ? '请选择' : dataForm.country_code_name }}
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="出产日期" label-width="100px" prop="production_date">
              <el-date-picker
                v-model="dataForm.production_date"
                align="right"
                type="date"
                style="width: 165px"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              />
            </el-form-item>
          </el-col>
          <!--<el-col :span="6">
            <el-form-item label="适用课程" label-width="100px" prop="course_name">
              &lt;!&ndash;<el-input v-model="dataForm.course_name" style="width: auto;" readonly />&ndash;&gt;
              <el-button type="info" plain style="width: 165px" @click="handleOpenDialog('courseDialogVisible')">
                {{ dataForm.course_id === null ? '请选择' : dataForm.course_name }}
              </el-button>
            </el-form-item>
          </el-col>-->
        </el-row>
      </el-form>
    </div>
    <!-- 软件种类dialog -->
    <el-dialog
      :visible.sync="softwareCategoryDialogVisible"
      width="90%"
    >
      <!-- 标题 + 搜索框 -->
      <div slot="title">
        <span class="my-dialog-title">软件种类筛选</span>
        <el-input v-model="queryKeyword" placeholder="输入关键字进行筛选" style="width: 230px;" clearable />
        <el-button type="primary" size="medium" @click="handleQuery(queryKeyword, 'softwareCategoryList')">筛选</el-button>
      </div>
      <el-alert
        v-show="softwareCategoryList.length === 0"
        title="查无数据"
        type="info"
        center
        style="width: 100%;margin-top: 5px"
        :closable="false"
      />
      <div style="margin:0 49px 0 49px;display: block">
        <el-radio-group v-model="dataForm.lab_software_category_id">
          <el-radio v-for="item in softwareCategoryList" :key="item.id" :label="item.id" border size="medium" style="margin: 10px 20px; width: 15%">{{ item.name }}</el-radio>
        </el-radio-group>
      </div>
      <div style="text-align: center; margin-top: 20px">
        <el-button type="primary" size="medium" @click="softwareCategoryDialogVisible = false">返 回</el-button>
        <el-button type="primary" size="medium" @click="handleSelect(dataForm.lab_software_category_id,'lab_software_category_name', '',softwareCategoryList, 'softwareCategoryDialogVisible')">选 中</el-button>
      </div>
    </el-dialog>
    <!-- 适用系统dialog -->
    <el-dialog
      :visible.sync="applicableSystemDialogVisible"
      width="90%"
    >
      <!-- 标题 + 搜索框 -->
      <div slot="title">
        <span class="my-dialog-title">适用系统筛选</span>
        <el-input v-model="queryKeyword" placeholder="输入关键字进行筛选" style="width: 230px;" clearable />
        <el-button type="primary" size="medium" @click="handleQuery(queryKeyword, 'applicableSystemList')">筛选</el-button>
      </div>
      <el-alert
        v-show="applicableSystemList.length === 0"
        title="查无数据"
        type="info"
        center
        style="width: 100%;margin-top: 5px"
        :closable="false"
      />
      <div style="margin:0 49px 0 49px;display: block">
        <el-radio-group v-model="dataForm.applicable_system_id">
          <el-radio v-for="item in applicableSystemList" :key="item.id" :label="item.id" border size="medium" style="margin: 10px 20px; width: 15%">{{ item.name }}</el-radio>
        </el-radio-group>
      </div>
      <div style="text-align: center; margin-top: 20px">
        <el-button type="primary" size="medium" @click="applicableSystemDialogVisible = false">返 回</el-button>
        <el-button type="primary" size="medium" @click="handleSelect(dataForm.applicable_system_id,'applicable_system_name', '',applicableSystemList, 'applicableSystemDialogVisible')">选 中</el-button>
      </div>
    </el-dialog>
    <!-- 品牌dialog -->
    <el-dialog
      :visible.sync="brandDialogVisible"
      width="90%"
    >
      <!-- 标题 + 搜索框 -->
      <div slot="title">
        <span class="my-dialog-title">品牌筛选</span>
        <el-input v-model="queryKeyword" placeholder="输入关键字进行筛选" style="width: 230px;" clearable />
        <el-button type="primary" size="medium" @click="handleQuery(queryKeyword, 'brandList')">筛选</el-button>
      </div>
      <el-alert
        v-show="brandList.length === 0"
        title="查无数据"
        type="info"
        center
        style="width: 100%;margin-top: 5px"
        :closable="false"
      />
      <div style="margin:0 49px 0 49px;display: block">
        <el-radio-group v-model="dataForm.lab_brand_id">
          <el-radio v-for="item in brandList" :key="item.id" :label="item.id" border size="medium" style="margin: 10px 20px; width: 15%">{{ item.name }}</el-radio>
        </el-radio-group>
      </div>
      <div style="text-align: center; margin-top: 20px">
        <el-button type="primary" size="medium" @click="brandDialogVisible = false">返 回</el-button>
        <el-button type="primary" size="medium" @click="handleSelect(dataForm.lab_brand_id,'brand_name', '',brandList, 'brandDialogVisible')">选 中</el-button>
      </div>
    </el-dialog>
    <!-- 计量单位dialog -->
    <el-dialog
      :visible.sync="unitDialogVisible"
      width="90%"
    >
      <!-- 标题 + 搜索框 -->
      <div slot="title">
        <span class="my-dialog-title">计量单位筛选</span>
        <el-input v-model="queryKeyword" placeholder="输入关键字进行筛选" style="width: 230px;" clearable />
        <el-button type="primary" size="medium" @click="handleQuery(queryKeyword, 'unitList')">筛选</el-button>
      </div>
      <el-alert
        v-show="unitList.length === 0"
        title="查无数据"
        type="info"
        center
        style="width: 100%;margin-top: 5px"
        :closable="false"
      />
      <div style="margin:0 49px 0 49px;display: block">
        <el-radio-group v-model="dataForm.lab_unit_id">
          <el-radio v-for="item in unitList" :key="item.id" :label="item.id" border size="medium" style="margin: 10px 20px; width: 15%">{{ item.name }}</el-radio>
        </el-radio-group>
      </div>
      <div style="text-align: center; margin-top: 20px">
        <el-button type="primary" size="medium" @click="unitDialogVisible = false">返 回</el-button>
        <el-button type="primary" size="medium" @click="handleSelect(dataForm.lab_unit_id,'lab_unit_name', '', unitList, 'unitDialogVisible')">选 中</el-button>
      </div>
    </el-dialog>
    <!-- 生产商dialog -->
    <el-dialog
      :visible.sync="manufacturerDialogVisible"
      width="90%"
    >
      <!-- 标题 + 搜索框 -->
      <div slot="title">
        <span class="my-dialog-title">生产商筛选</span>
        <el-input v-model="queryKeyword" placeholder="输入关键字进行筛选" style="width: 230px;" clearable />
        <el-button type="primary" size="medium" @click="handleQuery(queryKeyword, 'manufacturerList')">筛选</el-button>
      </div>
      <el-alert
        v-show="manufacturerList.length === 0"
        title="查无数据"
        type="info"
        center
        style="width: 100%;margin-top: 5px"
        :closable="false"
      />
      <div style="margin:0 49px 0 49px;display: block">
        <el-radio-group v-model="dataForm.lab_manufacturer_id">
          <el-radio v-for="item in manufacturerList" :key="item.id" :label="item.id" border size="medium" style="margin: 10px 20px; width: 15%">{{ item.name }}</el-radio>
        </el-radio-group>
      </div>
      <div style="text-align: center; margin-top: 20px">
        <el-button type="primary" size="medium" @click="manufacturerDialogVisible = false">返 回</el-button>
        <el-button type="primary" size="medium" @click="handleSelect(dataForm.lab_manufacturer_id,'manufacturer_name', 'manufacturer_telephone',manufacturerList, 'manufacturerDialogVisible')">选 中</el-button>
      </div>
    </el-dialog>
    <!-- 供货商dialog -->
    <el-dialog
      :visible.sync="supplierDialogVisible"
      width="90%"
    >
      <!-- 标题 + 搜索框 -->
      <div slot="title">
        <span class="my-dialog-title">供货商筛选</span>
        <el-input v-model="queryKeyword" placeholder="输入关键字进行筛选" style="width: 230px;" clearable />
        <el-button type="primary" size="medium" @click="handleQuery(queryKeyword, 'supplierList')">筛选</el-button>
      </div>
      <el-alert
        v-show="supplierList.length === 0"
        title="查无数据"
        type="info"
        center
        style="width: 100%;margin-top: 5px"
        :closable="false"
      />
      <div style="margin:0 49px 0 49px;display: block">
        <el-radio-group v-model="dataForm.lab_supplier_id">
          <el-radio v-for="item in supplierList" :key="item.id" :label="item.id" border size="medium" style="margin: 10px 20px; width: 15%">{{ item.name }}</el-radio>
        </el-radio-group>
      </div>
      <div style="text-align: center; margin-top: 20px">
        <el-button type="primary" size="medium" @click="supplierDialogVisible = false">返 回</el-button>
        <el-button type="primary" size="medium" @click="handleSelect(dataForm.lab_supplier_id,'supplier_name', 'supplier_telephone',supplierList, 'supplierDialogVisible')">选 中</el-button>
      </div>
    </el-dialog>
    <!-- 国码dialog -->
    <el-dialog
      :visible.sync="countryCodeDialogVisible"
      width="90%"
    >
      <!-- 标题 + 搜索框 -->
      <div slot="title">
        <span class="my-dialog-title">国码筛选</span>
        <el-input v-model="queryKeyword" placeholder="查询国码" style="width: 230px;" clearable />
        <el-button type="primary" size="medium" @click="handleQuery(queryKeyword, 'countryCodeList')">筛选</el-button>
      </div>
      <el-alert
        v-show="countryCodeList.length === 0"
        title="查无数据"
        type="info"
        center
        style="width: 100%;margin-top: 5px"
        :closable="false"
      />
      <div style="margin:0 49px 0 49px;display: block">
        <el-radio-group v-model="dataForm.country_code_id">
          <el-radio v-for="item in countryCodeList" :key="item.id" :label="item.id" border size="medium" style="margin: 10px 20px; width: 15%">{{ item.name }}</el-radio>
        </el-radio-group>
      </div>
      <div style="text-align: center; margin-top: 20px">
        <!-- 取消操作 -->
        <el-button type="primary" size="medium" @click="countryCodeDialogVisible = false">返 回</el-button>
        <!-- 选钟操作 根据选择的id更新到name -->
        <el-button type="primary" size="medium" @click="handleSelect(dataForm.country_code_id,'country_code_name', '',countryCodeList, 'countryCodeDialogVisible')">选 中</el-button>
      </div>
    </el-dialog>
    <!-- 适用课程dialog -->
    <!--<el-dialog
      :visible.sync="courseDialogVisible"
      width="90%"
    >
      &lt;!&ndash; 标题 + 搜索框 &ndash;&gt;
      <div slot="title">
        <span class="my-dialog-title">适用课程搜索</span>
        <el-input v-model="queryKeyword" placeholder="查询适用课程" style="width: 230px;" clearable/>
        <el-button type="primary" size="medium" @click="handleQuery(queryKeyword, 'courseList')">筛选</el-button>
      </div>
      <el-alert
        v-show="courseList.length === 0"
        title="查无数据"
        type="info"
        center
        style="width: 100%;margin-top: 5px"
        :closable="false"
      />
      <div style="margin:0 49px 0 49px;display: block">
        <el-radio-group v-model="dataForm.course_id">
          <el-radio v-for="item in courseList" :key="item.id" :label="item.id" border size="medium" style="margin: 10px 20px; width: 15%">{{ item.name }}</el-radio>
        </el-radio-group>
      </div>
      <div style="text-align: center; margin-top: 20px">
        &lt;!&ndash; 取消操作 &ndash;&gt;
        <el-button type="primary" size="medium" @click="courseDialogVisible = false">返 回</el-button>
        &lt;!&ndash; 选钟操作 根据选择的id更新到name &ndash;&gt;
        <el-button type="primary" size="medium" @click="handleSelect(dataForm.course_id,'course_name', '',courseList, 'courseDialogVisible')">选 中</el-button>
      </div>
    </el-dialog>-->
  </div>
</template>

<script>
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

// 有用
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

import { isChinese, isEnglish } from '@/utils/fieldValidate'
export default {
  name: 'SoftwareCreate',
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
          { required: true, type: 'number', message: '请输入', trigger: 'blur' }
        ],
        lab_software_category_name: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        applicable_system_name: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        version: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        price: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        brand_name: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        lab_unit_name: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        specification: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        manufacturer_name: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        manufacturer_telephone: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        supplier_name: [
          { required: true, type: 'string', message: '请输入', trigger: 'change' }
        ],
        country_code_name: [
          { required: true, type: 'string', message: '请输入', trigger: 'change' }
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
      queryKeyword: null,
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
          // 调用接口
          this.$message({
            message: '添加成功!',
            type: 'success'
          })
          console.log('success submit!!')
          console.log(this.dataForm)
        } else {
          console.log('error submit!!')
          return false
        }
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
    /* 获取适用课程列表信息 */
    getCourseList(keyword) {
      if (!keyword) {
        console.log('keyword is null')
        this.courseList = fakeList
        console.log('this.courseList = ' + this.courseList)
        return false
      }
      // 调用接口
      // 暂用假数据 作为筛选， 实际通过调用接口，在后台进行模糊筛选再返回数据
      console.log('keyword is not null')
      this.courseList = fakeList.filter(m => m.pre_name === keyword).map(m => ({
        id: m.id,
        pre_name: m.pre_name,
        name: m.name
      }))
      console.log('this.courseList = ' + this.courseList)
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
    /* 根据关键词打开dialog */
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
    // /* 打开软件种类dialog */
    // handleSoftwareCategoryDialog() {
    //   this.softwareCategoryDialogVisible = true
    //   this.queryKeyword = null
    //   this.getSoftwareCategoryList()
    // },
    //
    // /* 打开适用系统dialog */
    // handleApplicableSystemDialog() {
    //   this.applicableSystemDialogVisible = true
    //   this.queryKeyword = null
    //   this.getApplicableSystemList()
    // },
    // /* 打开品牌dialog */
    // handleBrandDialog() {
    //   this.brandDialogVisible = true
    //   this.queryKeyword = null
    //   this.getBrandList()
    // },
    // /* 打开计量单位dialog */
    // handleUnitDialog() {
    //   this.unitDialogVisible = true
    //   this.queryKeyword = null
    //   this.getUnitList()
    // },
    // /* 打开供货商对话框 */
    // handleSupplierDialog() {
    //   this.supplierDialogVisible = true
    //   this.queryKeyword = null
    //   this.getSupplierList()
    // },
    // /* 打开生产商dialog */
    // handleManufacturerDialog() {
    //   this.manufacturerDialogVisible = true
    //   this.queryKeyword = null
    //   this.getManufacturerList()
    // },
    // /* 打开适用课程对话框 */
    // handleCourseDialog() {
    //   this.courseDialogVisible = true
    //   this.queryKeyword = null
    //   // 获取信息用于生成radio
    //   this.getCourseList()
    // },
    /* 将信息同步 */
    handleSelect(select_id, select_name, select_phone, dataList, dialogVisibleKey) {
      this.dataForm[select_name] = dataList
        .filter(m => m.id === select_id).map(m => m.name).pop()
      this.dataForm[select_phone] = dataList
        .filter(m => m.id === select_id).map(m => m.phone).pop()
      // 关闭对话框
      this[dialogVisibleKey] = false
      this.$refs['dataForm'].validateField(select_name)
    },
    /* 筛选数据 */
    handleQuery(keyword, listName) {
      const option = allListName.filter(m => m.key === listName).map(m => m.option).pop()
      console.log('option=' + option)
      console.log('keyword=' + keyword)
      if (option) {
        this[option](keyword)
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
  .my-dialog-title{
    font-size: 20px;
    font-weight: 700;
    margin-right: 50px;
  }
</style>
