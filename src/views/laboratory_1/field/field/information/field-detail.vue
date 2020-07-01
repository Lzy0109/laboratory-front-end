<template>
  <div class="app-container">
    <!-- 功能按钮 -->
    <div class="detail-button">
      <el-button type="primary" size="medium" @click="handleReturn">返回</el-button>
      <el-button type="primary" :disabled="isAble" size="medium" @click="beforeEdit">编辑信息</el-button>
      <el-button type="danger" size="medium" @click="beforeHandleDelete">删除</el-button>
      <el-button type="success" size="medium" @click="handleDownload">导出信息</el-button>
      <el-button type="primary" size="medium" @click="handleEquipmentDetail">查看器材</el-button>
      <el-button type="primary" size="medium" @click="handleFacilityDetail">查看设施</el-button>
    </div>
    <!-- 详细信息展示 -->
    <div class="form-style">
      <h2>实验室详细信息</h2>
      <el-form ref="dataForm" :model="dataForm" :rules="rules" hide-required-asterisk>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6">
            <el-form-item label="英文名称" label-width="100px" prop="english_name">
              <span v-show="isRead">{{ dataForm.english_name }}</span>
              <el-input v-show="!isRead" v-model="dataForm.english_name" style="width: auto;" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="中文名称" label-width="100px" prop="name">
              <span v-show="isRead">{{ dataForm.name }}</span>
              <el-input v-show="!isRead" v-model="dataForm.name" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="实验室分类" label-width="100px" prop="lab_category_name">
              <span v-show="isRead">{{ dataForm.lab_category_name }}</span>
              <!-- 新版 -->
<!--              <el-input v-show="!isRead" v-model="dataForm.lab_category_name" style="width: auto" :readonly="isRead" @blur="checkLabCategory(dataForm.lab_category_name)" />-->
<!--              <div v-show="showCategoryCheckingSuccessMessage" class="check_message_success"><span>{{ categoryCheckingMessage }}</span></div>-->
<!--              <div v-show="showCategoryCheckingErrorMessage" class="check_message_error"><span>{{ categoryCheckingMessage }}</span></div>-->
              <!-- 旧版 -->

<!--              <el-input v-show="isRead" v-model="dataForm.lab_category_name" style="width: auto" :readonly="isRead" />-->
              <el-select v-show="!isRead" v-model="dataForm.lab_category_id" style="width: 179px;" placeholder="实验室分类" filterable>
                <!-- 获取数据库信息动态生成option -->
                <el-option v-for="item in labCategoryList" :key="item.id" :label="item.name" :value="item.id">
                  <span style="float: left">编号:{{ item.id }}</span>
                  <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="最大机位数" label-width="100px" prop="max_seat">
              <span v-show="isRead">{{ dataForm.max_seat }}</span>
              <el-input v-show="!isRead" v-model.number="dataForm.max_seat" style="width: auto" :readonly="isRead" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="场地" label-width="100px" prop="field_name">
              <span v-show="isRead">{{ dataForm.field_name }}</span>
              <!-- 新版 -->
<!--              <el-input v-show="!isRead" v-model="dataForm.field_name" style="width: auto" :readonly="isRead" @blur="checkField(dataForm.field_name)" />-->
<!--              <div v-show="showFieldCheckingSuccessMessage" class="check_message_success"><span>{{ fieldCheckingMessage }}</span></div>-->
<!--              <div v-show="showFieldCheckingErrorMessage" class="check_message_error"><span>{{ fieldCheckingMessage }}</span></div>-->
              <!-- 旧版 -->
