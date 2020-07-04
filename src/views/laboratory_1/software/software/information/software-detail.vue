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
              <span v-show="isRead">{{ dataForm.lab_software_category_id }}</span>
              <el-select v-show="!isRead" v-model="dataForm.lab_software_category_id" style="width: 160px;" placeholder="软件种类">
                <!--获取数据库信息动态生成option-->
                <el-option v-for="item in softwareCategoryList" :key="item.id" :label="item.name" :value="item.id">
                  <span style="float: left">编号:{{ item.id }}</span>
                  <span style="float: right; color: #6492a6; font-size: 12px">名称:{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="适用系统" label-width="100px" prop="applicable_system_id">
              <span v-show="isRead">{{ dataForm.applicable_system_name }}</span>
              <el-select v-show="!isRead" v-model="dataForm.applicable_system_id" style="width: 160px;" placeholder="适用系统">
                <!--获取数据库信息动态生成option-->
                <el-option v-for="item in applicableSystemList" :key="item.id" :label="item.name" :value="item.id">
                  <span>名称:{{ item.name }}</span>
                </el-option>
              </el-select>
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
            <el-form-item label="品牌" label-width="100px" prop="lab_brand_id">
              <span v-show="isRead">{{ dataForm.brand_name }}</span>
              <el-select v-show="!isRead" v-model="dataForm.lab_brand_id" style="width: 160px;" placeholder="品牌">
                <!--获取数据库信息动态生成option-->
                <el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.id">
                  <span>名称:{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="计量单位" label-width="100px" prop="lab_unit_id">
              <span v-show="isRead">{{ dataForm.lab_unit_name }}</span>
              <el-select v-show="!isRead" v-model="dataForm.lab_unit_id" style="width: 160px;" placeholder="软件种类">
                <!--获取数据库信息动态生成option-->
                <el-option v-for="item in unitList" :key="item.id" :label="item.name" :value="item.id">
                  <span>名称:{{ item.name }}</span>
                </el-option>
              </el-select>
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
            <el-form-item label="生产商" label-width="100px" prop="lab_manufacturer_id">
              <span v-show="isRead">{{ dataForm.manufacturer_name }}</span>
              <el-select v-show="!isRead" v-model="dataForm.lab_manufacturer_id" style="width: 160px;" placeholder="生产商">
                <!--获取数据库信息动态生成option-->
                <el-option v-for="item in manufacturerList" :key="item.id" :label="item.name" :value="item.id">
                  <span>名称:{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="生厂商电话" label-width="100px" prop="manufacturer_telephone">
              <span v-show="isRead">{{ dataForm.manufacturer_telephone }}</span>
              <el-input v-show="!isRead" v-model="dataForm.manufacturer_telephone" style="width: auto" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="供货商" label-width="100px" prop="lab_supplier_id">
              <span v-show="isRead">{{ dataForm.supplier_name }}</span>
              <!--<el-input v-show="!isRead" v-model="dataForm.lab_supplier_id" style="width: auto" :readonly="isRead" />-->
              <el-select v-show="!isRead" v-model="dataForm.lab_supplier_id" style="width: 160px;" placeholder="供货商">
                <!--获取数据库信息动态生成option-->
                <el-option v-for="item in supplierList" :key="item.id" :label="item.name" :value="item.id">
                  <span>名称:{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="6">
            <el-form-item label="供货商电话" label-width="100px" prop="supplier_telephone">
              <span v-show="isRead">{{ dataForm.supplier_telephone }}</span>
              <el-input v-show="!isRead" v-model="dataForm.supplier_telephone" style="width: auto" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="适用课程" label-width="100px" prop="course_id">
              <span v-show="isRead">{{ dataForm.course_name }}</span>
              <el-select v-show="!isRead" v-model="dataForm.course_id" style="width: 160px;" placeholder="软件种类">
                <!--获取数据库信息动态生成option-->
                <el-option v-for="item in courseList" :key="item.id" :label="item.name" :value="item.id">
                  <span style="float: left">编号:{{ item.id }}</span>
                  <span style="float: right; color: #6492a6; font-size: 12px">名称:{{ item.name }}</span>
                </el-option>
              </el-select>
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
  </div>
</template>

<script>
// 未完成： 获取下拉框列表信息
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
  { id: 1, name: '下拉框内容1', phone: '13512341234' },
  { id: 2, name: '下拉框内容2', phone: '16812341234' },
  { id: 3, name: '下拉框内容3', phone: '13812341234' }
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
        applicable_system: [
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
        lab_unit_id: [
          { required: true, type: 'number', message: '请输入', trigger: 'blur' }
        ],
        specification: [
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
        course_id: [
          { required: true, type: 'number', message: '请输入', trigger: 'blur' }
        ],
        course_name: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ]
      },

      softwareCategoryList: [],
      systemList: [],
      courseList: [],
      unitList: [],
      brandList: [],
      manufacturerList: [],
      supplierList: [],
      applicableSystemList: [],

      isRead: true,
      isAble: false,
      showSaveBtn: false
    }
  },
  created() {
    this.getOriginalData()
    this.getSoftwareCategoryList()
  },
  methods: {
    /* 根据ID获取数据 */
    getOriginalData() {
      // 暂用假数据
      this.dataForm = fakeData
      this.getSoftwareCategoryList()
      this.getBrandList()
      this.getSystemList()
      this.applicableSystemList = fakeList
      this.courseList = fakeList
      this.manufacturerList = fakeList
      this.unitList = fakeList
      this.supplierList = fakeList

      const id = this.$route.query.id
      console.log(id)
    },
    /* 获取软件分类列表信息 */
    getSoftwareCategoryList() {
      // 调用接口
      console.log('调用获取软件分类列表信息接口')
      // 暂用假数据
      this.softwareCategoryList = fakeList
    },
    /* 获取适用系统列表信息 */
    getSystemList() {
      // 调用接口
      // 暂用假数据
      this.systemList = fakeList
    },
    /* 获取品牌列表信息 */
    getBrandList() {
      // 调用接口
      console.log('调用获取品牌列表信息列表信息接口')
      // 暂用假数据
      this.brandList = fakeList
    },
    /* 返回上一页 */
    handleReturn() {
      this.$router.go(-1)
    },
    /* 同步耗材种类id 和 名称 */
    synchronizeData(keyName, keyId, keyNameIdList) {
      this.dataForm[keyName] = keyNameIdList
        .filter(m => m.id === keyId)
        .map(m => m.name)
        .pop()
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
