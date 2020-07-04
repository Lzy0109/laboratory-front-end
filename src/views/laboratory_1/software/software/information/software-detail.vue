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
          <el-col :span="6">
            <el-form-item label="适用系统" label-width="100px" prop="applicable_system_name">
              <span v-show="isRead">{{ dataForm.applicable_system_name }}</span>
              <el-button v-show="!isRead" type="info" plain style="width: 165px;" @click="handleOpenDialog('applicableSystemDialogVisible')">
                {{ dataForm.applicable_system_name === null ? '请选择' : dataForm.applicable_system_name }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
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
            <el-form-item label="品牌" label-width="100px" prop="brand_name">
              <span v-show="isRead">{{ dataForm.brand_name }}</span>
              <el-button v-show="!isRead" type="info" plain style="width: 165px" @click="handleOpenDialog('brandDialogVisible')">
                {{ dataForm.brand_name === null ? '请选择' : dataForm.brand_name }}
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="计量单位" label-width="100px" prop="lab_unit_name">
              <span v-show="isRead">{{ dataForm.lab_unit_name }}</span>
              <el-button v-show="!isRead" type="info" plain style="width: 165px" @click="handleOpenDialog('unitDialogVisible')">
                {{ dataForm.lab_unit_name === null ? '请选择' : dataForm.lab_unit_name }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="6">
            <el-form-item label="规格" label-width="100px" prop="specification">
              <span v-show="isRead">{{ dataForm.specification }}</span>
              <el-input v-show="!isRead" v-model="dataForm.specification" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="生产商" label-width="100px" prop="manufacturer_name">
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
            <el-form-item label="供货商" label-width="100px" prop="supplier_name">
              <span v-show="isRead">{{ dataForm.supplier_name }}</span>
              <el-button v-show="!isRead" type="info" plain style="width: 165px" @click="handleOpenDialog('supplierDialogVisible')">
                {{ dataForm.supplier_name === null ? '请选择' : dataForm.supplier_name }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="6">
            <el-form-item label="供货商电话" label-width="100px">
              <span v-show="isRead">{{ dataForm.supplier_telephone }}</span>
              <el-input v-show="!isRead" v-model="dataForm.supplier_telephone" style="width: auto" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="适用课程" label-width="100px" prop="course_name">
              <span v-show="isRead">{{ dataForm.course_name }}</span>
              <el-button v-show="!isRead" type="info" plain style="width: 165px" @click="handleOpenDialog('courseDialogVisible')">
                {{ dataForm.course_name === null ? '请选择' : dataForm.course_name }}
              </el-button>
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
    <!-- 适用课程dialog -->
    <el-dialog
      :visible.sync="courseDialogVisible"
      width="90%"
    >
      <!-- 标题 + 搜索框 -->
      <div slot="title">
        <span class="my-dialog-title">适用课程搜索</span>
        <el-input v-model="queryKeyword" placeholder="查询适用课程" style="width: 230px;" clearable />
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
        <!-- 取消操作 -->
        <el-button type="primary" size="medium" @click="courseDialogVisible = false">返 回</el-button>
        <!-- 选钟操作 根据选择的id更新到name -->
        <el-button type="primary" size="medium" @click="handleSelect(dataForm.course_id,'course_name', '',courseList, 'courseDialogVisible')">选 中</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 假数据
const fakeData = {
  number: 'sw-1234',
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

// 有用
const allListName = [
  { key: 'softwareCategoryList', dialogVisibleName: 'softwareCategoryDialogVisible', option: 'getSoftwareCategoryList' },
  { key: 'courseList', dialogVisibleName: 'courseDialogVisible', option: 'getCourseList' },
  { key: 'unitList', dialogVisibleName: 'unitDialogVisible', option: 'getUnitList' },
  { key: 'brandList', dialogVisibleName: 'brandDialogVisible', option: 'getBrandList' },
  { key: 'manufacturerList', dialogVisibleName: 'manufacturerDialogVisible', option: 'getManufacturerList' },
  { key: 'supplierList', dialogVisibleName: 'supplierDialogVisible', option: 'getSupplierList' },
  { key: 'applicableSystemList', dialogVisibleName: 'applicableSystemDialogVisible', option: 'getApplicableSystemList' }
]

export default {
  name: 'SoftwareDetail',
  data() {
    return {
      dataForm: null,
      tempData: null,
      rules: {
        number: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ],
        name: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
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
        course_name: [
          { required: true, type: 'string', message: '请选择', trigger: 'change' }
        ]
      },

      isRead: true,
      isAble: false,
      showSaveBtn: false,

      // 各种列表
      softwareCategoryList: [],
      courseList: [],
      unitList: [],
      brandList: [],
      manufacturerList: [],
      supplierList: [],
      applicableSystemList: [],

      // 对话框
      queryKeyword: null,
      softwareCategoryDialogVisible: false,
      applicableSystemDialogVisible: false,
      brandDialogVisible: false,
      unitDialogVisible: false,
      supplierDialogVisible: false,
      manufacturerDialogVisible: false,
      courseDialogVisible: false
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

    /* 将信息同步 */
    handleSelect(select_id, select_name, select_phone, dataList, dialogVisibleKey) {
      //  如果查询的列表为空 返回尚未选择字样
      console.log('dataList=>' + dataList.length)
      if (dataList.length === 0) {
        this.dataForm[select_name] = null
      } else {
        this.dataForm[select_name] = dataList
          .filter(m => m.id === select_id).map(m => m.name).pop()
        this.dataForm[select_phone] = dataList
          .filter(m => m.id === select_id).map(m => m.phone).pop()
      }
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
    },
    /* 同步耗材种类id 和 名称 */
    // synchronizeData(keyName, keyId, keyNameIdList) {
    //   this.dataForm[keyName] = keyNameIdList
    //     .filter(m => m.id === keyId)
    //     .map(m => m.name)
    //     .pop()
    // },
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
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          // 根据返回信息重新复制dataForm
          console.log('success submit!!')
          // 修改成功后操作
          // this.synchronizeData()
          this.afterEdit()
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
      this.$router.push({
        name: '',
        params: {
          id: this.dataForm.attachment_id
        }
      })
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