<!--              <el-input v-show="isRead" v-model="dataForm.field_name" style="width: auto" :readonly="isRead" />-->
              <el-select v-show="!isRead" v-model="dataForm.field_id" style="width: 179px;" placeholder="场地" filterable @change="getFieldDataById">
                <!-- 获取数据库信息动态生成option -->
                <el-option v-for="item in fieldList" :key="item.id" :label="item.name" :value="item.id">
                  <span style="float: right; color: #8492a6; font-size: 12px">名称:{{ item.name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="楼层" label-width="100px" prop="infoValidation">
              <span>{{ dataForm.field_floor }}</span>
              <!--<el-input v-model="dataForm.field_floor" style="width: auto" readonly />-->
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="房间号" label-width="100px" prop="infoValidation">
              <span>{{ dataForm.field_room }}</span>
              <!--<el-input v-model="dataForm.field_room" style="width: auto" readonly />-->
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="场地负责人" label-width="100px" prop="infoValidation">
              <span>{{ dataForm.field_manager }}</span>
              <!--<el-input v-model="dataForm.field_manager" style="width: auto" readonly />-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="可容纳人数" label-width="100px" prop="infoValidation">
              <span>{{ dataForm.field_volumn }}</span>
              <!--<el-input v-model="dataForm.field_volumn" style="width: auto" readonly />-->
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="场地长度" label-width="100px" prop="infoValidation">
              <span>{{ dataForm.field_long }}</span>
              <!--<el-input v-model="dataForm.field_long" style="width: auto" readonly />-->
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="场地宽度" label-width="100px" prop="infoValidation">
              <span>{{ dataForm.field_width }}</span>
              <!--<el-input v-model="dataForm.field_width" style="width: auto" readonly />-->
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="场地高度" label-width="100px" prop="infoValidation">
              <span>{{ dataForm.field_height }}</span>
              <!--<el-input v-model="dataForm.field_height" style="width: auto" readonly />-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="室内/室外" label-width="100px" prop="infoValidation">
              <span>{{ dataForm.field_isIndoor }}</span>
              <!--<el-input v-model="dataForm.field_isIndoor" style="width: auto" readonly />-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
        </el-row>
      </el-form>
      <el-collapse-transition>
        <div v-show="showSaveBtn" style="text-align: center">
          <el-button type="success" size="medium" @click="submitEdit('dataForm')">保存</el-button>
          <el-button type="primary" size="medium" @click="beforeCancelEdit">取消</el-button>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
// 假数据
const fakeData = {
  id: 1,
  college_id: '1',
  college_name: '学校名称',
  english_name: 'testen',
  name: '实验室',
  lab_category_id: 1,
  lab_category_name: '实验室类别1',
  lab_equipment_id: 1, // 实验室器材
  max_seat: 100,
  lab_facility_id: 1,
  field_id: 1,
  field_name: '场地1名称'
}
const fake_labCategoryList = [
  { id: 1, name: '实验室类别1' },
  { id: 2, name: '实验室类别2' },
  { id: 3, name: '实验室类别3' }
]
const fake_fieldList = [
  {
    id: 1,
    name: '场地1名称',
    field_manager_id: 1,
    field_manager: '负责人1',
    floor: '楼层',
    room: '房间号',
    isIndoor: '室内/室外',
    height: '高度',
    width: '宽度',
    long: '长度',
    volumn: '最大容纳人数'
  },
  {
    id: 2,
    name: '场地2名称',
    field_manager_id: 2,
    field_manager: '负责人2',
    floor: '楼层2',
    room: '房间号2',
    isIndoor: '室内/室外2',
    height: '高度2',
    width: '宽度2',
    long: '长度2',
    volumn: '最大容纳人数2'
  },
  {
    id: 3,
    name: '场地3名称',
    field_manager_id: 3,
    field_manager: '负责人3',
    floor: '楼层3',
    room: '房间号3',
    isIndoor: '室内/室外3',
    height: '高度3',
    width: '宽度3',
    long: '长度3',
    volumn: '最大容纳人数3'
  }
]

import { isChinese, isEnglish } from '@/utils/fieldValidate'

export default {
  name: 'FieldDetail',
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
        infoValidation: [
          { type: 'string', message: '请输入', trigger: 'blur' }
        ],
        english_name: [
          { required: true, trigger: 'blur', validator: validateIsEnglish }
        ],
        name: [
          { required: true, trigger: 'blur', validator: validateIsChinese }
        ],
        lab_category_name: [
          { type: 'string', message: '请输入', trigger: 'blur', required: true }
        ],
        field_name: [
          { type: 'string', message: '请输入', trigger: 'blur', required: true }
        ],
        max_seat: [
          { type: 'number', message: '请输入', trigger: 'blur', required: true }
        ]
      },
      isRead: true,
      isAble: false,
      showSaveBtn: false,

      showCategoryCheckingSuccessMessage: false,
      showCategoryCheckingErrorMessage: false,
      categoryCheckingMessage: null,

      showFieldCheckingSuccessMessage: false,
      showFieldCheckingErrorMessage: false,
      fieldCheckingMessage: null,

      labCategoryList: [],
      fieldList: []
    }
  },
  created() {
    this.getOriginalData()
    this.getLabCategoryList()
    this.getFieldList()
    this.getFieldDataById()
  },
  methods: {
    /* 根据ID获取数据 */
    getOriginalData() {
      // 暂用假数据
      this.dataForm = fakeData
      const id = this.$route.query.id
      console.log(id)
    },
    /* 获取实验室类别信息 */
    getLabCategoryList() {
      // 暂用假数据
      this.labCategoryList = fake_labCategoryList
      // 调用获取类别信息的接口
    },
    /* 获取场地信息 */
    getFieldList() {
      // 暂用假数据
      this.fieldList = fake_fieldList
      // 调用获取类别信息的接口
    },
    getFieldDataById() {
      console.log('方法一 根据已获取全部列表信息查找')
      // 方法一 根据已获取全部列表信息查找
      const tempData = this.fieldList
        .filter(m => m.id === this.dataForm.field_id)
        .map(m => ({
          field_name: m.name,
          field_manager_id: m.field_manager_id,
          field_manager: m.field_manager,
          field_floor: m.floor,
          field_room: m.room,
          field_isIndoor: m.isIndoor,
          field_height: m.height,
          field_width: m.width,
          field_long: m.long,
          field_volumn: m.volumn
        }))
        .pop()
      console.log(tempData)
      for (const key in tempData) {
        if (this.dataForm.hasOwnProperty(key)) {
          console.log(key)
        }
        this.dataForm[key] = tempData[key]
      }
      console.log(this.dataForm)
      // 方法二 根据id查找
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

      this.showCategoryCheckingSuccessMessage = false
      this.showCategoryCheckingErrorMessage = false

      this.showFieldCheckingSuccessMessage = false
      this.showFieldCheckingErrorMessage = false
    },
    /* 同步信息 id 和 名称 */
    // synchronizeData() {
    //   this.dataForm.field_name = this.fieldList
    //     .filter(m => m.id === this.dataForm.field_id)
    //     .map(m => m.name)
    //     .pop()
    //   this.dataForm.lab_category_name = this.labCategoryList
    //     .filter(m => m.id === this.dataForm.lab_category_id)
    //     .map(m => m.name)
    //     .pop()
    // },
    /* 提交编辑的内容 */
    submitEdit(formName) {
      if (this.showCategoryCheckingErrorMessage || this.showFieldCheckingErrorMessage) {
        this.$message({
          message: '修改的内容存在错误，请修改后再保存，否则请取消编辑',
          type: 'error'
        })
        return false
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          // this.synchronizeData()
          // 根据返回信息重新复制dataForm
          console.log('success submit!!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // 修改后操作
      this.afterEdit()
    },
    /* 取消编辑操作 */
    cancelEdit() {
      this.dataForm = { ...this.tempData }
      this.afterEdit()
    },
    /* 取消 确认弹窗 */
    beforeCancelEdit() {
      this.$confirm('修改信息还没保存, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.cancelEdit()
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
    /* 跳转到设施详情 */
    handleFacilityDetail(id) {
      console.log('facility-components-modules id =' + id)
      this.$router.push({
        name: 'Field_Fac_List',
        query: {
          id: id
        }
      })
    },
    /* 跳转到器材详情 */
    handleEquipmentDetail(id) {
      console.log('components-modules id =' + id)
      this.$router.push({
        name: 'Field_Equip_List',
        query: {
          id: id
        }
      })
    },
    /* 检查实验室分类信息是否存在 */
    checkLabCategory(value) {
      console.log('check lab category ' + value)
      // 检查输入的内容是否存在
      if (!value) {
        this.showCategoryCheckingSuccessMessage = false
        this.showCategoryCheckingErrorMessage = false
        return
      }
      const flag = this.labCategoryList.filter(m => m.name === value).pop()
      if (flag) {
        this.showCategoryCheckingErrorMessage = false
        this.showCategoryCheckingSuccessMessage = true
        this.categoryCheckingMessage = '该分类存在，可选择'
        this.dataForm.lab_category_name = flag.name
        this.dataForm.lab_category_id = flag.id
      } else {
        this.showCategoryCheckingSuccessMessage = false
        this.showCategoryCheckingErrorMessage = true
        this.categoryCheckingMessage = '该分类不存在，不可选用'
      }
    },
    checkField(value) {
      console.log('check Field')
      // 检查输入的内容是否存在
      if (!value) {
        this.showFieldCheckingSuccessMessage = false
        this.showFieldCheckingErrorMessage = false
        return
      }
      const flag = this.fieldList.filter(m => m.name === value).pop()
      if (flag) {
        this.showFieldCheckingErrorMessage = false
        this.showFieldCheckingSuccessMessage = true
        this.fieldCheckingMessage = '该场地存在，可选择'
        this.dataForm.field_id = flag.id
        this.getFieldDataById()
      } else {
        this.showFieldCheckingSuccessMessage = false
        this.showFieldCheckingErrorMessage = true
        this.fieldCheckingMessage = '该场地不存在，不可选用'
      }
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
  .check_message_success{
    display: inline-block;
    color: #67C23A;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left:0
  }
  .check_message_error{
    display: inline-block;
    color: #F56C6C;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left:0
  }
</style>

